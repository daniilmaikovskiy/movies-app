import React from 'react';
import PropTypes from 'prop-types';
import './movie-page-rated.css';

export default function MoviePageRated({ className }) {
  return (
    <div className={`movie-page-rated ${className}`}>
      <div className="movies">rated</div>
    </div>
  );
}

MoviePageRated.propTypes = {
  className: PropTypes.string.isRequired,
};
