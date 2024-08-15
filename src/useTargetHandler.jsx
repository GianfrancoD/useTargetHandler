import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useHttpRequest } from "usehttprequest";

const validateRules = async (name, value, rules, target) => {
  return new Promise((resolve) => {
    resolve(
      rules.required
        ? (rules.isRequired && typeof value !== "string") || !value.trim()
          ? rules.requiredMessage || `${name} es obligatorio 🚨`
          : !rules.isRequired && typeof value === "string" && !value.trim()
          ? null
          : rules.pattern && !rules.pattern.test(value)
          ? rules.patternMessage || `${name} no es válido ❌`
          : rules.minLength && value.length < rules.minLength
          ? rules.minLengthMessage ||
            `${name} debe tener al menos ${rules.minLength} caracteres`
          : rules.maxLength && value.length > rules.maxLength
          ? rules.maxLengthMessage ||
            `${name} no puede exceder ${rules.maxLength} caracteres`
          : rules.matches && value !== target[rules.matches]
          ? rules.matchMessage || `${name} no coincide`
          : rules.min && value < rules.min
          ? rules.minMessage || `${name} debe ser al menos ${rules.min}`
          : rules.max && value > rules.max
          ? rules.maxMessage || `${name} no puede ser mayor que ${rules.max}`
          : rules.checked && !value
          ? rules.checkedMessage || `Debes aceptar ${name}`
          : rules.selected && !value
          ? rules.selectedMessage || `Debes seleccionar ${name}`
          : ""
        : ""
    );
  });
};

const sanitizeInput = (value) => {
  if (typeof value !== "string") return "";

  const strippeValue = value.replace(/<script.*?>.*?<\/script>/gi, "");
  const cleanValue = strippeValue.replace(/<\/?[^>]+(>|$)/g, "");
  const sanitizeValue = cleanValue
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

  return sanitizeValue;
};

const getEnvVar = (varName) =>
  typeof window !== "undefined"
    ? import.meta.env[varName]
    : process.env[varName];

const apiUrl =
  getEnvVar("VITE_API_URL") ||
  getEnvVar("REACT_APP_API_URL") ||
  getEnvVar("NEXT_PUBLIC_API_URL");

const useTargetHandler = (
  initialValues = {
    target,
    handleTarget,
    handleSubmit,
    errors,
  },
  validationRules = {},
  Storage = { storageType: "", storageKey: "formData" },
  security = { enableCSRF: false, rateLimit: 0 }
) => {
  const { enableCSRF, rateLimit } = security;
  const { storageType, storageKey } = Storage;

  const {
    apiCall,
    apiResponse,
    userFound,
    error,
    params,
    isLoading,
    SentryWarning,
    SentryError,
    SentryInfo,
    SentryEvent,
  } = useHttpRequest(enableCSRF);
  const storage =
    storageType == "local"
      ? localStorage
      : storageType == "session"
      ? sessionStorage
      : null;
  const [target, setTarget] = useState(() => {
    const store = storage ? storage.getItem(storageKey) : null;
    return store ? JSON.parse(store) : initialValues;
  });

  const [errors, setErrors] = useState({});
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const handleTarget = useCallback(async (e) => {
    const { name, type, checked, value } = e.target;
    if (!name) return;
    setTarget((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : sanitizeInput(value),
    }));
  }, []);

  const handleSubmit = useCallback(
    (callback) => async (e) => {
      e.preventDefault();
      SentryInfo("Iniciando el envío del formulario");

      const currentTime = Date.now();
      if (currentTime - lastSubmitTime < rateLimit) {
        console.log("Demasiadas solicitudes. Por favor, espera.");
        return;
      }
      setLastSubmitTime(currentTime);

      const newError = Object.entries(target).reduce((acc, [key, value]) => {
        typeof value === "string" &&
        value.trim() === "" &&
        !key.includes("terms")
          ? (acc[key] = { message: `${key} no puede estar vacio` })
          : null;
        return acc;
      }, {});

      await Promise.all(
        Object.entries(target).map(async ([key, value]) => {
          const rules = validationRules[key] || {};
          const sanitizeValue =
            typeof value === "string" && sanitizeInput(value);
          const error = await validateRules(key, sanitizeValue, rules, target);
          if (error) {
            newError[key] = { message: error };
          }
        })
      );

      Object.keys(newError).length > 0
        ? (setErrors(newError),
          console.log("Errores encontrados:", newError),
          SentryWarning("Errores encontrados en el formulario", newError))
        : (async () => {
            console.log("Enviar datos:", target);
            storage && storage.setItem(storageKey, JSON.stringify(target));
            setTarget(initialValues);
            setErrors({});
            callback(target);
            SentryEvent("Formulario enviado exitosamente");
          })();
    },
    [target, validateRules, lastSubmitTime, initialValues]
  );

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
      params,
      isLoading,
      SentryWarning,
      SentryError,
      SentryInfo,
      SentryEvent,
    },
    apiUrl,
  ];
};

useTargetHandler.prototype = {
  handleTarget: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  validationRules: PropTypes.object,
  Storage: PropTypes.shape({
    storageType: PropTypes.oneOf(["session", "local"]),
    storageKey: PropTypes.string,
  }),
  security: PropTypes.shape({
    enableCSRF: PropTypes.bool,
    rateLimit: PropTypes.number,
  }),
};

useTargetHandler.prototype.handleTarget.propTypes = {
  target: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
};

useTargetHandler.prototype.handleTarget.propTypes.event.propTypes = {
  target: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
};
export default useTargetHandler;
