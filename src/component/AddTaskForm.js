import React, { PureComponent } from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import translate from '../translations';

class AddTaskForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBoardChange = this.handleBoardChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);

    this.state = {
      name: '',
      board: this.props.currentBoard,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state.name, this.state.board);

    this.setState(() => ({
      name: '',
      board: this.props.currentBoard,
    }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentBoard !== this.props.currentBoard) {
      this.setState({
        name: '',
        board: this.props.currentBoard,
      });
    }
  }

  handleBoardChange(e) {
    this.setState({
      board: e.target.value,
    });
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup row>
          <Label for="addTask" sm={2}>{translate('Add task')}</Label>
          <Col sm={10}>
            <Input
              type="text"
              id="addTask"
              placeholder={translate('task name')}
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="addBoard" sm={2}>{translate('Board')}</Label>
          <Col sm={10}>
            <Input
              type="text"
              id="addBoard"
              placeholder="board name"
              value={this.state.board}
              onChange={this.handleBoardChange}
            />
          </Col>
        </FormGroup>

        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button
              color="secondary"
              type="submit"
            >
              {translate('Add')}
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default AddTaskForm;
