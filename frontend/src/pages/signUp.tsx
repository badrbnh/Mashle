import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import signUp_png from "../assets/signUp-picture.png";
import "../styles/signUp.css";

interface IFormInput {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function signUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className="signUp-container">
      <div className="signUp-first-half">
        <img src={signUp_png} alt="" />
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register("username", { required: true })}
                  placeholder="Username"
                  style={{ borderColor: errors.username ? "red" : "" }}
                />

                <input
                  {...register("firstName", { required: true })}
                  placeholder="First Name"
                  style={{ borderColor: errors.firstName ? "red" : "" }}
                />

                <input
                  {...register("lastName", { required: true })}
                  placeholder="Last Name"
                  style={{ borderColor: errors.lastName ? "red" : "" }}
                />

                <input
                  {...register("email", { required: true })}
                  placeholder="Email"
                  style={{ borderColor: errors.email ? "red" : "" }}
                />

                <input
                  {...register("password", { required: true })}
                  placeholder="Passowrd"
                  style={{ borderColor: errors.password ? "red" : "" }}
                />

                <input
                  {...register("confirmPassword", { required: true })}
                  placeholder="Confirm Password"
                  style={{ borderColor: errors.confirmPassword ? "red" : "" }}
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

export default signUp;
