import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import * as actions from "../../redux/actions/actions";
import { Link } from "react-router-dom";

const RightColumn = () => {
  let { taskId } = useParams();

  const targetTask = useSelector((state) => state.tasks).find(
    (task) => task.id === taskId
  );
  const steps = useSelector((state) => state.steps);
  const stepArr = getCurrentTaskSteps(taskId, steps);

  const isRightColOpen = useSelector((state) => state.ui.isRightColOpen);
  const hideOrNot = isRightColOpen
    ? "container container-right unshift"
    : "container container-right";
  return (
    <>
      <div className={hideOrNot}>
        <div className="task-item-body task-detail-title">
          <TaskDetailsHeader task={targetTask} />
          <CurrentTaskSteps stepArr={stepArr} />
        </div>
        <AddStep parentTaskId={taskId} />
        <AddToMyDay parentTaskId={taskId} />
        <DueDate task={targetTask} />
        <RightColumnFooter
          currentTaskDate={new Date(targetTask.createdAt).toDateString()}
          taskId={targetTask.id}
        />
      </div>
    </>
  );
};

const TaskDetailsHeader = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const isChecked = task.isChecked
    ? `${process.env.PUBLIC_URL}/img/checkbox-checked-icon.svg`
    : `${process.env.PUBLIC_URL}/img/checkbox-empty-icon.svg`;

  useEffect(() => {
    const handleEnterkey = (e) => {
      if (e.key === "Enter") {
        dispatch(actions.editTaskTitle(task.id, text));
        setIsEditing(false);
      }
    };
    if (document.getElementById("editTask") !== null) {
      document
        .getElementById("editTask")
        .addEventListener("keypress", handleEnterkey);
    }
    // Clean up the component
    return () => {
      if (document.getElementById("editTask") !== null) {
        document
          .getElementById("editTask")
          .removeEventListener("keypress", handleEnterkey);
      }
    };
  }, [dispatch, task.id, text, isEditing]);

  return (
    <div className="task-detail-header">
      <div
        className="task-item-checkbox"
        onClick={() => {
          dispatch(actions.checkTask(task.id, !task.isChecked));
        }}>
        <span className="checkbox">
          <i className="icon">
            <img src={isChecked} alt="" />
          </i>
        </span>
      </div>
      {isEditing ? (
        <div
          className="add-list"
          onBlur={() => {
            dispatch(actions.editTaskTitle(task.id, text));
            setIsEditing(false);
          }}>
          <input
            id="editTask"
            autoFocus
            onFocus={() => {
              setText(task.title);
            }}
            type="text"
            name="editTask"
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
          <h2 className="list-title">{task.title}</h2>
        </button>
      )}
    </div>
  );
};

const getCurrentTaskSteps = (taskId, steps) => {
  let filteredSteps = [];
  steps.map((step) => {
    return step.parentTaskId === taskId ? filteredSteps.push(step) : null;
  });
  return filteredSteps;
};

const CurrentTaskSteps = ({ stepArr }) => {
  return stepArr !== undefined
    ? stepArr.map((step) => {
        return <Step key={step.id} step={step} />;
      })
    : "";
};

const Step = ({ step }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const isChecked = step.isChecked
    ? `${process.env.PUBLIC_URL}/img/checkbox-checked-icon.svg`
    : `${process.env.PUBLIC_URL}/img/checkbox-empty-icon.svg`;

  useEffect(() => {
    const handleEnterkey = (e) => {
      if (e.key === "Enter") {
        dispatch(actions.editStepTitle(step.id, text));
        setIsEditing(false);
      }
    };
    if (document.getElementById("editStep") !== null) {
      document
        .getElementById("editStep")
        .addEventListener("keypress", handleEnterkey);
    }
    // Clean up the component
    return () => {
      if (document.getElementById("editStep") !== null) {
        document
          .getElementById("editStep")
          .removeEventListener("keypress", handleEnterkey);
      }
    };
  }, [dispatch, step.id, text, isEditing]);

  return (
    <div key={step.id} className="task-item-body task-detail-title step">
      <div
        className="task-item-checkbox"
        onClick={() => {
          dispatch(actions.checkStep(step.id, !step.isChecked));
        }}>
        <span className="checkbox">
          <i className="icon">
            <img src={isChecked} alt="" />
          </i>
        </span>
      </div>
      {isEditing ? (
        <div
          className="add-list"
          onBlur={() => {
            dispatch(actions.editStepTitle(step.id, text));
            setIsEditing(false);
          }}>
          <input
            id="editStep"
            autoFocus
            onFocus={() => {
              setText(step.title);
            }}
            type="text"
            name="editStep"
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
          <span>{step.title}</span>
        </button>
      )}
    </div>
  );
};

