import React from 'react';
import PropTypes from 'prop-types';
import './movie-page-rated.css';
import Movies from '../movies';

export default class MoviePageRated extends React.Component {
  state = {
    movieBlocksData: [],
    loading: true,
  };

  componentDidUpdate(prevProps) {
    const { getRatedMovies, className } = this.props;

    if (prevProps.className !== className) {
      getRatedMovies().then(({ movieBlocksData }) =>
        this.setState({
          loading: false,
          movieBlocksData,
        })
      );
    }
  }

  render() {
    const { className, rateMovie } = this.props;
    const { movieBlocksData, loading } = this.state;

    return (
      <div className={`movie-page-rated ${className}`}>
        <Movies movieBlocksData={movieBlocksData} loading={loading} rateMovie={rateMovie} />
      </div>
    );
  }
}

MoviePageRated.propTypes = {
  className: PropTypes.string.isRequired,
  getRatedMovies: PropTypes.func.isRequired,
  rateMovie: PropTypes.func.isRequired,
};
