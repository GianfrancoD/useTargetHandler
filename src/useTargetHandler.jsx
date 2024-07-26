import { useState } from "react";
import PropTypes from "prop-types";

const useTargetHandler = (
  initialValues = { target, setTarget, handleSubmit, errors }
) => {
  const [target, setTarget] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleTarget = (e) => {
    const { name, value } = e.target;
    if (!name && !value) return;
    setTarget((prevForm) => ({
      ...prevForm,
      [name]: value.trim() === "" ? `${name}` : undefined,
      [name]: value || "",
    }));
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    const newError = Object.entries(target).reduce((acc, [key, value]) => {
      value.trim() === "" && (acc[key] = `${key} no se puede estar vacio`);
      return acc;
    }, {});
    Object.keys(newError).length > 0
      ? (setErrors(newError), console.log("Errores encontrados:", newError))
      : callback(target);
    if (Object.keys(newError).length === 0) {
      console.log("Enviar datos:", target);
      setTarget(initialValues);
      setErrors({});
    }
  };

  return [target, handleTarget, handleSubmit, errors];
};

useTargetHandler.prototype = {
  handleTarget: PropTypes.func.isRequired,
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
