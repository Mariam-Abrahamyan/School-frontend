import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersAction,
  removeUserAction,
} from "../../features/admin/Users/Users.slice";

const UserList = () => {
  const users = useSelector((state) => state.users.items);
  const error = useSelector((state) => state.users.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, []);

  const handleUserDelete = (userId) => {
    dispatch(removeUserAction(userId));
  };
  if (error) {
    return <p>error:{error}</p>;
  }

  return (
    <div className="row">
      <div className="col-md-6">
        {error && <p>error: {error}</p>}
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th>name</th>
              <th>surname</th>
              <th>login</th>
              <th>type</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((elm) => {
              return (
                <tr key={elm.id}>
                  <td>{elm.name}</td>
                  <td>{elm.surname}</td>
                  <td>{elm.login}</td>
                  <td>{elm.type}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleUserDelete(elm.id)}
                    >
                      delete
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
export default UserList;
