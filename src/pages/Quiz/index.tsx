import { Alert, Button, Container } from "@mui/material";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import CorrectIncorrect from "../../components/Question/correct-incorrect";
import FillInBlank from "../../components/Question/fill-in-blank";
import MatchFollowing from "../../components/Question/match-following";
import MultiChoice from "../../components/Question/multi-choice";
import SingleChoice from "../../components/Question/single-choice";
import Steps from "../../components/Stepper";

import Questions from "../../question.json";
import { IAnswer, IQuizReq, IReq } from "../../utils/interfaces";

const Quiz: React.FC = () => {
  const history = useHistory();

  const {
    state: { name, language, gender },
  } = useLocation<IReq>();

  const Question =
    language === "English" ? Questions.English : Questions.Hindi;

  const [activeQuestionIndex, setQuestionIndex] = useState<number>(1);
  const [answer, setAnswer] = useState<IAnswer>({
    SingleChoice: "",
    MultiChoice: [],
    CorrectIncorrect: "",
    FillInBlank: "",
    Match: ["", "", ""],
  } as IAnswer);

  const handleSubmit = () => {
    const req: IQuizReq = {
      answer,
      language
    };
    history.push({
      pathname: "/result",
      state: req,
    });
  };

  return (
    <>
      <Alert icon={false} severity="success">
        Hi, {name}
      </Alert>
      <div className="quiz-page">
        <Container component="main" maxWidth="sm">
          <div className="stepper">
            <Steps
              onClickHandler={(number: number) => setQuestionIndex(number)}
              answer={answer}
            />
          </div>
          <br />
          <br />
          <div className="question">
            {activeQuestionIndex === 1 && (
              <SingleChoice
                question={Question.SingleChoice.Question}
                answerOptions={Question.SingleChoice.AnswerOption}
                answer={answer.SingleChoice}
                handleAnswer={(value: string) =>
                  setAnswer({
                    ...answer,
                    SingleChoice: value,
                  })
                }
              />
            )}
            {activeQuestionIndex === 2 && (
              <MultiChoice
                question={Question.MultiChoice.Question}
                answerOptions={Question.MultiChoice.AnswerOption}
                answer={answer.MultiChoice}
                handleAnswer={(value: string[]) =>
                  setAnswer({
                    ...answer,
                    MultiChoice: value,
                  })
                }
              />
            )}
            {activeQuestionIndex === 3 && (
              <CorrectIncorrect
                question={Question.CorrectIncorrectChoice.Question}
                answer={answer.CorrectIncorrect}
                handleAnswer={(value: string) =>
                  setAnswer({
                    ...answer,
                    CorrectIncorrect: value,
                  })
                }
              />
            )}
            {activeQuestionIndex === 4 && (
              <FillInBlank
                question={Question.FillInBlank.Question}
                answer={answer.FillInBlank}
                handleAnswer={(value: string) =>
                  setAnswer({
                    ...answer,
                    FillInBlank: value,
                  })
                }
              />
            )}
            {activeQuestionIndex === 5 && (
              <MatchFollowing
                questionOptions={Question.MatchFollowing.Question}
                answerOptions={Question.MatchFollowing.AnswerOption}
                answer={answer.Match}
                handleAnswer={(value: string[]) =>
                  setAnswer({
                    ...answer,
                    Match: value,
                  })
                }
              />
            )}

            <br />

            {activeQuestionIndex !== 1 && (
              <Button
                variant="outlined"
                onClick={() => setQuestionIndex((prev) => prev - 1)}
              >
                Back
              </Button>
            )}
            {activeQuestionIndex !== 5 && (
              <Button
                variant="outlined"
                onClick={() => setQuestionIndex((prev) => prev + 1)}
              >
                Next
              </Button>
            )}
            {activeQuestionIndex === 5 && (
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="success"
              >
                Submit
              </Button>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Quiz;
