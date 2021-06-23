import DummyData from "../DummyData";

const initialState =
  process.env.NODE_ENV !== "production" ? DummyData.Tasks : [];

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADED_TASKS_STATE":
      return [...action.payload.Tasks];

    case "ADD_TASK":
      return [
        ...state,
        {
          id: action.payload.id,
          title: action.payload.title,
          isChecked: false,
          addedToMyDay: action.payload.addedToMyDay,
          Important: action.payload.Important,
          Planned: action.payload.Planned,
          parentListId: action.payload.parentListId,
          createdAt: action.payload.createdAt,
        },
      ];

    case "EDIT_TASK_TITLE":
      const foundEditingTask = state.find(
        (task) => task.id === action.payload.id
      );
      const newEditingState = state.filter(
        (task) => task.id !== action.payload.id
      );
      return [
        ...newEditingState,
        {
          ...foundEditingTask,
          title: action.payload.title,
        },
      ];

    case "CHECK_TASK":
      const foundTask = state.find((task) => task.id === action.payload.id);
      const newState = state.filter((task) => task.id !== action.payload.id);
      return [
        ...newState,
        {
          ...foundTask,
          isChecked: action.payload.isChecked,
        },
      ];

    case "IMPORTANT_TASK":
      const foundImportanTask = state.find(
        (task) => task.id === action.payload.id
      );
      const newImportantState = state.filter(
        (task) => task.id !== action.payload.id
      );
      return [
        ...newImportantState,
        {
          ...foundImportanTask,
          Important: action.payload.Important,
        },
      ];

    case "ADD_TO_MY_DAY":
      const foundMyDayTask = state.find(
        (task) => task.id === action.payload.id
      );
      const newMyDayState = state.filter(
        (task) => task.id !== action.payload.id
      );
      return [
        ...newMyDayState,
        {
          ...foundMyDayTask,
          addedToMyDay: action.payload.addedToMyDay,
        },
      ];

    case "DUE_DATE":
      const foundDueDateTask = state.find(
        (task) => task.id === action.payload.id
      );
      const newDueDateState = state.filter(
        (task) => task.id !== action.payload.id
      );
      return [
        ...newDueDateState,
        {
          ...foundDueDateTask,
          Planned: action.payload.Planned,
        },
      ];

    case "DELETE_TASK":
      const newDeleteState = state.filter(
        (task) => task.id !== action.payload.id
      );
      return [...newDeleteState];

    default:
      return state;
  }
};

export default tasksReducer;
