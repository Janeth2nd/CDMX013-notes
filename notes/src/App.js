import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/noauth/Login";
import Home from "./components/home/Home";
function App() {
  const [user, setUser] = useState({"mail":"Ale"});
  return (
    <Routes>
      { user?<Route path="/" element={<Home />} />: <Route path="/" element={<Login  setUser={setUser}/>} />

      }
    
    </Routes>
  );
}

export default App;







//import Home from './components/home/Home';
/*import Login from './components/noauth/Login'

function App() {
  return (
    <div className="App">
      <Login/>

    </div>
  );
  }

export default App;*/








//Ejemplo de useEffect. conteo de clicks
/*import React, { useState, useEffect } from 'react';

function App () {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
export default App*/



//Ejemplo de Documentación de REACT
/*function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

export default App;*/




/*import logo from './logo.svg';
import './App.css';
import something from './components/auth/Login'

function App() {
  return (
  
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
