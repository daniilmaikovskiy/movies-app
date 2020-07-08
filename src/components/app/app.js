import React from 'react';
import 'normalize.css';
import './app.css';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import MoviePage from '../movie-page';
import MoviesService from '../../services/movies-service';
import { MoviesServiceProvider } from '../movies-service-context';

export default class App extends React.PureComponent {
  moviesService = new MoviesService();

  state = {
    loading: true,
  };

  componentDidMount() {
    this.moviesService.createGuestSession().then((id) => {
      console.log(id);
      this.setState({ loading: false });
    });
  }

  render() {
    const { loading } = this.state;
    const content = (
      <div className="main-wrapper">
        <MoviesServiceProvider value={this.moviesService}>
          <MoviePage />
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
