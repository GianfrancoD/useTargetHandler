import { useState } from "react";

interface Target {
  [key: string]: any;
}

interface UseTargetHandler {
  target: Target;
  handleTarget: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (
    callback: (data: Target) => void
  ) => (e: React.FormEvent<HTMLFormElement>) => void;
}

const useTargetHandler = (initialValues: {
  [key: string]: string;
}): UseTargetHandler => {
  const [target, setTarget] = useState<Target>(initialValues);

  const handleTarget = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!name && !value) return;
    setTarget((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit =
    (callback: (data: { [key: string]: string }) => void) =>
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Enviar datos:", target);
      callback(target);
      setTarget(initialValues);
    };

  return { target, handleTarget, handleSubmit };
};

export default useTargetHandler;
