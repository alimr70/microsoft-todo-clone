import axios from "axios";
/* -------------------------------------------------------------------------- */
/*                                 Auth actions                               */
/* -------------------------------------------------------------------------- */

export const userLoading = () => {
  return { type: "USER_LOADING" };
};

export const loginSuccess = (token, username, image) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: {
      token,
      username,
      image,
    },
  };
};

export const setToken = (token) => {
  return {
    type: "SET_TOKEN",
    payload: {
      token,
    },
  };
};

export const loginFail = () => {
  return { type: "LOGIN_FAIL" };
};

export const signupFail = () => {
  return { type: "SIGNUP_FAIL" };
};

export const logoutSuccess = () => {
  return { type: "LOGOUT_SUCCESS" };
};

export const getAlreadyLoggedinUserData = () => async (dispatch) => {
  dispatch(userLoading());
  try {
    const awaitedToken = await axios({
      method: "get",
      url: `/auth/refresh`,
      withCredentials: true,
    });

    if (awaitedToken.data.token) {
      const loadUserInfo = await axios({
        method: "get",
        url: `/auth/profile`,
        headers: {
          Authorization: `Bearer ${awaitedToken.data.token}`,
        },
        withCredentials: true,
      });

      if (loadUserInfo.data) {
        const { token, username, image } = loadUserInfo.data;
        dispatch(loginSuccess(token, username, image));
      } else {
        dispatch(loginFail());
      }
    }
  } catch (err) {
    dispatch(returnErrors(err.message));
    dispatch(loginFail());
  }
};

export const logout = () => async (dispatch) => {
  dispatch(userLoading());
  try {
    const logoutRequest = await axios({
      method: "get",
      url: "/auth/logout",
      withCredentials: true,
    });

    if (logoutRequest.status === 200) {
      dispatch(logoutSuccess());
    }
  } catch (err) {
    console.log(err);
  }
};

