export interface IQuestStep {
  title: string;
  description: string;
  mapLink: string;
}

export interface IQuest {
  questTitle: string;
  steps: IQuestStep[];
}
