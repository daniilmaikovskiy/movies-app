import React from 'react';
import './movie-block.css';

export default function MovieBlock() {
  return (
    <div className="movie-block">
      <div className="col-1">
        <div className="img-wrapper">
          <img src="/my/name" alt="name" />
        </div>
      </div>
      <div className="col-2" />
      <div className="col-3" />
    </div>
  );
}
