import { useForm, SubmitHandler } from "react-hook-form";
import {  useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

import login_png from "../assets/login-picture.png";
import "../styles/login.css";
import { loginUser, reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/spnner";
import { useMediaQuery } from "@mui/material";

export type Inputs = {
  username: string;
  password: string;
};


function Login() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { isLoading, isSuccess, isErrored, message, user } = useSelector((state: any) => state.auth);


  const onSubmit: SubmitHandler<Inputs> = (data) => {
      dispatch(loginUser(data));

  };

  useEffect(() => {
    if (isErrored) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess || user) {
      navigate("/");
    }
  }, [isErrored, isSuccess, user, message, navigate, dispatch]);

  return (
    <div className={!isMobile ? "login-container" : "login-container-m"}>
      <div className={!isMobile ? "login-first-half" : "login-first-half-m"}>
        <div className={!isMobile ? "form-container" : "form-container-m"}>
          <h1>Login to your account</h1>
          <p>
            continue tracking your progress after logging in to your account.
          </p>
          <div className={!isMobile ? "google-login" : "google-login-m"}></div>
          <div className={!isMobile ? "facebook-login" : "facebook-login-m"}></div>
          <div className={!isMobile ? "splitting-line" : "splitting-line-m"}>
            <div className={!isMobile ? "left-line" : "left-line-m"}></div>
            <p>OR</p>
            <div className={!isMobile ? "right-line" : "right-line-m"}></div>
          </div>
          <div>
            {isLoading && <Spinner />}
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("username", { required: true })}
                placeholder="Username"
                style={{ borderColor: errors.username ? "red" : "" }}
              />
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                style={{ borderColor: errors.username ? "red" : "" }}
              />
              <button type="submit">Login now</button>
            </form>
            <div className={!isMobile ? "create-account" : "create-account-m"}>
              <p>
                Don't have an accont?{" "}
                <Link to={"/register"} className={!isMobile ? "signUp-link" : "signUp-link-m"}>
                  <span>Create one now.</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {!isMobile ? <div className="login-second-half">
        <img src={login_png} alt="" />
      </div> : null}
    </div>
  );
}

export default Login;
