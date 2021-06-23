import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { isToday, isFutur } from "../../redux/utils/utils";
import * as actions from "../../redux/actions/actions";
import { nanoid } from "nanoid";

const LeftColumn = () => {
  const lists = useSelector((state) => state.lists);

  const isLeftColOpen = useSelector((state) => state.ui.isLeftColOpen);
  const hideOrNot = isLeftColOpen
    ? "container container-left unshift"
    : "container container-left";

  return (
    <>
      <div className={hideOrNot}>
        <div className="left toolbar">
          <ul>
            <BuiltInLists />
            <Divider />
            <UserLists listsArr={lists} />
          </ul>
        </div>
        <AddList />
      </div>
    </>
  );
};

const Divider = () => {
  return <div className="devider"></div>;
};

const BuiltInLists = () => {
  return (
    <>
      <List
        key="My Day"
        imgSrc={`${process.env.PUBLIC_URL}/img/sun-icon.svg`}
        listId="My Day"
        listTitle="My Day"
      />
      <List
        key="Important"
        imgSrc={`${process.env.PUBLIC_URL}/img/star-icon.svg`}
        listId="Important"
        listTitle="Important"
      />
      <List
        key="Planned"
        imgSrc={`${process.env.PUBLIC_URL}/img/calendar-icon.svg`}
        listId="Planned"
        listTitle="Planned"
      />
      <List
        key="Tasks"
        imgSrc={`${process.env.PUBLIC_URL}/img/home-icon.svg`}
        listId="Tasks"
        listTitle="Tasks"
      />
    </>
  );
};

const UserLists = ({ listsArr }) => {
  return listsArr.map((list) => {
    return <List key={list.id} listId={list.id} listTitle={list.title} />;
  });
};

const List = ({ imgSrc, listId, listTitle }) => {
  const dispatch = useDispatch();
  imgSrc = !imgSrc ? `${process.env.PUBLIC_URL}/img/ham-icon.svg` : imgSrc;
  const tasks = useSelector((state) => state.tasks);
  let activeTaskCount = getActiveTaskCount(listId, tasks);

  return (
    <Link
      to={`/todo/${listId}`}
      className="Link"
      onClick={() => {
        dispatch(actions.closeLeftCol());
      }}>
      <div>
        <li className="toolbar-item">
          <div className="toolbar-inner">
            <div className="toolbar-icon">
              <i className="icon">
                <img src={imgSrc} alt="" />
              </i>
            </div>
            <div className="toolbar-title">
              <span>{listTitle}</span>
            </div>
            <div className="toolbar-count">{activeTaskCount}</div>
          </div>
        </li>
      </div>
    </Link>
  );
};

const getActiveTaskCount = (listId, tasks) => {
  let activeTask = 0;
  switch (listId) {
    case "My Day":
      activeTask = tasks.filter(
        (task) => isToday(task.addedToMyDay) && !task.isChecked
      ).length;
      break;

    case "Important":
      activeTask = tasks.filter(
        (task) => task.Important && !task.isChecked
      ).length;
      break;

    case "Planned":
      activeTask = tasks.filter(
        (task) => isFutur(task.Planned) && !task.isChecked
      ).length;
      break;

    default:
      activeTask = tasks.filter(
        (task) => task.parentListId === listId && !task.isChecked
      ).length;
  }
  return activeTask > 0 ? activeTask : "";
};

const AddList = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  useEffect(() => {
    const handleEnterkey = (e) => {
      if (e.key === "Enter") {
        // dispatch(actions.addList(nanoid(), text));
        dispatch(actions.addListOnDB(token, nanoid(), text));
        setText("");
      }
    };

    document
      .getElementById("addList")
      .addEventListener("keypress", handleEnterkey);

    // Clean up the component
    return () => {
      document
        .getElementById("addList")
        .removeEventListener("keypress", handleEnterkey);
    };
  }, [dispatch, text, token]);

  return (
    <div className="add-list-and-group">
      <div className="add-list">
        <button
          className="btn"
          onClick={() => {
            dispatch(actions.addList(nanoid(), text));
            setText("");
          }}>
          <i className="icon">
            <img src={`${process.env.PUBLIC_URL}/img/plus-icon.svg`} alt="" />
          </i>
        </button>
        <input
          id="addList"
          onChange={(e) => {
            setText(e.target.value);
          }}
          type="text"
          name="addList"
          maxLength="255"
          placeholder="New List"
          value={text}
        />
      </div>
    </div>
  );
};

export default LeftColumn;
