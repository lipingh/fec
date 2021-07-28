import React from 'react';

const Star = ({ marked, starId }) => (
  <span data-star-id={starId} className="star" role="button">
    {marked ? '\u2605' : '\u2606'}
  </span>
);
export default Star;
