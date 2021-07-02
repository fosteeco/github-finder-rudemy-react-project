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
  const [users, setUsers] = useState([]); /* Default users =  empty array */
  const [user, setUser] = useState({}); /* Default user = empty object */
  const [repos, setRepos] = useState([]); /* Default repos= empty array */
  const [loading, setLoading] = useState(false); /* Default loading = false */
  const [alert, setAlert] = useState(null); /* Default alert = null*/

  //Search Github Users
  const searchUsers = async (text) => {
    // console.log("main-app", text);
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data.items);
    setLoading(false);
    // this.setState({ users: res.data.items, loading: false });
  };
  // Get single github users

  const getUser = async (username) => {
    setUser(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
  };

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

  //clear users
  const clearUsers = () => {
    setUsers([]);
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
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
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
