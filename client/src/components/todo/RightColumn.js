const RightColumn = () => {
  return (
    <>
      <div class="container container-right">
        <div class="task-item-body task-detail-title">
          <div class="task-detail-header">
            <div class="task-item-checkbox">
              <span class="checkbox">
                <i class="icon icon-checkbox-empty"></i>
              </span>
            </div>
            <button class="btn task-item-title">
              <span>
                <h2>Tasks and Planned1</h2>
              </span>
            </button>
          </div>
          <div class="task-item-body task-detail-title step">
            <div class="task-item-checkbox">
              <span class="checkbox">
                <i class="icon icon-checkbox-empty"></i>
              </span>
            </div>
            <button class="btn task-item-title">
              <span>step step</span>
            </button>
          </div>
        </div>
        <div class="task-item-body add-task-body add-step-body">
          <div class="add-list add-task">
            <button class="btn btn-no-hover">
              <i class="icon icon-plus"></i>
            </button>
            <input
              class="btn-no-hover"
              type="text"
              name="addTask"
              maxlength="255"
              placeholder="New Step"
            />
          </div>
        </div>
        <div class="detailbar-item">
          <div class="toolbar-inner">
            <div class="toolbar-icon">
              <i class="icon icon-sun"></i>
            </div>
            <div class="toolbar-title">
              <span>Add To My Day</span>
            </div>
          </div>
        </div>
        <div class="detailbar-item input-container">
          <div class="toolbar-inner">
            <div class="toolbar-icon">
              <i class="icon icon-calendar"></i>
            </div>
            <span>&nbsp; Due Date</span>
            <input type="date" class="datepicker-input" id="datepicker-input" />
          </div>
        </div>
        <div class="toolbar-item detail-footer">
          <div class="toolbar-inner">
            <div class="toolbar-icon add-group">
              <button class="btn">
                <i class="icon icon-arrow"></i>
              </button>
            </div>
            <div class="toolbar-title">
              <span>Created on Sun Oct 18 2020</span>
            </div>
            <div class="add-group detail-delete">
              <button class="btn">
                <i class="icon icon-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightColumn;
