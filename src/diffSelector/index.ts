import { readCmd } from "./readCmd";
import { getDiff } from "./getDiff";

/**
 * 获取变更的代码
 * @returns {string} 变更的代码
 */
export async function diffSelector(): Promise<Array<string>> {
  const diff = getDiff();
  const targets = await readCmd(diff);

  return targets;
}
