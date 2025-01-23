const PdfParse  = require('pdf-parse'); 
/**
 * Extracts text content from a PDF buffer
 * @param pdfBuffer - Buffer of the PDF file
 * @returns Promise<string> - Extracted text content
 */
export const extractTextFromPDF = async (pdfBuffer: Buffer): Promise<string> => {
  try {
    const data = await PdfParse(pdfBuffer);
    return data.text;
  } catch (error) {
    console.error('Failed to parse PDF:', error);
    throw new Error('Error parsing PDF content');
  }
};
