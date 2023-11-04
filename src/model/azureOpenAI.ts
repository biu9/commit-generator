import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { ChatMessage } from "@azure/openai";
require("dotenv").config();

const endpoint = process.env.AZURE_OPENAI_ENDPOINT || "";
const azureApiKey = process.env.AZURE_OPENAI_KEY || "";
const azureDeploymentId = process.env.AZURE_OPENAI_DEPLOYMENT_ID || "";

/**
 * @description azure openai模型
 * @returns 获取回复以及embedding的两个函数
 */
export function azureOpenAI() {
  const client = new OpenAIClient(
    endpoint,
    new AzureKeyCredential(azureApiKey),
  );

  async function getReview(codes: ChatMessage[]) {
    try {
      const result = await client.getChatCompletions(azureDeploymentId, codes);
      if (result.choices[0].message?.content)
        return result.choices[0].message.content;
      else return "请求openai接口出错,返回值为空";
    } catch (error) {
      return "请求openai接口出错,error" + error;
    }
  }

  async function getEmbedding() {}

  return {
    getReview,
    getEmbedding,
  };
}
