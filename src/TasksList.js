import React, { Component } from 'react';
import moment from 'moment';
import { Alert, Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { sortByNextExecutionDate } from './Tasks';

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
            <Alert color={task.isPast() ? 'danger' : 'success'} key={task.name}>
              <div>{task.name}</div>

              <div>
                Last execution:
                {task.getLastExecutionDate() && moment(task.getLastExecutionDate()).fromNow()}
              </div>

              <div>
                Frequency:
                {task.getHumanizedAverageExectionInterval()}
              </div>

              <div>
                Next execution:
                {task.getNextExecutionDate() && task.getNextExecutionDate().fromNow()}
              </div>

              <Button
                color="primary"
                block
                onClick={() => this.props.tasks.execute(task.name)}
              >
                execute
              </Button>
            </Alert>
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
