import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import React, { useState } from "react";
import { IMultiChoiceProps } from "../../utils/interfaces";

const MultiChoice: React.FC<IMultiChoiceProps> = ({
  question,
  answerOptions,
  handleAnswer,
  answer,
}) => {
  const [ans, setAns] = useState<string[]>(answer);

  const multiSelectHandler = (option: string, checked: boolean) => {
    let newAns = [...ans];
    if (checked) {
      newAns = [...ans, option];
      setAns(newAns);
    } else {
      newAns = newAns.filter((answer) => answer !== option);
      setAns(newAns);
    }
    handleAnswer(newAns);
  };

  return (
    <FormGroup>
      <FormLabel>Question: {question}</FormLabel>
      {answerOptions.map((option) => (
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e, checked) => multiSelectHandler(option, checked)}
              checked={ans.includes(option)}
            />
          }
          key={option}
          label={option}
        />
      ))}
    </FormGroup>
  );
};

export default MultiChoice;
