import React from 'react';
import 'normalize.css';
import './app.css';
import MoviesService from '../../services/movies-service';
import MovieBlock from '../movie-block';

export default class App extends React.PureComponent {
  moviesService = new MoviesService();

  onClick = () => {
    this.moviesService.getMovies('return');
  };

  render() {
    return (
      <div>
        <MovieBlock />
        <button type="button" onClick={this.onClick}>
          Get Movies
        </button>
      </div>
    );
  }
}
