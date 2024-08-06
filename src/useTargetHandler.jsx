import { useState } from "react";
import PropTypes from "prop-types";
import { useHttpRequest } from "usehttprequest";

const validateRules = (name, value, rules, target) => {
  return rules.required
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
      : typeof value === "string" &&
        value.length > 0 &&
        rules.min &&
        value.length < rules.min
      ? rules.minMessage || `${name} debe ser al menos ${rules.min}`
      : typeof value === "string" &&
        value.length > 0 &&
        rules.max &&
        value.length > rules.max
      ? rules.maxMessage || `${name} no puede ser mayor que ${rules.max}`
      : rules.checked && !value
      ? rules.checkedMessage || `Debes aceptar ${name}`
      : rules.selected && !value
      ? rules.selectedMessage || `Debes seleccionar ${name}`
      : ""
    : "";
};

/**
 * Hook personalizado para la gestión del estado, validación de formularios y llamadas a una API en aplicaciones React.
 *
 * Este hook proporciona una solución integral para manejar el estado de los campos de un formulario,
 * realizar validaciones basadas en reglas personalizadas, almacenar datos de manera persistente y
 * hacer llamadas HTTP a una API utilizando Axios. También maneja automáticamente la URL de la API
 * a través de variables de entorno.
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
 *                                  - `minLength`: Verifica que la longitud del valor ingresado sea al menos la mínima especificada.
 *                                  - `maxLength`: Verifica que la longitud del valor ingresado no exceda la máxima especificada.
 *                                  - `matches`: Verifica que el valor de un campo coincida con el valor de otro campo.
 *                                  - `matchMessage`: Mensaje de error personalizado si los valores no coinciden.
 *                                  - `min`: Verifica que el valor ingresado sea mayor o igual al mínimo especificado.
 *                                  - `max`: Verifica que el valor ingresado no sea mayor que el máximo especificado.
 *                                  - `checked`: Verifica que el checkbox esté marcado.
 *                                  - `checkedMessage`: Mensaje de error si el checkbox no está marcado.
 *                                  - `selected`: Verifica que al menos un botón de radio en un grupo esté seleccionado.
 *                                  - `selectedMessage`: Mensaje de error si no se selecciona ningún botón de radio.
 * @param {string|null} storageType - Tipo de almacenamiento a utilizar. Puede ser "local" para `localStorage`,
 *                                    "session" para `sessionStorage`, o `null` para no utilizar almacenamiento.
 *                                    Por defecto, es `null`.
 * @param {string} storageKey - Clave bajo la cual se almacenarán los datos del formulario en el almacenamiento.
 *                              Por defecto, se utiliza "formData".
 *
 * `Principales parámetros del Hook`: target, handleTarget, handleSubmit, errors, { apiCall, apiResponse, userFound, error }, apiUrl
 *
 * @returns {[Object, Function, Function, Object, Object]} - Un array que contiene:
 *   - `target`: Un objeto que representa los valores actuales del formulario.
 *   - `handleTarget`: Función que se invoca al cambiar el valor de un campo del formulario.
 *                     Actualiza el estado del formulario con el nuevo valor.
 *   - `handleSubmit`: Función que se invoca al enviar el formulario. Realiza la validación de los campos
 *                     según las reglas proporcionadas y, si no hay errores, guarda los datos en el almacenamiento
 *                     y llama a la función de callback.
 *   - `errors`: Objeto que contiene los mensajes de error de validación para cada campo del formulario.
 *   - `apiCall`: Función que se utiliza para hacer llamadas a la API. Recibe los siguientes parámetros:
 *     - `endpoint`: Ruta del endpoint al que se realizará la llamada (por ejemplo, '/users').
 *     - `id`: ID opcional del recurso (por ejemplo, '/users/123').
 *     - `data`: Datos opcionales a enviar en el cuerpo de la solicitud (para POST, PUT, etc.).
 *     - `method`: Método HTTP a utilizar ('get', 'post', 'put', 'delete').
 *     - `http`: Tipo de contenido HTTP ('application/json', 'application/x-www-form-urlencoded', etc.).
 *   - `apiResponse`: Objeto que contiene la respuesta de la última llamada a la API.
 *   - `userFound`: Booleano que indica si se encontró un usuario en la última llamada a la API.
 *   - `error`: Mensaje de error de la última llamada a la API, si hubo algún error.
 *   - `apiUrl`: URL base de la API a la que se realizarán las llamadas. Si no se proporciona, se intentará obtener de las variables de entorno
 *              en el siguiente orden: `VITE_API_URL`, `REACT_APP_API_URL`, `NEXT_PUBLIC_API_URL`.
 *
 * Ejemplo de uso:
 * const { target, handleTarget, handleSubmit, errors, { apiCall, apiResponse, userFound, error }, apiUrl } = useTargetHandler(
 *   { nombre: "", apellido: "" },
 *   {
 *     nombre: { required: true, requiredMessage: "El nombre es obligatorio" },
 *     apellido: { required: true, pattern: /^[a-zA-Z]+$/, patternMessage: "El apellido solo debe contener letras" }
 *   },
 *   "local",
 *   "formData"
 * );
 */

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
  storageType = null,
  storageKey = "formData"
) => {
  const { apiCall, apiResponse, userFound, error, params } = useHttpRequest();
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
    const { name, type, checked, value } = e.target;
    if (!name) return;
    setTarget((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    const newError = Object.entries(target).reduce((acc, [key, value]) => {
      typeof value === "string" && value.trim() === "" && !key.includes("terms")
        ? (acc[key] = { message: `${key} no puede estar vacio` })
        : null;
      return acc;
    }, {});

    Object.entries(target).forEach(([key, value]) => {
      const rules = validationRules[key] || {};
      const error = validateRules(key, value, rules, target);
      if (error) {
        newError[key] = { message: error };
      }
    });

    Object.keys(newError).length > 0
      ? (setErrors(newError), console.log("Errores encontrados:", newError))
      : (async () => {
          console.log("Enviar datos:", target);
          storage && storage.setItem(storageKey, JSON.stringify(target));
          setTarget(initialValues);
          setErrors({});
          callback(target);
        })();
  };

  return [
    target,
    handleTarget,
    handleSubmit,
    errors,
    { apiCall, apiResponse, userFound, error, params },
    apiUrl,
  ];
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
