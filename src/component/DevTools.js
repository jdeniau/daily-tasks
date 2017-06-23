import React, { Component } from 'react';
import highlight from 'highlight.js';
import 'highlight.js/styles/solarized-light.css';

class DevTools extends Component {
  constructor(props) {
    super(props);

    this.handleImport = this.handleImport.bind(this);
    this.handleImportDemoData = this.handleImportDemoData.bind(this);
  }

  componentDidMount() {
    highlight.highlightBlock(this.codeBlock);
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
          this.props.tasks.import(`[
            {
              "board": "main",
              "name": "Allumer la litière",
              "executionDateList": []
            },
            {
              "board": "main",
              "name": "Vendre la poubelle",
              "executionDateList": []
            },
            {
              "board": "main",
              "name": "Manger le frigo",
              "executionDateList": []
            }
          ]`);
          break;

        case 'activity':
          this.props.tasks.import(`[
            {
              "board": "main",
              "name": "Tirer le pinpon",
              "executionDateList": []
            },
            {
              "board": "main",
              "name": "Pousser la tiroulette",
              "executionDateList": []
            },
            {
              "board": "main",
              "name": "Lever la fourbinette",
              "executionDateList": []
            },
            {
              "board": "second",
              "name": "Charbiller les esgourdettes",
              "executionDateList": []
            }
          ]`);
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
            <a href="#importHome" onClick={this.handleImportDemoData('home')}>
              Import home
            </a>
          </li>
          <li>
            <a href="#importActivity" onClick={this.handleImportDemoData('activity')}>
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

export default DevTools;
