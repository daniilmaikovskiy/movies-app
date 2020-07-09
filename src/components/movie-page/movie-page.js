import React from 'react';
import PropTypes from 'prop-types';
import './movie-page.css';
import { Menu } from 'antd';
import MoviePageSelector from '../movie-page-selector';

export default class MoviePage extends React.Component {
  state = {
    switchKeys: ['search'],
  };

  onClickMenu = (evt) => {
    this.setState({ switchKeys: [evt.key] });
  };

  render() {
    const { guestSessionId } = this.props;
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
        <MoviePageSelector guestSessionId={guestSessionId} switchKeys={switchKeys} />
      </div>
    );
  }
}

MoviePage.propTypes = {
  guestSessionId: PropTypes.string.isRequired,
};
