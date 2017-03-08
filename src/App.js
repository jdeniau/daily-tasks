import React, { Component } from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Tasks from './Tasks';
import TasksList from './TasksList';
import DevTools from './DevTools';

const isDev = process.env.NODE_ENV === 'development';

const tasks = new Tasks(JSON.parse(window.localStorage.getItem('tasks')));


class TaskSaver {
  onChange(tasks) {
    window.localStorage.setItem('tasks', tasks.export());
  }
}
tasks.addListener(new TaskSaver());

if (isDev) {
  class TaskLogger {
    onChange(tasks) {
      console.log(tasks.tasks);
    }
  }
  tasks.addListener(new TaskLogger());
}


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

        <Button color="warning" onClick={this.props.tasks.clearTasks}>
          Clear tasks
        </Button>

        {isDev && <DevTools tasks={this.props.tasks} />}
      </div>
    );
  }
}

export default () => <App tasks={tasks} />;
