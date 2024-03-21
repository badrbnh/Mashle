import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import signUpPicture from "../assets/signUp-picture.png";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../features/auth/authSlice";
import { RootState } from "../app/store";
import "../styles/signUp.css";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/spnner";

interface FormInput {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  re_password: string;
}

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInput>();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { isLoading, isSuccess, isErrored, message, user } = useSelector((state: RootState) => state.auth);

  const password = watch("password");
  const re_password = watch("re_password");

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    if (password !== re_password) {
      alert("Passwords do not match");
    } else {
      dispatch(registerUser(data));
    }
  };

  useEffect(() => {
    if (isErrored) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/");
      toast.success("Account created successfully");
    }
    dispatch(reset());
  }, [isErrored, isSuccess, user, message, navigate, dispatch]);

  return (
    <div className="signUp-container">
      <div className="signUp-first-half">
        <img src={signUpPicture} alt="" />
      </div>
      <div className="signUp-second-half">
        <div>
          <div className="form-container">
            <h1>Create your account</h1>
            <p>continue tracking your progress after creating your account.</p>
            <div className="google-signUp"></div>
            <div className="facebook-signUp"></div>
            <div className="splitting-line">
              <div className="left-line"></div>
              <p>OR</p>
              <div className="right-line"></div>
            </div>
            
            <div>
            {isLoading && <Spinner/>}
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register("username", { required: true })}
                  placeholder="Username"
                  style={{ borderColor: errors.username ? "red" : "" }}
                />

                <input
                  {...register("first_name", { required: true })}
                  placeholder="First Name"
                  style={{ borderColor: errors.first_name ? "red" : "" }}
                />

                <input
                  {...register("last_name", { required: true })}
                  placeholder="Last Name"
                  style={{ borderColor: errors.last_name ? "red" : "" }}
                />

                <input
                  {...register("email", { required: true })}
                  placeholder="Email"
                  style={{ borderColor: errors.email ? "red" : "" }}
                />

                <input
                  {...register("password", { required: true })}
                  placeholder="Passowrd" type="password"
                  style={{ borderColor: errors.password ? "red" : "" }}
                />

                <input
                  {...register("re_password", { required: true })}
                  placeholder="Confirm Password" type="password"
                  style={{ borderColor: errors.re_password ? "red" : "" }}
                />
                <button type="submit"> Create Now </button>
              </form>
              <div className="have-account">
              <p>
                Already have an accont?{" "}
                <Link to={"/login"} className="login-link">
                  <span>Sign In.</span>
                </Link>
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
