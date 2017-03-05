import React, { Component } from 'react';
import { View } from 'react-native';

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
      <View>
        <ul>
          {tasks.getTaskNameList().map(name =>
            <li key={name}>
              <View>{name}</View>
              <View>
                {tasks.getLastExecutionDate(name) && tasks.getLastExecutionDate(name)}
              </View>

              <View>
                <a href={`#execute-${name}`} onClick={() => this.props.tasks.execute(name)}>
                  execute
                </a>
              </View>
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
      </View>
    );
  }
}

export default TaskList;
