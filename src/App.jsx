import React from 'react';
import { Provider } from 'react-redux';
import store from './store'; 
import UsernameForm from './components/UsernameForm'; 
import ToDoList from './components/ToDoList'; 
import './styling/App.scss';

function App() {
  return (
    <Provider store={store}>
      <h1>Project</h1>
      <UsernameForm />
      <ToDoList />
  </Provider>
);
}

export default App
