import React from "react";

import {
  BrowserRouter as Router,
  withRouter,
  Route,
  Switch,
  NavLink
} from "react-router-dom";

import { Dashboard, Extensions } from "./containers";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPuzzlePiece,
} from "@fortawesome/free-solid-svg-icons";

import "./App.scss";

const NotFound = () => {
  return <span>Error 404 | Not Found</span>;
};

const App = () => {
  return (
    <div id="App">
      <Router>
        <nav>
          <ul className="list-unstyled">
            <NavLink activeClassName="active" exact to="/">
              <li>
                <FontAwesomeIcon icon={faHome} size="lg" />
              </li>
            </NavLink>
            <NavLink activeClassName="active" to="/extensions">
              <li>
                <FontAwesomeIcon icon={faPuzzlePiece} size="lg" />
              </li>
            </NavLink>
          </ul>
        </nav>
        <div id="contents">
          <Switch>
            <Route
              exact
              path="/extensions"
              component={withRouter(Extensions)}
            />
            <Route exact path="/" component={withRouter(Dashboard)} />
            <Route exact path="*" component={withRouter(NotFound)} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