const AddStep = ({ parentTaskId }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  useEffect(() => {
    const handleEnterkey = (e) => {
      if (e.key === "Enter") {
        // dispatch(actions.addStep(parentTaskId, nanoid(), text));
        dispatch(actions.addStepOnDB(token, parentTaskId, nanoid(), text));
        setText("");
      }
    };

    document
      .getElementById("addStep")
      .addEventListener("keypress", handleEnterkey);

    // Clean up the component
    return () => {
      if (document.getElementById("addStep") !== null) {
        document
          .getElementById("addStep")
          .removeEventListener("keypress", handleEnterkey);
      }
    };
  }, [dispatch, text, parentTaskId, token]);

  return (
    <div className="task-item-body add-task-body add-step-body">
      <div className="add-list add-task">
        <button
          className="btn btn-no-hover"
          onClick={() => {
            dispatch(actions.addStep(parentTaskId, nanoid(), text));
            setText("");
          }}>
          <i className="icon">
            <img src={`${process.env.PUBLIC_URL}/img/plus-icon.svg`} alt="" />
          </i>
        </button>
        <input
          id="addStep"
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="btn-no-hover"
          type="text"
          name="addStep"
          maxLength="255"
          placeholder="New Step"
          value={text}
        />
      </div>
    </div>
  );
};

const AddToMyDay = ({ parentTaskId }) => {
  const dispatch = useDispatch();
  return (
    <div className="detailbar-item">
      <div className="toolbar-inner">
        <div className="toolbar-icon">
          <i className="icon">
            <img src={`${process.env.PUBLIC_URL}/img/sun-icon.svg`} alt="" />
          </i>
        </div>
        <div
          className="toolbar-title"
          onClick={() => {
            dispatch(actions.addToMyDay(parentTaskId, Date.now()));
          }}>
          <span>Add To My Day</span>
        </div>
      </div>
    </div>
  );
};

const DueDate = ({ task }) => {
  const dispatch = useDispatch();
  return (
    <div className="detailbar-item input-container">
      <div className="toolbar-inner">
        <div className="toolbar-icon">
          <i className="icon">
            <img
              src={`${process.env.PUBLIC_URL}/img/calendar-icon.svg`}
              alt=""
            />
          </i>
        </div>
        {task.Planned !== null ? (
          <span style={{ color: "lightblue" }}>
            &nbsp; Due Date {new Date(task.Planned).toLocaleDateString()}
          </span>
        ) : (
          <span>&nbsp; Due Date</span>
        )}
        <input
          type="date"
          className="datepicker-input"
          id="datepicker-input"
          onChange={(e) => {
            dispatch(actions.dueDate(task.id, e.target.valueAsNumber));
          }}
        />
      </div>
      {task.Planned !== null ? (
        <button
          className="return-to-null"
          onClick={() => {
            dispatch(actions.dueDate(task.id, null));
          }}>
          <i className="icon">
            <img src={`${process.env.PUBLIC_URL}/img/plus-icon.svg`} alt="" />
          </i>
        </button>
      ) : null}
    </div>
  );
};

const RightColumnFooter = ({ currentTaskDate, taskId }) => {
  const { listId } = useParams();
  const dispatch = useDispatch();
  return (
    <div className="toolbar-item detail-footer">
      <div className="toolbar-inner">
        <Link
          to={`/todo/${listId}`}
          className="Link"
          onClick={() => {
            dispatch(actions.closeRightCol());
          }}>
          <div className="toolbar-icon add-group">
            <button className="btn">
              <i className="icon">
                <img
                  src={`${process.env.PUBLIC_URL}/img/arrow-icon.svg`}
                  alt=""
                />
              </i>
            </button>
          </div>
        </Link>
        <div className="toolbar-title">
          <span>{currentTaskDate}</span>
        </div>
        <Link to={`/todo/${listId}`}>
          <div
            className="add-group detail-delete"
            onClick={() => {
              dispatch(actions.deleteTask(taskId));
            }}>
            <button className="btn">
              <i className="icon">
                <img
                  src={`${process.env.PUBLIC_URL}/img/trash-icon.svg`}
                  alt=""
                />
              </i>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RightColumn;
