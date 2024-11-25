/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./FormComponent.css";
import { useFormContext } from "../FormContext";
import { Link } from "react-router-dom";

const FormComponent = () => {
  const { register, handleSubmit } = useForm();
  const { updateFormData } = useFormContext(); // Use context API

  const [view, setView] = useState(false);

  // Text field mappings
  const fieldMappings = {
    theUndersigned: "The Undersigned (Responsible Party)",
    businessName: "Business Name",
    datedMonth: "Dated Month",
    datedDay: "Dated Day",
    datedYear: "Dated Year",
    applicantsName: "Applicant's Name",
    Partnership_Agreement_of: "Partnership Agreement of",
    EIN: "EIN",
    signatureResponsibleParty: "Signature of Responsible Party",
    dateResponsibleParty: "Date (Responsible Party)",
    acceptanceAgentEIN: "Acceptance Agent EIN",
    agentCode: "Acceptance Agent Office Code",
    agentPTIN: "Acceptance Agent PTIN",
  };

  // Grouped checkbox mappings
  const groupedCheckboxMappings = [
    {
      label: "Passport (Stand Alone Document)*",
      identity: "identityRow1",
      foreignStatus: "foreignStatusRow1",
    },
    {
      label: "National Identification Card",
      identity: "identityRow2",
      foreignStatus: "foreignStatusRow2",
    },
    {
      label: "United States Drivers License",
      identity: "identityRow3",
      foreignStatus: "foreignStatusRow3",
    },
    {
      label: "Civil Birth Certificate",
      identity: "identityRow4",
      foreignStatus: "foreignStatusRow4",
    },
    {
      label: "Medical Records",
      identity: "identityRow5",
      foreignStatus: "foreignStatusRow5",
    },
    {
      label: "Foreign Drivers License",
      identity: "identityRow6",
      foreignStatus: "foreignStatusRow6",
    },
    {
      label: "United States State Identification Card",
      identity: "identityRow7",
      foreignStatus: "foreignStatusRow7",
    },
    {
      label: "Foreign Voters Registration Card",
      identity: "identityRow8",
      foreignStatus: "foreignStatusRow8",
    },
    {
      label: "United States Military Identification Card",
      identity: "identityRow9",
      foreignStatus: "foreignStatusRow9",
    },
    {
      label: "Foreign Military Identification Card",
      identity: "identityRow10",
      foreignStatus: "foreignStatusRow10",
    },
    {
      label: "School Records",
      identity: "identityRow11",
      foreignStatus: "foreignStatusRow11",
    },
    {
      label: "Visa issued by United States Department of State",
      identity: "identityRow12",
      foreignStatus: "foreignStatusRow12",
    },
    {
      label: "USCIS",
      identity: "identityRow13",
      foreignStatus: "foreignStatusRow13",
    },
  ];

  // Form submission handler
  const onSubmit = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    updateFormData(data);
    window.location.replace("/income/f1099s");
  };

  return (
    <>
      <h2>W7 COA Information</h2>
      {view ? (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          {/* Render text fields */}
          {Object.entries(fieldMappings)
            .slice(0, 6)
            .map(([fieldName, label]) => (
              <div key={fieldName} className="form-field">
                <label className="form-label">
                  {label}:
                  <input
                    type="text"
                    className="form-input"
                    placeholder={label}
                    {...register(fieldName)}
                  />
                </label>
              </div>
            ))}

          {/* Render grouped checkboxes */}
          {groupedCheckboxMappings.map(({ label, identity, foreignStatus }) => (
            <div key={label} className="form-field">
              <label className="form-label">
                <div className="checkbox-group">
                  <div style={{ width: 200 }}>{label}: </div>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      {...register(identity)}
                    />
                    Identity
                  </label>
                  {foreignStatus !== "foreignStatusRow3" &&
                  foreignStatus !== "foreignStatusRow6" &&
                  foreignStatus !== "foreignStatusRow7" &&
                  foreignStatus !== "foreignStatusRow9" ? (
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        {...register(foreignStatus)}
                      />
                      Foreign Status
                    </label>
                  ) : null}
                </div>
              </label>
            </div>
          ))}
          <div className="form-field">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="form-checkbox"
                {...register("theUndersignedFurther")}
              />
              The Undersigned Further Cert
            </label>
          </div>

          {Object.entries(fieldMappings)
            .slice(6, 13)
            .map(([fieldName, label]) => (
              <div key={fieldName} className="form-field">
                <label className="form-label">
                  {label}:
                  <input
                    type="text"
                    className="form-input"
                    {...register(fieldName)}
                  />
                </label>
              </div>
            ))}

          <button
            className="PREVIOUS"
            style={{
              marginBlock: 5,
            }}
            onClick={() => setView(!view)}
          >
            DISCORD
          </button>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link to={"/income/w7jobinfo"}>
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
            <Link to={"/income/w7jobinfo"}>
              <button className="PREVIOUS">PREVIOUS</button>
            </Link>
            <button
              onClick={() => window.location.replace("/income/f1099s")}
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
