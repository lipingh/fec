import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import ReviewListItem from './ReviewListItem.jsx';
import ReviewForm from './ReviewForm.jsx';
import retriveAllReviewsByPage from './retriveAllReviewsByPage';

const ReviewList = ({
  productId, totalReviews, reviews, handleChangeSort,
  characteristics, handleAddReview,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [page, setPage] = useState(1);
  const { list } = retriveAllReviewsByPage(productId, page);
  const loader = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <div className="review-list">
      <div>
        {totalReviews}
        {' reviews, sorted by '}
        <select
          onChange={(e) => {
            handleChangeSort(e.target.value);
          }}
        >
          <option value="relevant">Relevant</option>
          <option value="helpful">Helpful</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      <div>
        {
          list.map((review) => <ReviewListItem key={review.review_id} review={review} />)
        }
        <div ref={loader} />
      </div>
      <button type="button">MORE REVIEWS</button>
      <button type="button" onClick={() => setShowReviewForm(true)}>ADD A REVIEW  + </button>
      <ReviewForm
        showModal={showReviewForm}
        productId={productId}
        characteristics={characteristics}
        onClose={() => setShowReviewForm(false)}
        handleAddReview={handleAddReview}
      />
    </div>

  );
};
ReviewList.propTypes = {
  productId: PropTypes.number.isRequired,
  totalReviews: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object),
  handleAddReview: PropTypes.func.isRequired,
  handleChangeSort: PropTypes.func.isRequired,
  characteristics: PropTypes.shape({
    Fit: PropTypes.shape({ id: PropTypes.number }),
  }),
};
ReviewList.defaultProps = {
  reviews: [],
  characteristics: {},
};
export default ReviewList;
