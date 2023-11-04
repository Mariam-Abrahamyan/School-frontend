import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachersAction } from "../Users/Users.slice";

const Teachers = () => {
  const teachers = useSelector((state) => state.users.teachers);
  console.log(teachers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeachersAction());
  }, []);
  return (
    <div className="row">
      <h1>Teachers</h1>
      <table
        className="table table-dark table-bordered"
        style={{ width: "70%" }}
      >
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>surname</th>
            <th>groups</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => {
            return (
              <tr key={teacher.id}>
                <td>{teacher.id}</td>
                <td>{teacher.name}</td>
                <td>{teacher.surname}</td>
                <td>
                  <table className="table table-info">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>students</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teacher.groups.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                              {item.students.map((student) => {
                                return (
                                  <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.surname}</td>
                                  </tr>
                                );
                              })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </td>
                <td>
                  {
                    // elm.group && elm.group.students.name
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Teachers;
