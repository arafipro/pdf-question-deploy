"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  question: z
    .string({ required_error: "質問を入力してください" })
    .min(1, { message: "質問を入力してください" }),
  apiKey: z.string().length(51, {
    message: "OPENAI API KEYを入力してください",
  }),
  pdfFile: z
    .custom<FileList>()
    .refine((file) => file && file.length !== 0, {
      message: "ファイルが選択されていません",
    }),
});

type Schema = z.infer<typeof formSchema>;
export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
			apiKey: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // 読み込んだPDFファイルを取得する
    // await readPdf(values.pdfFile[0].name);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OPENAI APIKEY</FormLabel>
              <FormControl>
                <Input
                  placeholder="OPENAI APIKEYを入力してください"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pdfFile"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>PDFファイル</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf"
                  {...fieldProps}
                  onChange={(e) => {
                    onChange(e.target.files && e.target.files);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>質問</FormLabel>
              <FormControl>
                <Input placeholder="質問を入力してください" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">送信</Button>
      </form>
    </Form>
  );
}
