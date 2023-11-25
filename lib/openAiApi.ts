import { OpenAI } from "langchain/llms/openai";

export async function openAiApi(apiKey: string, question: string) {
  const llm = new OpenAI({
    openAIApiKey: apiKey,
  });
  const res = await llm.call(question);
  return res;
}
