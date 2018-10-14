import React from "react";

const Results = () => (
  
  <div className="card">
    <h3 className="card-header">Results</h3>
    <div className="card-body">
    </div>
  </div>
);

// class Results extends React.Component{
  
//   render() {
//     return (
//       <div className="card">
//         <h3 className="card-header">Results</h3>
//         <div className="card-body">
//           {this.props.articles.map(function(article) {
//             return (
//               <div className="card" key={article._id}>
//                 <div className="card-body">
//                   <button className="btn btn-dark float-right">Save Article</button>
//                   <a href={article.web_url} rel="noopener noreferrer" target="_blank">
//                     <button className="btn btn-light float-right">View Article</button>
//                   </a>
//                   <h5 className="card-title">{article.headline.main}</h5>
//                   <h6 className="card-subtitle mb-2 text-muted">{article.pub_date}</h6>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// }

export default Results;