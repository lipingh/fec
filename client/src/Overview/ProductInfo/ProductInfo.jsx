import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import options from '../../config/config.js';
import { ExpandContext } from '../Overview.jsx';
import { globalContext } from '../../index.jsx';
import StarRating from '../../RatingsAndReviews/StarRating.jsx'
import style from './ProductInfo.module.css';

const ProductInfo = () => {
  const contextData = useContext(ExpandContext);
  const globalData = useContext(globalContext);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReview, setTotalReview] = useState(0);
  const [category, setCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [onSale, setOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState('');

  useEffect(() => {
    setAverageRating(globalData.state.ratingsBreakDown.averageRatings);
    setTotalReview(globalData.state.ratingsBreakDown.totalReviews);

    setCategory(globalData.state.category);
    setProductName(globalData.state.name);
    axios.get(`${options.url}products/${globalData.state.productId}/styles`, { headers: options.headers })
      .then((response) => {
        setPrice(response.data.results[contextData.currState.styleIndex].original_price);
        if (response.data.results[contextData.currState.styleIndex].sale_price !== null) {
          setOnSale(true);
          setSalePrice(response.data.results[contextData.currState.styleIndex].sale_price);
        } else {
          setOnSale(false);
        }
      })
      .catch((err) => {
        console.log('styles data fetching err', err);
      });
  }, [contextData.currState.styleIndex, globalData.state.productId,
  globalData.state.ratingsBreakDown, globalData.state.name, globalData.state.category]);

  return (
    <div>
      <div style={{ display: 'inline-block' }}>
        <StarRating rating={averageRating} />
      </div>
      <a href="#customerReviews" className={style.linkToReviewComponent}>{totalReview}</a>
      <h4 className={style.category}>{category}</h4>
      <h1 className={style.title}>{productName}</h1>
      {onSale ? <><span style={{ color: 'red', fontWeight: 'bold' }}>${salePrice}</span><span className={style.oldPrice} style={{ fontWeight: 'bold' }}>${price}</span></>
        : <span style={{ fontWeight: 'bold' }}>${price}</span>}
    </div>
  );
};

export default ProductInfo;
