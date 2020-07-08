import React from 'react';
import PropTypes from 'prop-types';
import './movie-page-search.css';
import { Empty, Spin, Alert } from 'antd';
import { debounce } from 'lodash';
import MovieBlock from '../movie-block';
import PageController from '../page-controller';

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

    console.log(page);

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
            errorMessage: error,
          });
        });
    }
  }, 300);

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

  getMovies = () => {
    const { movieBlocksData, loading, error, errorMessage } = this.state;

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

    const isEmpty = !movieBlocksData.length;

    if (isEmpty) {
      return <Empty style={{ marginTop: '60px', marginBottom: '100px' }} />;
    }

    const movieBlocks = movieBlocksData.map((el) => {
      const { id, ...movieData } = el;

      return <MovieBlock key={id} data={movieData} />;
    });

    return movieBlocks;
  };

  render() {
    const { totalPages, query, page } = this.state;
    const { onChangeQuery, onChangePage, getMovies } = this;
    const { className } = this.props;

    return (
      <div className={`movie-page-search ${className}`}>
        <input
          type="search"
          className="movie-search"
          placeholder="Type to search..."
          onChange={onChangeQuery}
          value={query}
        />
        <div className="movies">{getMovies()}</div>
        <PageController total={totalPages} onChange={onChangePage} current={page} />
      </div>
    );
  }
}

MoviePageSearch.propTypes = {
  getMovies: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};
