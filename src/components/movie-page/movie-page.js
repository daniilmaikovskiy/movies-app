import React from 'react';
import './movie-page.css';
import { Pagination, Menu, Empty, Spin, Alert } from 'antd';
import _ from 'lodash';
import MovieBlock from '../movie-block';
import MoviesService from '../../services/movies-service';

export default class MoviePage extends React.Component {
  moviesService = new MoviesService();

  state = {
    movieBlocksData: [],
    totalPages: 0,
    query: '',
    page: 1,
    switchKeys: ['search'],
    loading: false,
    error: false,
    errorMessage: '',
  };

  debouncedGetMovies = _.debounce((prevState) => {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true });

      this.moviesService
        .getMovies(query, page)
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
    this.debouncedGetMovies(prevState);
  }

  onChangePage = (page) => {
    if (page > 0) {
      this.setState({ page });
    }
  };

  onChangeQuery = ({ target }) => {
    const query = target.value.trimLeft();

    this.setState({ query });
  };

  onClickMenu = (evt) => {
    this.setState({ switchKeys: [evt.key] });
  };

  MoviePagination = ({ total, onChange }) => {
    if (total === 0) {
      return null;
    }

    return (
      <Pagination
        size="small"
        pageSize="1"
        total={total}
        showSizeChanger={false}
        onChange={onChange}
        className="movie-pagination"
      />
    );
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
    const { totalPages, query, switchKeys } = this.state;
    const { onChangePage, onChangeQuery, MoviePagination, onClickMenu, getMovies } = this;

    return (
      <div className="movie-page">
        <div className="switch">
          <Menu onClick={onClickMenu} selectedKeys={switchKeys} mode="horizontal">
            <Menu.Item key="search">Search</Menu.Item>
            <Menu.Item key="rated">Rated</Menu.Item>
          </Menu>
        </div>
        <input
          type="search"
          className="movie-search"
          placeholder="Type to search..."
          onChange={onChangeQuery}
          value={query}
        />
        <div className="movies">{getMovies()}</div>
        <MoviePagination total={totalPages} onChange={onChangePage} />
      </div>
    );
  }
}
