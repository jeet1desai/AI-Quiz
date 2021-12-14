import {
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { ECorrectIncorrect } from "../../utils/enums";
import { IBooleanChoiceProps } from "../../utils/interfaces";

const CorrectIncorrect: React.FC<IBooleanChoiceProps> = ({
  question,
  handleAnswer,
  answer,
}) => {
  return (
    <FormGroup>
      <FormLabel>Question: {question}</FormLabel>
      <RadioGroup
        aria-label="single-select-answer"
        name="answer-buttons-group"
        onChange={(e) => handleAnswer(e.target.value)}
        value={answer}
      >
        <FormControlLabel
          control={<Radio />}
          label={"True"}
          value={"True"}
          key={ECorrectIncorrect.True}
        />
        <FormControlLabel
          control={<Radio />}
          label={"False"}
          value={"False"}
          key={ECorrectIncorrect.False}
        />
      </RadioGroup>
    </FormGroup>
  );
};

export default CorrectIncorrect;
