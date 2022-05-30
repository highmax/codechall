import { LIMIT, requestData } from 'api';
import Content from 'components/Content';
import Header from 'components/Header';
import React, { useCallback, useEffect, useState } from 'react';

export interface Gif {
  id: string;
  type: string;
  images: {
    preview_gif: {
      url: string;
    };
    original: {
      url: string;
    };
  };
  title: string;
  url: string;
}

function App() {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState(true);
  const [queryText, setQueryText] = useState(
    () => localStorage.getItem('lastQuery') || '',
  );
  const [offset, setOffset] = useState(0);

  const loadGifs = async () => {
    setLoading(true);
    const data = await requestData(queryText, offset).catch((error) => {
      console.error(error);
      setGifs([]);
      setLoading(false);
    });
    setGifs([...gifs, ...data.data]);
    setLoading(false);
  };

  useEffect(() => {
    loadGifs();
  }, [offset, queryText]);

  const handleOnChange = useCallback((query: string) => {
    if (query) {
      setGifs([]);
      setQueryText(query);
    }
    localStorage.setItem('lastQuery', query);
  }, []);

  const handleLoadMore = useCallback(() => {
    setOffset((offset) => offset + LIMIT);
  }, []);

  return (
    <div className="App">
      <Header onSearch={handleOnChange} />
      <Content gifs={gifs} loading={loading} onLoadMore={handleLoadMore} />
    </div>
  );
}

export default App;
