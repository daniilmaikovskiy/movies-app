import React from 'react';
import PropTypes from 'prop-types';
import './movie-page-rated.css';
import Movies from '../movies';

export default function MoviePageRated({ className }) {
  return (
    <div className={`movie-page-rated ${className}`}>
      <Movies />
    </div>
  );
}

MoviePageRated.propTypes = {
  className: PropTypes.string.isRequired,
};
