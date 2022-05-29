import './index.css';

import { Gif } from 'App';
import React, { memo, useState } from 'react';

interface ContentProps {
  gifs: Gif[];
  loading: boolean;
}

interface CardProps {
  gif: Gif;
}

const Card: React.FC<CardProps> = ({ gif }) => {
  const [text, setText] = useState('Copy gif');
  const { images, title } = gif;
  const handleCopy = () => {
    navigator.clipboard.writeText(images?.original?.url);
    setText('Copied!');
  };
  const handleOut = () => setText('Copy gif');

  return (
    <div
      className="card"
      onClick={handleCopy}
      onMouseOut={handleOut}
      onBlur={handleOut}
      onKeyPress={handleCopy}
      role="button"
      tabIndex={0}
    >
      <div className="card__overlay">{text}</div>
      <img className="card__image" src={images?.preview_gif?.url} alt={title} />
    </div>
  );
};

const NoResults = () => {
  return (
    <div className="no-results">
      <h2>No gifs found this time :( </h2>
      <img
        src="https://media2.giphy.com/media/g01ZnwAUvutuK8GIQn/giphy.gif?cid=790b7611f89a95ae5941566cb6d361d97d16190b0bd45db1&rid=giphy.gif&ct=g"
        alt="No gifs found"
      />
    </div>
  );
};

const Loading = () => {
  return (
    <div className="loading">
      <h2>Loading...</h2>
    </div>
  );
};

const Content: React.FC<ContentProps> = ({ gifs, loading }) => {
  if (loading) return <Loading />;
  if (!gifs.length) return <NoResults />;
  return (
    <div className="content">
      {gifs.map((gif: Gif, idx) => (
        <Card gif={gif} key={`key-${idx}`} />
      ))}
    </div>
  );
};

export default memo(Content);
