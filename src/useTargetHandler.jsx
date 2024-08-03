import { useState } from "react";
import PropTypes from "prop-types";

const validateRules = (name, value, rules) => {
  if (rules.required) {
    if (!value.trim()) {
      return rules.requiredMessage || `${name} ${value} es obligatorio 🚨`;
    }
    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.patternMessage || `${name} no es válido ❌`;
    }
  }
  return "";
};

/**
 * Hook personalizado para la gestión del estado y la validación de formularios en aplicaciones React.
 *
 * Este hook proporciona una solución integral para manejar el estado de los campos de un formulario,
 * realizar validaciones basadas en reglas personalizadas y almacenar los datos en `localStorage` o
 * `sessionStorage`. Facilita la creación de formularios dinámicos y la gestión de errores de validación.
 *
 * @param {Object} initialValues - Un objeto que define los valores iniciales para los campos del formulario.
 *                                 Cada clave representa el nombre de un campo y su valor el valor inicial.
 *                                 Por defecto, se inicializa con un objeto vacío.
 * @param {Object} validationRules - Un objeto que define las reglas de validación para cada campo del formulario.
 *                                  Cada clave representa el nombre de un campo y su valor es un objeto que
 *                                  especifica las reglas de validación. Las reglas admitidas incluyen:
 *                                  - `required`: Indica si el campo es obligatorio.
 *                                  - `requiredMessage`: Mensaje de error personalizado para campos obligatorios.
 *                                  - `pattern`: Expresión regular para validar el formato del campo.
 *                                  - `patternMessage`: Mensaje de error personalizado para validación de patrón.
 * @param {string|null} storageType - Tipo de almacenamiento a utilizar. Puede ser "local" para `localStorage`,
 *                                    "session" para `sessionStorage`, o `null` para no utilizar almacenamiento.
 *                                    Por defecto, es `null`.
 * @param {string} storageKey - Clave bajo la cual se almacenarán los datos del formulario en el almacenamiento.
 *                              Por defecto, se utiliza "formData".
 *
 * `Principales parametros del Hook`: target, handleTarget, handleSubmit, errors
 *
 * @returns {[Object, Function, Function, Object]} - Un array que contiene:
 *   - `target`: Un objeto que representa los valores actuales del formulario.
 *   - `handleTarget`: Función que se invoca al cambiar el valor de un campo del formulario.
 *                     Actualiza el estado del formulario con el nuevo valor.
 *   - `handleSubmit`: Función que se invoca al enviar el formulario. Realiza la validación de los campos
 *                     según las reglas proporcionadas y, si no hay errores, guarda los datos en el almacenamiento
 *                     y llama a la función de callback.
 *   - `errors`: Objeto que contiene los mensajes de error de validación para cada campo del formulario.
 *
 * Ejemplo de uso:
 * const { target, handleTarget, handleSubmit, errors } = useTargetHandler(
 *   { nombre: "", apellido: "" },
 *   {
 *     nombre: { required: true, requiredMessage: "El nombre es obligatorio" },
 *     apellido: { required: true, pattern: /^[a-zA-Z]+$/, patternMessage: "El apellido solo debe contener letras" }
 *   },
 *   "local",
 *   "formData"
 * );
 */

const useTargetHandler = (
  initialValues = {
    target,
    handleTarget,
    handleSubmit,
    errors,
  },
  validationRules = {},
  storageType = null,
  storageKey = "formData"
) => {
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

  const handleTarget = (e) => {
    const { name, value } = e.target;
    if (!name) return;
    setTarget((prevForm) => ({
      ...prevForm,
      [name]: value.trim() === "" ? `${name}` : value,
      [name]: value || "",
    }));
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    const newError = Object.entries(target).reduce((acc, [key, value]) => {
      value.trim() === "" &&
        (acc[key] = { message: `${key} no puede estar vacio` });
      return acc;
    }, {});

    Object.entries(target).forEach(([key, value]) => {
      const rules = validationRules[key] || {};
      const error = validateRules(key, value, rules);
      if (error) {
        newError[key] = { message: error };
      }
    });

    Object.keys(newError).length > 0
      ? (setErrors(newError), console.log("Errores encontrados:", newError))
      : (console.log("Enviar datos:", target),
        storage && storage.setItem(storageKey, JSON.stringify(target)),
        setTarget(initialValues),
        setErrors({})),
      callback(target);
  };

  return [target, handleTarget, handleSubmit, errors];
};

useTargetHandler.prototype = {
  handleTarget: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  validationRules: PropTypes.object,
  storageType: PropTypes.oneOf(["session", "local"]),
  storageKey: PropTypes.string,
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
