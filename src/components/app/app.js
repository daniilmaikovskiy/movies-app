import React from 'react';
import 'normalize.css';
import './app.css';
import 'antd/dist/antd.css';
import MoviePage from '../movie-page';

export default class App extends React.PureComponent {
  render() {
    return (
      <div className="main-wrapper">
        <MoviePage />
      </div>
    );
  }
}
