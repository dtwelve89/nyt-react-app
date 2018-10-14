import axios from "axios";
const apiURL = "https://api.nytimes.com/svc/";
const apiKey = "d8fa6745e8a645958ac6b24539fa497f";
const specialtyURL = "search/v2/articlesearch.json?q=";

export default {
  // Runs NYT API Search
  search: function(query) {
    return axios.get(apiURL + specialtyURL + query + "&api-key=" + apiKey);
  },
  // Gets all books
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves an article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
