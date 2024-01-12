import { ChatOpenAI } from "@langchain/openai";
import { loadQAMapReduceChain } from "langchain/chains";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export async function openAiApi(
  apiKey: string,
  question: string,
  output: Document<Record<string, any>>[]
) {
  const llm = new ChatOpenAI({
    openAIApiKey: apiKey,
    configuration: {
      baseURL:
        "https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/openai",
    },
  });
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: apiKey,
    configuration: {
      baseURL:
        "https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/openai",
    },
  });
  const store = await MemoryVectorStore.fromDocuments(output, embeddings);
  const relevantDocs = await store.similaritySearch(question);
  const chain = loadQAMapReduceChain(llm);
  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  });
  return res;
}
