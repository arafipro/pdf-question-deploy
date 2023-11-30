import { z } from "zod";

export const formSchema = z.object({
  question: z
    .string({ required_error: "質問を入力してください" })
    .min(1, { message: "質問を入力してください" }),
  apiKey: z.string().length(51, {
    message: "OPENAI API KEYを入力してください",
  }),
  pdfFile: z.custom<FileList>().refine((file) => file && file.length !== 0, {
    message: "ファイルが選択されていません",
  }),
});
