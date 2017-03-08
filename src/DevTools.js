import React, { Component } from 'react';
import highlight from 'highlight.js';
import 'highlight.js/styles/solarized-light.css';

highlight.initHighlightingOnLoad();
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
          this.props.tasks.import(`[
            {
              "name": "Allumer la litière",
              "executionDateList": []
            },
            {
              "name": "Vendre la poubelle",
              "executionDateList": []
            },
            {
              "name": "Manger le frigo",
              "executionDateList": []
            }
          ]`);
          break;

        case 'activity':
          this.props.tasks.import(`[
            {
              "name": "Tirer le pinpon",
              "executionDateList": []
            },
            {
              "name": "Pousser la tiroulette",
              "executionDateList": []
            },
            {
              "name": "Lever la fourbinette",
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

export default DevTools;
