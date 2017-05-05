import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Util from '../util';

const ArticleFinder = (props) => {
  return (
    <form className="form-horizontal">
      <div className="form-group">
        <input value={props.keyword} onChange={props.onKeywordChange} name="keyword" placeholder="Search article" className="form-control" />
      </div>
      <div className="form-group">
        <button name="search" onClick={props.onSubmit} className="btn btn-primary">Search</button>
        <button name="add" onClick={props.onSubmit} className="btn btn-link">Add</button>
      </div>
    </form>
  );
};

const ArticleResultItem = (props) => {
  return (
    <li>
      <span class="strong">
        <Link to={`/articles/${props.article.id}`}>
          {props.article.title}
        </Link>
      </span>
      {` by ${props.article.author} `}
      <button type="button" className="close"><span aria-hidden="true">&times;</span></button>
    </li>
  );
}

const ArticleResult = (props) => {
  return (
    <ol>
      {props.articles.map(x=>{
        return (<ArticleResultItem key={x.id} article={x} />);
      })}
    </ol>
  );
};

export default class ArticleList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      searchKeyword: '',
    };

    this.handleArticleSearchSubmit = this.handleArticleSearchSubmit.bind(this);
    this.handleSearchKeywordChange = this.handleSearchKeywordChange.bind(this);
  }

  componentDidMount() {
    const resolve = x=>this.setState({articles: x});
    const error = y=>console.error("Failed to fetch articles.", y);
    Util.fetchJSON('/articles', resolve, error);
  }

  handleSearchKeywordChange(event) {
    this.setState({
      searchKeyword: event.target.value,
    });
  }

  handleArticleSearchSubmit(event) {
    event.preventDefault();
    const eventName = event.target.name;
    if (eventName === "search") {
      console.log("Search article with:", this.state.searchKeyword);
    } else if (eventName === "add") {
      console.log("Create article");
    } else {
      console.error(`Not supported event:${eventName}`);
    }
  }

  render() {
    return (
      <div id="ArticleList" className="container">
        <div className="row">
          <h1 className="text-center">ArticleList</h1>
        </div>
        <div className="row">
          <ArticleFinder keyword={this.state.searchKeyword} 
            onKeywordChange={this.handleSearchKeywordChange}
            onSubmit={this.handleArticleSearchSubmit} />
        </div>
        <div className="row">
          <ArticleResult articles={this.state.articles} />
        </div>
      </div>
    );
  }
}
