import React, { Component } from 'react';

export default class ArticleList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    fetch('/articles')
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        this.setState({
          articles: data
        });
      })
      .catch(ex => console.error("Failed to fetch articles.", ex))
  }

  render() {
    return (
      <div>
        <h1>ArticleList</h1>
        <ol>
          {this.state.articles.map(x=>(
            <li key={x.id}>{x.title}</li>
          ))}
        </ol>
      </div>
    );
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}