import PouchDB  from 'pouchdb-browser';
import Task from './Task';

class TaskList {
  constructor(DB_SUFFIX) {
    this.database = new PouchDB(`daily-tasks-${DB_SUFFIX}`);

    const REMOTE_DATABASE = `http://fry.sitioweb.fr:5984/daily-tasks-${DB_SUFFIX}`;
    PouchDB.sync(this.database, REMOTE_DATABASE, {
      live: true,
      retry: true,
    })
      .on('change', (info) => {
        if (info.direction === 'pull' && info.change.ok) {
          info.change.docs.forEach(doc => {
            const oldTaskIndex = this._tasks.findIndex((t) => t._id === doc._id);
            if (oldTaskIndex >= 0) {
              this._tasks[oldTaskIndex] = new Task(doc);
            } else {
              this._tasks.push(new Task(doc));
            }
          });

          this._notifyListener();
        }
      })
    ;

    this._listeners = [];

    return this._init();
  }

  getTaskList() {
    return this._tasks
      .map(values => new Task(values))
      .filter(task => task.board === this._currentBoard)
    ;
  }

  getCurrentBoard() {
    return this._currentBoard;
  }

  setCurrentBoard(board) {
    this._setCurrentBoard(board);

    this._notifyListener();
  }

  getBoardList() {
    return this._tasks
      .map(task => task.board)
      .filter((board, index, list) => list.indexOf(board) === index)
    ;
  }

  addListener(listener) {
    this._listeners.push(listener);
  }

  addTask(name, board = this.getCurrentBoard()) {
    const task = new Task({
      name,
      board,
      executionDateList: [],
      skipNumber: 0,
    });

    this
      .database.put(task)
      .then(() => {
        this._tasks.push(task);

        // if only one task, then the currentboard should be the boad of this task
        if (this._tasks.length === 1) {
          this._setCurrentBoard(this._tasks[0].board);
        }

        this._notifyListener();
      })
    ;
  }

  clearTasks() {
    this._deleteAllDocs()
      .then(() => {
        this._tasks = [];
        this._notifyListener();
      })
    ;
  }

  getTaskNameList() {
    return this._tasks.map(t => t.name);
  }

  getTask(name) {
    return this._tasks.find(task => name === task.name);
  }

  execute(taskName, datetime = null) {
    const task = this.getTask(taskName);
    task.execute(datetime);

    this.database.put(task)
      .then(() => this._notifyListener())
    ;
  }

  skip(taskName) {
    const task = this.getTask(taskName);
    task.skip();

    this.database.put(task)
      .then(() => this._notifyListener())
    ;
  }

  export(prettyPrint = false) {
    return prettyPrint ?
      JSON.stringify(this._tasks, null, 2) :
      JSON.stringify(this._tasks);
  }

  import(string) {
    this
      ._deleteAllDocs()
      .then(() => {
        const tasks = JSON.parse(string).map(task => new Task(task));
        return this.database.bulkDocs(tasks);
      })
      .then(() => this._init())
      .then(() => this._notifyListener())
    ;
  }

  _deleteAllDocs() {
    return this.database.bulkDocs(this._tasks.map(t => {
      t._deleted = true;
      return t;
    }))
  }

  _init() {
    return this.database.allDocs({ include_docs: true })
      .then(result => {
        this._tasks = result.rows.map(row => new Task(row.doc));

        const currentBoard = window.localStorage.getItem('currentBoard');
        this._setCurrentBoard(currentBoard);

        return this;
      })
    ;
  }

  _setCurrentBoard(currentBoard) {
    this._currentBoard = currentBoard || 'main';
    if (this.getBoardList().indexOf(currentBoard) < 0) {
      if (this._tasks.length > 0) {
        this._currentBoard = this._tasks[0].board;
      } else {
        this._currentBoard = 'main';
      }
    }

    window.localStorage.setItem('currentBoard', this._currentBoard);
  }

  _notifyListener() {
    this._listeners.forEach(listener => listener.onChange(this));
  }
}

export default TaskList;
