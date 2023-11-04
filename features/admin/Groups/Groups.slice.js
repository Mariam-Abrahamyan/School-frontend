import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addGroup, fetchGroups, removeGroup } from "../../../services/api";

const initialState = {
  error: "",
  items: [],
  availableStudents: [],
};
export const addGroupAction = createAsyncThunk(
  "admin/addGroup",
  async (data) => {
    return await addGroup(data);
  },
);
export const fetchGroupsAction = createAsyncThunk(
  "admin/fetchGroup",
  async () => {
    return await fetchGroups();
  },
);
export const removeGroupAction = createAsyncThunk(
  "admin/removeGroup",
  async (id) => {
    return await removeGroup(id);
  },
);
const GroupSlice = createSlice({
  name: "Admin/group",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addGroupAction.fulfilled, (state, action) => {
        console.log(action.payload);
        state.items.push(action.payload.body);
      })
      .addCase(fetchGroupsAction.fulfilled, (state, action) => {
        // state.loading = false;
        state.items = action.payload.groups;
        state.availableStudents = action.payload.availableStudents;
        // state.items = action.payload.groups;
      })
      .addCase(removeGroupAction.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (group) => group.id != action.payload.id,
        );
      });
  },
});
export const GroupsReducer = GroupSlice.reducer;
