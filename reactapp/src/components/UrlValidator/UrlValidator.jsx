import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WikipediaSearch() {
  const [searchTerm, setSearchTerm] = useState('Programming');
  const [searchResults, setSearchResults] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      clearTimeout(timeoutId);
      const newTimeoutId = setTimeout(() => {
        axios
          .get(`https://en.wikipedia.org/w/api.php`, {
            params: {
              action: 'opensearch',
              origin: '*',
              search: searchTerm,
            },
          })
          .then((response) => {
            const [, titles, descriptions, links] = response.data;
            setSearchResults(
              titles.map((title, index) => ({
                title,
                description: descriptions[index],
                link: links[index],
              }))
            );
          });
      }, 500);
      setTimeoutId(newTimeoutId);
    } else {
      setTimeout(() => {
        setSearchResults([]);
      }, 200);
    }
  }, [searchTerm]);

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: '600',
          height: '150px',
        }}
      >
        Wiki Search
      </div>
      <div style={{ marginLeft: '100px' }}>
        <form>
          {/* <label>
            Search Wikipedia:
          </label> */}
          <input
            type='text'
            style={{
              width: '200px',
              border: '1px solid grey',
              borderRadius: '3px',
              paddingLeft: '10px',
              paddingBlock: ' 5px',
            }}
            value={searchTerm}
            onChange={handleSearchTermChange}
            data-testid='searchterm'
          />
        </form>
        <ul>
          {searchResults.map((result, index) => (
            <div
              key={index}
              style={
                index % 2 === 0
                  ? {
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'rgb(239, 204, 239)',
                      paddingBlock: '10px',
                      marginLeft: '-40px',
                      width: '80vw',
                    }
                  : {
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'rgb(218, 181, 218)',
                      paddingBlock: '10px',
                      marginLeft: '-40px',
                      width: '80vw',
                    }
              }
            >
              <a
                href={result.link}
                data-testid='suggestion'
                style={{
                  textDecoration: 'none',
                  color: 'cornflowerblue',
                  marginLeft: '10px',
                }}
              >
                {result.title}
              </a>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WikipediaSearch;