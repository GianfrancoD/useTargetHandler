import { useCallback, useState, useMemo } from "react";
import { useHttpRequest } from "usehttprequest";
import DOMPurify from "dompurify";
import { validateWithZod } from "./zodAdapter";
const validateRules = async (name, value, rules, target) => {
    return new Promise((resolve) => {
        const isEmptyString = typeof value === "string" && value.trim() === "";
        const isEmpty = !value && value !== 0 && value !== false;
        const numericValue = typeof value === "string" && !isNaN(Number(value)) && value.trim() !== ""
            ? Number(value)
            : value;
        resolve(rules.required
            ? rules.isRequired && (isEmptyString || isEmpty)
                ? rules.requiredMessage || `${name} es obligatorio 🚨`
                : !rules.isRequired && isEmptyString
                    ? ""
                    : rules.pattern &&
                        typeof value === "string" &&
                        !rules.pattern.test(value)
                        ? rules.patternMessage || `${name} no es válido ❌`
                        : rules.minLength &&
                            typeof value === "string" &&
                            value.length < rules.minLength
                            ? rules.minLengthMessage ||
                                `${name} debe tener al menos ${rules.minLength} caracteres`
                            : rules.maxLength &&
                                typeof value === "string" &&
                                value.length > rules.maxLength
                                ? rules.maxLengthMessage ||
                                    `${name} no puede exceder ${rules.maxLength} caracteres`
                                : rules.matches && value !== target[rules.matches]
                                    ? rules.matchMessage || `${name} no coincide`
                                    : rules.min !== undefined &&
                                        typeof numericValue === "number" &&
                                        numericValue < rules.min
                                        ? rules.minMessage || `${name} debe ser al menos ${rules.min}`
                                        : rules.max !== undefined &&
                                            typeof numericValue === "number" &&
                                            numericValue > rules.max
                                            ? rules.maxMessage || `${name} no puede ser mayor que ${rules.max}`
                                            : rules.checked && !value
                                                ? rules.checkedMessage || `Debes aceptar ${name}`
                                                : rules.selected && !value
                                                    ? rules.selectedMessage || `Debes seleccionar ${name}`
                                                    : ""
            : "");
    });
};
/**
 *
 * @param value - Valor a sanitizar
 * @returns String sanitizado sin HTML ni scripts
 */
const sanitizeInput = (value) => {
    if (typeof value !== "string")
        return "";
    return DOMPurify.sanitize(value, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: [],
        KEEP_CONTENT: true,
        ALLOW_DATA_ATTR: false,
    });
};
const getEnvVar = (varName) => {
    if (typeof process !== "undefined" && process.env) {
        const value = process.env[varName];
        if (value !== undefined)
            return value;
    }
    if (typeof window !== "undefined") {
        try {
            const viteEnv = import.meta.env;
            if (viteEnv && viteEnv[varName] !== undefined) {
                return viteEnv[varName];
            }
        }
        catch { }
    }
    return undefined;
};
const apiUrl = getEnvVar("REACT_APP_API_URL") ||
    getEnvVar("VITE_API_URL") ||
    getEnvVar("NEXT_PUBLIC_API_URL");
const useTargetHandler = (initialValues, validationRulesOrSchema = {}, Storage = { storageType: "", storageKey: "formData" }, security = { enableCSRF: false, rateLimit: 0 }) => {
    const { enableCSRF, rateLimit } = security;
    const { storageType, storageKey } = Storage;
    const isZodSchema = useMemo(() => {
        return (validationRulesOrSchema &&
            typeof validationRulesOrSchema === "object" &&
            typeof validationRulesOrSchema.parse === "function" &&
            typeof validationRulesOrSchema.safeParse === "function");
    }, [validationRulesOrSchema]);
    const validationRules = useMemo(() => (isZodSchema ? {} : validationRulesOrSchema), [isZodSchema, validationRulesOrSchema]);
    const zodSchema = useMemo(() => (isZodSchema ? validationRulesOrSchema : null), [isZodSchema, validationRulesOrSchema]);
    const httpRequestHook = useHttpRequest(enableCSRF);
    const { apiCall, apiResponse, userFound, error, isLoading, SentryWarning, SentryError, SentryInfo, SentryEvent, } = httpRequestHook;
    const storage = storageType === "local"
        ? localStorage
        : storageType === "session"
            ? sessionStorage
            : null;
    const [target, setTarget] = useState(() => {
        const store = storage ? storage.getItem(storageKey || "formData") : null;
        return store ? JSON.parse(store) : initialValues;
    });
    const [errors, setErrors] = useState({});
    const [lastSubmitTime, setLastSubmitTime] = useState(0);
    const handleTarget = useCallback((e) => {
        const element = e.target;
        const { name, value } = element;
        if (!name)
            return;
        const isInput = element instanceof HTMLInputElement;
        const type = isInput ? element.type : element.tagName.toLowerCase();
        let processedValue;
        if (isInput && type === "checkbox") {
            processedValue = element.checked;
        }
        else if (type === "number" ||
            type === "password" ||
            element.tagName === "SELECT" ||
            element.tagName === "TEXTAREA") {
            processedValue = value;
        }
        else {
            processedValue = sanitizeInput(value);
        }
        setTarget((prevForm) => ({
            ...prevForm,
            [name]: processedValue,
        }));
    }, []);
    const handleSubmit = useCallback((callback) => async (e) => {
        e.preventDefault();
        SentryInfo("Iniciando el envío del formulario", {
            timestamp: Date.now(),
        });
        const currentTime = Date.now();
        if (currentTime - lastSubmitTime < (rateLimit || 0)) {
            console.log("Demasiadas solicitudes. Por favor, espera.");
            return;
        }
        setLastSubmitTime(currentTime);
        const newError = Object.entries(target).reduce((acc, [key, value]) => {
            if (typeof value === "string" &&
                value.trim() === "" &&
                !key.includes("terms")) {
                acc[key] = { message: `${key} no puede estar vacio` };
            }
            return acc;
        }, {});
        if (isZodSchema && zodSchema && validateWithZod) {
            const zodErrors = validateWithZod(zodSchema, target);
            if (zodErrors) {
                Object.assign(newError, zodErrors);
            }
        }
        else {
            await Promise.all(Object.entries(target).map(async ([key, value]) => {
                const rules = validationRules[key] || {};
                const error = await validateRules(key, value, rules, target);
                if (error) {
                    newError[key] = { message: error };
                }
            }));
        }
        if (Object.keys(newError).length > 0) {
            setErrors(newError);
            console.log("Errores encontrados:", newError);
            SentryWarning("Errores encontrados en el formulario", {
                errors: newError,
            });
        }
        else {
            console.log("Enviar datos:", target);
            storage &&
                storage.setItem(storageKey || "formData", JSON.stringify(target));
            setTarget(initialValues);
            setErrors({});
            await callback(target);
            SentryEvent("Formulario enviado exitosamente", { formData: target }, "info");
        }
    }, [
        target,
        validationRules,
        lastSubmitTime,
        initialValues,
        rateLimit,
        storage,
        storageKey,
        SentryInfo,
        SentryWarning,
        SentryEvent,
        isZodSchema,
        zodSchema,
    ]);
    return [
        target,
        handleTarget,
        handleSubmit,
        errors,
        {
            apiCall,
            apiResponse,
            userFound,
            error,
            isLoading,
            SentryWarning,
            SentryError,
            SentryInfo,
            SentryEvent,
        },
        apiUrl,
    ];
};
export default useTargetHandler;
