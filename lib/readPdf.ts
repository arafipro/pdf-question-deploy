"use server"

import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export async function readPdf(pdfFile: string) {
	const loader = new PDFLoader(pdfFile);
	const res_pdf = await loader.load();
	// return res_pdf
  console.log(res_pdf);
}
