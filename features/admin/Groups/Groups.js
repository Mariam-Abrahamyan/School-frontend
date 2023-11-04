import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddGroup from "../../../components/admin/AddGroup";
import GroupList from "../../../components/admin/GroupList";
const Groups = () => {
  return (
    <div>
      <div className="row">
        <h1>Groups</h1>
        <AddGroup />
        <GroupList />
      </div>
    </div>
  );
};

export default Groups;
