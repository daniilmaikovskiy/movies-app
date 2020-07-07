import React from 'react';
import 'normalize.css';
import './app.css';
import 'antd/dist/antd.css';
import MoviePage from '../movie-page';
import MoviesService from '../../services/movies-service';
import { MoviesServiceProvider } from '../movies-service-context';

export default class App extends React.PureComponent {
  moviesService = new MoviesService();

  render() {
    return (
      <div className="main-wrapper">
        <MoviesServiceProvider value={this.moviesService}>
          <MoviePage />
        </MoviesServiceProvider>
      </div>
    );
  }
}
