import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

// eslint-disable-next-line react/prop-types
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  const updateFormData = (newData) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const useFormContext = () => useContext(FormContext);
