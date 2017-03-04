import moment from 'moment';

class Tasks {
  constructor(tasks = {}) {
    this.tasks = tasks || {};
    this._listeners = [];
  }

  addListener(listener) {
    this._listeners.push(listener);
  }

  addTask(name) {
    this.tasks[name] = {
      executionDateList: [],
    };

    this._notifyListener();
  }

  clearTasks() {
    this.tasks = {};
    this._notifyListener();
  }

  getTaskNameList() {
    return Object.keys(this.tasks);
  }

  execute(taskName) {
    this.tasks[taskName].executionDateList.push(moment().toISOString());
    this.tasks[taskName].executionDateList = this.tasks[taskName].executionDateList.slice(-10);
    this._notifyListener();
  }

  getLastExecutionDate(taskName) {
    const task = this.tasks[taskName];

    if (!task) {
      return null;
    }

    if (task.executionDateList.length <= 1) {
      return null;
    }

    return task.executionDateList.slice(-1)[0];
  }

  _notifyListener() {
    this._listeners.forEach(listener => listener.onChange(this));
  }
}

export default Tasks;
