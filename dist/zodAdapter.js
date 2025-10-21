/**
 * @module zodAdapter
 */
/**
 * @param schema - Schema de Zod
 * @returns ValidationRules compatible con useTargetHandler
 */
export function zodAdapter(schema) {
    if (typeof schema === "undefined") {
        throw new Error("Zod no está instalado. Ejecuta: npm install zod\n" +
            "O usa validaciones nativas de useTargetHandler.");
    }
    const validationRules = {
        _zodSchema: schema,
        _zodValidate: true,
    };
    return validationRules;
}
/**
 * @param schema - Schema de Zod
 * @param data - Datos a validar
 * @returns Objeto con errores o null si es válido
 */
export function validateWithZod(schema, data) {
    try {
        schema.parse(data);
        return null;
    }
    catch (error) {
        if (error instanceof Error && "issues" in error) {
            const zodError = error;
            const errors = {};
            zodError.issues.forEach((issue) => {
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
export function createZodValidationRules(schema) {
    return zodAdapter(schema);
}
