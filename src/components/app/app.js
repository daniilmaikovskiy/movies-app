import React from 'react';
import 'normalize.css';
import './app.css';
import 'antd/dist/antd.css';
import { Spin, Alert } from 'antd';
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
    error: false,
    errorMessage: '',
  };

  componentDidMount() {
    Promise.all([
      this.moviesService.createGuestSession().then((id) => this.setState({ guestSessionId: id })),

      this.moviesService.getGenreList().then(({ genres }) => {
        this.genreList = genres.reduce((acc, { id, name }) => acc.set(id, name), new Map());
      }),
    ])
      .then(() => this.setState({ loading: false }))
      .catch((error) =>
        this.setState({
          error: true,
          errorMessage: error.message,
        })
      );
  }

  render() {
    const { loading, guestSessionId, error, errorMessage } = this.state;
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
    const errorAlert = (
      <Alert
        style={{ marginTop: '50px', marginBottom: '100px' }}
        message="Error:"
        description={errorMessage}
        type="error"
        showIcon
      />
    );
    const contentOrSpin = loading ? spin : content;

    return error ? errorAlert : contentOrSpin;
  }
}
