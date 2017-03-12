import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import './index.css';
import TasksModel from './TasksModel';
import TaskLogger from './listener/TaskLogger';

const isDev = process.env.NODE_ENV === 'development';

const tasks = new TasksModel(
  window.localStorage.getItem('currentBoard')
);

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