export const getUserData = (token) => async (dispatch) => {
  try {
    const res = await axios({
      method: "get",
      url: `/todo/getState`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (res.data) {
      const state = res.data;
      dispatch(setLoadedListsState(state.Lists));
      dispatch(setLoadedTasksState(state.Tasks));
      dispatch(setLoadedStepsState(state.Steps));
    }
  } catch (err) {
    console.log(err);
  }
};

/* -------------------------------------------------------------------------- */
/*                                Error actions                               */
/* -------------------------------------------------------------------------- */

export const returnErrors = (msg, status) => {
  return {
    type: "RETURN_ERRORS",
    payload: {
      msg,
      status,
    },
  };
};

export const clearErrors = () => {
  return { type: "CLEAR_ERRORS" };
};

/* -------------------------------------------------------------------------- */
/*                              TODO app actions                              */
/* -------------------------------------------------------------------------- */

/**
 * UI actions
 */
export const openLeftCol = () => {
  return {
    type: "OPEN_LEFT_COL",
  };
};

export const closeLeftCol = () => {
  return {
    type: "CLOSE_LEFT_COL",
  };
};

export const openRightCol = () => {
  return {
    type: "OPEN_RIGHT_COL",
  };
};

export const closeRightCol = () => {
  return {
    type: "CLOSE_RIGHT_COL",
  };
};

export const setScreenWidth = (screenWidth) => {
  return {
    type: "SET_SCREEN_WIDTH",
    payload: { screenWidth },
  };
};

/**
 * Lists actions
 */

const setLoadedListsState = (Lists) => {
  return {
    type: "SET_LOADED_LISTS_STATE",
    payload: { Lists },
  };
};

export const addListOnDB = (token, id, title) => async (dispatch) => {
  try {
    let data = {
      list: {
        id,
        title,
      },
    };

    let config = {
      method: "post",
      url: "/todo/addList",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      data,
    };

    const res = await axios(config);

    if (res.status === 200) {
      dispatch(getUserData(token));
    }
  } catch (err) {
    console.log(err);
  }
};

export const addList = (id, title) => {
  return {
    type: "ADD_LIST",
    payload: {
      id,
      title,
    },
  };
};

export const editListTitleOnDB = (token, id, title) => async (dispatch) => {
  try {
    let data = {
      list: {
        id,
        title,
      },
    };

    let config = {
      method: "post",
      url: "/todo/editList",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      data,
    };

    const res = await axios(config);

    if (res.status === 200) {
      dispatch(getUserData(token));
    }
  } catch (err) {
    console.log(err);
  }
};

export const editListTitle = (id, title) => {
  return {
    type: "EDIT_LIST_TITLE",
    payload: {
      id,
      title,
    },
  };
};

export const deleteListOnDB = (token, id) => async (dispatch) => {
  try {
    let data = {
      list: {
        id,
      },
    };

    let config = {
      method: "post",
      url: "/todo/deleteList",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      data,
    };

    const res = await axios(config);

    if (res.status === 200) {
      dispatch(getUserData(token));
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteList = (id) => {
  return {
    type: "DELETE_LIST",
    payload: {
      id,
    },
  };
};

/**
 * Tasks actions
 */

const setLoadedTasksState = (Tasks) => {
  return {
    type: "SET_LOADED_TASKS_STATE",
    payload: { Tasks },
  };
};

export const addTaskOnDB =
  (
    token,
    id,
    title,
    parentListId,
    createdAt,
    addedToMyDay,
    Important,
    Planned
  ) =>
  async (dispatch) => {
    try {
      let data = {
        task: {
          id,
          title,
          parentListId,
          createdAt,
          addedToMyDay,
          Important,
          Planned,
        },
      };

      let config = {
        method: "post",
        url: "/todo/addTask",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        data,
      };

      const res = await axios(config);

      if (res.status === 200) {
        dispatch(getUserData(token));
      }
    } catch (err) {
      console.log(err);
    }
  };

export const addTask = (
  id,
  title,
  parentListId,
  createdAt,
  addedToMyDay,
  Important,
  Planned
) => {
  return {
    type: "ADD_TASK",
    payload: {
      id,
      title,
      parentListId,
      createdAt,
      addedToMyDay,
      Important,
      Planned,
    },
  };
};

export const checkTaskOnDB = (token, id, isChecked) => async (dispatch) => {
  try {
    let data = {
      task: {
        id,
        isChecked,
      },
    };

    let config = {
      method: "post",
      url: "/todo/checkTask",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      data,
    };

    const res = await axios(config);

    if (res.status === 200) {
      dispatch(getUserData(token));
    }
  } catch (err) {
    console.log(err);
  }
};

export const checkTask = (id, isChecked) => {
  return {
    type: "CHECK_TASK",
    payload: {
      id,
      isChecked,
    },
  };
};

export const editTaskTitleOnDB = (token, id, title) => async (dispatch) => {
  try {
    let data = {
      task: {
        id,
        title,
      },
    };

    let config = {
      method: "post",
      url: "/todo/editTask",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      data,
    };

    const res = await axios(config);

    if (res.status === 200) {
      dispatch(getUserData(token));
    }
  } catch (err) {
    console.log(err);
  }
};

export const editTaskTitle = (id, title) => {
  return {
    type: "EDIT_TASK_TITLE",
    payload: {
      id,
      title,
    },
  };
};

export const addToMyDayOnDB = (token, id, addedToMyDay) => async (dispatch) => {
  try {
    let data = {
      task: {
        id,
        addedToMyDay,
      },
    };

    let config = {
      method: "post",
      url: "/todo/addToMyDay",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      data,
    };

    const res = await axios(config);

    if (res.status === 200) {
      dispatch(getUserData(token));
    }
  } catch (err) {
    console.log(err);
  }
};

export const addToMyDay = (id, addedToMyDay) => {
  return {
    type: "ADD_TO_MY_DAY",
    payload: {
      id,
      addedToMyDay,
    },
  };
};

export const dueDateOnDB = (token, id, Planned) => async (dispatch) => {
  try {
    let data = {
      task: {
        id,
        Planned,
      },
    };

    let config = {
      method: "post",
      url: "/todo/dueDate",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      data,
    };

    const res = await axios(config);

    if (res.status === 200) {
      dispatch(getUserData(token));
    }
  } catch (err) {
    console.log(err);
  }
};

export const dueDate = (id, Planned) => {
  return {
    type: "DUE_DATE",
    payload: {
      id,
      Planned,
    },
  };
};

export const importantOnDB = (token, id, Important) => async (dispatch) => {
  try {
    let data = {
      task: {
        id,
        Important,
      },
    };

    let config = {
      method: "post",
      url: "/todo/important",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      data,
    };

    const res = await axios(config);

    if (res.status === 200) {
      dispatch(getUserData(token));
    }
  } catch (err) {
    console.log(err);
  }
};

export const important = (id, Important) => {
  return {
    type: "IMPORTANT_TASK",
    payload: {
      id,
      Important,
    },
  };
};

export const deleteTaskOnDB = (token, id) => async (dispatch) => {
  try {
    let data = {
      task: {
        id,
      },
    };

    let config = {
      method: "post",
      url: "/todo/deleteTask",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      data,
    };

    const res = await axios(config);

    if (res.status === 200) {
      dispatch(getUserData(token));
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = (id) => {
  return {
    type: "DELETE_TASK",
    payload: {
      id,
    },
  };
};

/**
 * Steps actions
 */

const setLoadedStepsState = (Steps) => {
  return {
    type: "SET_LOADED_STEPS_STATE",
    payload: { Steps },
  };
};

export const addStepOnDB =
  (token, parentTaskId, id, title) => async (dispatch) => {
    try {
      let data = {
        step: { parentTaskId, id, title },
      };

      let config = {
        method: "post",
        url: "/todo/addStep",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        data,
      };

      const res = await axios(config);

      if (res.status === 200) {
        dispatch(getUserData(token));
      }
    } catch (err) {
      console.log(err);
    }
  };

export const addStep = (parentTaskId, id, title) => {
  return {
    type: "ADD_STEP",
    payload: {
      parentTaskId,
      id,
      title,
    },
  };
};

export const checkStepOnDB = (token, id, isChecked) => async (dispatch) => {
  try {
    let data = {
      step: {
        id,
        isChecked,
      },
    };

    let config = {
      method: "post",
      url: "/todo/checkStep",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      data,
    };

    const res = await axios(config);

    if (res.status === 200) {
      dispatch(getUserData(token));
    }
  } catch (err) {
    console.log(err);
  }
};

export const checkStep = (id, isChecked) => {
  return {
    type: "CHECK_STEP",
    payload: {
      id,
      isChecked,
    },
  };
};

export const editStepTitleOnDB = (token, id, title) => async (dispatch) => {
  try {
    let data = {
      step: {
        id,
        title,
      },
    };

    let config = {
      method: "post",
      url: "/todo/editStep",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      data,
    };

    const res = await axios(config);

    if (res.status === 200) {
      dispatch(getUserData(token));
    }
  } catch (err) {
    console.log(err);
  }
};

export const editStepTitle = (id, title) => {
  return {
    type: "EDIT_STEP_TITLE",
    payload: {
      id,
      title,
    },
  };
};

export const deleteStepOnDB = (token, id) => async (dispatch) => {
  try {
    let data = {
      step: {
        id,
      },
    };

    let config = {
      method: "post",
      url: "/todo/deleteStep",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      data,
    };

    const res = await axios(config);

    if (res.status === 200) {
      dispatch(getUserData(token));
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteStep = (id) => {
  return {
    type: "DELETE_STEP",
    payload: {
      id,
    },
  };
};
