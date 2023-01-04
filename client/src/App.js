import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import * as actions from "./redux/actions/actions";
import LoginPage from "./components/auth/LoginPage";
import Profile from "./components/auth/Profile";
import SignUpPage from "./components/auth/SignUpPage";
import HomePage from "./components/auth/HomePage";
import Loading from "./components/auth/Loading";
import Todo from "./components/todo/Todo";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(actions.getAlreadyLoggedinUserData());

    if (isAuthenticated) {
      dispatch(actions.getUserData(token));
    }
  }, [dispatch, isAuthenticated, token]);

  return (
    <Router>
      <div className='App'>
        {isLoading ? <Loading /> : ""}
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`}>
            <HomePage />
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/login`}>
            {isAuthenticated ? (
              <Redirect to={`${process.env.PUBLIC_URL}`} />
            ) : (
              <LoginPage />
            )}
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/signup`}>
            {isAuthenticated ? (
              <Redirect to={`${process.env.PUBLIC_URL}`} />
            ) : (
              <SignUpPage />
            )}
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/profile`}>
            {isAuthenticated ? (
              <Profile />
            ) : (
              <Redirect to={`${process.env.PUBLIC_URL}/login`} />
            )}
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/todo`}>
            <Todo />
            <Redirect to={`${process.env.PUBLIC_URL}/todo/Tasks`} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
