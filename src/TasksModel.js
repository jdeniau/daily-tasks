import moment from 'moment';

class Task {
  constructor(values) {
    this.name = values.name;
    this.executionDateList = values.executionDateList;
  }

  getLastExecutionDate() {
    if (this.executionDateList.length <= 0) {
      return null;
    }

    return this.executionDateList.slice(-1)[0];
  }

  getAverageExectionInterval() {
    if (this.executionDateList.length <= 0) {
      return null;
    }

    const intervalList = this.executionDateList
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

    return moment.duration(tmpTotal / intervalList.length, 'seconds');
  }

  getHumanizedAverageExectionInterval() {
    const average = this.getAverageExectionInterval();

    return average && average.humanize();
  }

  getNextExecutionDate() {
    if (this.executionDateList.length < 2) {
      return null;
    }

    const lastExecution = this.getLastExecutionDate();

    const nextExecution = moment(lastExecution)
      .add(this.getAverageExectionInterval());

    return nextExecution;
  }

  isPast() {
    const nextExecutionDate = this.getNextExecutionDate();
    const now = moment();

    return nextExecutionDate && nextExecutionDate < now;
  }

}

class Tasks {
  constructor(tasks = []) {
    this.tasks = tasks || [];
    this._listeners = [];
  }

  getTaskList() {
    return this.tasks.map(values => new Task(values));
  }

  addListener(listener) {
    this._listeners.push(listener);
  }

  addTask(name) {
    this.tasks.push(new Task({
      name,
      executionDateList: [],
    }));

    this._notifyListener();
  }

  clearTasks() {
    this.tasks = [];
    this._notifyListener();
  }

  getTaskNameList() {
    return this.tasks.map(t => t.name);
  }

  getTask(name) {
    return this.tasks.find(task => name === task.name);
  }

  execute(taskName, datetime = null) {
    const task = this.getTask(taskName);
    const executionDate = datetime || moment();

    task.executionDateList.push(executionDate.toISOString());
    task.executionDateList = task.executionDateList.slice(-10).sort();
    this._notifyListener();
  }

  export(prettyPrint = false) {
    return prettyPrint ?
      JSON.stringify(this.getTaskList(), null, 2) :
      JSON.stringify(this.tasks);
  }

  import(string) {
    this.tasks = JSON.parse(string).map(task => new Task(task));
    this._notifyListener();
  }

  _notifyListener() {
    this._listeners.forEach(listener => listener.onChange(this));
  }
}

export function sortByNextExecutionDate(a, b) {
  if (a.getNextExecutionDate() < b.getNextExecutionDate()) {
    return -1;
  }

  if (a.getNextExecutionDate() > b.getNextExecutionDate()) {
    return 1;
  }

  return 0;
}

export default Tasks;
