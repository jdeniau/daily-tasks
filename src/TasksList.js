import React, { Component } from 'react';
import moment from 'moment';
import { View, Text } from 'react-native';

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
                <Text>
                  Last execution:
                  {tasks.getLastExecutionDate(name) && moment(tasks.getLastExecutionDate(name)).fromNow()}
                </Text>
              </View>

              <View>
                <Text>
                  Frequency:
                  {tasks.getHumanizedAverageExectionInterval(name)}
                </Text>
              </View>

              <View>
                <Text>
                  Next execution:
                  {tasks.getNextExecutionDate(name)}
                </Text>
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
