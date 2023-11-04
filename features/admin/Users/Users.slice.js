import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  fetchStudents,
  fetchTeachers,
  fetchUsers,
  removeUser,
  updateStudent,
} from "../../../services/api";

const initialState = {
  error: "",
  items: [],
  loading: false,
  teachers: [],
  students: [],
  // loggedInTeacherId: null,
};
export const addUserAction = createAsyncThunk("admin/add", async (data) => {
  return await addUser(data);
});

export const fetchUsersAction = createAsyncThunk("admin/fetch", async () => {
  return await fetchUsers();
});
export const fetchStudentsAction = createAsyncThunk(
  "students/fetch",
  async () => {
    return await fetchStudents();
  },
);
export const fetchTeachersAction = createAsyncThunk(
  "teachers/fetch",
  async () => {
    return await fetchTeachers();
  },
);

export const removeUserAction = createAsyncThunk("admin/remove", async (id) => {
  return await removeUser(id);
});
export const updateStudentAction = createAsyncThunk(
  "/update/student",
  async (data) => {
    return await updateStudent(data);
  },
);
const UserSlice = createSlice({
  name: "Admin/Users",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(addUserAction.fulfilled, (state, action) => {
        console.log("WOOOOORK");
        state.items.push(action.payload.body);
      })
      .addCase(addUserAction.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchUsersAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsersAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeUserAction.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.items = state.items.filter(
          (user) => user.id != action.payload.id,
        );
      })
      .addCase(removeUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchStudentsAction.fulfilled, (state, action) => {
        state.students = action.payload;
      })
      .addCase(fetchTeachersAction.fulfilled, (state, action) => {
        console.log(action.payload);
        state.teachers = action.payload.teachers;
      })
      .addCase(
        updateStudentAction.fulfilled,
        (state, { payload: { status, body } }) => {
          if (status == "ok") {
            let index = state.students.findIndex((elm) => elm.id == body.id);
            state.students[index] = body;
          }

          // state.students=action.payload.body

          //   const updatedStudentIndex=state.items.findIndex(student=>student.id==action.payload.id
          //   )

          //   if (updatedStudentIndex!=-1){
          //     state.items[updatedStudentIndex].name=action.payload.name;
          //     state.items[updatedStudentIndex].surname=action.payload.surname;
          //     state.items[updatedStudentIndex].group=action.payload.group;
          //   }
        },
      );
  },
});
export const { setLoggedInTeacherId } = UserSlice.actions;

export const UsersReducer = UserSlice.reducer;
