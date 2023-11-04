import { execSync } from "child_process";
import { diffMsgProcessor } from "./diffMsgProcessor";
import { IDiff, IFile } from "../../types";

/**
 * @description 获取git diff命令的输出
 */
const getDiff = (): Array<IFile> => {
  const res: IDiff = {
    message: "",
    error: "",
  };

  try {
    const output = execSync("git diff");
    res.message = output.toString();
  } catch (error) {
    res.error = error;
  }

  return diffMsgProcessor(res.message);
};

export { getDiff };
