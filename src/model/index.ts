import { azureOpenAI } from "./azureOpenAI";
import { modelStore } from "../store";

enum ModelProvider {
  azureOpenAI,
  openAI,
}

/**
 * @description 根据model type store中的model type返回对应的模型
 * @returns
 */
export function model() {
  const modelTypeStoreInstance = modelStore();
  const modelProvider = modelTypeStoreInstance.getModelProvider();

  switch (modelProvider) {
    case ModelProvider.azureOpenAI:
      return azureOpenAI();
    default:
      return azureOpenAI();
  }
}
