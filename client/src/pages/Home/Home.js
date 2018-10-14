import React, { Component } from "react";
import API from "../../utils/API";
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Query from "../../components/Query";
import Results from "../../components/Results";
import Test from "../../components/Test";

class Home extends Component {
  //Set initial state
  state = {
      articles: [],
      topic: "",
      // start: "",
      // end: ""
  };

  // Handles NYT API Function
  searchArticles = query => {
    API.search(query)
      .then(response => {
        var results;
        console.log('response', response);
        results = response.data.response.docs;
        if (response.data.response.docs.length === 0) {
          results = [
            { headline: { main: "No Results" }, byline: { original: "" } }
          ];
        }
        this.setState({ articles: results });
        console.log(this.state.articles);
      });
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the NYT API for the value of `this.state.topic`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchArticles(this.state.topic);
  };

  //Function to Save Articles
  handleSave = id => {
    console.log("It works!")
    console.log(id);
    API.saveArticle({
        title: this.state.articles[0].headline.main,
        date: this.state.articles[0].pub_date,
        url: this.state.articles[0].web_url
      })
        .then(res => this.getArticles())
        .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Wrapper>
          <Header />
          <Query
            value={this.state.topic}
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
          />
          {/* <Results 
          /> */}
          {this.state.articles.map(article => (
            <Test
              id={article.id}
              key={article.id}
              title={article.headline.main}
              url={article.web_url}
              date={article.pub_date}
              onChange={this.handleSave}
            />
          ))}
        </Wrapper>
      </div>
    );
  }
}

export default Home;
