import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { signinAction } from "./Login.slice";
import { Axios } from "../../services/api";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.login.error);
  const navigate = useNavigate();

  const handleLogin = (data) => {
    dispatch(signinAction(data))
      .unwrap()
      .then((response) => {
        console.log(response);
        if (response.status == "ok") {
          if (response.type == "admin") {
            navigate("/admin");
          } else if (response.type == "teacher") {
            navigate("/teacher");
          } else if (response.type == "student") {
            navigate("/student");
          }
        }
      });
  };

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm="6">
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="d-flex flex-row ps-5 pt-5">
              <MDBIcon
                fas
                icon="crow fa-3x me-3"
                style={{ color: "#709085" }}
              />
              <span className="h1 fw-bold mb-0">School</span>
            </div>

            <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
              <h3
                className="fw-normal mb-3 ps-5 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Log in
              </h3>

              <MDBInput
                {...register("login")}
                wrapperClass="mb-4 mx-5 w-100"
                label="Email address"
                id="formControlLg"
                type="text"
                size="lg"
              />
              <MDBInput
                {...register("password")}
                wrapperClass="mb-4 mx-5 w-100"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
              />

              <button
                className="mb-4 px-5 mx-5 w-100 btn  btn-lg btn-info"
                color="info"
                size="lg"
              >
                Login
              </button>
              <p className="small mb-5 pb-lg-3 ms-5">
                <a class="text-muted" href="#!">
                  Forgot password?
                </a>
              </p>
              <p className="ms-5">
                Don't have an account?{" "}
                <a href="#!" class="link-info">
                  Register here
                </a>
              </p>
            </div>
          </form>
        </MDBCol>

        <MDBCol sm="6" className="d-none d-sm-block px-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login image"
            className="w-100"
            style={{ objectFit: "cover", objectPosition: "left" }}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
