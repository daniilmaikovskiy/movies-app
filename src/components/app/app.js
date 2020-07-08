import React from 'react';
import 'normalize.css';
import './app.css';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import MoviePage from '../movie-page';
import MoviesService from '../../services/movies-service';
import { MoviesServiceProvider } from '../movies-service-context';

export default class App extends React.Component {
  moviesService = new MoviesService();

  state = {
    loading: true,
    guestSessionId: '',
  };

  componentDidMount() {
    this.moviesService.createGuestSession().then((id) => {
      this.setState({
        loading: false,
        guestSessionId: id,
      });
    });
  }

  render() {
    const { loading, guestSessionId } = this.state;
    const content = (
      <div className="main-wrapper">
        <MoviesServiceProvider value={this.moviesService}>
          <MoviePage guestSessionId={guestSessionId} />
        </MoviesServiceProvider>
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
