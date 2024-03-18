import { useForm, SubmitHandler } from "react-hook-form";
import {  useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

import login_png from "../assets/login-picture.png";
import "../styles/login.css";
import { loginUser, reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/spnner";

type Inputs = {
  username: string;
  password: string;
};


function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { isLoading, isSuccess, isErrored, message, user } = useSelector((state: RootState) => state.auth);


  const onSubmit: SubmitHandler<Inputs> = (data) => {
      dispatch(loginUser(data));

  };

  useEffect(() => {
    if (isErrored) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isErrored, isSuccess, user, message, navigate, dispatch]);

  return (
    <div className="login-container">
      <div className="login-first-half">
        <div className="form-container">
          <h1>Login to your account</h1>
          <p>
            continue tracking your progress after logging in to your account.
          </p>
          <div className="google-login"></div>
          <div className="facebook-login"></div>
          <div className="splitting-line">
            <div className="left-line"></div>
            <p>OR</p>
            <div className="right-line"></div>
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
            <div className="create-account">
              <p>
                Don't have an accont?{" "}
                <Link to={"/register"} className="signUp-link">
                  <span>Create one now.</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="login-second-half">
        <img src={login_png} alt="" />
      </div>
    </div>
  );
}

export default Login;
