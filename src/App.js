import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wordQuery, setWordQuery] = useState("React");

  const url = "http://hn.algolia.com/api/v1/";
  const queryParams = "search?query=";

  const List = () => {
    if (loading) {
      return <p>Loading ...</p>;
    } else if (news.length == 0) {
      return <p>No Results Found ...</p>;
    } else {
      return (
        <ul>
          {news.map((item) => (
            <li key={item.objectID}>{item.title}</li>
          ))}
        </ul>
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
          setLoading(false);
        } else {
          console.error("Fetch error!");
        }
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchNews();
  }, [wordQuery]);

  return (
    <div>
      <h1>Hacker News</h1>

      <div>
        <label>Search:</label>
        <input
          onChange={(event) => setWordQuery(event.target.value)}
          type="text"
          placeholder="Search Hacker News ..."
        />
      </div>
      <div>{List()}</div>
    </div>
  );
}

export default App;
