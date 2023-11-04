import { splitCode } from "./splitCode";
import { ChatMessage } from "@azure/openai";

interface IFile {
  name: string;
  content: string;
}


/**
 * @description 处理超出token限制的变更代码
 * @param changedFiles 变更的文件名数组
 * @returns
 */
export function codeProcessor(changedFiles: Array<IFile>): ChatMessage[][] {
  return splitCode(changedFiles);
}
