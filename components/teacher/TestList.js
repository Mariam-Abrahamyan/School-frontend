import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestsAction } from "./Test.slice";

const TestList = () => {
  const tests = useSelector((state) => state.tests.items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTestsAction());
  }, []);
  return (
    <div>
      <h3>TestList</h3>
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th>name</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => {
            return (
              <tr key={test.id}>
                <td>{test.name}</td>

                <td>
                  <button>delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default TestList;
