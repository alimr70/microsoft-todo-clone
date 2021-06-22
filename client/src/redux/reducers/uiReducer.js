const initalState = {
  isLeftColOpen: false,
  isRightColOpen: false,
};

const uiReducer = (state = initalState, action) => {
  switch (action.type) {
    case "OPEN_LEFT_COL":
      return {
        ...state,
        isLeftColOpen: true,
      };

    case "CLOSE_LEFT_COL":
      return {
        ...state,
        isLeftColOpen: false,
      };

    case "OPEN_RIGHT_COL":
      return {
        ...state,
        isRightColOpen: true,
      };

    case "CLOSE_RIGHT_COL":
      return {
        ...state,
        isRightColOpen: false,
      };

    default:
      return state;
  }
};

export default uiReducer;
