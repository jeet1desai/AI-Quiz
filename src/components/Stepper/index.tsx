import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import { IStepProps } from "../../utils/interfaces";

const Steps: React.FC<IStepProps> = ({ onClickHandler, answer }) => {
  return (
    <Stepper alternativeLabel>
      <Step
        key={1}
        active={answer.SingleChoice.length > 0}
        onClick={() => onClickHandler(1)}
      >
        <StepLabel />
      </Step>
      <Step
        key={2}
        active={answer.MultiChoice.length > 0}
        onClick={() => onClickHandler(2)}
      >
        <StepLabel />
      </Step>
      <Step
        key={3}
        active={answer.CorrectIncorrect.length > 0}
        onClick={() => onClickHandler(3)}
      >
        <StepLabel />
      </Step>
      <Step
        key={4}
        active={answer.FillInBlank.length > 0}
        onClick={() => onClickHandler(4)}
      >
        <StepLabel />
      </Step>
      <Step
        key={5}
        active={answer.Match.every((ai) => ai !== "")}
        onClick={() => onClickHandler(5)}
      >
        <StepLabel />
      </Step>
    </Stepper>
  );
};

export default Steps;
