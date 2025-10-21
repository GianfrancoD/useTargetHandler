import { UseHttpRequestReturn } from "./useTargetHandler";

// Helper para obtener useHttpRequest de forma opcional
export const getUseHttpRequest = (): ((enableCSRF?: boolean) => UseHttpRequestReturn) | null => {
  try {
    // Intentar importar usehttprequest
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const httpModule = require("usehttprequest");
    return httpModule.useHttpRequest || httpModule.default || null;
  } catch {
    // Si falla, retornar null (el módulo no está instalado)
    return null;
  }
};

// Valores por defecto cuando useHttpRequest no está disponible
export const createDefaultHttpRequest = (): UseHttpRequestReturn => ({
  apiCall: async () => {},
  apiResponse: null,
  userFound: false,
  error: null,
  isLoading: false,
  SentryWarning: () => {},
  SentryError: () => {},
  SentryInfo: () => {},
  SentryEvent: () => {},
});
