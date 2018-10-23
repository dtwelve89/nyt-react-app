import React, { Component } from "react";
import API from "../../utils/API";
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Container from "../../components/Container";
import { List, ListItem } from "../../components/List";
import ActionBtn from "../../components/ActionBtn";
import { Input, FormBtn} from "../../components/Form";
import Footer from "../../components/Footer";


class Home extends Component {
  //Set initial state
  state = {
    articles: [],
    topic: "",
    start: "",
    end: "",
  };

  // Handles NYT API Function
  searchArticles = (topic, start, end) => {
    API.search(topic, start, end)
      .then(response => {
        let results = response.data.response.docs;
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
    let topic = this.state.topic;
    let start = this.state.start;
    let end = this.state.end;
    this.searchArticles(topic, start, end);
  };

  //Function to Save Articles
  saveArticle = (article) => {
    let Title = article.headline.main;
    let PubDate = article.pub_date;
    let WebUrl = article.web_url;

    API.saveArticle({
      title: Title,
      date: PubDate,
      url: WebUrl
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
                placeholder="Article Topic"
              />
              <Input
                value={this.state.start}
                onChange={this.handleInputChange}
                name="start"
                placeholder="Start Date (YYYYMMDD)"
              />
              <Input
                value={this.state.end}
                onChange={this.handleInputChange}
                name="end"
                placeholder="End Date (YYYYMMDD)"
              />
              <FormBtn
                disabled={!(this.state.topic && this.state.start && this.state.end)}
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
                    <ActionBtn action="Save Article" onClick={() => this.saveArticle(article)} />
                    <a href={article.web_url} rel="noopener noreferrer" target="_blank">
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
        <Footer />
      </div>
    );
  }
}

export default Home;
