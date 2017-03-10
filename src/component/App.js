import React, { Component } from 'react';
import { Button } from 'reactstrap';
import MdContentCopy from 'react-icons/lib/md/content-copy';
import 'bootstrap/dist/css/bootstrap.css';
import DevTools from './DevTools';
import TasksList from './TasksList';
import BoardList from './BoardList';


class App extends Component {
  constructor(props) {
    super(props);

    this.handleBoardChange = this.handleBoardChange.bind(this);
    this.handleBoardListClick = this.handleBoardListClick.bind(this);

    this.state = {
      isBoardListOpened: false,
    };
  }

  componentDidMount() {
    const updater = {
      onChange: () => this.forceUpdate(),
    };
    this.props.tasks.addListener(updater);
  }

  handleBoardChange(board) {
    this.props.tasks.setCurrentBoard(board);
  }


  handleBoardListClick() {
    this.setState((prevState) => ({
      isBoardListOpened: !prevState.isBoardListOpened,
    }));
  }

  render() {
    const { tasks } = this.props;

    return (
      <div>
        <h1 className="text-center">
          {tasks.getCurrentBoard()}
          <a
            href="#openBoardList"
            className="ml-2"
            onClick={this.handleBoardListClick}
          >
            {tasks.getBoardList().length > 1 &&
              <MdContentCopy />
            }
          </a>
        </h1>
        <TasksList tasks={tasks} />

        <Button color="warning" onClick={() => tasks.clearTasks()}>
          Clear tasks
        </Button>

        <BoardList
          onChange={this.handleBoardChange}
          toggle={this.handleBoardListClick}
          isOpen={this.state.isBoardListOpened}
          boardList={tasks.getBoardList()}
          currentBoard={tasks.getCurrentBoard()}
        />

        {this.props.isDev && <DevTools tasks={tasks} />}
      </div>
    );
  }
}

export default App;
