import "./App.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wordQuery, setWordQuery] = useState("React");

  const [currPage, setCurrPage] = useState(1);

  const url = "http://hn.algolia.com/api/v1/";
  const queryParams = "search?query=";

  // const navigate = useNavigate();

  const List = () => {
    if (loading) {
      return <p>Loading ...</p>;
    } else if (news.length === 0) {
      return <p>No Results Found ...</p>;
    } else {
      console.log(news);
      return (
        <>
          <ul class="list-group">
            {currItems.map((item) => (
              <li
                class="list-group-item list-group-item-action"
                key={item.objectID}
              >
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
          <br></br>
          <ul class="pagination">
            <li class="page-item">
              {/* <a class="page-link" onClick={() => navigate(-1)}>
                Previous
              </a> */}
              <a class="page-link" href={`page-${1}`}>
                Previous
              </a>
            </li>
            {pageNumbers.map((number) => (
              <li class="page-item" key={number}>
                <a
                  class="page-link"
                  onClick={() => setCurrPage(number)}
                  href={`page-${number}`}
                >
                  {number}
                </a>
              </li>
            ))}
            <li class="page-item">
              <a class="page-link">Next</a>
            </li>
          </ul>
        </>
      );
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      const endpoint = `${url}${queryParams}${wordQuery}`;
      try {
        setLoading(true);
        const res = await fetch(endpoint, { cache: "no-cache" });
        if (res.ok) {
          const data = await res.json();
          setNews(data.hits);
          console.log();
          setLoading(false);
        } else {
          console.error("Fetch error!");
          alert("Sehr Schlimme Sache!");
        }
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchNews();
  }, [wordQuery]);

  const lastItem = currPage * 5;
  const firstItem = lastItem - 5;
  const currItems = news.slice(firstItem, lastItem);

  const pageNumbers = [];

  for (let i = 1; i <= Number(news.length / 5); i++) {
    pageNumbers.push(i);
  }

  return (
    <div class="container">
      <br></br>
      <h1>Hacker News</h1>
      <br></br>
      <div class="form-group">
        <label>Search:</label>
        <input
          class="form-control"
          onChange={(event) => setWordQuery(event.target.value)}
          type="text"
          placeholder="Search Hacker News ..."
        />
      </div>
      <br></br>
      <div>{List()}</div>
    </div>
  );
}

export default App;
