declare module "usehttprequest" {
  export interface UseHttpRequestReturn {
    apiCall: (
      endpoint: string,
      id: number | string | null,
      data: unknown,
      method: "get" | "post" | "put" | "delete",
      contentType:
        | "application/json"
        | "application/x-www-form-urlencoded"
        | "multipart/form-data"
        | "text/plain"
        | "application/xml",
      params?: Record<string, string | number>
    ) => Promise<void>;
    apiResponse: unknown;
    userFound: boolean;
    error: string | null;
    isLoading: boolean;
    SentryWarning: (message: string, context?: Record<string, unknown>) => void;
    SentryError: (
      message: string,
      error: Error,
      context?: Record<string, unknown>
    ) => void;
    SentryInfo: (message: string, context?: Record<string, unknown>) => void;
    SentryEvent: (
      eventName: string,
      data: Record<string, unknown>,
      level?: "info" | "warning" | "error"
    ) => void;
  }

  function useHttpRequest(enableCSRF?: boolean): UseHttpRequestReturn;

  export default useHttpRequest;
}
