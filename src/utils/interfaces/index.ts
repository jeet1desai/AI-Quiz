export interface IReq {
  name: string;
  language: string;
  gender: string;
}
export interface IQuizReq {
  answer: IAnswer;
  language: string;
}

export interface IStepProps {
  onClickHandler: (index: number) => void;
  answer: IAnswer;
}

export interface IAnswer {
  SingleChoice: string;
  MultiChoice: string[];
  CorrectIncorrect: string;
  FillInBlank: string;
  Match: string[];
}

export interface IRegisterReq {
  name: string;
  language: string;
  gender: string;
}

export interface ISingleChoiceProps {
  question: string;
  answerOptions: string[];
  handleAnswer: (value: string) => void;
  answer: string;
}

export interface IMultiChoiceProps {
  question: string;
  answerOptions: string[];
  handleAnswer: (value: string[]) => void;
  answer: string[];
}

export interface IFillChoiceProps {
  question: string;
  handleAnswer: (value: string) => void;
  answer: string;
}

export interface IBooleanChoiceProps {
  question: string;
  handleAnswer: (value: string) => void;
  answer: string;
}

export interface IMatchChoiceProps {
  questionOptions: string[];
  answerOptions: string[];
  handleAnswer: (value: string[]) => void;
  answer: string[];
}
