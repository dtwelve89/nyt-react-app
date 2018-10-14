const apiURL = "https://api.nytimes.com/svc/";
let specialtyURL = "search/v2/articlesearch.json?q=";
class Articles extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ul>
          {this.props.articles.map(function(article) {
            return (
              <li key={article._id}>
                <a href={article.web_url} target="_blank">
                  <span className="bold">{article.headline.main}</span> --
                  {" "}{article.byline.original}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

class Movies extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.movies.map(function(movie) {
            return (
              <li key={movie._id}>
                <a href={movie.link.url} target="_blank">
                  <span className="bold"> {movie.display_title}</span> --
                  {" "}<span className="italic">{movie.headline}</span> --
                  {" "}{movie.byline}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

class Input extends React.Component {
  //set initial state
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      apiKey: "d8fa6745e8a645958ac6b24539fa497f",
      articles: [],
      movies: [],
      searchType: "articles"
    };
  }

  getArticle = () => {
    axios
      .get(
        apiURL +
          specialtyURL +
          this.state.userInput +
          "&api-key=" +
          this.state.apiKey
      )
      .then(response => {
        var results;
        console.log('response', response);
        if (this.state.searchType === "articles") {
           results = response.data.response.docs;
          if (response.data.response.docs.length === 0) {
            results = [
              { headline: { main: "No Results" }, byline: { original: "" } }
            ];
          }
          this.setState({ articles: results });
        }
        if (this.state.searchType === "movie reviews") {
          results = response.data.results;
          if (response.data.num_results === 0) {
            response.data.results = [{ display_title: "No Results" }];
          }
          this.setState({ movies: results });
        }
      });
  };

  clearForm = () => {
    this.refs.searcher.value = "";
    this.setState({ userInput: "", articles: [], movies: [] });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleChange(e.target.value);
    }
  };

  handleChange = (term) => {
    let newInput = term;
    if (newInput) {
      this.state.userInput = newInput;
      this.getArticle();
    }
  };

  handleOptionChange = (e) => {
    let type;
    if (e.target.innerText === "Articles" || e.target.value === "articles") {
      specialtyURL = "search/v2/articlesearch.json?sort=newest&q=";
    }
    if (
      e.target.innerText === "Movie Reviews" ||
      e.target.value === "movie reviews"
    ) {
      specialtyURL = "movies/v2/reviews/search.json?query=";
    }
    type = e.target.innerText || e.target.value;
    type = type.toLowerCase();
    this.clearForm();
    this.setState({ searchType: type });
  };

  render() {
    return (
      <div>
        <h2>Search the NY Times</h2>
        <div className="search-wrapper">
          <div className="tabs-wrapper">
            <div className="tab" onClick={this.handleOptionChange}>
              <input
                type="radio"
                name="articles"
                value="articles"
                checked={this.state.searchType === "articles"}
              />
              <label>
                Articles
              </label>
            </div>
            <div className="tab" onClick={this.handleOptionChange}>
              <input
                type="radio"
                name="movies"
                value="movie reviews"
                checked={this.state.searchType === "movie reviews"}
              />
              <label>
                Movie Reviews
              </label>
            </div>
          </div>
          <input
            placeholder={"Search " + this.state.searchType}
            className="form-control"
            onKeyPress={this.handleKeyPress}
            ref="searcher"
          />
        </div>
        <Articles className="articles" articles={this.state.articles} />
        <Movies className="movies" movies={this.state.movies} />

      </div>
    );
  }
}

//render
ReactDOM.render(<Input />, document.getElementById("app"));
