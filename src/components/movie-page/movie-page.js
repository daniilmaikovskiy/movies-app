import React from 'react';
import './movie-page.css';
import { Pagination } from 'antd';
import MovieBlock from '../movie-block';
import MoviesService from '../../services/movies-service';

export default class MoviePage extends React.Component {
  moviesService = new MoviesService((newData, newTotalPages) => {
    this.setState({
      movieBlocksData: newData,
      totalPages: newTotalPages,
    });
  });

  state = {
    movieBlocksData: [],
    totalPages: 0,
    query: '',
  };

  constructor() {
    super();

    const { query } = this.state;

    this.moviesService.getMovies(query);
  }

  onChangePage = (page) => {
    const { query } = this.state;

    if (page > 0) {
      this.moviesService.getMovies(query, page);
    }
  };

  onChangeQuery = ({ target }) => {
    const query = target.value.trimLeft();

    this.setState({ query });
    this.moviesService.getMovies(query);
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
      />
    );
  };

  render() {
    const { movieBlocksData, totalPages, query } = this.state;
    const { onChangePage, onChangeQuery, MoviePagination } = this;

    const movieBlocks = movieBlocksData.map((el) => {
      const { id, ...movieData } = el;

      return <MovieBlock key={id} data={movieData} />;
    });

    return (
      <div className="movie-page">
        <div className="switch">switch</div>
        <input
          type="search"
          className="movie-search"
          placeholder="Type to search..."
          onChange={onChangeQuery}
          value={query}
        />
        <div className="movies">{movieBlocks}</div>
        <MoviePagination total={totalPages} onChange={onChangePage} />
      </div>
    );
  }
}
