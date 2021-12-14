import {
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { ISingleChoiceProps } from "../../utils/interfaces";

const SingleChoice: React.FC<ISingleChoiceProps> = ({
  question,
  answerOptions,
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
        {answerOptions.map((option) => (
          <FormControlLabel
            control={<Radio />}
            label={option}
            value={option}
            key={option}
          />
        ))}
      </RadioGroup>
    </FormGroup>
  );
};

export default SingleChoice;
