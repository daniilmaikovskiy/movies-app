import React from 'react';
import './movie-page.css';
import { Menu } from 'antd';
import MoviePageSearch from '../movie-page-search';
import { MoviesServiceConsumer } from '../movies-service-context';

export default class MoviePage extends React.Component {
  state = {
    switchKeys: ['search'],
  };

  onClickMenu = (evt) => {
    this.setState({ switchKeys: [evt.key] });
  };

  render() {
    const { switchKeys } = this.state;
    const { onClickMenu } = this;

    return (
      <div className="movie-page">
        <div className="switch">
          <Menu onClick={onClickMenu} selectedKeys={switchKeys} mode="horizontal">
            <Menu.Item key="search">Search</Menu.Item>
            <Menu.Item key="rated">Rated</Menu.Item>
          </Menu>
        </div>
        <MoviesServiceConsumer>
          {({ getMovies }) => {
            return <MoviePageSearch getMovies={getMovies} />;
          }}
        </MoviesServiceConsumer>
      </div>
    );
  }
}
