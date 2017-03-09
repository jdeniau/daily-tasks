import React, { Component } from 'react';
import moment from 'moment';
import { Alert, Button, Col, Form, FormGroup, Label, Input, Row } from 'reactstrap';
import { sortByNextExecutionDate } from '../TasksModel';

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
              <h2 className="text-center">{task.name}</h2>

              <Row>
                <Col xs="12" sm="4">
                  Last execution:
                  {task.getLastExecutionDate() && moment(task.getLastExecutionDate()).fromNow()}
                </Col>

                <Col xs="12" sm="4">
                  Frequency:
                  {task.getHumanizedAverageExectionInterval()}
                </Col>

                <Col xs="12" sm="4">
                  Next execution:
                  {task.getNextExecutionDate() && task.getNextExecutionDate().fromNow()}
                </Col>
              </Row>

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