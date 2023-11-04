import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Axios } from "../../services/api";
import {
  answerQuestion,
  checkQuestionAction,
  fetchTestAction,
  setAnswer,
  setCorrectAnswer,
} from "../teacher/Test.slice";
import styles from "./Test.module.css";

const StartTest = () => {
  const { id } = useParams();
  const test = useSelector((state) => state.tests.currentTest);
  const [className, setClassName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTestAction(id));
  }, []);

  const checkAnswer = (question, answer) => {
    dispatch(
      checkQuestionAction({
        testId: id,
        questId: question.id,
        answerId: answer.id,
      }),
    )
      .unwrap()
      .then((response) => {
        dispatch(setAnswer({ question: question.id, answer: answer.id }));
        dispatch(answerQuestion(question.id));

        dispatch(
          setCorrectAnswer({
            question: question.id,
            answer: response.result.id,
          }),
        );
      });
  };

  return (
    <div>
      <h3>start test</h3>
      <div className="row">
        <div className="col-md-10">
          {test.questions?.map((quest) => {
            let questClass = styles.question;

            return (
              <div
                className={
                  questClass +
                  (quest.correctAnswer == quest.right
                    ? " bg-success"
                    : quest.correctAnswer != null
                    ? " bg-danger"
                    : "")
                }
                key={quest.id}
              >
                <p>{quest.right}</p>
                <input
                  type="text"
                  value={quest.text}
                  className="form-control"
                />
                <div className="my-5 answers">
                  {quest.answers.map((ans) => {
                    return !quest.hasBeenAnswered ? (
                      <div
                        className={`${styles.answer} ${
                          ans.correct ? "bg-success" : "bg-danger"
                        }`}
                        key={ans.id}
                        onClick={() => checkAnswer(quest, ans)}
                      >
                        {ans.text}
                      </div>
                    ) : (
                      <div
                        className={
                          "alert " +
                          (quest.right == ans.id
                            ? "bg-success"
                            : "alert-dark") +
                          (ans.id == quest.correctAnswer
                            ? ans.id != quest.right && " bg-warning"
                            : "")
                        }
                      >
                        {ans.text}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <button className="btn btn-success">Finish</button>
      </div>
    </div>
  );
};
export default StartTest;
