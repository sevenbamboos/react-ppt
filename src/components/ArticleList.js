import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Util from '../util';

export default class ArticleList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    const resolve = x=>this.setState({articles: x});
    const error = y=>console.error("Failed to fetch articles.", y);
    Util.fetchJSON('/articles', resolve, error);
  }

  render() {
    return (
      <div id="ArticleList" className="container">
        <div className="row">
          <h1 className="text-center">ArticleList</h1>
        </div>
        <div className="row">
          <ul>
            {this.state.articles.map(x=>(
              <li key={x.id}><Link to={`/articles/${x.id}`}>{x.title}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
