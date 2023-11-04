import { ModelProvider, ModelType } from "../../types";

const initState = {
  modelProvider: ModelProvider.azureOpenAI,
  modelType: ModelType.gpt316k,
  maxToken: 16000,
};

/**
 * @description 全局存储model相关信息
 * @returns setModelType,getModelType函数
 */
export function modelStore() {
  function setModelProvider(modelProvider: ModelProvider) {
    initState.modelProvider = modelProvider;
  }

  function getModelProvider() {
    return initState.modelProvider;
  }

  function setModelType(modelType: ModelType) {
    initState.modelType = modelType;
  }

  function getModelType() {
    return initState.modelType;
  }

  function setMaxToken(maxToken: number) {
    initState.maxToken = maxToken;
  }

  function getMaxToken() {
    return initState.maxToken;
  }

  return {
    setModelProvider,
    getModelProvider,
    setModelType,
    getModelType,
    setMaxToken,
    getMaxToken,
  };
}
