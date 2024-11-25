/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { PDFDocument } from "pdf-lib";

export const generateW7Pdf = async (formData) => {
  const url = "/newPDF/w7.pdf";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const existingPdfBytes = await response.arrayBuffer();

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const form = pdfDoc.getForm();

    // const fieldMappings = {
    //   'dependent relationship': formData.dependentRelationship || 'Parent',
    //   'dependent name': formData.dependentName || 'John Doe',
    //   'reason - other information': formData.reason || 'N/A',
    //   'treaty country': formData.treatyCountry || 'United States',
    //   'treaty article number': formData.treatyArticleNumber || 'Article 18',
    //   'first name': formData.firstName || 'Jane',
    //   'middle name': formData.middleName || 'A.',
    //   'last name': formData.lastName || 'Smith',
    //   'birth first name': formData.birthFirstName || 'Jane',
    //   'birth middle name': formData.birthMiddleName || 'Ann',
    //   'birth last name': formData.birthLastName || 'Doe',
    //   'street address': formData.streetAddress || '123 Main Street',
    //   'city state and zip': formData.cityStateAndZip || 'Anytown, USA 12345',
    //   'foreign street address':
    //     formData.foreignStreetAddress || '456 International Road',
    //   'foreign city state and zip':
    //     formData.foreignCityStateAndZip || 'Paris, France 75000',
    //   'date of birth': formData.dateOfBirth || '01012000',
    //   'country of birth': formData.countryOfBirth || 'United States',
    //   'City and state or province':
    //     formData.cityAndStateOrProvince || 'Anytown, USA',
    //   'country(ies) of citizenship':
    //     formData.countriesOfCitizenship || 'United States',
    //   'foreign tax id': formData.foreignTaxId || '123-45-6789',
    //   'type of visa number and expiration':
    //     formData.visaDetails || 'H1B, 987654, 12312025',
    //   'delegate name': formData.delegateName || 'Agent Name',
    //   'college/university/company': formData.organization || 'ABC University',
    //   'city/state college/university/company':
    //     formData.orgCityState || 'New York, NY',
    //   'length of stay': formData.lengthOfStay || '2 Years',
    //   'phone number': formData.phoneNumber || '(123) 456-7890',
    //   'other identification document details':
    //     formData.otherIdDetails || 'Passport',
    //   'issued by': formData.issuedBy || 'United States',
    //   'document number': formData.documentNumber || '987654321',
    //   'expiration date': formData.documentExpirationDate || '12312030',
    //   'itin first 3': formData.itinFirst3 || '123',
    //   'itin next': formData.itinNext || '45',
    //   'itin last': formData.itinLast || '6789',
    //   'irsn first': formData.irsnFirst || '987',
    //   'irsn next': formData.irsnNext || '65',
    //   'irsn last': formData.irsnLast || '4321',
    //   'itin prev name': formData.itinPrevName || 'Previous Name',
    //   'itin prev middle': formData.itinPrevMiddle || 'Middle',
    //   'itin prev last': formData.itinPrevLast || 'Last',
    //   'us date of entry (mm/dd/yyyy)': formData.usDateOfEntry || '01012020',
    //   'sign date mm': formData.signDateMM || '01',
    //   'sign date dd': formData.signDateDD || '01',
    //   'sign date year': formData.signDateYear || '2024',

    //   Group1: formData.group1 || false,
    //   Group2: formData.group2 || false,
    //   Group3: formData.group3 || false,
    //   Group4: formData.group4 || true,
    //   Group5: formData.group5 || true,
    //   Group7: formData.group7 || true
    // }

    const fieldMappings = {
      "dependent relationship": formData.dependentRelationship,
      "dependent name": formData.dependentName,
      "reason - other information": formData.reason,
      "treaty country": formData.treatyCountry,
      "treaty article number": formData.treatyArticleNumber,
      "first name": formData.firstName,
      "middle name": formData.middleName,
      "last name": formData.lastName,
      "birth first name": formData.birthFirstName,
      "birth middle name": formData.birthMiddleName,
      "birth last name": formData.birthLastName,
      "street address": formData.streetAddress,
      "city state and zip": formData.cityStateAndZip,
      "foreign street address": formData.foreignStreetAddress,
      "foreign city state and zip": formData.foreignCityStateAndZip,
      "date of birth": formData.dateOfBirth,
      "country of birth": formData.countryOfBirth,
      "City and state or province": formData.cityAndStateOrProvince,
      "country(ies) of citizenship": formData.countriesOfCitizenship,
      "foreign tax id": formData.foreignTaxId,
      "type of visa number and expiration": formData.visaDetails,
      "delegate name": formData.delegateName,
      "college/university/company": formData.organization,
      "city/state college/university/company": formData.orgCityState,
      "length of stay": formData.lengthOfStay,
      "phone number": formData.phoneNumber,
      "other identification document details": formData.otherIdDetails,
      "issued by": formData.issuedBy,
      "document number": formData.documentNumber,
      "expiration date": formData.documentExpirationDate,
      "itin first 3": formData.itinFirst3,
      "itin next": formData.itinNext,
      "itin last": formData.itinLast,
      "irsn first": formData.irsnFirst,
      "irsn next": formData.irsnNext,
      "irsn last": formData.irsnLast,
      "itin prev name": formData.itinPrevName,
      "itin prev middle": formData.itinPrevMiddle,
      "itin prev last": formData.itinPrevLast,
      "us date of entry (mm/dd/yyyy)": formData.usDateOfEntry,
      "sign date mm": formData.signDateMM,
      "sign date dd": formData.signDateDD,
      "sign date year": formData.signDateYear,

      Group1: formData.group1,
      Group2: formData.group2,
      Group3: formData.group3,
      Group4: formData.group4,
      Group5: formData.group5,
      Group7: formData.group7,
    };

    // Dynamically set text fields
    Object.entries(fieldMappings).forEach(([fieldName, value]) => {
      const field = form.getField(fieldName);

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!field) {
        console.warn(`Field "${fieldName}" not found in the PDF.`);
        return; // Ensure no further operations on an invalid field
      }

      if (field.constructor.name === "PDFTextField") {
        field.setText(value);
      } else if (field.constructor.name === "PDFCheckBox") {
        field.check(value === true);
      } else {
        console.warn(
          `Unhandled field type for "${fieldName}":`,
          field.constructor.name
        );
      }
    });

    // Save and download the PDF
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error("Error fetching PDF:", error.message);
    return null; // Exit gracefully if the fetch fails
  }
};

