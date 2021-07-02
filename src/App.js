import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import axios from "axios";
import GithubState from "./context/github/GithubState";

import "./App.css";
// https://api.github.com/users
const App = () => {
  const [repos, setRepos] = useState([]); /* Default repos= empty array */
  const [loading, setLoading] = useState(false); /* Default loading = false */
  const [alert, setAlert] = useState(null); /* Default alert = null*/

  // Get users repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      //https://api.github.com/users/bradtraversy/repos
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };

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
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User {...props} getUserRepos={getUserRepos} repos={repos} />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};
export default App;
