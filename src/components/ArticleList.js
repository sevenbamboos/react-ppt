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
    <tr>
      <td>
        <Link to={`/articles/${props.article.id}`}>
          {props.article.title}
        </Link>
      </td>
      <td>
        {props.article.author}
      </td>
      <td>
        <button type="button" className="close"><span aria-hidden="true">&times;</span></button>
      </td>
    </tr>
  );
}

const ArticleResult = (props) => {
  return (
    <table className="table table-responsive">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th></th>
        </tr>
      </thead>
      <tfoot>
        <tr><td colSpan="3">Article count:{props.articles.length}</td></tr>
      </tfoot>
      {props.articles.map(x=>{
        return (<ArticleResultItem key={x.id} article={x} />);
      })}
    </table>
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
    this.fetchFromRemote(this.filterArticleTitlet);
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
      this.fetchFromRemote(this.filterArticleTitle);

    } else if (eventName === "add") {
      console.log("Create article");
    } else {
      console.error(`Not supported event:${eventName}`);
    }
  }

  filterArticleTitle = x=>x.title.indexOf(this.state.searchKeyword) != -1;

  fetchFromRemote = filterAction => {
    const resolve = x=> this.setState({articles: x.filter(filterAction)});
    const error = y=>console.error("Failed to fetch articles.", y);
    Util.fetchJSON('/articles', resolve, error);
  };

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
