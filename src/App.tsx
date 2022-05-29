import { requestData } from 'api';
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
  const [queryText, setQueryText] = useState('');

  const loadGifs = async (query?: string, offset?: number) => {
    setLoading(true);
    const data = await requestData(query, offset).catch((error) => {
      console.error(error);
      setGifs([]);
      setLoading(false);
    });
    setGifs(data.data);
    setLoading(false);
  };

  useEffect(() => {
    const localStorageQuery = localStorage.getItem('lastQuery');
    if (localStorageQuery !== null) {
      loadGifs(localStorageQuery);
    } else {
      loadGifs();
    }
  }, []);

  useEffect(() => {
    if (!queryText) return;
    setLoading(true);
    loadGifs(queryText);
  }, [queryText]);

  const handleOnChange = useCallback((query: string) => {
    if (query) setQueryText(query);
    localStorage.setItem('lastQuery', query);
  }, []);

  return (
    <div className="App">
      <Header onSearch={handleOnChange} />
      <Content gifs={gifs} loading={loading} />
    </div>
  );
}

export default App;
