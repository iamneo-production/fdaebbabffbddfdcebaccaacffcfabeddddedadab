import React, { useState,useEffect } from 'react';
import fetchData from './utillity';


function Search() {
  const [searchTerm, setSearchTerm] = useState('Programming');
  const [results, setResults] = useState([]);
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTerm) {
        fetchData(searchTerm, setResults);
      } else {
        setResults([]);
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [searchTerm]);
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSearchInputBlur = () => {
    setTimeout(() => {
      setResults([]);
    }, 200);
  }
  return (
    <div>
      Learn React
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        onBlur={handleSearchInputBlur}
        placeholder="Type your search term"
        data-testid="searchterm"
      />
      <ul>
        {results.map((result) => (
          <li>
            <a href={result.url} data-testid="suggestion">
              {result.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
