import NewInteraction from "components/NewInteraction";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "sass/_index.scss";
import store from "store";

class App extends Component {
  render = () => {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route
                exact
                path="/coloring/new_interaction"
                component={NewInteraction}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  };
}

export default App;
