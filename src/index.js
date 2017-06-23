import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import './index.css';
import TaskList from './model/TaskList';
import TaskLogger from './listener/TaskLogger';
import registerServiceWorker from './registerServiceWorker';

const isDev = process.env.NODE_ENV === 'development';

const suffixQuery = window.location.search.match(/dbSuffix=([a-zA-Z0-9-]+)/);
const DB_SUFFIX = suffixQuery ? suffixQuery[1]
  : window.localStorage.getItem('currentDb');

if (!DB_SUFFIX) {
  ReactDOM.render(
    <div>
      No database selected
    </div>,
    document.getElementById('root')
  );
} else {
  window.localStorage.setItem('currentDb', DB_SUFFIX);

  const tasks = new TaskList(DB_SUFFIX);

  tasks.then((tasks) => {
    // tasks.addListener(new TaskSaver());
    if (isDev) {
      tasks.addListener(new TaskLogger());
    }



    ReactDOM.render(
      <App
        tasks={tasks}
        isDev={isDev}
      />,
      document.getElementById('root')
    );
  });

  registerServiceWorker();
}
