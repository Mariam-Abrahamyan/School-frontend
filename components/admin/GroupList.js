import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGroupsAction,
  removeGroupAction,
} from "../../features/admin/Groups/Groups.slice";


const GroupList = () => {
  const groups = useSelector((state) => state.groups.items);
  

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGroupsAction());
  }, []);

  const handleGroupDelete = (groupId) => {
    dispatch(removeGroupAction(groupId));
  };

  return (
    <div>
      <h3>GroupList</h3>
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th>Group's name</th>
            <th>Teacher</th>
            <th>Students</th>
            <th>schedule</th>
            <th>hours</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((elm) => {
            return (
              <tr key={elm.id}>
                <td>{elm.id}</td>
                <td>
                  {elm.teacher.name} {elm.teacher.surname}
                </td>
                <td>
                  {elm.students.map((item) => {
                    return (
                      <p key={item.id}>
                        {item.name} {item.surname}
                      </p>
                    );
                  })}
                </td>
                <td>
                  {elm.schedule == "v1"
                    ? "Monday, Wednesday, Friday"
                    : "Tuesday, Thursday, Saturday"}
                </td>
                <td>
                  {
                    elm.hours == "v1"
                      ? "09:00-11:00"
                      : elm.hour == "v2"
                      ? "11:00-13:00"
                      : elm.hour == "v3"
                      ? "13:00-15:00"
                      : elm.hour == "v4"
                      ? "15:00-17:00"
                      : "17:00-19:00"
                    
                  }
                </td>
                <td>
                  <button onClick={() => handleGroupDelete(elm.id)}>
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default GroupList;
