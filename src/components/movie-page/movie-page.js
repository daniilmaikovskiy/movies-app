import React from 'react';
import './movie-page.css';
import MovieBlock from '../movie-block';
import MoviesService from '../../services/movies-service';

export default class MoviePage extends React.Component {
  moviesService = new MoviesService();

  state = {
    movieBlocksData: [],
  };

  constructor() {
    super();

    this.moviesService.getMovies('return', this.updateData);
  }

  updateData = (newData) => {
    this.setState({ movieBlocksData: newData });
  };

  render() {
    const { movieBlocksData } = this.state;

    const movieBlocks = movieBlocksData.map((el) => {
      const { id, ...movieData } = el;

      return <MovieBlock key={id} data={movieData} />;
    });

    return <div className="movie-page">{movieBlocks}</div>;
  }
}
