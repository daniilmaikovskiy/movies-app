import React from 'react';
import PropTypes from 'prop-types';
import './movie-block.css';
import { formatWithOptions } from 'date-fns/fp';
import { enUS } from 'date-fns/locale';
import { Tag } from 'antd';

function formatDate(date) {
  const dateObj = new Date(date);
  const dateToString = formatWithOptions({ locale: enUS }, 'MMMM d, yyyy');

  return dateToString(dateObj);
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

export default function MovieBlock({ data }) {
  const { img, title, date, overview } = data;

  return (
    <div className="movie-block">
      <div className="col-1">
        <div className="img-wrapper">
          <img src={img} alt="" />
        </div>
        <div className="main-info-wrapper">
          <div className="title">{title}</div>
          <div className="date">{formatDate(date)}</div>
          <Tag>Action</Tag>
          <Tag>Drama</Tag>
        </div>
      </div>
      <div className="col-2">
        <span className="overview">{cutOverview(overview)}</span>
      </div>
      <div className="col-3" />
    </div>
  );
}

MovieBlock.propTypes = {
  data: PropTypes.objectOf({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    vote: PropTypes.string.isRequired,
  }).isRequired,
};
