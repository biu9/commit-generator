import { modelStore } from "../store";
import { diffSelector } from "../diffSelector";
import { codeProcessor } from "../codeProcessor";
import { model } from "../model";
import { generatorOptions } from "../../types";

/**
 * @description 根据generatorOptions初始化后续采用的模型类型
 * @param generatorOptions
 */
export async function generator(generatorOptions: generatorOptions) {
  const { modelProvider, modelType, maxToken } = generatorOptions;
  const modelStoreInstance = modelStore();

  if (modelProvider) {
    modelStoreInstance.setModelProvider(modelProvider);
  }

  if (modelType) {
    modelStoreInstance.setModelType(modelType);
  }

  if (maxToken) {
    modelStoreInstance.setMaxToken(maxToken);
  }

  const targets = await diffSelector();

  console.log("targets", targets);
  const splitedFiles = codeProcessor(targets);

  const currModel = model();

  const reuqests = splitedFiles.map(
    (splitedFile) =>
      new Promise((resolve) => {
        currModel.getReview(splitedFile).then((res) => {
          resolve(res);
        });
      }),
  );
  const res = (await Promise.all(reuqests)) as string[];

  return res.join("\n");
}
