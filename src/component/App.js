import React, { Component } from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import DevTools from './DevTools';
import TasksList from './TasksList';


class App extends Component {
  componentDidMount() {
    const updater = {
      onChange: () => this.forceUpdate(),
    };
    this.props.tasks.addListener(updater);
  }

  render() {
    const { tasks } = this.props;

    return (
      <div>
        <h1 className="text-center">{tasks.getCurrentBoard()}</h1>
        <TasksList tasks={tasks} />

        <Button color="warning" onClick={() => tasks.clearTasks()}>
          Clear tasks
        </Button>

        {this.props.isDev && <DevTools tasks={tasks} />}
      </div>
    );
  }
}

export default App;
