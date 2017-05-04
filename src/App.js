import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'

import AppComponents from './components';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => (
            <Redirect to="/articles"/>
          )}/>
          <Route exact path="/articles" component={AppComponents.ArticleList} />
          <Route exact path="/articles/:id" component={AppComponents.ArticleEditor} />
          <Route path="/articles/:id/preview" component={AppComponents.ArticlePreview} />
        </div>
      </Router>
    );
  }
}

export default App;
