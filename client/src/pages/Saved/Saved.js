import React, { Component } from "react";
import API from "../../utils/API";
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Container from "../../components/Container";
import { List, ListItem } from "../../components/List";
import ActionBtn from "../../components/ActionBtn";

class Saved extends Component {
  state = {
    category: "Saved Articles",
    articles: []
  };

  componentDidMount() {
    this.loadArticles();
  };

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        // console.log(res)
        this.setState({ articles: res.data })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Wrapper>
          <Header />
          <Container
            category={this.state.category}
          >
          {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <ActionBtn action="Delete Article" onClick={() => this.deleteArticle(article._id)}/>
                    <a href={article.url} rel="noopener noreferrer" target="_blank">
                      <button className="btn btn-light float-right">View Article</button>
                    </a>
                    <h5 className="card-title">{article.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Published On: {article.date}</h6>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Saved Articles to Display</h3>
            )}
          </Container>
        </Wrapper>
      </div>
    );
  }
}

export default Saved;
