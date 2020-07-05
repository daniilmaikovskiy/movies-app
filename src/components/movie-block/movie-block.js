import React from 'react';
import PropTypes from 'prop-types';
import './movie-block.css';
import { formatWithOptions } from 'date-fns/fp';
import { enUS } from 'date-fns/locale';
import { Tag, Rate } from 'antd';
import { StarFilled } from '@ant-design/icons';

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

function calculateBorderColor(vote) {
  const MAX_VOTE = 10;
  const MAX_SATURATE = 255;

  const ratio = vote / MAX_VOTE;

  let green = MAX_SATURATE;
  let red = 0;

  if (ratio < 0.7) {
    red = MAX_SATURATE;
  }

  if (ratio <= 0.35) {
    green = 0;
  }

  return `rgb(${red}, ${green}, 0)`;
}

function Vote({ value }) {
  if (value === '' || value === '0') {
    return null;
  }

  return (
    <div className="vote" style={{ borderColor: calculateBorderColor(value) }}>
      {value}
    </div>
  );
}

Vote.propTypes = {
  value: PropTypes.string.isRequired,
};

export default function MovieBlock({ data }) {
  const { img, title, date, overview, vote } = data;

  return (
    <div className="movie-block">
      <div className="movie-poster">
        <div className="movie-poster__img-wrapper">
          <img src={img} alt="" />
        </div>
      </div>
      <div className="movie-description">
        <div className="col-1">
          <div className="description-img-wrapper">
            <img src={img} alt="" />
          </div>
          <div className="main-info-wrapper">
            <div className="title">{title}</div>
            <div className="date">{formatDate(date)}</div>
            <div className="tags">
              <Tag>Action</Tag>
              <Tag>Drama</Tag>
            </div>
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
            defaultValue={5}
            character={<StarFilled style={{ fontSize: '14px' }} />}
          />
        </div>
      </div>
    </div>
  );
}

MovieBlock.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    vote: PropTypes.string.isRequired,
  }).isRequired,
};
