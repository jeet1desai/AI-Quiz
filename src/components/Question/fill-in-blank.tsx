import { FormGroup, FormLabel, TextField } from "@mui/material";
import React from "react";
import { IFillChoiceProps } from "../../utils/interfaces";

const FillInBlank: React.FC<IFillChoiceProps> = ({
  question,
  handleAnswer,
  answer,
}) => {
  return (
    <FormGroup>
      <FormLabel>Question: {question}</FormLabel>
      <TextField
        variant="standard"
        label="Answer"
        id="standard-required"
        inputProps={{ "data-testid": "fillInput" }}
        value={answer}
        onChange={(e) => handleAnswer(e.target.value)}
        sx={{ width: 220 }}
      />
    </FormGroup>
  );
};

export default FillInBlank;
