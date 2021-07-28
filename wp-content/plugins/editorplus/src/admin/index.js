const { __ } = wp.i18n;
const { Component } = wp.element;

/**
 * Internal dependencies
 */
import { react } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";

import GeneralPage from "./pages/general.js";
import AdvancedPage from "./pages/advanced.js";
// app layout
import Layout from "./layout/index";

// import useAxios, { configure } from 'axios-hooks' // TODO remove this library...

import "./style.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <Switch>
            <Route
              path="/"
              component={(props) => {
                const CurrentPage = () => {
                  const { hash } = props.location;

                  if (hash === "" || hash === "#/general") {
                    return <GeneralPage />;
                  } else if (hash.startsWith("#/advanced")) {
                    return <AdvancedPage />;
                  }
                };

                return (
                  <Layout>
                    <CurrentPage />
                  </Layout>
                );
              }}
            />
          </Switch>
        </Provider>
      </Router>
    );
  }
}

const root = document.querySelector("#editor-plus-root");

if (root) {
  render(<App />, root);
}
