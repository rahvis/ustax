import React, { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext();

// eslint-disable-next-line react/prop-types
export const FormProvider = ({ children }) => {
  // Initialize formData from localStorage if available
  const initialData = JSON.parse(localStorage.getItem("formData")) || {};
  const [formData, setFormData] = useState(initialData);

  // Update localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (newData) => {
    setFormData((prev) => {
      const updatedData = { ...prev, ...newData };
      localStorage.setItem("formData", JSON.stringify(updatedData));
      return updatedData;
    });
  };
  
  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const useFormContext = () => useContext(FormContext);
