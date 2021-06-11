const CenterColumn = () => {
  return (
    <>
      <div class="center tasks">
        <div class="tasks-toolbar">
          <div class="tasks-toolbar-title">
            <div class="tasks-toolbar-title-item">
              <h1 class="list-title">Tasks</h1>
            </div>
          </div>
        </div>
        <div class="task-items">
          <div>
            <div>
              <div class="task-item-body">
                <div class="task-item-checkbox">
                  <span class="checkbox">
                    <i class="icon icon-checkbox-empty"></i>
                  </span>
                </div>
                <button class="btn task-item-title">
                  <span class="">Tasks and Planned1</span>
                </button>
                <div class="task-item-checkbox">
                  <span class="checkbox">
                    <i class="icon icon-star"></i>
                  </span>
                </div>
                <div class="tasks-toolbar-options">
                  <div class="tasks-toolbar-title-item">
                    <button class="btn">
                      <i class="icon icon-menu"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="task-item-body">
                <div class="task-item-checkbox">
                  <span class="checkbox">
                    <i class="icon icon-checkbox-empty"></i>
                  </span>
                </div>
                <button class="btn task-item-title">
                  <span class="">Tasks and Planned2</span>
                </button>
                <div class="task-item-checkbox">
                  <span class="checkbox">
                    <i class="icon icon-star"></i>
                  </span>
                </div>
                <div class="tasks-toolbar-options">
                  <div class="tasks-toolbar-title-item">
                    <button class="btn">
                      <i class="icon icon-menu"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="task-item-body">
                <div class="task-item-checkbox">
                  <span class="checkbox">
                    <i class="icon icon-checkbox-empty"></i>
                  </span>
                </div>
                <button class="btn task-item-title planned">
                  <span class="planned-title">This task from futur</span>
                  <span class="planned-date">12/16/2020</span>
                </button>
                <div class="task-item-checkbox">
                  <span class="checkbox">
                    <i class="icon icon-star"></i>
                  </span>
                </div>
                <div class="tasks-toolbar-options">
                  <div class="tasks-toolbar-title-item">
                    <button class="btn">
                      <i class="icon icon-menu"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="task-item-body add-task-body">
          <div class="add-list add-task">
            <button class="btn btn-no-hover">
              <i class="icon icon-plus"></i>
            </button>
            <input
              class="btn-no-hover"
              type="text"
              name="addTask"
              maxlength="255"
              placeholder="New Task"
              value=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CenterColumn;
