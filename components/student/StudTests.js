import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {  fetchTestsAction } from "../teacher/Test.slice";
import { Link } from "react-router-dom";

const StudTests = () => {
  const tests = useSelector((state) => state.tests.items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTestsAction(tests));
  }, []);
  
  return (
    <div>
      <h3>My Tests</h3>
    
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th>name</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => {
            return (
              <tr key={test.id}>
                <td>{test.name}</td>
                <td>
                  <Link to={"/student/test/start/" + test.id}>Start Test</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
    </div>
  );
};
export default StudTests;
