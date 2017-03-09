import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import './index.css';
import TasksModel from './TasksModel';
import TaskSaver from './listener/TaskSaver';
import TaskLogger from './listener/TaskLogger';

const isDev = process.env.NODE_ENV === 'development';

const tasks = new TasksModel(JSON.parse(window.localStorage.getItem('tasks')));
tasks.addListener(new TaskSaver());
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
