export interface ValidationRule {
    required?: boolean;
    isRequired?: boolean;
    requiredMessage?: string;
    pattern?: RegExp;
    patternMessage?: string;
    minLength?: number;
    minLengthMessage?: string;
    maxLength?: number;
    maxLengthMessage?: string;
    matches?: string;
    matchMessage?: string;
    min?: number;
    minMessage?: string;
    max?: number;
    maxMessage?: string;
    checked?: boolean;
    checkedMessage?: string;
    selected?: boolean;
    selectedMessage?: string;
}
export interface ValidationRules {
    [key: string]: ValidationRule;
}
export interface StorageConfig {
    storageType?: "local" | "session" | "";
    storageKey?: string;
}
export interface SecurityConfig {
    enableCSRF?: boolean;
    rateLimit?: number;
}
export interface FormErrors {
    [key: string]: {
        message: string;
    };
}
export interface FormValues {
    [key: string]: string | number | boolean | null | undefined;
}
export interface UseHttpRequestReturn {
    apiCall: (endpoint: string, id: number | string | null, data: unknown, method: "get" | "post" | "put" | "delete", contentType: "application/json" | "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain" | "application/xml", params?: Record<string, string | number>) => Promise<void>;
    apiResponse: unknown;
    userFound: boolean;
    error: string | null;
    isLoading: boolean;
    SentryWarning: (message: string, context?: Record<string, unknown>) => void;
    SentryError: (message: string, error: Error, context?: Record<string, unknown>) => void;
    SentryInfo: (message: string, context?: Record<string, unknown>) => void;
    SentryEvent: (eventName: string, data: Record<string, unknown>, level?: "info" | "warning" | "error") => void;
}
export type UseTargetHandlerReturn<T extends FormValues> = [
    target: T,
    handleTarget: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
    handleSubmit: (callback: (data: T) => void | Promise<void>) => (e: React.FormEvent) => Promise<void>,
    errors: FormErrors,
    httpRequest: UseHttpRequestReturn,
    apiUrl: string | undefined
];
declare const useTargetHandler: <T extends FormValues = FormValues>(initialValues: T, validationRulesOrSchema?: ValidationRules | any, Storage?: StorageConfig, security?: SecurityConfig) => UseTargetHandlerReturn<T>;
export default useTargetHandler;
