import React, { Component } from "react";
import API from "../../utils/API";
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Saves from "../../components/Saves";

class Saved extends Component {
  
  // When this component mounts, search for the article
  componentDidMount() {
    API.getArticles();
  }

  render() {
    return (
      <div>
        <Wrapper>
          <Header />
          <Saves />
        </Wrapper>
      </div>
    );
  }
}

export default Saved;
