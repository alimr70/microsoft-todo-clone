const LeftColumn = () => {
  return (
    <>
      <div class="container container-left">
        <div class="left toolbar">
          <ul>
            <div>
              <li class="toolbar-item">
                <div class="toolbar-inner">
                  <div class="toolbar-icon">
                    <i class="icon icon-sun"></i>
                  </div>
                  <div class="toolbar-title">
                    <span>My Day</span>
                  </div>
                  <div class="toolbar-count"></div>
                </div>
              </li>
            </div>
            <div>
              <li class="toolbar-item">
                <div class="toolbar-inner">
                  <div class="toolbar-icon">
                    <i class="icon icon-star"></i>
                  </div>
                  <div class="toolbar-title">
                    <span>Important</span>
                  </div>
                  <div class="toolbar-count"></div>
                </div>
              </li>
            </div>
            <div>
              <li class="toolbar-item">
                <div class="toolbar-inner">
                  <div class="toolbar-icon">
                    <i class="icon icon-calendar"></i>
                  </div>
                  <div class="toolbar-title">
                    <span>Planned</span>
                  </div>
                  <div class="toolbar-count"></div>
                </div>
              </li>
            </div>
            <div>
              <li class="toolbar-item">
                <div class="toolbar-inner">
                  <div class="toolbar-icon">
                    <i class="icon icon-home"></i>
                  </div>
                  <div class="toolbar-title">
                    <span>Tasks</span>
                  </div>
                  <div class="toolbar-count">3</div>
                </div>
              </li>
            </div>
            <div class="devider"></div>
            <div class="groups">
              <div>
                <li class="toolbar-item">
                  <div class="toolbar-inner">
                    <div class="toolbar-icon">
                      <i class="icon icon-group"></i>
                    </div>
                    <div class="toolbar-title">
                      <span>group num #1</span>
                    </div>
                    <div class="toolbar-collapse-arrow">
                      <i class="icon icon-arrow"></i>
                    </div>
                  </div>
                </li>
              </div>
              <ul class="group-lists">
                <div>
                  <li class="toolbar-item">
                    <div class="toolbar-inner">
                      <div class="toolbar-icon">
                        <i class="icon icon-ham"></i>
                      </div>
                      <div class="toolbar-title">
                        <span>List Num #1</span>
                      </div>
                      <div class="toolbar-count"></div>
                    </div>
                  </li>
                </div>
              </ul>
              <div>
                <li class="toolbar-item">
                  <div class="toolbar-inner">
                    <div class="toolbar-icon">
                      <i class="icon icon-group"></i>
                    </div>
                    <div class="toolbar-title">
                      <span>group num #2</span>
                    </div>
                  </div>
                </li>
              </div>
              <ul class="group-lists"></ul>
            </div>
            <div>
              <li class="toolbar-item">
                <div class="toolbar-inner">
                  <div class="toolbar-icon">
                    <i class="icon icon-ham"></i>
                  </div>
                  <div class="toolbar-title">
                    <span>List Num #2</span>
                  </div>
                  <div class="toolbar-count"></div>
                </div>
              </li>
            </div>
          </ul>
        </div>
        <div class="add-list-and-group">
          <div class="add-list">
            <button class="btn">
              <i class="icon icon-plus"></i>
            </button>
            <input
              type="text"
              name="addList"
              maxlength="255"
              placeholder="New List"
              value=""
            />
          </div>
          <div class="add-group">
            <button class="btn">
              <i class="icon icon-group-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const PremadeLists = () => {
  return "PremadeLists";
};

const Divider = () => {
  return "Divider";
};

const Groups = () => {
  return "Groups";
};

const List = () => {
  return "List";
};

const AddList = () => {
  return "AddList";
};

export default LeftColumn;
