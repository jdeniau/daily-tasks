import React, { Component } from 'react';
import { sortByNextExecutionDate } from '../TasksModel';
import Task from './Task';
import AddTaskForm from './AddTaskForm';

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.handleAddTask = this.handleAddTask.bind(this);
  }

  handleAddTask(name, board) {
    this.props.tasks.addTask(name, board);
  }

  render() {
    const { tasks } = this.props;

    return (
      <div>
        <div>
          {tasks.getTaskList()
            .sort(sortByNextExecutionDate)
              .map(task =>
                <Task
                  key={task.name}
                  task={task}
                  executeTask={(datetime) => this.props.tasks.execute(task.name, datetime)}
                />
          )}
        </div>

        <AddTaskForm
          currentBoard={tasks.getCurrentBoard()}
          onSubmit={this.handleAddTask}
        />
      </div>
    );
  }
}

export default TaskList;
