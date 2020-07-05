import React from 'react';
import './movie-page.css';
import { Pagination } from 'antd';
import MovieBlock from '../movie-block';
import MoviesService from '../../services/movies-service';

export default class MoviePage extends React.Component {
  moviesService = new MoviesService();

  state = {
    movieBlocksData: [],
    totalPages: 0,
    query: 'return',
  };

  constructor() {
    super();

    const { query } = this.state;

    this.moviesService.getMovies(query, this.updateData);
  }

  onChange = (page) => {
    const { query } = this.state;

    if (page > 0) {
      this.moviesService.getMovies(query, this.updateData, page);
    }
  };

  updateData = (newData, newTotalPages) => {
    this.setState({
      movieBlocksData: newData,
      totalPages: newTotalPages,
    });
  };

  render() {
    const { movieBlocksData, totalPages } = this.state;
    const { onChange } = this;

    const movieBlocks = movieBlocksData.map((el) => {
      const { id, ...movieData } = el;

      return <MovieBlock key={id} data={movieData} />;
    });

    return (
      <div className="movie-page">
        <div className="movies">{movieBlocks}</div>
        <Pagination
          size="small"
          pageSize="1"
          total={totalPages}
          showSizeChanger={false}
          onChange={onChange}
        />
      </div>
    );
  }
}
