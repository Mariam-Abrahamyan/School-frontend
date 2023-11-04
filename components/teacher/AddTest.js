import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTestsAction } from "./Test.slice";

const AddTest = () => {
  const [test, setTest] = useState({
    name: "",
    questions: [],
  });
  const dispatch = useDispatch();
  const handleAddQuestion = () => {
    const hasEmptyQuestions = test.questions.some(
      (quest) => quest.text.trim() !== "",
    );
    if (hasEmptyQuestions) {
      alert("Please fill in all existing questions before adding a new one.");
    } else {
      setTest({
        ...test,
        questions: [
          { id: Date.now(), text: "", answers: [] },
          ...test.questions,
        ],
      });
    }
  };
  const addAnswer = (quest) => {
    quest.answers.push({ id: Date.now(), text: "", correct: false });
    setTest({ ...test });
  };
  const updateQtext = (quest, text) => {
    quest.text = text;
    setTest({ ...test });
  };
  const updateAns = (ans, text) => {
    ans.text = text;
    setTest({ ...test });
  };
  const handleCorrectAns = (ans, quest) => {
    quest.answers.forEach((elm) => (elm.correct = false));
    ans.correct = true;

    setTest({ ...test });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTestsAction(test));
  };
  return (
    <div>
      <h3>AddTest</h3>
      <button onClick={handleAddQuestion}>Add question</button>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <input
            value={test.name}
            onChange={(e) => setTest({ ...test, name: e.target.value })}
            placeholder="name of the test"
            className="form-control"
          />
        </div>
        <div className="row">
          <div className="col-md-4">
            <p>questions: {test.questions.length}</p>
            {test.questions.map((quest) => {
              return (
                <div key={quest.id} className="my-2 p-4 bg-info">
                  <input
                    value={quest.text}
                    onChange={(e) => updateQtext(quest, e.target.value)}
                    className="form-control"
                  />
                  <div className="my-5">
                    {quest.answers.map((ans) => {
                      return (
                        <div>
                          <input
                            value={ans.text}
                            className={ans.correct && "bg-warning my-4"}
                            onChange={(e) => updateAns(ans, e.target.value)}
                            onDoubleClick={() => handleCorrectAns(ans, quest)}
                          />
                        </div>
                      );
                    })}

                    <button type="button" onClick={() => addAnswer(quest)}>
                      Add answer
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button>save</button>
      </form>
    </div>
  );
};
export default AddTest;
