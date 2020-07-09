import React from 'react';
import 'normalize.css';
import './app.css';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import MoviePage from '../movie-page';
import MoviesService from '../../services/movies-service';
import { MoviesServiceProvider } from '../movies-service-context';
import { GenreListProvider } from '../genre-list-context';
import ErrorAlert from '../error-alert';

export default class App extends React.Component {
  moviesService = new MoviesService();

  state = {
    loading: true,
    guestSessionId: '',
    error: false,
    errorMessage: '',
    genreList: null,
  };

  componentDidMount() {
    Promise.all([
      this.moviesService.createGuestSession().then((id) => this.setState({ guestSessionId: id })),

      this.moviesService.getGenreList().then(({ genres }) => {
        const genreList = genres.reduce((acc, { id, name }) => acc.set(id, name), new Map());

        this.setState({ genreList });
      }),
    ])
      .catch((error) =>
        this.setState({
          error: true,
          errorMessage: error.message,
        })
      )
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { loading, guestSessionId, error, errorMessage, genreList } = this.state;

    if (error) return <ErrorAlert message={errorMessage} />;

    const content = (
      <div className="main-wrapper">
        <GenreListProvider value={genreList}>
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
