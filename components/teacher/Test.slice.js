import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTest,
  checkQuestion,
  fetchTest,
  fetchTests,
} from "../../services/api";

const initialState = {
  items: [],
  currentTest: {},
};
export const addTestsAction = createAsyncThunk("test/add", async (data) => {
  return await addTest(data);
});
export const fetchTestsAction = createAsyncThunk("tests/fetch", async () => {
  return await fetchTests();
});
export const fetchTestAction = createAsyncThunk("test/fetch", async (id) => {
  return await fetchTest(id);
});
export const checkQuestionAction = createAsyncThunk(
  "/check/question",
  async ({ testId, questId }) => {
    return await checkQuestion(testId, questId);
  },
);
const TestsSlice = createSlice({
  name: "Test",
  initialState,
  reducers: {
    answerQuestion: (state, action) => {
      let quest = state.currentTest.questions.find(
        (elm) => elm.id == action.payload,
      );
      quest.hasBeenAnswered = true;
    },
    setAnswer: (state, action) => {
      let quest = state.currentTest.questions.find(
        (elm) => elm.id == action.payload.question,
      );
      quest.correctAnswer = action.payload.answer;
    },
    setCorrectAnswer: (state, action) => {
      let quest = state.currentTest.questions.find(
        (elm) => elm.id == action.payload.question,
      );
      quest.right = action.payload.answer;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTestsAction.fulfilled, (state, action) => {
        state.items.push(action.payload.body);
      })
      .addCase(fetchTestsAction.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchTestAction.fulfilled, (state, { payload: { result } }) => {
        state.currentTest = {
          ...result,
          questions: [
            ...result.questions.map((elm) => {
              elm.hasBeenAnswered = false;
              elm.correctAnswer = null;
              elm.right = -1;
              return elm;
            }),
          ],
        };
      });
  },
});
export const TestsReducer = TestsSlice.reducer;
export const { answerQuestion, setCorrectAnswer, setAnswer } =
  TestsSlice.actions;
