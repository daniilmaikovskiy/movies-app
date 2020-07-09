import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './movie-page-selector.css';
import MoviePageSearch from '../movie-page-search';
import MoviePageRated from '../movie-page-rated';
import MoviesServiceContext from '../movies-service-context';

export default function MoviePageSelector({ switchKeys, guestSessionId }) {
  const { getMovies, rateMovie, getRatedMovies } = useContext(MoviesServiceContext);

  const getHideClassByName = (name) => {
    const isVisible = switchKeys.some((el) => el === name);

    return isVisible ? '' : 'hidden';
  };

  return (
    <>
      <MoviePageSearch
        className={getHideClassByName('search')}
        getMovies={getMovies}
        rateMovie={(id, vote) => rateMovie(guestSessionId, id, vote)}
      />
      <MoviePageRated
        className={getHideClassByName('rated')}
        rateMovie={(id, vote) => rateMovie(guestSessionId, id, vote)}
        getRatedMovies={() => getRatedMovies(guestSessionId)}
      />
    </>
  );
}

MoviePageSelector.propTypes = {
  switchKeys: PropTypes.arrayOf(String).isRequired,
  guestSessionId: PropTypes.string.isRequired,
};
