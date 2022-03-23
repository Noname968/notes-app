import React,{useState} from "react";
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
  const[alert,setAlert]= useState(null);
  const showalert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },3000)
  }
  return (
    <>
    <Notestate>
    <Router> 
    <Navbar/>
    <Alert alert={alert}/>
    <div className="container">
    <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Login showalert={showalert}/>
          </Route>
          <Route exact path="/signup">
            <Signup showalert={showalert}/>
          </Route>
        </Switch>
    </div>
    </Router>
    </Notestate>
    </>
  );
}

export default App;
