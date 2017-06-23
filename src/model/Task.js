import moment from 'moment';

export default class Task {
  constructor(values) {
    this.name = values.name;
    this.executionDateList = values.executionDateList;
    this.board = values.board;
    this.skipNumber = values.skipNumber || 0;

    this._id = `${this.board}|${this.name}`;
    this._rev = values._rev;
  }

  getLastExecutionDate() {
    if (!this.executionDateList || this.executionDateList.length <= 0) {
      return null;
    }

    return this.executionDateList.slice(-1)[0];
  }

  getAverageExectionInterval() {
    if (!this.executionDateList || this.executionDateList.length <= 0) {
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
    if (!this.executionDateList || this.executionDateList.length < 2) {
      return null;
    }

    const lastExecution = this.getLastExecutionDate();

    const interval = this.getAverageExectionInterval() * (1 + this.skipNumber);
    const nextExecution = moment(lastExecution)
      .add(interval);

    return nextExecution;
  }

  isPast() {
    const nextExecutionDate = this.getNextExecutionDate();
    const now = moment();

    return nextExecutionDate && nextExecutionDate < now;
  }

  skip() {
    this.skipNumber += 1;
  }

  execute(datetime) {
    const executionDate = datetime || moment();

    this.executionDateList.push(executionDate.toISOString());
    this.executionDateList = this.executionDateList.slice(-10).sort();
    this.skipNumber = 0;
  }
}

export function compareNextExecutionDate(a, b) {
  const ad = a.getNextExecutionDate();
  const bd = b.getNextExecutionDate();

  if (!ad) {
    if (!bd) {
      return 0;
    }

    const now = moment();

    if (bd < now) {
      return 1;
    } else {
      return -1;
    }
  }

  if (!bd) {
    const now = moment();
    if (ad < now) {
      return -1;
    } else {
      return 1;
    }
  }

  if (ad < bd) {
    return -1;
  }

  if (ad > bd) {
    return 1;
  }

  return 0;
}

