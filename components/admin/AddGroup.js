import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeachersAction,
  
} from "../../features/admin/Users/Users.slice";
import { addGroupAction } from "../../features/admin/Groups/Groups.slice";


const AddGroup = () => {
  const [group, setGroup] = useState({
    name: "",
    teacher: "",
    students: [],
    schedule: "",
    hours: "",
  });
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.users.teachers);
  const studs = useSelector((state) => state.groups.availableStudents);
  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addGroupAction(group));
  };

  useEffect(() => {
    dispatch(fetchTeachersAction());
  }, []);

  return (
    <div>
      <h3>AddGroup</h3>
      <form onSubmit={handleAdd}>
        <div>
          <label>name</label>
          <input
            value={group.name}
            onChange={(e) => setGroup({ ...group, name: e.target.value })}
            className="form-control"
          />
        </div>
        <div>
          <label>teacher</label>
          <select
            value={group.teacher}
            onChange={(e) => setGroup({ ...group, teacher: e.target.value })}
            required
          >
            {teachers.map((elm) => {
              return (
                <option key={elm.id} value={elm.id}>
                  {elm.name} {elm.surname}
                </option>
              );
            })}
          </select>
        </div>
        <br />
        <div>
          <label>students ({group.students.length})</label>
          <select
            onChange={(e) =>
              setGroup({
                ...group,
                students: [...group.students, +e.target.value],
              })
            }
          >
            {studs.map((elm) => {
              return (
                <option
                  key={elm.id}
                  disabled={group.students.find((x) => x == elm.id)}
                  value={elm.id}
                >
                  {elm.name} {elm.surname}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <br />
          <label>schedule</label>
          <select
            value={group.schedule}
            onChange={(e) => setGroup({ ...group, schedule: e.target.value })}
            required
          >
            <option></option>
            <option value="v1">Monday,Wednesday,Friday</option>
            <option value="v2">Tuesday,Thursday,Saturday</option>
          </select>
        </div>
        <br />
        <div>
          <label>hours</label>
          <select
            value={group.hours}
            onChange={(e) => setGroup({ ...group, hours: e.target.value })}
            required
          >
            <option></option>
            <option value="v1">09:00-11:00</option>
            <option value="v2">11:00-13:00</option>
            <option value="v3">13:00-15:00</option>
            <option value="v4">15:00-17:00</option>
            <option value="v5">17:00-19:00</option>
          </select>
        </div>
        <br />
        <button>save</button>
      </form>
    </div>
  );
};
export default AddGroup;
