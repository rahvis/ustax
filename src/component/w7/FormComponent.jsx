/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import { useForm } from 'react-hook-form'
import { useFormContext } from '../FormContext' // Import the context
import './FormComponent.css'

const FormComponent = () => {
  const { register, handleSubmit } = useForm()
  const { updateFormData } = useFormContext() // Use context API

  const onSubmit = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    updateFormData(data) // Update form data in context
  }

  const fieldMappings = {
    dependentRelationship: 'Dependent Relationship',
    dependentName: 'Dependent Name',
    reason: 'Reason (Other Information)',
    treatyCountry: 'Treaty Country',
    treatyArticleNumber: 'Treaty Article Number',
    firstName: 'First Name',
    middleName: 'Middle Name',
    lastName: 'Last Name',
    birthFirstName: 'Birth First Name',
    birthMiddleName: 'Birth Middle Name',
    birthLastName: 'Birth Last Name',
    streetAddress: 'Street Address',
    cityStateAndZip: 'City, State, and ZIP',
    foreignStreetAddress: 'Foreign Street Address',
    foreignCityStateAndZip: 'Foreign City, State, and ZIP',
    dateOfBirth: 'Date of Birth',
    countryOfBirth: 'Country of Birth',
    cityAndStateOrProvince: 'City and State or Province',
    countriesOfCitizenship: 'Country(ies) of Citizenship',
    foreignTaxId: 'Foreign Tax ID',
    visaDetails: 'Visa Type, Number, and Expiration',
    delegateName: 'Delegate Name',
    organization: 'College/University/Company',
    orgCityState: 'City/State of College/University/Company',
    lengthOfStay: 'Length of Stay',
    phoneNumber: 'Phone Number',
    otherIdDetails: 'Other ID Document Details',
    issuedBy: 'Issued By',
    documentNumber: 'Document Number',
    documentExpirationDate: 'Document Expiration Date',
    itinFirst3: 'ITIN (First 3 Digits)',
    itinNext: 'ITIN (Next Digits)',
    itinLast: 'ITIN (Last Digits)',
    irsnFirst: 'IRSN (First 3 Digits)',
    irsnNext: 'IRSN (Next Digits)',
    irsnLast: 'IRSN (Last Digits)',
    itinPrevName: 'Previous ITIN Name',
    itinPrevMiddle: 'Previous ITIN Middle Name',
    itinPrevLast: 'Previous ITIN Last Name',
    usDateOfEntry: 'US Date of Entry (MM/DD/YYYY)',
    signDateMM: 'Signature Date (Month)',
    signDateDD: 'Signature Date (Day)',
    signDateYear: 'Signature Date (Year)'
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      {Object.entries(fieldMappings).map(([fieldName, label]) => (
        <div key={fieldName} className="form-field">
          <label className="form-label">
            {label}:
            {fieldName === 'dateOfBirth' ||
            fieldName === 'documentExpirationDate' ||
            fieldName === 'usDateOfEntry' ? (
              <input
                type="date"
                className="form-input"
                {...register(fieldName, { required: true })}
              />
            ) : (
              <input
                type="text"
                className="form-input"
                placeholder={fieldName}
                {...register(fieldName, { required: true })}
              />
            )}
          </label>
        </div>
      ))}
      <button type="submit" className="form-submit">
        Save Data
      </button>
    </form>
  )
}

export default FormComponent
