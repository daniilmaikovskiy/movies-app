import React from 'react';
import PropTypes from 'prop-types';
import './page-controller.css';
import { Pagination } from 'antd';

export default function PageController({ total, onChange }) {
  if (total === 0) {
    return null;
  }

  return (
    <Pagination
      size="small"
      pageSize="1"
      total={total}
      showSizeChanger={false}
      onChange={onChange}
      className="page-controller"
    />
  );
}

PageController.propTypes = {
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
