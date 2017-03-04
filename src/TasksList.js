import React, { Component } from 'react';

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.handleAddTask = this.handleAddTask.bind(this);
  }

  handleAddTask(event) {
    event.preventDefault();
    this.props.tasks.addTask(this.taskAddInput.value);
    this.taskAddInput.value = '';
  }

  render() {
    const { tasks } = this.props;

    return (
      <div>
        <ul>
          {tasks.getTaskNameList().map(name =>
            <li key={name}>
              {name}
              {tasks.getLastExecutionDate(name) && tasks.getLastExecutionDate(name)}

              <a href={`#execute-${name}`} onClick={() => this.props.tasks.execute(name)}>
                execute
              </a>
            </li>
          )}
        </ul>

        <form onSubmit={this.handleAddTask}>
          <input
            type="text"
            ref={(input) => { this.taskAddInput = input; }}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default TaskList;
