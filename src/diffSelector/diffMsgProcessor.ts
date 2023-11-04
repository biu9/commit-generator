import { REVIEW_FILE_EXTENSION, IGNORE_FILE } from "../conf";
import { IFile } from "../../types";

const regxForAuthor = /Author:.*</;
const regxForDate = /Date:.*\n/;
const regxForEmail = /<.*>/;
const regxForFilename = /^\+\+\+(.*)/;
const regxForFileContent = /^\+().*/;

/**
 * @description 处理git diff命令的输出
 * @param rowDiffMessage git diff命令的输出
 * @returns {Array<IFile>} 变更的文件
 */
export function diffMsgProcessor(rowDiffMessage: string): Array<IFile> {
  const file: Array<IFile> = [];

  const tmp = rowDiffMessage.split("\n");
  for (let i = 0; i < tmp.length; ) {
    if (tmp[i].match(regxForFilename)) {
      const name = tmp[i].replace("+++ b/", "").trim();
      let content = "";
      i++;
      while (tmp[i] && !tmp[i].match(regxForFilename)) {
        if (tmp[i].match(regxForFileContent)) {
          content += tmp[i].replace("+", "") + "\n";
        }
        i++;
      }
      if (IGNORE_FILE.includes(name)) continue;
      if (!REVIEW_FILE_EXTENSION.includes(name.slice(name.lastIndexOf("."))))
        continue;
      file.push({
        name,
        content,
      });
    } else {
      i++;
    }
  }

  return file;
}
