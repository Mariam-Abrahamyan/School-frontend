import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminNav from "./components/shared/AdminNav";
import Groups from "./features/admin/Groups/Groups";
import Students from "./features/admin/Students/Student";
import Teachers from "./features/admin/Teachers/Teachers";
import Users from "./features/admin/Users/Users";
import Login from "./features/auth/Login";
import UserList from "./components/admin/Users";
import Teacher from "./features/teacher/Teacher";
import TeacherNav from "./components/shared/TeacherNav";
import { Auth } from "./components/shared/Auth";
import StudentNav from "./components/shared/StudentNav";
import Student from "./features/student/Student";
import Tests from "./features/Tests/Tests";
import StudTests from "./components/student/StudTests";
import StudentsTests from "./features/Tests/StudentsTests";
import StartTest from "./components/student/StartTest";

export const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />

        <Route path="" element={<Auth />}>
          <Route path="admin" element={<AdminNav />}>
            <Route path="" element={<Users />} />
            <Route path="groups" element={<Groups />} />
            <Route path="students" element={<Students />} />
            <Route path="teachers" element={<Teachers />} />
          </Route>
          <Route path="teacher" element={<TeacherNav />}>
            <Route path="" element={<Teacher />}></Route>
            <Route path="tests" element={<Tests />}></Route>
          </Route>
          <Route path="student" element={<StudentNav />}>
            <Route path="" element={<Student />}></Route>
            <Route path="tests" element={<StudTests />}></Route>
            <Route path="test/start/:id/" element={<StartTest />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
