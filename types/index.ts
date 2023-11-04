export enum ModelProvider {
  azureOpenAI,
  openAI,
}

export enum ModelType {
  gpt316k = "gpt-3.5-turbo-16k",
}

export interface reviewerOptions {
  modelProvider?: ModelProvider;
  modelType?: ModelType;
  maxToken?: number;
}

export enum ResultType {
  localFile,
}

export interface IDiff {
  message: string;
  error: any;
}

export interface IFile {
  name: string;
  content: string;
}