export const generateW7COAPdf = async (formData) => {
  const url = "/newPDF/w7coa.pdf";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const existingPdfBytes = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const form = pdfDoc.getForm();

    // Field mappings: Update with your field names and form data
    // const fieldMappings = {
    //   "topmostSubform[0].page1[0].theUndersigned[0]":
    //     formData.theUndersigned || "John Doe",
    //   "topmostSubform[0].page1[0].businessName[0]":
    //     formData.businessName || "Sample Business",
    //   "topmostSubform[0].page1[0].datedMonth[0]": formData.datedMonth || "01",
    //   "topmostSubform[0].page1[0].datedDay[0]": formData.datedDay || "01",
    //   "topmostSubform[0].page1[0].datedYear[0]": formData.datedYear || "24",
    //   "topmostSubform[0].page1[0].applicantsName[0]":
    //     formData.applicantsName || "Jane Smith",
    //   "topmostSubform[0].page1[0].TheUndersignedFurtherCert[0].Partnership_Agreement_of[0]":
    //     formData.Partnership_Agreement_of || "N/A",
    //   "topmostSubform[0].page1[0].TheUndersignedFurtherCert[0].EIN[0]":
    //     formData.EIN || "12-3456789",
    //   "topmostSubform[0].page1[0].signatureResponsibleParty[0]":
    //     formData.signatureResponsibleParty || "Agent Name",
    //   "topmostSubform[0].page1[0].dateResponsibleParty[0]":
    //     formData.dateResponsibleParty || "01/01/2024",
    //   "topmostSubform[0].page1[0].acceptanceAgentEIN[0]":
    //     formData.acceptanceAgentEIN || "98-7654321",
    //   "topmostSubform[0].page1[0].agentCode[0]": formData.agentCode || "001",
    //   "topmostSubform[0].page1[0].agentPTIN[0]":
    //     formData.agentPTIN || "P12345678",
    // };

    const fieldMappings = {
      "topmostSubform[0].page1[0].theUndersigned[0]": formData.theUndersigned,
      "topmostSubform[0].page1[0].businessName[0]": formData.businessName,
      "topmostSubform[0].page1[0].datedMonth[0]": formData.datedMonth,
      "topmostSubform[0].page1[0].datedDay[0]": formData.datedDay,
      "topmostSubform[0].page1[0].datedYear[0]": formData.datedYear,
      "topmostSubform[0].page1[0].applicantsName[0]": formData.applicantsName,
      "topmostSubform[0].page1[0].TheUndersignedFurtherCert[0].Partnership_Agreement_of[0]":
        formData.Partnership_Agreement_of,
      "topmostSubform[0].page1[0].TheUndersignedFurtherCert[0].EIN[0]":
        formData.EIN,
      "topmostSubform[0].page1[0].signatureResponsibleParty[0]":
        formData.signatureResponsibleParty,
      "topmostSubform[0].page1[0].dateResponsibleParty[0]":
        formData.dateResponsibleParty,
      "topmostSubform[0].page1[0].acceptanceAgentEIN[0]":
        formData.acceptanceAgentEIN,
      "topmostSubform[0].page1[0].agentCode[0]": formData.agentCode,
      "topmostSubform[0].page1[0].agentPTIN[0]": formData.agentPTIN,
    };

    // Checkbox mappings
    const checkboxMappings = {
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row1[0].identity[0]":
        formData.identityRow1,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row1[0].foreignStatus[0]":
        formData.foreignStatusRow1,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row2[0].identity[0]":
        formData.identityRow2,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row2[0].foreignStatus[0]":
        formData.foreignStatusRow2,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row3[0].identity[0]":
        formData.identityRow3,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row3[0].foreignStatus[0]":
        formData.foreignStatusRow3,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row4[0].identity[0]":
        formData.identityRow4,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row4[0].foreignStatus[0]":
        formData.foreignStatusRow4,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row5[0].identity[0]":
        formData.identityRow5,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row5[0].foreignStatus[0]":
        formData.foreignStatusRow5,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row6[0].identity[0]":
        formData.identityRow6,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row6[0].foreignStatus[0]":
        formData.foreignStatusRow6,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row7[0].identity[0]":
        formData.identityRow7,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row7[0].foreignStatus[0]":
        formData.foreignStatusRow7,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row8[0].identity[0]":
        formData.identityRow8,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row8[0].foreignStatus[0]":
        formData.foreignStatusRow8,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row9[0].identity[0]":
        formData.identityRow9,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row9[0].foreignStatus[0]":
        formData.foreignStatusRow9,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row10[0].identity[0]":
        formData.identityRow10,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row10[0].foreignStatus[0]":
        formData.foreignStatusRow10,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row11[0].identity[0]":
        formData.identityRow11,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row11[0].foreignStatus[0]":
        formData.foreignStatusRow11,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row12[0].identity[0]":
        formData.identityRow12,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row12[0].foreignStatus[0]":
        formData.foreignStatusRow12,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row13[0].identity[0]":
        formData.identityRow13,
      "topmostSubform[0].page1[0].supportingDocumentation[0].Row13[0].foreignStatus[0]":
        formData.foreignStatusRow13,
      "topmostSubform[0].page1[0].TheUndersignedFurtherCert[0].theUndersignedFurther[0]":
        formData.theUndersignedFurther,
    };

    // Populate text fields
    Object.entries(fieldMappings).forEach(([fieldName, value]) => {
      try {
        const field = form.getField(fieldName);

        if (field.constructor.name === "PDFTextField") {
          field.setText(value);
        } else {
          console.warn(
            `Field "${fieldName}" is not a text field. Found: ${field.constructor.name}`
          );
        }
      } catch (error) {
        console.warn(`Field "${fieldName}" not found in the PDF.`);
      }
    });

    // Populate checkboxes
    Object.entries(checkboxMappings).forEach(([fieldName, isChecked]) => {
      try {
        const field = form.getCheckBox(fieldName);

        if (isChecked) {
          field.check();
        } else {
          field.uncheck();
        }
      } catch (error) {
        console.warn(`Checkbox field "${fieldName}" not found in the PDF.`);
      }
    });

    // Save and download the filled PDF
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error("Error fetching PDF:", error.message);
    return null; // Exit gracefully if the fetch fails
  }
};
