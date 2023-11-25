"use server";

import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export async function readPdf(pdfFile: string) {
  const loader = new PDFLoader(pdfFile, { splitPages: false });
  const res_pdf_obj = await loader.load();
  const res_pdf = res_pdf_obj[0].pageContent
    .replace(/\n/g, " ")
    .replace(/,/g, "");
  return res_pdf;
}
