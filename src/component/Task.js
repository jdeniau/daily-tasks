import React, { Component } from 'react';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { Alert, Button, Col, Modal, ModalHeader, ModalBody, ModalFooter, Row } from 'reactstrap';
import translate from '../translations';

function ExecuteModal({ header, isOpen, onCancel, onSubmit, onSkip }) {
  let datetime = moment();

  return (
    <Modal isOpen={isOpen} toggle={onCancel}>
      <ModalHeader toggle={onCancel}>{header}</ModalHeader>
      <ModalBody>
        <Datetime
          defaultValue={datetime}
          closeOnSelect
          onChange={(value) => datetime = value}
          timeConstraints={{ minutes: { step: 15 } }}
        />
        <Button style={{ marginTop: '10px', float: 'right' }} color="warning" onClick={onSkip}>
          {translate('Skip this time')}
        </Button>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => onSubmit(datetime)}>{translate('Submit')}</Button>{' '}
        <Button color="secondary" onClick={onCancel}>{translate('Cancel')}</Button>
      </ModalFooter>
    </Modal>
  );
}

class Task extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleExecuteTask = this.handleExecuteTask.bind(this);
    this.handleSkipTask = this.handleSkipTask.bind(this);

    this.state = {
      isModalOpened: false,
    };
  }

  toggleModal() {
    this.setState((prevState) => ({
        isModalOpened: !prevState.isModalOpened,
    }));
  }

  handleExecuteTask(datetime) {
    this.props.executeTask(datetime);
    this.toggleModal();
  }

  handleSkipTask(datetime) {
    if (window.confirm('Sure ?')) {
      this.props.skipTask(datetime);
      this.toggleModal();
    }
  }

  render() {
    const { task } = this.props;

    const color = task.isPast() ?
      'danger' :
      task.getNextExecutionDate()? 'success' : 'warning';

    return (
      <Alert color={color} key={task.name}>
        <h2 className="text-center">{task.name}</h2>

        <Row>
          <Col xs="12" sm="4">
            {translate('Last execution')}:
            {task.getLastExecutionDate() && moment(task.getLastExecutionDate()).fromNow()}
          </Col>

          <Col xs="12" sm="4">
            {translate('Frequency')}:
            {task.getHumanizedAverageExectionInterval()}
          </Col>

          <Col xs="12" sm="4">
            {translate('Next execution')}:
            {task.getNextExecutionDate() && task.getNextExecutionDate().fromNow()}
          </Col>
        </Row>

        <Button
          color="primary"
          block
          onClick={this.toggleModal}
        >
          {translate('execute')}
        </Button>

        <ExecuteModal
          header={task.name}
          isOpen={this.state.isModalOpened}
          onSubmit={this.handleExecuteTask}
          onCancel={this.toggleModal}
          onSkip={this.handleSkipTask}
        />
      </Alert>
    );
  }
}

export default Task;
