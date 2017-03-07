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

    if (task.executionDateList.length <= 0) {
      return null;
    }

    return task.executionDateList.slice(-1)[0];
  }

  getNextExecutionDate(taskName) {
    const lastExecution = this.getLastExecutionDate(taskName);

    if (!lastExecution) {
      return null;
    }

    const nextExecution = moment(lastExecution)
      .add(this.getAverageExectionInterval(taskName));

    return nextExecution.fromNow();
  }

  getAverageExectionInterval(taskName) {
    const task = this.tasks[taskName];

    if (!task) {
      return null;
    }

    if (task.executionDateList.length <= 0) {
      return null;
    }

    const intervalList = task.executionDateList
      .map(date => moment(date).valueOf())
      .map((timestamp, index, executionList) => {
        const lastValue = executionList[index - 1];
        if (!lastValue) {
          return null;
        }
        return timestamp - lastValue;
      })
      .filter(value => !!value)
    ;

    if (!intervalList.length) {
      return null;
    }

    const tmpTotalMs = intervalList
      .reduce((out, interval) => out += parseInt(intervalList, 10), 0)
    ;
    const tmpTotal = tmpTotalMs / 1000;
    console.log(intervalList, tmpTotal, tmpTotal / intervalList.length);

    return moment.duration(tmpTotal / intervalList.length, 'seconds');
  }

  getHumanizedAverageExectionInterval(taskName) {
    const average = this.getAverageExectionInterval(taskName);

    return average && average.humanize();
  }

  export(prettyPrint = false) {
    return prettyPrint ?
      JSON.stringify(this.tasks, null, 2) :
      JSON.stringify(this.tasks);
  }

  import(string) {
    this.tasks = JSON.parse(string);
    this._notifyListener();
  }

  _notifyListener() {
    this._listeners.forEach(listener => listener.onChange(this));
  }
}

export default Tasks;
