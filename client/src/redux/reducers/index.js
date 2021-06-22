import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import listsReducer from "./listsReducer";
import tasksReducer from "./tasksReducer";
import stepsReducer from "./stepsReducer";
import uiReducer from "./uiReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  ui: uiReducer,
  lists: listsReducer,
  tasks: tasksReducer,
  steps: stepsReducer,
  auth: authReducer,
  error: errorReducer,
});

export default rootReducer;
