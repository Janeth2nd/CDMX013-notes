import { Routes, Route } from "react-router-dom";
import { useState } from "react";
//import React, { useEffect } from 'react';
//import { collection,  getDocs } from "firebase/firestore";
import db from "./firebase/config";
//import { auth } from "../src/componentes/google";
import "./App.css";
//import About from "./views/about";
//import Feed from "./views/Feed";
import NotFound from "./views/NotFound";
import Login from "./views/Login";
//import Home from "./views/Home";
import WriteNote from "./views/WriteNote";
import GetNotes from "./views/GetNotes";


function App() {

  const [user, setUser] = useState(null);
  function setUserNull() {
    setUser(null)
  }
  return (

    <Routes>
      <Route path="/" element={<Login setUser={setUser} />} />
      <Route path="/home" element={user ? <GetNotes logOut={setUserNull} /> : <Login setUser={setUser} />} />
      <Route path="/writeNote" element={user ? <WriteNote logOut={setUserNull} /> : <Login setUser={setUser} />} />
      <Route path="/getNotes" element={user ? <GetNotes logOut={setUserNull} /> : <Login setUser={setUser} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>

  );

}
//<Route path="/writeNote" element={user ? <WriteNote logOut = {setUserNull} /> : <Login setUser={setUser} />} />
//<Route path="/Home" element={<Home logOut = {setUserNull} />} />
// <Route path="/" element={user ? <Home logOut = {setUserNull}/> : <Login setUser={setUser} />} />

export default App;




//<Route path="/" element={user ? <Home/> : <Login setUser={setUser}/>}/>
//<Route path="/" element= {<Feed/>}/>
//<Route path="/Home" element={<Login />} />



/*const [user, setUser] = useState(null);
return (
  <Routes>
    { user?<Route path="/" element={<Home />} />: <Route path="/" element={<Login  setUser={setUser}/>} />

    }

  </Routes>
);
}

export default App;*/



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
