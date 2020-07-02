import React from 'react';
import './app.css';
import MoviesService from '../../services/movies-service';

export default class App extends React.PureComponent {
  moviesService = new MoviesService();

  onClick = () => {
    this.moviesService.getMovies('return');
  };

  render() {
    return (
      <button type="button" onClick={this.onClick}>
        Get Movies
      </button>
    );
  }
}
