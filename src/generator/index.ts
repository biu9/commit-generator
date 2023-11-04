import { modelStore } from "../store";
import { diffSelector } from "../diffSelector";
import { codeProcessor } from "../codeProcessor";
import { model } from "../model";
import { reviewerOptions } from "../../types";

/**
 * @description 根据reviewerOptions初始化后续采用的模型类型
 * @param reviewerOptions
 */
export async function generator(reviewerOptions: reviewerOptions) {
  const { modelProvider, modelType, maxToken } = reviewerOptions;
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

  console.log(res);
}
