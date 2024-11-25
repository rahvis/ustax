// eslint-disable-next-line
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PDFDocument } from 'pdf-lib'
import { useFormContext } from '../FormContext'

const PdfDownloadButton = () => {
  const { formData } = useFormContext()

  const extractFieldNames = async () => {
    const url = '/newPDF/w7.pdf'

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const existingPdfBytes = await response.arrayBuffer()
      // console.log(
      //   'PDF fetched successfully, byte length:',
      //   existingPdfBytes.byteLength
      // )
      const pdfDoc = await PDFDocument.load(existingPdfBytes)
      const form = pdfDoc.getForm()

      const fields = form.getFields()
      fields.forEach((field) => {
        const type = field.constructor.name
        const name = field.getName()
        console.log(`${type}: ${name}`)
      })
    } catch (error) {
      console.error('Error fetching PDF:', error.message)
      return null // Exit gracefully if the fetch fails
    }
  }

  const generatePdf = async () => {
    const url = '/newPDF/w7.pdf'

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const existingPdfBytes = await response.arrayBuffer()

      const pdfDoc = await PDFDocument.load(existingPdfBytes)

      const form = pdfDoc.getForm()

      const fieldMappings = {
        'dependent relationship': formData.dependentRelationship || 'Parent',
        'dependent name': formData.dependentName || 'John Doe',
        'reason - other information': formData.reason || 'N/A',
        'treaty country': formData.treatyCountry || 'United States',
        'treaty article number': formData.treatyArticleNumber || 'Article 18',
        'first name': formData.firstName || 'Jane',
        'middle name': formData.middleName || 'A.',
        'last name': formData.lastName || 'Smith',
        'birth first name': formData.birthFirstName || 'Jane',
        'birth middle name': formData.birthMiddleName || 'Ann',
        'birth last name': formData.birthLastName || 'Doe',
        'street address': formData.streetAddress || '123 Main Street',
        'city state and zip': formData.cityStateAndZip || 'Anytown, USA 12345',
        'foreign street address':
          formData.foreignStreetAddress || '456 International Road',
        'foreign city state and zip':
          formData.foreignCityStateAndZip || 'Paris, France 75000',
        'date of birth': formData.dateOfBirth || '01012000',
        'country of birth': formData.countryOfBirth || 'United States',
        'City and state or province':
          formData.cityAndStateOrProvince || 'Anytown, USA',
        'country(ies) of citizenship':
          formData.countriesOfCitizenship || 'United States',
        'foreign tax id': formData.foreignTaxId || '123-45-6789',
        'type of visa number and expiration':
          formData.visaDetails || 'H1B, 987654, 12312025',
        'delegate name': formData.delegateName || 'Agent Name',
        'college/university/company': formData.organization || 'ABC University',
        'city/state college/university/company':
          formData.orgCityState || 'New York, NY',
        'length of stay': formData.lengthOfStay || '2 Years',
        'phone number': formData.phoneNumber || '(123) 456-7890',
        'other identification document details':
          formData.otherIdDetails || 'Passport',
        'issued by': formData.issuedBy || 'United States',
        'document number': formData.documentNumber || '987654321',
        'expiration date': formData.documentExpirationDate || '12312030',
        'itin first 3': formData.itinFirst3 || '123',
        'itin next': formData.itinNext || '45',
        'itin last': formData.itinLast || '6789',
        'irsn first': formData.irsnFirst || '987',
        'irsn next': formData.irsnNext || '65',
        'irsn last': formData.irsnLast || '4321',
        'itin prev name': formData.itinPrevName || 'Previous Name',
        'itin prev middle': formData.itinPrevMiddle || 'Middle',
        'itin prev last': formData.itinPrevLast || 'Last',
        'us date of entry (mm/dd/yyyy)': formData.usDateOfEntry || '01012020',
        'sign date mm': formData.signDateMM || '01',
        'sign date dd': formData.signDateDD || '01',
        'sign date year': formData.signDateYear || '2024',

        Group1: formData.group1 || false,
        Group2: formData.group2 || false,
        Group3: formData.group3 || false,
        Group4: formData.group4 || true,
        Group5: formData.group5 || true,
        Group7: formData.group7 || true
      }

      // Dynamically set text fields
      Object.entries(fieldMappings).forEach(([fieldName, value]) => {
        const field = form.getField(fieldName)

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!field) {
          console.warn(`Field "${fieldName}" not found in the PDF.`)
          return // Ensure no further operations on an invalid field
        }

        if (field.constructor.name === 'PDFTextField') {
          field.setText(value)
        } else if (field.constructor.name === 'PDFCheckBox') {
          field.check(value === true)
        } else {
          console.warn(
            `Unhandled field type for "${fieldName}":`,
            field.constructor.name
          )
        }
      })

      // Save and download the PDF
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'filled_fw7.pdf'
      link.click()
    } catch (error) {
      console.error('Error fetching PDF:', error.message)
      return null // Exit gracefully if the fetch fails
    }
  }

  return (
    <div>
      <button
        className="form-submit"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => extractFieldNames()} // To debug field names
      >
        Extract Field Names
      </button>
      <button
        className="form-submit"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={generatePdf} // To generate and download the filled PDF
      >
        Download PDF
      </button>
    </div>
  )
}

export default PdfDownloadButton
