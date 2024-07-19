import { useState } from "react";
import PropTypes from "prop-types";

const useTargetHandler = (
  initialValues = { target, setTarget, handleSubmit }
) => {
  const [target, setTarget] = useState(initialValues);

  const handleTarget = (e) => {
    const { name, value } = e.target;
    if (!name && !value) return;
    setTarget((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    console.log("Enviar datos:", target);
    callback(target);
    setTarget(initialValues);
  };

  return [target, handleTarget, handleSubmit];
};

export default useTargetHandler;

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
