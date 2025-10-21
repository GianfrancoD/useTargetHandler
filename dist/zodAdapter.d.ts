/**
 * @module zodAdapter
 */
import type { z } from "zod";
import type { ValidationRules, FormValues } from "./useTargetHandler";
/**
 * @param schema - Schema de Zod
 * @returns ValidationRules compatible con useTargetHandler
 */
export declare function zodAdapter<T extends z.ZodType>(schema: T): ValidationRules;
/**
 * @param schema - Schema de Zod
 * @param data - Datos a validar
 * @returns Objeto con errores o null si es válido
 */
export declare function validateWithZod<T extends FormValues>(schema: z.ZodType, data: T): Record<string, {
    message: string;
}> | null;
export type ZodInfer<T extends z.ZodType> = z.infer<T>;
export declare function createZodValidationRules<T extends z.ZodType>(schema: T): ValidationRules;
