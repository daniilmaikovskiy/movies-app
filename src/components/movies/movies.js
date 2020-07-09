import React from 'react';
import PropTypes from 'prop-types';
import './movies.css';
import { Empty, Spin, Alert } from 'antd';
import MovieBlock from '../movie-block';

export default function Movies({ movieBlocksData, loading, error, errorMessage, rateMovie }) {
  const getMovies = () => {
    if (error) {
      const text = errorMessage === 'Failed to fetch' ? 'No internet connection' : 'Server error';

      return (
        <Alert
          style={{ marginTop: '50px', marginBottom: '100px' }}
          message="Error:"
          description={text}
          type="error"
          showIcon
        />
      );
    }

    if (loading) {
      return <Spin tip="loading..." style={{ marginTop: '60px', marginBottom: '100px' }} />;
    }

    if (!movieBlocksData.length) {
      return <Empty style={{ marginTop: '60px', marginBottom: '100px' }} />;
    }

    return movieBlocksData.map((el) => {
      const { id, ...movieData } = el;

      return (
        <MovieBlock
          key={id}
          data={movieData}
          rateMovie={(vote) => {
            rateMovie(id, vote);
          }}
        />
      );
    });
  };

  return <div className="movies">{getMovies()}</div>;
}

Movies.defaultProps = {
  movieBlocksData: [],
  loading: false,
  error: false,
  errorMessage: '',
  rateMovie: () => {},
};

Movies.propTypes = {
  movieBlocksData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      vote: PropTypes.string.isRequired,
      rating: PropTypes.number,
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  rateMovie: PropTypes.func,
};
