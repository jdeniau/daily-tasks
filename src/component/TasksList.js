import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { sortByNextExecutionDate } from '../TasksModel';
import Task from './Task';

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

        <Form onSubmit={this.handleAddTask}>
          <FormGroup row>
            <Label for="addTask" sm={2}>Add task</Label>
            <Col sm={10}>
              <Input
                type="text"
                id="addTask"
                placeholder="task name"
                getRef={(input) => { this.taskAddInput = input; }}
              />
            </Col>
          </FormGroup>

          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button
                color="secondary"
                type="submit"
              >
                Add
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default TaskList;
