import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Util from '../util';

export default class ArticleEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      article: {pages:[]},
      currentPage: {},
    };

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: this.state.article.pages.find(x=>x.id===event.target.value)
    });
  }

  componentDidMount() {
    const resolve = x=>this.setState({article: x});
    const error = y=>console.error("Failed to load article.", y);
    Util.getJSON(`/articles/${this.props.match.params.id}`, resolve, error);
  }  

  render() {

    const currentPage = this.state.currentPage || {};

    return (
      <div id="ArticleEditor" className="container">
        <div className="row">

          <div className="col-3, Chapter">
            <ol>
              {this.state.article.pages.map(p=>
                <li key={p.id} value={p.id} onClick={this.handlePageClick}>{p.title}</li>
              )}
            </ol>
            <Link to="/articles">Close</Link>
          </div>

          <div className="col-9, Editor">
            <h1>{currentPage.title}</h1>
            <p>{currentPage.contents}</p>
          </div>

        </div>
      </div>
    );
  }
}