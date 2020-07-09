import React from 'react';
import PropTypes from 'prop-types';
import './movie-block.css';
import { formatWithOptions } from 'date-fns/fp';
import { enUS } from 'date-fns/locale';
import { Tag, Rate, Empty } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { GenreListConsumer } from '../genre-list-context';

function formatDate(date) {
  try {
    const dateObj = new Date(date);
    const dateToString = formatWithOptions({ locale: enUS }, 'MMMM d, yyyy');

    return dateToString(dateObj);
  } catch {
    return date;
  }
}

function isLetterOrDigit(symbol) {
  const isLowerLetter = symbol >= 'a' && symbol <= 'z';
  const isUpperLetter = symbol >= 'A' && symbol <= 'Z';
  const isDigitSymbol = symbol >= '0' && symbol <= '9';

  return isLowerLetter || isUpperLetter || isDigitSymbol;
}

function cutOverview(txt) {
  let i = 225;
  let cutedTxt = txt.slice(0, i);
  let isDeletedAllUncompletedWords = false;

  while (!isDeletedAllUncompletedWords) {
    if (isLetterOrDigit(cutedTxt[i - 1])) {
      i -= 1;
    } else {
      isDeletedAllUncompletedWords = true;
    }
  }

  cutedTxt = cutedTxt.slice(0, i);

  return cutedTxt + (txt.length !== cutedTxt.length ? '...' : '');
}

function getBorderColorClass(vote) {
  if (vote > 7) {
    return 'vote-higher-7';
  }
  if (vote > 5) {
    return 'vote-higher-5';
  }
  if (vote > 3) {
    return 'vote-higher-3';
  }

  return 'vote-lower-3';
}

function Vote({ value }) {
  if (value === '' || value === '0') {
    return null;
  }

  return <div className={`vote ${getBorderColorClass(value)}`}>{value}</div>;
}

Vote.propTypes = {
  value: PropTypes.string.isRequired,
};

function MoviePoster({ img }) {
  const image = img === '' ? <Empty /> : <img src={img} alt="" />;

  return (
    <div className="movie-poster">
      <div className="movie-poster__img-wrapper">{image}</div>
    </div>
  );
}

MoviePoster.propTypes = {
  img: PropTypes.string.isRequired,
};

function Genres({ genreList, genreIds }) {
  const getTags = () => {
    return genreIds.reduce((acc, id) => {
      const genre = genreList.get(id);

      if (genre) {
        acc.push(<Tag key={id}>{genre}</Tag>);
      }

      return acc;
    }, []);
  };

  return <div className="tags">{getTags()}</div>;
}

Genres.propTypes = {
  genreList: PropTypes.objectOf(Map).isRequired,
  genreIds: PropTypes.arrayOf(Number).isRequired,
};

export default function MovieBlock({ data, rateMovie }) {
  const { img, title, date, overview, vote, rating, genreIds } = data;

  return (
    <div className="movie-block">
      <MoviePoster img={img} />
      <div className="movie-description">
        <div className="col-1">
          <div className="description-img-wrapper">
            <img src={img} alt="" />
          </div>
          <div className="main-info-wrapper">
            <div className="title">{title}</div>
            <div className="date">{formatDate(date)}</div>
            <GenreListConsumer>
              {(genreList) => <Genres genreList={genreList} genreIds={genreIds} />}
            </GenreListConsumer>
          </div>
          <Vote value={vote} />
        </div>
        <div className="col-2">
          <span className="overview">{cutOverview(overview)}</span>
        </div>
        <div className="col-3">
          <Rate
            allowHalf
            count={10}
            defaultValue={typeof rating === 'number' ? rating : 0}
            character={<StarFilled className="star-filled" />}
            onChange={rateMovie}
          />
        </div>
      </div>
    </div>
  );
}

MovieBlock.propTypes = {
  rateMovie: PropTypes.func.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    vote: PropTypes.string.isRequired,
    genreIds: PropTypes.arrayOf(Number).isRequired,
    rating: PropTypes.number,
  }).isRequired,
};
