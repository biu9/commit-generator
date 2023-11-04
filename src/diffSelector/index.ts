import { readCmd } from "./readCmd";
import { getDiff } from "./getDiff";

interface IFile {
  name: string;
  content: string;
}

/**
 * 获取变更的代码
 * @returns {string} 变更的代码
 */
export async function diffSelector(): Promise<Array<IFile>> {
  const diff = getDiff();
  console.log(diff);
  const targets = await readCmd(diff);

  return targets;
}
