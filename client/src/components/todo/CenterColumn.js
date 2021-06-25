import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isToday, isFutur } from "../../redux/utils/utils";
import * as actions from "../../redux/actions/actions";
import { nanoid } from "nanoid";

const CenterColumn = () => {
  let { listId } = useParams();
  const list = useSelector((state) => state.lists).find(
    (list) => list.id === listId
  );
  const listTitle = list === undefined ? listId : list.title;
  const tasks = useSelector((state) => state.tasks);
  const taskArr = getCurrentListTasks(listId, tasks);

  return (
    <>
      <div className="container container-center">
        <Overlay />
        <div className="center tasks">
          <TaskHeader listId={listId} listTitle={listTitle} />
          <div className="task-items">
            <div>
              <div>
                <CurrentListTasks listId={listId} taskArr={taskArr} />
              </div>
            </div>
          </div>
          <AddTask parentListId={listId} />
        </div>
      </div>
    </>
  );
};

const Overlay = () => {
  const dispatch = useDispatch();
  const isLeftColOpen = useSelector((state) => state.ui.isLeftColOpen);
  const isRightColOpen = useSelector((state) => state.ui.isRightColOpen);

  const [showOverlay, setshowOverlay] = useState(false);
  const [showBtn, setshowBtn] = useState(false);
  useEffect(() => {
    const handleWindowResize = () => {
      if (document.documentElement.clientWidth < 1020) {
        setshowOverlay(true);
        dispatch(actions.closeRightCol());
      } else {
        setshowOverlay(false);
        dispatch(actions.openRightCol());
      }
      if (document.documentElement.clientWidth < 800) {
        setshowBtn(true);
        dispatch(actions.closeLeftCol());
      } else {
        setshowBtn(false);
        dispatch(actions.openLeftCol());
      }
    };

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    // Clean up the component
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [dispatch]);

  const hideLeftOrNot = showBtn ? "btn overlay-btn" : "btn overlay-btn hide";
  const showOverlayOrNot =
    (showOverlay && isRightColOpen) || (showOverlay && isLeftColOpen)
      ? "overlay unhide"
      : "overlay";

  return (
    <>
      <button
        className={hideLeftOrNot}
        onClick={() => {
          isLeftColOpen
            ? dispatch(actions.closeLeftCol())
            : dispatch(actions.openLeftCol());
          dispatch(actions.closeRightCol());
        }}>
        <i className="icon">
          <img src={`${process.env.PUBLIC_URL}/img/ham-icon.svg`} alt="" />
        </i>
      </button>
      <div
        className={showOverlayOrNot}
        onClick={() => {
          dispatch(actions.closeLeftCol());
          dispatch(actions.closeRightCol());
        }}></div>
    </>
  );
};

const TaskHeader = ({ listId, listTitle }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const handleEnterkey = (e) => {
      if (e.key === "Enter") {
        // dispatch(actions.editListTitle(listId, text));
        dispatch(actions.editListTitleOnDB(token, listId, text));
        setIsEditing(false);
      }
    };
    if (document.getElementById("editList") !== null) {
      document
        .getElementById("editList")
        .addEventListener("keypress", handleEnterkey);
    }
    // Clean up the component
    return () => {
      if (document.getElementById("editList") !== null) {
        document
          .getElementById("editList")
          .removeEventListener("keypress", handleEnterkey);
      }
    };
  }, [dispatch, listId, text, isEditing, token]);

  return (
    <div className="tasks-toolbar">
      <div className="tasks-toolbar-title">
        {listTitle === "My Day" ||
        listTitle === "Important" ||
        listTitle === "Planned" ||
        listTitle === "Tasks" ? (
          <button className="btn task-item-title">
            <h1 className="list-title">{listTitle}</h1>
          </button>
        ) : isEditing ? (
          <div
            className="add-list"
            onBlur={() => {
              dispatch(actions.editListTitle(listId, text));
              setIsEditing(false);
            }}>
            <input
              id="editList"
              autoFocus
              onFocus={() => {
                setText(listTitle);
              }}
              type="text"
              name="editList"
              maxLength="255"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
        ) : (
          <button
            className="btn task-item-title editable-title"
            onFocus={() => {
              setIsEditing(true);
            }}>
            <h1 className="list-title">{listTitle}</h1>
          </button>
        )}
      </div>
    </div>
  );
};

