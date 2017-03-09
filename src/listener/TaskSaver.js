export default class TaskSaver {
  onChange(tasks) {
    window.localStorage.setItem('tasks', tasks.export());
  }
}
