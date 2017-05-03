import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'

import AppComponents from './components';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => (
            <Redirect to="/article-list"/>
          )}/>
          <Route path="/article-list" component={AppComponents.ArticleList} />
          <Route path="/article-editor" component={AppComponents.ArticleEditor} />
          <Route path="/article-preview" component={AppComponents.ArticlePreview} />
        </div>
      </Router>
    );
  }
}

export default App;
