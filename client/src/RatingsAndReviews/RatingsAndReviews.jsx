import React, { useState, useEffect } from 'react';
import axios from 'axios';
import options from '../config/config.js';
import FiveStar from './FiveStar.jsx';
import RatingsBreakDown from './RatingsBreakDown.jsx';
import ProductBreakDown from './ProductBreakDown.jsx';

const RatingsAndReviews = () => {
  const [recommended, setRecommended] = useState(0);
  const [notRecommended, setNotRecommended] = useState(0);
  const [ratings, setRatings] = useState({});
  const [characteristics, setCharacteristics] = useState({});
  const getReviewsMeta = () => {
    axios({
      url: `${options.url}reviews/meta?product_id=13023`,
      method: 'get',
      headers: options.headers,
    })
      .then((res) => {
        setRatings(res.data.ratings);
        setRecommended(parseInt(res.data.recommended.true, 10));
        setNotRecommended(parseInt(res.data.recommended.false, 10));
        setCharacteristics(res.data.characteristics);
        // console.log('ratings', ratings);
        // console.log('characteristics', characteristics);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getReviewsMeta();
  }, []);

  return (
    <div>
      <h5>Ratings & Reviews</h5>
      <FiveStar ratings={ratings} />
      <br />
      <RatingsBreakDown ratings={ratings} />
      <br />
      <div>
        {(recommended * 100) / (recommended + notRecommended)}
        % of reviews recommend this product
      </div>
      <br />
      <ProductBreakDown characteristics={characteristics} />
    </div>
  );
};
export default RatingsAndReviews;
