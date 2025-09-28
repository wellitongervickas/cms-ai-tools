export enum OpenAIModel {
  GPT_5 = "gpt-5",
  GPT_4_1 = "gpt-4.1",
}

export const getOpenAIModelOptions = () => {
  return [
    {
      label: "GPT-5",
      value: OpenAIModel.GPT_5,
    },
    {
      label: "GPT-4.1",
      value: OpenAIModel.GPT_4_1,
    },
  ];
};
