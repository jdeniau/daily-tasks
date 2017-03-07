import React, { Component } from 'react';
import highlight from 'highlight.js';
import 'highlight.js/styles/solarized-light.css';
import Tasks from './Tasks';
import TasksList from './TasksList';
import DevTools from './DevTools';

highlight.initHighlightingOnLoad();

const tasks = new Tasks(JSON.parse(window.localStorage.getItem('tasks')));


class TaskSaver {
  onChange(tasks) {
    window.localStorage.setItem('tasks', tasks.export());
  }
}
tasks.addListener(new TaskSaver());

class TaskLogger {
  onChange(tasks) {
    console.log(tasks.tasks);
  }
}
tasks.addListener(new TaskLogger());


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

        <DevTools tasks={this.props.tasks} />
      </div>
    );
  }
}

export default () => <App tasks={tasks} />;
