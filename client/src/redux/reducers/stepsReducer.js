import DummyData from "../DummyData";

const initialState =
  process.env.NODE_ENV !== "production" ? DummyData.Steps : [];

const stepsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_STEP":
      return [
        ...state,
        {
          parentTaskId: action.payload.parentTaskId,
          id: action.payload.id,
          title: action.payload.title,
          isChecked: false,
        },
      ];

    case "CHECK_STEP":
      const foundStep = state.find((step) => step.id === action.payload.id);
      const newState = state.filter((step) => step.id !== action.payload.id);
      return [
        ...newState,
        {
          ...foundStep,
          isChecked: action.payload.isChecked,
        },
      ];

    case "EDIT_STEP_TITLE":
      const foundEditingStep = state.find(
        (step) => step.id === action.payload.id
      );
      const newEditingState = state.filter(
        (step) => step.id !== action.payload.id
      );
      return [
        ...newEditingState,
        {
          ...foundEditingStep,
          title: action.payload.title,
        },
      ];

    case "DELETE_STEP":
      const newDeleteState = state.filter(
        (step) => step.id !== action.payload.id
      );
      return [...newDeleteState];

    default:
      return state;
  }
};

export default stepsReducer;
