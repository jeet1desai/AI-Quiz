import React, { useMemo } from "react";
import { Chip, Container, Divider, Grid } from "@mui/material";
import { Cell, Pie, PieChart } from "recharts";
import { useLocation } from "react-router-dom";

import Question from "../../question.json";
import { IQuizReq } from "../../utils/interfaces";
import { COLORS } from "../../utils/constants";
import { EAnswerType } from "../../utils/enums";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Result: React.FC = () => {
  const {
    state: { answer, language },
  } = useLocation<IQuizReq>();

  const Questions = language === "English" ? Question.English : Question.Hindi;

  const checkSingleAnswer = () => {
    if (!answer.SingleChoice) {
      return EAnswerType.NotAnswered;
    } else if (answer.SingleChoice === Questions.SingleChoice.CorrectAnswer) {
      return EAnswerType.Correct;
    } else {
      return EAnswerType.Incorrect;
    }
  };
  const checkMultiAnswer = () => {
    if (answer.MultiChoice.length === 0) {
      return EAnswerType.NotAnswered;
    } else if (
      Questions.MultiChoice.CorrectAnswer.every((ai) =>
        answer.MultiChoice.includes(ai)
      ) &&
      Questions.MultiChoice.CorrectAnswer.length === answer.MultiChoice.length
    ) {
      return EAnswerType.Correct;
    } else {
      return EAnswerType.Incorrect;
    }
  };
  const checkCorrectInCorrectAnswer = () => {
    if (!answer.CorrectIncorrect) {
      return EAnswerType.NotAnswered;
    } else if (
      answer.CorrectIncorrect === Questions.CorrectIncorrectChoice.CorrectAnswer
    ) {
      return EAnswerType.Correct;
    } else {
      return EAnswerType.Incorrect;
    }
  };
  const checkFillInBlankAnswer = () => {
    if (!answer.FillInBlank) {
      return EAnswerType.NotAnswered;
    } else if (
      Questions.FillInBlank.CorrectAnswer.includes(
        answer.FillInBlank.toLowerCase()
      )
    ) {
      return EAnswerType.Correct;
    } else {
      return EAnswerType.Incorrect;
    }
  };
  const checkMatchAnswer = () => {
    if (answer.Match.every((ai) => ai === "")) {
      return EAnswerType.NotAnswered;
    } else if (
      JSON.stringify(answer.Match) ===
      JSON.stringify(Questions.MatchFollowing.CorrectAnswer)
    ) {
      return EAnswerType.Correct;
    } else {
      return EAnswerType.Incorrect;
    }
  };

  const data = useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    let notAns = 0;

    let status = checkSingleAnswer();
    switch (status) {
      case EAnswerType.NotAnswered:
        notAns = notAns + 1;
        break;
      case EAnswerType.Correct:
        correct = correct + 1;
        break;
      case EAnswerType.Incorrect:
        incorrect = incorrect + 1;
        break;
    }
    status = checkMultiAnswer();
    switch (status) {
      case EAnswerType.NotAnswered:
        notAns = notAns + 1;
        break;
      case EAnswerType.Correct:
        correct = correct + 1;
        break;
      case EAnswerType.Incorrect:
        incorrect = incorrect + 1;
        break;
    }
    status = checkCorrectInCorrectAnswer();
    switch (status) {
      case EAnswerType.NotAnswered:
        notAns = notAns + 1;
        break;
      case EAnswerType.Correct:
        correct = correct + 1;
        break;
      case EAnswerType.Incorrect:
        incorrect = incorrect + 1;
        break;
    }
    status = checkFillInBlankAnswer();
    switch (status) {
      case EAnswerType.NotAnswered:
        notAns = notAns + 1;
        break;
      case EAnswerType.Correct:
        correct = correct + 1;
        break;
      case EAnswerType.Incorrect:
        incorrect = incorrect + 1;
        break;
    }
    status = checkMatchAnswer();
    switch (status) {
      case EAnswerType.NotAnswered:
        notAns = notAns + 1;
        break;
      case EAnswerType.Correct:
        correct = correct + 1;
        break;
      case EAnswerType.Incorrect:
        incorrect = incorrect + 1;
        break;
    }
    return [
      { name: EAnswerType.Correct, value: correct },
      { name: EAnswerType.Incorrect, value: incorrect },
      { name: EAnswerType.NotAnswered, value: notAns },
    ];
  }, []);

  return (
    <div className="registration-page">
      <Container component="main" maxWidth="sm">
        <h2>Result & Report</h2>

        <PieChart width={200} height={200}>
          <Pie
            data={data}
            dataKey={"value"}
            outerRadius={80}
            cx="50%"
            cy="50%"
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
        <Chip label={"Correct"} color="success" sx={{ ml: 1 }} />
        <Chip label={"Incorrect"} color="error" sx={{ ml: 1 }} />
        <Chip label={"NotAnswered"} color="warning" sx={{ ml: 1 }} />

        <br />
        <br />
        <Divider light />

        <div>
          <Grid>
            <p>
              <b>Question:</b> {Questions.SingleChoice.Question}
            </p>
            {Questions.SingleChoice.AnswerOption.map((option, ind) => (
              <p>{`${ind + 1}) ${option}`}</p>
            ))}
            <p>
              <b>Correct Answer:</b> {Questions.SingleChoice.CorrectAnswer}
            </p>
            <div>
              <b>Submitted Answer:</b> {answer.SingleChoice}
              {checkSingleAnswer() === EAnswerType.Incorrect ? (
                <Chip label={"Incorrect"} color="error" sx={{ ml: 1 }} />
              ) : checkSingleAnswer() === EAnswerType.Correct ? (
                <Chip label={"Correct"} color="success" sx={{ ml: 1 }} />
              ) : (
                <Chip label={"NotAnswered"} color="warning" sx={{ ml: 1 }} />
              )}
            </div>
          </Grid>
          <br />
          <Divider light />
          <Grid>
            <p>
              <b>Question:</b> {Questions.MultiChoice.Question}
            </p>
            {Questions.MultiChoice.AnswerOption.map((option, ind) => (
              <p>{`${ind + 1}) ${option}`}</p>
            ))}
            <p>
              <b>Correct Answer:</b>{" "}
              {JSON.stringify(Questions.MultiChoice.CorrectAnswer)}
            </p>
            <div>
              <b>Submitted Answer:</b>
              {JSON.stringify(answer.MultiChoice)}
              {checkMultiAnswer() === EAnswerType.Incorrect ? (
                <Chip label={"Incorrect"} color="error" sx={{ ml: 1 }} />
              ) : checkMultiAnswer() === EAnswerType.Correct ? (
                <Chip label={"Correct"} color="success" sx={{ ml: 1 }} />
              ) : (
                <Chip label={"NotAnswered"} color="warning" sx={{ ml: 1 }} />
              )}
            </div>
          </Grid>
          <br />
          <Divider light />
          <Grid>
            <p>
              <b>Question:</b> {Questions.CorrectIncorrectChoice.Question}
            </p>
            <p>{`1) True`}</p>
            <p>{`2) False`}</p>
            <p>
              <b>Correct Answer:</b>
              {Questions.CorrectIncorrectChoice.CorrectAnswer}
            </p>
            <div>
              <b>Submitted Answer:</b>
              {answer.CorrectIncorrect}
              {checkCorrectInCorrectAnswer() === EAnswerType.Incorrect ? (
                <Chip label={"Incorrect"} color="error" sx={{ ml: 1 }} />
              ) : checkCorrectInCorrectAnswer() === EAnswerType.Correct ? (
                <Chip label={"Correct"} color="success" sx={{ ml: 1 }} />
              ) : (
                <Chip label={"NotAnswered"} color="warning" sx={{ ml: 1 }} />
              )}
            </div>
          </Grid>
          <br />
          <Divider light />
          <Grid>
            <p>
              <b>Question:</b> {Questions.FillInBlank.Question}
            </p>
            <p>
              <b>Correct Answer:</b>
              {JSON.stringify(Questions.FillInBlank.CorrectAnswer)}
            </p>
            <div>
              <b>Submitted Answer:</b>
              {answer.FillInBlank}
              {checkFillInBlankAnswer() === EAnswerType.Incorrect ? (
                <Chip label={"Incorrect"} color="error" sx={{ ml: 1 }} />
              ) : checkFillInBlankAnswer() === EAnswerType.Correct ? (
                <Chip label={"Correct"} color="success" sx={{ ml: 1 }} />
              ) : (
                <Chip label={"NotAnswered"} color="warning" sx={{ ml: 1 }} />
              )}
            </div>
          </Grid>
          <br />
          <Divider light />
          <Grid>
            <p>
              <b>Question: </b>Match the following
            </p>
            {Questions.MatchFollowing.Question.map((que, ind) => (
              <p>{`${ind + 1}) ${que}`}</p>
            ))}
            {Questions.MatchFollowing.AnswerOption.map((option, ind) => (
              <p>{`${ind + 1}) ${option}`}</p>
            ))}
            <p>
              <b>Correct Answer:</b>{" "}
              {JSON.stringify(Questions.MatchFollowing.CorrectAnswer)}
            </p>
            <div>
              <b>Submitted Answer:</b>
              {JSON.stringify(answer.Match)}
              {checkMatchAnswer() === EAnswerType.Incorrect ? (
                <Chip label={"Incorrect"} color="error" sx={{ ml: 1 }} />
              ) : checkMatchAnswer() === EAnswerType.Correct ? (
                <Chip label={"Correct"} color="success" sx={{ ml: 1 }} />
              ) : (
                <Chip label={"NotAnswered"} color="warning" sx={{ ml: 1 }} />
              )}
            </div>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Result;
