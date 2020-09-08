import React from 'react';
import logo from './logo.svg';
import './App.css';
import EdaForm from './Form/EdaForm';

function App() {
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <EdaForm />
    </div>
  );
}

export default App;
