const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedin, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controller/reviews.js");

//Reviews
//Post review route
router.post("/",isLoggedin,validateReview, wrapAsync(reviewController.postReview));

// delete review route
router.delete("/:reviewId",isLoggedin,isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;