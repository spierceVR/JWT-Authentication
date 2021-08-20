import './App.css';
import LoginForm from "./components/LoginForm";
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';

import {ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }
  
  const setReg = (boolean) => {
    setIsRegistered(boolean);
  }

  const isValidToken = async () => {
    const response = await fetch("http://localhost:5000/private/welcome", {
      method: "GET",
      credentials: 'include',
      headers: { "Content-Type": "application/json"}
    });
    if (response.status === 200){
      setAuth(true);
      console.log(true);
    } else {
      setAuth(false);
      console.log(false);
    }
  }

  useEffect( () => {
    isValidToken();
  }, []);

  return (
    <Fragment>
      <ToastContainer />
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" render={props =>
              <Redirect to="/login" />}
            />

            <Route exact path="/login" render={props =>
              !isAuthenticated ?
                <LoginForm {...props} setAuth={setAuth} />
                : <Redirect to="/dashboard" />}
            />

            <Route exact path="/register" render={props =>
              isRegistered ?
                <Redirect to="/login"/>
                : <RegisterForm {...props} setReg={setReg} />}
            />

            <Route exact path="/dashboard" render={props =>
              isAuthenticated ?
                <Dashboard {...props} setAuth={setAuth} />
                : <Redirect to="/login" />}
            />
 
          </Switch>
        </div>
      </Router>

    </Fragment>
  );
}

export default App;
