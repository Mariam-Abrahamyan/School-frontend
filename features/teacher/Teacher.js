import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import { fetchTeachersAction } from "../admin/Users/Users.slice";

const Teacher = () => {
  const { loggedInTeacher } = useOutletContext();
  const dispatch = useDispatch();

  const { account } = useOutletContext();
  

  return (
    <div>
      <div>
        <h1>Teacher</h1> <p>Name:{account.name}</p>{" "}
        <p>Surname:{account.surname}</p>
        <h2>Groups:</h2>
        <ul>
          {account.groups.map((group) => (
            <li key={group.id}>{group.name}</li>
          ))}
        </ul>
        <h2>Students:</h2>
        <ul>
          {account.groups.flatMap((group) =>
            group.students.map((student) => (
              <li key={student.id}>
                {student.name} {student.surname}
              </li>
            )),
          )}
        </ul>
      </div>
    </div>
  );
};
export default Teacher;
