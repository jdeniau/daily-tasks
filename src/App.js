import React, { Component } from 'react';
import Tasks from './Tasks';
import TasksList from './TasksList';
import highlight from 'highlight.js';
import 'highlight.js/styles/solarized-light.css';

highlight.initHighlightingOnLoad();

const tasks = new Tasks(JSON.parse(window.localStorage.getItem('tasks')));


class TaskSaver {
  onChange(tasks) {
    window.localStorage.setItem('tasks', tasks.export());
  }
}
tasks.addListener(new TaskSaver());

class TaskLogger {
  onChange(tasks) {
    console.log(tasks.tasks);
  }
}
tasks.addListener(new TaskLogger());


class DevTools extends Component {
  constructor(props) {
    super(props);

    this.handleImport = this.handleImport.bind(this);
    this.handleImportDemoData = this.handleImportDemoData.bind(this);
  }

  componentDidUpdate() {
    highlight.highlightBlock(this.codeBlock);
  }

  handleImport(event) {
    event.preventDefault();

    this.props.tasks.import(this.textArea.value);
  }

  handleImportDemoData(key) {
    return (event) => {
      event.preventDefault();

      switch (key) {
        case 'home':
          this.props.tasks.import(`{
            "Allumer la litière": {
              "executionDateList": []
            },
            "Vendre la poubelle": {
              "executionDateList": []
            },
            "Manger le frigo": {
              "executionDateList": []
            }
          }`);
          break;

        case 'activity':
          this.props.tasks.import(`{
            "Tirer le pinpon": {
              "executionDateList": []
            },
            "Pousser la tiroulette": {
              "executionDateList": []
            },
            "Lever la fourbinette": {
              "executionDateList": []
            }
          }`);
          break;

        default:
          console.warn(`key ${key} not found`);
          break;
      }
    }
  }

  render() {
    const { tasks } = this.props;

    return (
      <div>
        <pre>
          <code className="json" ref={(codeBlock) => { this.codeBlock = codeBlock; }}>
            {tasks.export(true)}
          </code>
        </pre>

        <ul>
          <li>
            <a href="#" onClick={this.handleImportDemoData('home')}>
              Import home
            </a>
          </li>
          <li>
            <a href="#" onClick={this.handleImportDemoData('activity')}>
              Import activity
            </a>
          </li>
        </ul>

        <form onSubmit={this.handleImport}>
          <textarea
            style={{ width: '100%' }}
            rows="10"
            placeholder="import data"
            ref={(textarea) => { this.textArea = textarea; }}
          >
          </textarea>

          <button type="submit">Import</button>
        </form>
      </div>
    );
  }
}

class App extends Component {
  componentDidMount() {
    const updater = {
      onChange: () => this.forceUpdate(),
    };
    this.props.tasks.addListener(updater);
  }

  render() {
    return (
      <div>
        <TasksList tasks={this.props.tasks} />

        <a href="#clear" onClick={() => this.props.tasks.clearTasks()}>Clear tasks</a>

        <DevTools tasks={this.props.tasks} />
      </div>
    );
  }
}

export default () => <App tasks={tasks} />;
