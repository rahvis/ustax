// eslint-disable-next-line
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */ 
import { useFormContext } from '../FormContext'
import { PDFDocument } from 'pdf-lib'

const PdfDownloadButton = () => {
  const { formData } = useFormContext() // Use form data from context

  const extractFieldNames = async () => {
    const url = '/newPDF/w7coa.pdf'

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

  // Generate and download the filled PDF
  const generatePdf = async () => {
    const url = '/newPDF/w7coa.pdf'

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const existingPdfBytes = await response.arrayBuffer()
      const pdfDoc = await PDFDocument.load(existingPdfBytes)
  
      const form = pdfDoc.getForm()
  
      // Field mappings: Update with your field names and form data
      const fieldMappings = {
        'topmostSubform[0].page1[0].theUndersigned[0]':
          formData.theUndersigned || 'John Doe',
        'topmostSubform[0].page1[0].businessName[0]':
          formData.businessName || 'Sample Business',
        'topmostSubform[0].page1[0].datedMonth[0]': formData.datedMonth || '01',
        'topmostSubform[0].page1[0].datedDay[0]': formData.datedDay || '01',
        'topmostSubform[0].page1[0].datedYear[0]': formData.datedYear || '24',
        'topmostSubform[0].page1[0].applicantsName[0]':
          formData.applicantsName || 'Jane Smith',
        'topmostSubform[0].page1[0].TheUndersignedFurtherCert[0].Partnership_Agreement_of[0]':
          formData.Partnership_Agreement_of || 'N/A',
        'topmostSubform[0].page1[0].TheUndersignedFurtherCert[0].EIN[0]':
          formData.EIN || '12-3456789',
        'topmostSubform[0].page1[0].signatureResponsibleParty[0]':
          formData.signatureResponsibleParty || 'Agent Name',
        'topmostSubform[0].page1[0].dateResponsibleParty[0]':
          formData.dateResponsibleParty || '01/01/2024',
        'topmostSubform[0].page1[0].acceptanceAgentEIN[0]':
          formData.acceptanceAgentEIN || '98-7654321',
        'topmostSubform[0].page1[0].agentCode[0]': formData.agentCode || '001',
        'topmostSubform[0].page1[0].agentPTIN[0]':
          formData.agentPTIN || 'P12345678'
      }
  
      // Checkbox mappings
      const checkboxMappings = {
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row1[0].identity[0]':
          formData.identityRow1 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row1[0].foreignStatus[0]':
          formData.foreignStatusRow1 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row2[0].identity[0]':
          formData.identityRow2 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row2[0].foreignStatus[0]':
          formData.foreignStatusRow2 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row3[0].identity[0]':
          formData.identityRow3 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row3[0].foreignStatus[0]':
          formData.foreignStatusRow3 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row4[0].identity[0]':
          formData.identityRow4 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row4[0].foreignStatus[0]':
          formData.foreignStatusRow4 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row5[0].identity[0]':
          formData.identityRow5 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row5[0].foreignStatus[0]':
          formData.foreignStatusRow5 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row6[0].identity[0]':
          formData.identityRow6 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row6[0].foreignStatus[0]':
          formData.foreignStatusRow6 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row7[0].identity[0]':
          formData.identityRow7 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row7[0].foreignStatus[0]':
          formData.foreignStatusRow7 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row8[0].identity[0]':
          formData.identityRow8 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row8[0].foreignStatus[0]':
          formData.foreignStatusRow8 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row9[0].identity[0]':
          formData.identityRow9 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row9[0].foreignStatus[0]':
          formData.foreignStatusRow9 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row10[0].identity[0]':
          formData.identityRow10 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row10[0].foreignStatus[0]':
          formData.foreignStatusRow10 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row11[0].identity[0]':
          formData.identityRow11 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row11[0].foreignStatus[0]':
          formData.foreignStatusRow11 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row12[0].identity[0]':
          formData.identityRow12 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row12[0].foreignStatus[0]':
          formData.foreignStatusRow12 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row13[0].identity[0]':
          formData.identityRow13 || false,
        'topmostSubform[0].page1[0].supportingDocumentation[0].Row13[0].foreignStatus[0]':
          formData.foreignStatusRow13 || false,
        'topmostSubform[0].page1[0].TheUndersignedFurtherCert[0].theUndersignedFurther[0]':
          formData.theUndersignedFurther || false
      }
  
      // Populate text fields
      Object.entries(fieldMappings).forEach(([fieldName, value]) => {
        try {
          const field = form.getField(fieldName)
  
          if (field.constructor.name === 'PDFTextField') {
            field.setText(value)
          } else {
            console.warn(
              `Field "${fieldName}" is not a text field. Found: ${field.constructor.name}`
            )
          }
        } catch (error) {
          console.warn(`Field "${fieldName}" not found in the PDF.`)
        }
      })
  
      // Populate checkboxes
      Object.entries(checkboxMappings).forEach(([fieldName, isChecked]) => {
        try {
          const field = form.getCheckBox(fieldName)
  
          if (isChecked) {
            field.check()
          } else {
            field.uncheck()
          }
        } catch (error) {
          console.warn(`Checkbox field "${fieldName}" not found in the PDF.`)
        }
      })
  
      // Save and download the filled PDF
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'filled_fw7Coa.pdf'
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
        onClick={extractFieldNames} // To debug field names
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
