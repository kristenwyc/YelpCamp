const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedin, isReviewAuthor } = require('../middleware')
const Campground = require('../models/campground');
const Review = require('../models/review');

const {reviewSchema} = require('../schemas.js');
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');



router.post('/', isLoggedin, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedin, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;