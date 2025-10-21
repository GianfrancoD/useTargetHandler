/**
 * @module zodAdapter
 */

import type { z } from "zod";
import type { ValidationRules, FormValues } from "./useTargetHandler";

/**
 * @param schema - Schema de Zod
 * @returns ValidationRules compatible con useTargetHandler
 */
export function zodAdapter<T extends z.ZodType>(schema: T): ValidationRules {
  if (typeof schema === "undefined") {
    throw new Error(
      "Zod no está instalado. Ejecuta: npm install zod\n" +
        "O usa validaciones nativas de useTargetHandler."
    );
  }

  const validationRules: ValidationRules = {
    _zodSchema: schema as any,
    _zodValidate: true as any,
  };

  return validationRules;
}

/**
 * @param schema - Schema de Zod
 * @param data - Datos a validar
 * @returns Objeto con errores o null si es válido
 */
export function validateWithZod<T extends FormValues>(
  schema: z.ZodType,
  data: T
): Record<string, { message: string }> | null {
  try {
    schema.parse(data);
    return null;
  } catch (error) {
    if (error instanceof Error && "issues" in error) {
      const zodError = error as z.ZodError;
      const errors: Record<string, { message: string }> = {};

      zodError.issues.forEach((issue: z.ZodIssue) => {
        const path = issue.path.join(".");
        if (path) {
          errors[path] = { message: issue.message };
        }
      });

      return errors;
    }

    return { _form: { message: "Error de validación desconocido" } };
  }
}

export type ZodInfer<T extends z.ZodType> = z.infer<T>;

export function createZodValidationRules<T extends z.ZodType>(
  schema: T
): ValidationRules {
  return zodAdapter(schema);
}
