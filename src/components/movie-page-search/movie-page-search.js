import React from 'react';
import PropTypes from 'prop-types';
import './movie-page-search.css';
import { debounce } from 'lodash';
import PageController from '../page-controller';
import Movies from '../movies';

export default class MoviePageSearch extends React.Component {
  state = {
    movieBlocksData: [],
    totalPages: 0,
    query: '',
    page: 1,
    loading: false,
    error: false,
    errorMessage: '',
  };

  debouncedMoviesServiceGetMovies = debounce((prevState) => {
    const { query, page } = this.state;
    const { getMovies } = this.props;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true });

      getMovies(query, page)
        .then(({ movieBlocksData, totalPages }) => {
          this.setState({
            movieBlocksData,
            totalPages,
            loading: false,
          });
        })
        .catch((error) => {
          this.setState({
            error: true,
            errorMessage: error.message,
          });
        });
    }
  }, 500);

  componentDidUpdate(prevProps, prevState) {
    this.debouncedMoviesServiceGetMovies(prevState);
  }

  onChangePage = (page) => {
    if (page > 0) {
      this.setState({ page });
    }
  };

  onChangeQuery = ({ target }) => {
    const query = target.value.trimLeft();

    this.setState({ query, page: 1 });
  };

  render() {
    const { totalPages, query, page, movieBlocksData, loading, error, errorMessage } = this.state;
    const { onChangeQuery, onChangePage } = this;
    const { className, rateMovie } = this.props;

    return (
      <div className={`movie-page-search ${className}`}>
        <input
          type="search"
          className="movie-search"
          placeholder="Type to search..."
          onChange={onChangeQuery}
          value={query}
        />
        <Movies
          movieBlocksData={movieBlocksData}
          loading={loading}
          error={error}
          errorMessage={errorMessage}
          rateMovie={rateMovie}
        />
        <PageController total={totalPages} onChange={onChangePage} current={page} />
      </div>
    );
  }
}

MoviePageSearch.propTypes = {
  getMovies: PropTypes.func.isRequired,
  rateMovie: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};
