import React, { Component } from 'react';
import Tasks from './Tasks';
import TasksList from './TasksList';

const tasks = new Tasks(JSON.parse(window.localStorage.getItem('tasks')));


class TaskSaver {
  onChange(tasks) {
    window.localStorage.setItem('tasks', JSON.stringify(tasks.tasks));
  }
}
tasks.addListener(new TaskSaver());

class App extends Component {
  componentDidMount() {
    const updater = {
      onChange: () => this.forceUpdate(),
    };
    this.props.tasks.addListener(updater);
  }

  render() {
    return (
      <div>
        <TasksList tasks={this.props.tasks} />

        <a href="#clear" onClick={() => this.props.tasks.clearTasks()}>Clear tasks</a>
      </div>
    );
  }
}

export default () => <App tasks={tasks} />;
