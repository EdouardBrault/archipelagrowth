
import { useState } from 'react';

export const useEmailValidation = () => {
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(email);
    setIsValid(valid);
    return valid;
  };

  return { isValid, validateEmail };
};
