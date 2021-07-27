import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Logout from "./Logout";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.username);
  const history = useHistory();
  return (
    <div className="home-page-container">
      <div className="home-page">
        <h1>Welcome{isAuthenticated ? `, ${username}` : ""}</h1>
        <h3>This is Microsoft's ToDo clone.</h3>
        <p>
          A usual project, when a junior programmer starts thinking of building
          a resume, is a to do list app. But the standard to do applications
          anyone make is too simple and I did not like this idea. So, I
          challenged myself and thought of something that normally I would not
          find a tutorial for it and more than a simple to do list.
        </p>
        {isAuthenticated ? (
          <>
            <div
              className="social-button"
              onClick={() => {
                history.push("/todo");
              }}>
              <p className="social-title">Open To Do App</p>
            </div>
            <div
              className="social-button"
              onClick={() => {
                history.push("/profile");
              }}>
              <p className="social-title">Visit your profile</p>
            </div>
            <Logout />
          </>
        ) : (
          <>
            <div
              className="social-button social-login-button"
              onClick={() => {
                history.push("/login");
              }}>
              Log In
            </div>
            <div
              className="social-button social-login-button"
              onClick={() => {
                history.push("/signup");
              }}>
              Sign Up
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
