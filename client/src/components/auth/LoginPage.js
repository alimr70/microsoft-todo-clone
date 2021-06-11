import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginSubmit } from "../../redux/utils/utils";
import Loading from "./Loading";
import { useHistory } from "react-router";

const LoginPage = () => {
  const history = useHistory();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isInDev =
    window.location.origin === "http://localhost:3000"
      ? process.env.REACT_APP_API_URL
      : "";
  return (
    <div className="home-page-container">
      <div className="home-page">
        {isLoading ? <Loading /> : ""}
        <SocialMediaBtn
          platform="Google"
          imgSrc="./img/btn_google_dark_normal_ios.svg"
          url={`${isInDev}auth/google`}
        />
        <SocialMediaBtn
          platform="Twitter"
          imgSrc="./img/Twitter_social_icons_circle_blue.png"
          url={`${isInDev}auth/twitter`}
        />
        <div className="divider">
          <span className="dividerLine"></span>
          <span className="dividerText">OR</span>
          <span className="dividerLine"></span>
        </div>
        <LoginForm />
        <p>
          Don't have an account?
          <span
            style={{ cursor: "pointer" }}
            className="social-title"
            onClick={() => {
              history.push("/signup");
            }}>
            Sign Up!
          </span>
        </p>
      </div>
    </div>
  );
};

const SocialMediaBtn = ({ platform, imgSrc, url }) => {
  return (
    <div
      className="social-button"
      onClick={() => {
        window.open(url, "_self");
      }}>
      <div className="social-icon">
        <img src={imgSrc} alt={"Continue with " + platform} />
      </div>
      <p className="social-title">Continue with {platform}</p>
    </div>
  );
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="login-form"
      onSubmit={(e) =>
        handleLoginSubmit(e, username, password, dispatch, history)
      }>
      <div className="form-input social-button">
        <div className="social-icon">
          <img src="./img/email.svg" alt="email" />
        </div>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="username"
        />
      </div>
      <div className="form-input social-button">
        <div className="social-icon">
          <img src="./img/lock.svg" alt="password" />
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
      </div>
      <button className="social-button social-login-button" type="submit">
        Log In
      </button>
    </form>
  );
};

export default LoginPage;
