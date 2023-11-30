"use client";

import MainForm from "@/components/MainForm";
import { openAiApi } from "@/lib/openAiApi";
import { readPdf } from "@/lib/readPdf";
import { textSplitter } from "@/lib/textSplitter";
import { useState } from "react";

export default function Home() {
	const [text, setText] = useState<string>("");

	const onSubmit = async (values: {
		question: string;
		apiKey: string;
		pdfFile: FileList;
	}) => {
		console.log(values);
		const str = await readPdf(`data/${values.pdfFile[0].name}`);
		const split_str = await textSplitter(str);
		const res = await openAiApi(values.apiKey, values.question, split_str);
		console.log(res);
		setText(res.text);
	};

	return (
		<main className="mx-auto mt-10 w-3/4">
			<MainForm onSubmit={onSubmit} />
			<p>{text}</p>
		</main>
	);
}
