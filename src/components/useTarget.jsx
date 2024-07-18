import { useState } from "react";
import PropTypes from "prop-types";

const useTarget = (initialValues = { target, setTarget, handleSubmit }) => {
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

export default useTarget;

useTarget.prototype = {
  handleTarget: PropTypes.func.isRequired,
};

useTarget.prototype.handleTarget.propTypes = {
  target: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
};

useTarget.prototype.handleTarget.propTypes.event.propTypes = {
  target: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
};
