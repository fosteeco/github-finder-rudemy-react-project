import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";

import GithubState from "./context/github/GithubState";

import "./App.css";
// https://api.github.com/users
const App = () => {
  const [alert, setAlert] = useState(null); /* Default alert = null*/

  // Get users repos

  //Show Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    // this.setState({ alert: { msg, type } });
    setTimeout(() => {
      setAlert(null);
      // this.setState({ alert: null });
    }, 5000);
  };
  return (
    <GithubState>
      <Router>
        <div className="App">
          {/* <Navbar title="GitHub Finder" icon="fab fa-github" /> */}
          {/* <UserItem /> */}
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search setAlert={showAlert} />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" component={User} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};
export default App;
