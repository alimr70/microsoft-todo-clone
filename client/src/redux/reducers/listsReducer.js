import DummyData from "../DummyData";

const initialState =
  process.env.NODE_ENV !== "production" ? DummyData.Lists : [];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_LIST":
      return [
        ...state,
        {
          id: action.payload.id,
          title: action.payload.title,
        },
      ];

    case "EDIT_LIST_TITLE":
      const foundEditingList = state.find(
        (list) => list.id === action.payload.id
      );
      const newEditingState = state.filter(
        (list) => list.id !== action.payload.id
      );
      return [
        ...newEditingState,
        {
          ...foundEditingList,
          title: action.payload.title,
        },
      ];

    case "DELETE_LIST":
      const newDeleteState = state.filter(
        (list) => list.id !== action.payload.id
      );
      return [...newDeleteState];

    default:
      return state;
  }
};

export default listsReducer;
