import React from "react";
import {
  FormGroup,
  FormLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { IMatchChoiceProps } from "../../utils/interfaces";

const MatchFollowing: React.FC<IMatchChoiceProps> = ({
  questionOptions,
  answerOptions,
  handleAnswer,
  answer,
}) => {
  let ans: string[] = answer;

  const handleSelect = (id: number, value: any) => {
    ans[id] = value;
    handleAnswer(ans);
  };

  return (
    <FormGroup>
      <FormLabel>Question: Match the following</FormLabel>
      <Grid container spacing={2}>
        <List>
          {questionOptions.map((question, index) => (
            <ListItem key={index}>
              <ListItemText>{`${index + 1}) ${question}`}</ListItemText>
            </ListItem>
          ))}
        </List>
        <List>
          {answerOptions.map((answer, index) => (
            <ListItem key={index}>
              <ListItemText>{`${index + 1}) ${answer}`}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Grid>

      {questionOptions.map((question, idx) => (
        <ListItemText key={idx}>
          {`${idx + 1}) `}
          <TextField
            variant="standard"
            label=""
            id="standard-required"
            type="number"
            inputProps={{ "data-testid": "fillInput" }}
            value={ans.length > 0 ? ans[idx] : ""}
            onChange={(e) => handleSelect(idx, e.target.value)}
            sx={{ width: 220 }}
          />
        </ListItemText>
      ))}
    </FormGroup>
  );
};

export default MatchFollowing;
