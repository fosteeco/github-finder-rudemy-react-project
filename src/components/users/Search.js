import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import GitHubContext from "../../context/github/githubContext";

const Search = ({ setAlert }) => {
  const gitHubContext = useContext(GitHubContext);
  const [text, setText] = useState("");

  const onChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "light");
    } else {
      gitHubContext.searchUsers(text);
      setText("");
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          id=""
          placeholder="Search Users..."
          value={text}
          onChange={onChange}
        />
        <input type="submit" value="Search" className="btn-dark btn-block" />
      </form>
      {gitHubContext.users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={gitHubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  setAlert: PropTypes.func.isRequired,
};
export default Search;
