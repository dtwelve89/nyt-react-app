import React, { Component } from "react";
import API from "../../utils/API";
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Container from "../../components/Container";
import { List, ListItem } from "../../components/List";
import ActionBtn from "../../components/ActionBtn";
import { Input, FormBtn} from "../../components/Form";

class Home extends Component {
  //Set initial state
  state = {
    articles: [],
    topic: "",
    start: "",
    end: "",
    title: "",
    date: "",
    url: ""
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
  saveArticle = () => {
    API.saveArticle({
      title: this.state.title,
      date: this.state.date,
      url: this.state.url
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    };

  render() {
    return (
      <div>
        <Wrapper>
          <Header />
          <Container
            category="Query">
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.start}
                onChange={this.handleInputChange}
                name="start"
                placeholder="Start Date"
              />
              <Input
                value={this.state.end}
                onChange={this.handleInputChange}
                name="end"
                placeholder="End Date"
              />
              <FormBtn
                disabled={!(this.state.topic)}
                onClick={this.handleFormSubmit}
              >
              Search
              </FormBtn>
            </form>
          </Container>
          <Container
            category="Results">
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <ActionBtn action="Save Article" onClick={() => 
                      (this.setState({
                        title: article.headline.main, date: article.pub_date, url: article.url
                      }))
                      .then(this.saveArticle())} />
                    <a href={article.url} rel="noopener noreferrer" target="_blank">
                      <button className="btn btn-light float-right">View Article</button>
                    </a>
                    <h5 className="card-title">{article.headline.main}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Published On: {article.pub_date}</h6>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Articles to Display</h3>
            )}
          </Container>
        </Wrapper>
      </div>
    );
  }
}

export default Home;
