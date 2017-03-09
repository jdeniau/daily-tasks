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
    return (
      <div>
        <TasksList tasks={this.props.tasks} />

        <Button color="warning" onClick={this.props.tasks.clearTasks}>
          Clear tasks
        </Button>

        {this.props.isDev && <DevTools tasks={this.props.tasks} />}
      </div>
    );
  }
}

export default App;
