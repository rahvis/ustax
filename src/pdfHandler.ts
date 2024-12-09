// import { save } from '@tauri-apps/api/dialog'
// import { writeBinaryFile } from '@tauri-apps/api/fs'

// export async function savePDF(
//   contents: Uint8Array,
//   defaultFilename: string
// ): Promise<void> {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
//   if ((window as any).__TAURI__ === undefined) {
//     // To set the download file name, we create a temporary link element,
//     // use download property of an anchor tag, supported for most people
//     const blob = new Blob([contents], { type: 'application/pdf' })
//     const url = URL.createObjectURL(blob)
//     const a = document.createElement('a')
//     a.href = url
//     a.download = defaultFilename
//     document.body.appendChild(a)
//     a.click()
//     URL.revokeObjectURL(url)
//     a.remove()
//     return await Promise.resolve()
//   } else {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
//     const defaultPath = await (window as any).__TAURI__.path.documentDir()

//     // path can be null if user cancels save.
//     const path: string | null = await save({
//       filters: [{ name: 'PDF Documents (.pdf)', extensions: ['pdf'] }],
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//       defaultPath
//     })

//     if (path !== null) {
//       return await writeBinaryFile({ contents, path }, {})
//     }

//     // user canceled save.
//     return await Promise.resolve()
//   }
// }

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { save } from "@tauri-apps/api/dialog";
import { writeBinaryFile } from "@tauri-apps/api/fs";
import { PDFDocument } from "pdf-lib";
import { generateW7COAPdf, generateW7Pdf } from "./component/function";

const mergeAndDownloadPDFs = async (
  pdfBytesArray: Uint8Array[],
  outputFilename: string
) => {
  try {
    // Create a new PDFDocument to hold the merged PDFs
    const mergedPdf = await PDFDocument.create();

    for (const pdfBytes of pdfBytesArray) {
      // Load the existing PDF
      const pdfDoc = await PDFDocument.load(pdfBytes);
      // Copy all pages from the current PDF to the merged PDF
      const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    // Serialize the merged PDF to bytes
    const mergedPdfBytes = await mergedPdf.save();

    // Trigger download of the merged PDF
    const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = outputFilename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error merging PDFs:", error);
  }
};

export async function savePDF(
  contents: Uint8Array,
  defaultFilename: string,
  formData: unknown
): Promise<void> {
  // console.log(contents)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
  if ((window as any).__TAURI__ === undefined) {
    // To set the download file name, we create a temporary link element,
    // use download property of an anchor tag, supported for most people

    const W7Pdf = await generateW7Pdf(formData);
    const W7COAPdf = await generateW7COAPdf(formData);

    if (!W7Pdf || !W7COAPdf) {
      console.error("Failed to generate W7 PDF. Aborting merge operation.");
      return; // Exit early to avoid passing null to mergeAndDownloadPDFs
    }

    await mergeAndDownloadPDFs(
      [
        new Uint8Array(contents),
        new Uint8Array(W7Pdf),
        new Uint8Array(W7COAPdf),
      ],
      defaultFilename
    );
    return await Promise.resolve();
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    const defaultPath = await (window as any).__TAURI__.path.documentDir();

    // path can be null if user cancels save.
    const path: string | null = await save({
      filters: [{ name: "PDF Documents (.pdf)", extensions: ["pdf"] }],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      defaultPath,
    });

    if (path !== null) {
      return await writeBinaryFile({ contents, path }, {});
    }

    // user canceled save.
    return await Promise.resolve();
  }
}
