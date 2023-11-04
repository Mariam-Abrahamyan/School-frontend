import axios from "axios";
export const Axios = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5001/",
});

export const signin = async ({ login, password }) => {
  let response = await Axios.post("login", { login, password });
  return response.data;
};

export const logout = async () => {
  let response = await Axios.get("logout");
  return response.data;
};
export const addUser = async (user) => {
  let response = await Axios.post("addUser", user);
  return response.data;
};
export const addGroup = async (group) => {
  let response = await Axios.post("addGroup", group);
  return response.data;
};

export const fetchUsers = async () => {
  let response = await Axios.get("/users");
  return response.data.users;
};
export const fetchGroups = async () => {
  let response = await Axios.get("/groups");
  return response.data;
};
export const removeUser = async (id) => {
  let response = await Axios.delete(`/user/${id}`);
  return response.data;
};
export const fetchStudents = async () => {
  let response = await Axios.get("/students");
  return response.data.students;
};
export const fetchTests = async () => {
  let response = await Axios.get("/allTests");
  return response.data.tests;
};
export const fetchTest = async (id) => {
  let response = await Axios.get(`/test/${id}`);
  return response.data;
};
export const checkQuestion = async (testId, questId) => {
  let response = await Axios.get(`/checkQuestion/${testId}/${questId}`);
  return response.data;
};

export const fetchTeachers = async () => {
  let response = await Axios.get("/teachers");
  return response.data;
};
export const removeGroup = async (id) => {
  let response = await Axios.delete(`/group/${id}`);
  return response.data;
};
export const updateStudent = async (stud) => {
  let { name, surname, group } = stud;
  let response = await Axios.put(`/updateStudent/${stud.id}`, {
    name,
    surname,
    group,
  });
  return response.data;
};
export const addTest = async (test) => {
  let response = await Axios.post("addTest", test);
  return response.data;
};
