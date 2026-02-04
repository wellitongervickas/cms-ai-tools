export enum OpenAIModel {
  GPT_5 = "gpt-5",
  GPT_5_1 = "gpt-5.1",
  GPT_4_1 = "gpt-4.1",
  GPT_5_2 = "gpt-5.2",
}

export const getOpenAIModelOptions = () => {
  return [
    {
      label: "GPT-5",
      value: OpenAIModel.GPT_5,
    },
    {
      label: "GPT-5.1",
      value: OpenAIModel.GPT_5_1,
    },
    {
      label: "GPT-5.2",
      value: OpenAIModel.GPT_5_2,
    },
    {
      label: "GPT-4.1",
      value: OpenAIModel.GPT_4_1,
    },
  ];
};
