import AddUser from "../../../components/admin/AddUser";
import UserList from "../../../components/admin/Users";

const Users = () => {
  return (
    <div>
      <h1>Users</h1>
      <div className="row">
        <div className="col-md-4">
          <UserList />
          <AddUser />
        </div>
      </div>
    </div>
  );
};

export default Users;
