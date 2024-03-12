import { useForm, SubmitHandler } from "react-hook-form"
import login_png from "../assets/login-picture.png";
import "../styles/login.css";

type Inputs = {
  username: string
  password: string
}

function login() {

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  return (
    <div className="login-container">
      <div className="first-half">
        <div className="form-container">
        <h1>Login to your account</h1>
        <p>continue tracking your progress after logging in to your account.</p>
        <div className="google-login"></div>
        <div className="facebook-login"></div>
        <div className="splitting-line">
          <div className="left-line"></div>
          <p>OR</p>
          <div className="right-line"></div>
        </div>
        <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username", { required: true })} placeholder="Username" style={{borderColor: errors.username ? "red" : ""}}/>
        {errors.username && <span>This field is required</span>}
        <input {...register("password", { required: true })} type="password" placeholder="Password" style={{borderColor: errors.username ? "red" : ""}}/>
        {errors.password && <span>This field is required</span>}
        <button type="submit" >Login now</button>
      </form>
      <div className="create-account"><p>Don't have an accont? <span>Create one now.</span></p></div>
        </div>
        </div>
      </div>
      <div className="second-half">
        <img src={login_png} alt="" />
      </div>
    </div>
  );
}

export default login;
