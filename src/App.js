import React from "react";
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Notestate from "./context/notes/Notestate";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <>
    <Notestate>
    <Router> 
    <Navbar/>
    <Alert showalert="success"/>
    <div className="container">
    <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/signup">
            <Signup/>
          </Route>
        </Switch>
    </div>
    </Router>
    </Notestate>
    </>
  );
}

export default App;
