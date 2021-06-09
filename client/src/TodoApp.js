import React from "react";
import Tasks from "./components/center/Tasks";
import Toolbar from "./components/left/Toolbar";
import Detailbar from "./components/right/Detailbar";

import * as actions from "./redux/actions/actions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  window.addEventListener("resize", () => {
    dispatch(actions.setScreenWidth(document.documentElement.clientWidth));
  });

  return (
    <div className="App">
      <Toolbar />
      <Tasks />
      <Detailbar />
    </div>
  );
}

export default App;
