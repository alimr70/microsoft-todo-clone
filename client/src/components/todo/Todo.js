import LeftColumn from "./LeftColumn";
import CenterColumn from "./CenterColumn";
import RightColumn from "./RightColumn";
import { Route } from "react-router";

const Todo = () => {
  return (
    <>
      <LeftColumn />
      <Route path={`${process.env.PUBLIC_URL}/todo/:listId`}>
        <CenterColumn />
      </Route>
      <Route path={`${process.env.PUBLIC_URL}/todo/:listId/:taskId`}>
        <RightColumn />
      </Route>
    </>
  );
};

export default Todo;
