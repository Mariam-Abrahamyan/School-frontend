import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUserAction } from "../../features/admin/Users/Users.slice";

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const handleAdd = (data) => {
    console.log(data);
    dispatch(addUserAction(data));
  };

  return (
    <div className="row">
      <h3>AddUser</h3>
      <div className="col-md-5">
        <form onSubmit={handleSubmit(handleAdd)}>
          <div>
            <label>name</label>
            <input {...register("name")} className="form-control" />
          </div>
          <div>
            <label>surname</label>
            <input {...register("surname")} className="form-control" />
          </div>
          <div>
            <label>login</label>
            <input {...register("login")} className="form-control" />
          </div>
          <div>
            <label>password</label>
            <input
              {...register("password")}
              type="password"
              className="form-control"
            />
          </div>
          <div>
            <label>type</label>
            <select className="select-control" {...register("type")}>
              <option></option>
              <option>admin</option>
              <option>teacher</option>
              <option>student</option>
            </select>
          </div>
          <br />
          <div>
            <button className="btn btn-primary" type="submit">
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddUser;
