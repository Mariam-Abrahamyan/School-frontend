import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsAction, updateStudentAction } from "../Users/Users.slice";
import { Axios } from "../../../services/api";
import { fetchGroupsAction } from "../Groups/Groups.slice";

const Students = () => {
  const students = useSelector((state) => state.users.students);
  const groups = useSelector((state) => state.groups.items);
  console.log(groups);
  const [edit, setEdit] = useState({});

  const dispatch = useDispatch();
  const handleUpdate = () => {
    dispatch(updateStudentAction(edit))
      .unwrap()
      .then((r) => {
        setEdit({});
      });
  };

  useEffect(() => {
    dispatch(fetchStudentsAction());
    dispatch(fetchGroupsAction());
  }, []);

  return (
    <div>
      <h1>Students </h1>
      <div className="row">
        <table className="table table-bordered" style={{ width: "70%" }}>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>surname</th>
              <th>group</th>
              <th>teacher</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((elm) => {
              return elm.id != edit.id ? (
                <tr key={elm.id}>
                  <td>{elm.id}</td>
                  <td>{elm.name}</td>
                  <td>{elm.surname}</td>
                  <td>{elm.group && elm.group.name}</td>
                  <td>
                    {elm.group &&
                      elm.group.teacher.name + " " + elm.group.teacher.surname}
                  </td>
                  <td>
                    <button
                      onClick={() => setEdit({ ...elm, group: elm.group?.id })}
                      className="btn btn-success"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={elm.id}>
                  <td>{elm.id}</td>
                  <td>
                    <input
                      value={edit.name}
                      onChange={(e) =>
                        setEdit({ ...edit, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={edit.surname}
                      onChange={(e) =>
                        setEdit({ ...edit, surname: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <select
                      value={edit.group}
                      onChange={(e) =>
                        setEdit({ ...edit, group: e.target.value })
                      }
                    >
                      <option></option>
                      <option value="-1">No group</option>
                      {groups.map((item) => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td>
                    {elm.group?.teacher.name} {elm.group?.teacher.surname}
                  </td>
                  <td>
                    <button onClick={handleUpdate} className="btn btn-warning">
                      save
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
