import { useState } from "react";

interface UseTargetHandler<T> {
  target: T;
  handleTarget: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (
    callback: (data: T) => void
  ) => (e: React.FormEvent<HTMLFormElement>) => void;
}

const useTargetHandler = <T extends { [key: string]: any }>(
  initialValues: T
): UseTargetHandler<T> => {
  const [target, setTarget] = useState<T>(initialValues);

  const handleTarget = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!name && !value) return;
    setTarget((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit =
    (callback: (data: T) => void) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Enviar datos:", target);
      callback(target);
      setTarget(initialValues);
    };

  return { target, handleTarget, handleSubmit };
};

export default useTargetHandler;
