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

  const localOnDelete = (event) => {
    props.onDelete(props.article.id);
    event.preventDefault();
  };

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
        <button type="button" className="close" onClick={localOnDelete}><span aria-hidden="true">&times;</span></button>
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
      <tbody>
        {props.articles.map(x=>{
          return (<ArticleResultItem key={x.id} article={x} onDelete={props.onDeleteArticle} />);
        })}
      </tbody>
    </table>
  );
};

export default class ArticleList extends Component {

  filterArticleTitle = x=>x.title.indexOf(this.state.searchKeyword) !== -1;

  getArticles = filterAction => {
    const resolve = allArticles => this.setState({articles: allArticles.filter(filterAction)});
    const error = y=>console.error("Failed to get articles.", y);
    Util.getJSON('/articles', resolve, error);
  };

  createArticle = () => {
    const resolve = savedArticle => this.setState({articles: [...this.state.articles, savedArticle]});
    const error = y=>console.error("Failed to create article.", y);
    const newArticle = {"title":"New Article", "author":"Unknown", "pages": []};
    Util.postJSON('/articles', newArticle, resolve, error);
  };

  deleteArticle = articleID => {
    const index = this.state.articles.findIndex(element => element.id === articleID);
    let newArticles;
    if (index === -1) {
      newArticles = this.state.articles;
    } else {
      newArticles = this.state.articles.slice(0, index).concat(this.state.articles.slice(index+1, this.state.articles.length));
    }
    const resolve = Article => this.setState({articles: newArticles});
    const error = y=>console.error("Failed to delete article.", y);
    Util.deleteJSON(`/articles/${articleID}`, resolve, error);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      searchKeyword: '',
    };

    this.handleArticleSearchSubmit = this.handleArticleSearchSubmit.bind(this);
    this.handleSearchKeywordChange = this.handleSearchKeywordChange.bind(this);
    this.handleDeleteArticle = this.handleDeleteArticle.bind(this);
  }

  componentDidMount() {
    this.getArticles(this.filterArticleTitle);
  }

  handleSearchKeywordChange(event) {
    this.setState({
      searchKeyword: event.target.value,
    });
  }

  handleDeleteArticle(articleID) {
    if (articleID)
      this.deleteArticle(articleID);
  }

  handleArticleSearchSubmit(event) {
    event.preventDefault();
    const eventName = event.target.name;
    if (eventName === "search") {
      console.log("Search article with:", this.state.searchKeyword);
      this.getArticles(this.filterArticleTitle);

    } else if (eventName === "add") {
      console.log("Create article");
      this.createArticle();

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
          <ArticleResult onDeleteArticle={this.handleDeleteArticle} articles={this.state.articles} />
        </div>
      </div>
    );
  }
}
