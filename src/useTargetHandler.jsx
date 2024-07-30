import { useState } from "react";
import PropTypes from "prop-types";

const useTargetHandler = (
  initialValues = {
    target,
    setTarget,
    handleSubmit,
    errors,
  },
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
      value.trim() === "" && (acc[key] = `${key} no puede estar vacio`);
      return acc;
    }, {});
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
