import { encoding_for_model } from "tiktoken";
import { ChatMessage } from "@azure/openai";
import { PROMPT } from "../conf";
import { modelStore } from "../store";
import { IFile } from "../../types";

const modelStoreInstance = modelStore();

/**
 * @description 处理超出token限制的代码
 * @param code
 * @param maxToken
 */
export function splitCode(
  files: Array<IFile>,
  maxToken: number = modelStoreInstance.getMaxToken(),
): ChatMessage[][] {
  const modelType = modelStoreInstance.getModelType();
  const enc = encoding_for_model(modelType);
  const splitedChatMessage: ChatMessage[][] = [];
  const promptLength = enc.encode(PROMPT).length;
  maxToken -= promptLength;

  for (let i = 0; i < files.length; i++) {
    let j = i;
    const tmpChatMessages: ChatMessage[] = [];
    let tmpSum = 0;
    while (j < files.length) {
      const { name, content } = files[j];
      const tmpToken = enc.encode(`请检查${name}文件的\n\n${content}`).length;
      if (tmpSum + tmpToken > maxToken) {
        console.log(`${name}文件超出token限制,进行截断处理...`);
        break;
      } else {
        tmpSum += tmpToken;
        tmpChatMessages.push({
          role: "user",
          content: `请检查${name}文件的\n\n${content}`,
        });
        j++;
      }
    }
    tmpChatMessages.unshift({ role: "system", content: PROMPT });
    splitedChatMessage.push(tmpChatMessages);
    i = j;
  }

  return splitedChatMessage;
}
