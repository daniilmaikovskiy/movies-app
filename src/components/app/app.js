import React from 'react';
import 'normalize.css';
import './app.css';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import MoviePage from '../movie-page';
import MoviesService from '../../services/movies-service';
import { MoviesServiceProvider } from '../movies-service-context';
import { GenreListProvider } from '../genre-list-context';

export default class App extends React.Component {
  moviesService = new MoviesService();

  genreList = null;

  state = {
    loading: true,
    guestSessionId: '',
  };

  componentDidMount() {
    Promise.all([
      this.moviesService.createGuestSession().then((id) => this.setState({ guestSessionId: id })),

      this.moviesService.getGenreList().then(({ genres }) => {
        this.genreList = genres.reduce((acc, { id, name }) => acc.set(id, name), new Map());
      }),
    ]).then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading, guestSessionId } = this.state;
    const content = (
      <div className="main-wrapper">
        <GenreListProvider value={this.genreList}>
          <MoviesServiceProvider value={this.moviesService}>
            <MoviePage guestSessionId={guestSessionId} />
          </MoviesServiceProvider>
        </GenreListProvider>
      </div>
    );
    const spin = (
      <div className="loading-wrapper">
        <Spin tip="loading..." />
      </div>
    );

    return loading ? spin : content;
  }
}
