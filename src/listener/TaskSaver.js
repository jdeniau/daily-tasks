export default class TaskSaver {
  onChange(tasks) {
    window.localStorage.setItem('tasks', tasks.export());
    window.localStorage.setItem('currentBoard', tasks.getCurrentBoard());
  }
}
