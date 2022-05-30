import './index.css';

import React, { memo, useCallback, useEffect, useState } from 'react';

interface HeaderProps {
  // eslint-disable-next-line no-unused-vars
  onSearch: (query: string) => void;
}

const useDebouncedValue = (value: string, wait: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), wait);
    return () => clearTimeout(id);
  }, [value]);
  return debouncedValue;
};

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 400);

  const handleOnChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setQuery(e.target.value);
    },
    [],
  );

  useEffect(() => {
    if (debouncedQuery.length >= 3) onSearch(debouncedQuery), [debouncedQuery];
  }, [debouncedQuery]);

  return (
    <header>
      <input
        type="search"
        placeholder="Search Gif"
        onChange={handleOnChange}
        value={query}
      />
    </header>
  );
};

export default memo(Header);
