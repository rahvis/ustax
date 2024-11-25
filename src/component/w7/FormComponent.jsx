/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useFormContext } from "../FormContext"; // Import the context
import "./FormComponent.css";
import { Link } from "react-router-dom";

const FormComponent = () => {
  const { register, handleSubmit } = useForm();
  const { updateFormData } = useFormContext(); // Use context API
  const [view, setView] = useState(false);

  const onSubmit = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    updateFormData(data); // Update form data in context
    window.location.replace("/income/w2COAsjobinfo");
  };

  const fieldMappings = {
    dependentRelationship: "Dependent Relationship",
    dependentName: "Dependent Name",
    reason: "Reason (Other Information)",
    treatyCountry: "Treaty Country",
    treatyArticleNumber: "Treaty Article Number",
    firstName: "First Name",
    middleName: "Middle Name",
    lastName: "Last Name",
    birthFirstName: "Birth First Name",
    birthMiddleName: "Birth Middle Name",
    birthLastName: "Birth Last Name",
    streetAddress: "Street Address",
    cityStateAndZip: "City, State, and ZIP",
    foreignStreetAddress: "Foreign Street Address",
    foreignCityStateAndZip: "Foreign City, State, and ZIP",
    dateOfBirth: "Date of Birth",
    countryOfBirth: "Country of Birth",
    cityAndStateOrProvince: "City and State or Province",
    countriesOfCitizenship: "Country(ies) of Citizenship",
    foreignTaxId: "Foreign Tax ID",
    visaDetails: "Visa Type, Number, and Expiration",
    delegateName: "Delegate Name",
    organization: "College/University/Company",
    orgCityState: "City/State of College/University/Company",
    lengthOfStay: "Length of Stay",
    phoneNumber: "Phone Number",
    otherIdDetails: "Other ID Document Details",
    issuedBy: "Issued By",
    documentNumber: "Document Number",
    documentExpirationDate: "Document Expiration Date",
    itinFirst3: "ITIN (First 3 Digits)",
    itinNext: "ITIN (Next Digits)",
    itinLast: "ITIN (Last Digits)",
    irsnFirst: "IRSN (First 3 Digits)",
    irsnNext: "IRSN (Next Digits)",
    irsnLast: "IRSN (Last Digits)",
    itinPrevName: "Previous ITIN Name",
    itinPrevMiddle: "Previous ITIN Middle Name",
    itinPrevLast: "Previous ITIN Last Name",
    usDateOfEntry: "US Date of Entry (MM/DD/YYYY)",
    signDateMM: "Signature Date (Month)",
    signDateDD: "Signature Date (Day)",
    signDateYear: "Signature Date (Year)",
  };

  return (
    <>
      <h2>W7 Information</h2>
      {view ? (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          {Object.entries(fieldMappings).map(([fieldName, label]) => (
            <div key={fieldName} className="form-field">
              <label className="form-label">
                {label}:
                {fieldName === "dateOfBirth" ||
                fieldName === "documentExpirationDate" ||
                fieldName === "usDateOfEntry" ? (
                  <input
                    type="date"
                    className="form-input"
                    {...register(fieldName)}
                  />
                ) : (
                  <input
                    type="text"
                    className="form-input"
                    {...register(fieldName)}
                  />
                )}
              </label>
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link to={"/income/w2jobinfo"}>
              <button className="PREVIOUS">PREVIOUS</button>
            </Link>
            <button type="submit" className="SAVE">
              SAVE AND CONTINUE
            </button>
          </div>
        </form>
      ) : (
        <div>
          <button
            className="PREVIOUS"
            style={{
              marginBlock: 5,
            }}
            onClick={() => setView(!view)}
          >
            ADD
          </button>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link to={"/income/w2jobinfo"}>
              <button className="PREVIOUS">PREVIOUS</button>
            </Link>
            <button
              onClick={() => window.location.replace("/income/w2COAsjobinfo")}
              className="SAVE"
            >
              SAVE AND CONTINUE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormComponent;