const getCurrentListTasks = (listId, tasks) => {
  let filteredTasks = [];
  switch (listId) {
    case "My Day":
      tasks.map((task) => {
        return isToday(task.addedToMyDay) ? filteredTasks.push(task) : null;
      });
      break;

    case "Important":
      tasks.map((task) => {
        return task.Important ? filteredTasks.push(task) : null;
      });
      break;

    case "Planned":
      tasks.map((task) => {
        return isFutur(task.Planned) ? filteredTasks.push(task) : null;
      });
      break;

    default:
      tasks.map((task) => {
        return task.parentListId === listId ? filteredTasks.push(task) : null;
      });
  }
  return filteredTasks;
};

const CurrentListTasks = ({ listId, taskArr }) => {
  return taskArr !== undefined
    ? taskArr.map((task) => {
        return (
          <TaskItem
            key={task.id}
            listId={listId}
            taskId={task.id}
            task={task}
          />
        );
      })
    : "";
};

const TaskItem = ({ listId, taskId, task }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const isChecked = task.isChecked
    ? `${process.env.PUBLIC_URL}/img/checkbox-checked-icon.svg`
    : `${process.env.PUBLIC_URL}/img/checkbox-empty-icon.svg`;
  const isImportant = task.Important
    ? `${process.env.PUBLIC_URL}/img/star-checked-icon.svg`
    : `${process.env.PUBLIC_URL}/img/star-icon.svg`;
  const isPlanned = task.Planned
    ? "btn task-item-title planned"
    : "btn task-item-title";
  return (
    <div className="task-item-body" key={taskId}>
      <div
        className="task-item-checkbox"
        onClick={() => {
          // dispatch(actions.checkTask(taskId, !task.isChecked));
          dispatch(actions.checkTaskOnDB(token, taskId, !task.isChecked));
        }}>
        <span className="checkbox">
          <i className="icon">
            <img src={isChecked} alt="" />
          </i>
        </span>
      </div>
      <Link
        to={`/todo/${listId}/${taskId}`}
        className="Link"
        onClick={() => {
          dispatch(actions.openRightCol());
        }}>
        <button className={isPlanned}>
          <span className="">{task.title}</span>
          {task.Planned !== null ? (
            <span className="planned-date">
              {new Date(task.Planned).toLocaleDateString()}
            </span>
          ) : null}
        </button>
      </Link>
      <div
        className="task-item-checkbox"
        onClick={() => {
          // dispatch(actions.important(taskId, !task.Important));
          dispatch(actions.importantOnDB(token, taskId, !task.Important));
        }}>
        <span className="checkbox">
          <i className="icon">
            <img src={isImportant} alt="" />
          </i>
        </span>
      </div>
    </div>
  );
};

const AddTask = ({ parentListId }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  let addedToMyDay = null;
  let Important = false;
  let Planned = null;

  switch (parentListId) {
    case "My Day":
      parentListId = "Tasks";
      addedToMyDay = Date.now();
      break;

    case "Important":
      parentListId = "Tasks";
      Important = true;
      break;

    case "Planned":
      parentListId = "Tasks";
      Planned = Date.now() + 604800000;
      break;

    default:
      break;
  }

  useEffect(() => {
    const handleEnterkey = (e) => {
      if (e.key === "Enter") {
        // dispatch(
        //   actions.addTask(
        //     nanoid(),
        //     text,
        //     parentListId,
        //     Date.now(),
        //     addedToMyDay,
        //     Important,
        //     Planned
        //   )
        // );
        dispatch(
          actions.addTaskOnDB(
            token,
            nanoid(),
            text,
            parentListId,
            Date.now(),
            addedToMyDay,
            Important,
            Planned
          )
        );
        setText("");
      }
    };
    if (document.getElementById("addTask") !== null) {
      document
        .getElementById("addTask")
        .addEventListener("keypress", handleEnterkey);
    }
    // Clean up the component
    return () => {
      if (document.getElementById("addTask") !== null) {
        document
          .getElementById("addTask")
          .removeEventListener("keypress", handleEnterkey);
      }
    };
  }, [dispatch, text, parentListId, addedToMyDay, Important, Planned, token]);

  return (
    <div className="task-item-body add-task-body">
      <div className="add-list add-task">
        <button
          className="btn btn-no-hover"
          onClick={() => {
            dispatch(actions.addTask(nanoid(), text, parentListId, Date.now()));
            setText("");
          }}>
          <i className="icon">
            <img src={`${process.env.PUBLIC_URL}/img/plus-icon.svg`} alt="" />
          </i>
        </button>
        <input
          id="addTask"
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="btn-no-hover"
          type="text"
          name="addTask"
          maxLength="255"
          placeholder="New Task"
          value={text}
        />
      </div>
    </div>
  );
};

export default CenterColumn;
