import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { LoginReducer} from "../features/auth/Login.slice";
import { UsersReducer } from "../features/admin/Users/Users.slice";
import { GroupsReducer } from "../features/admin/Groups/Groups.slice";
import { TestsReducer } from "../components/teacher/Test.slice";

export const store = configureStore({
  reducer: combineReducers({
    login: LoginReducer,
    users: UsersReducer,
    groups: GroupsReducer,
    tests: TestsReducer,
  }),
});
