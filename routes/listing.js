const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedin, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

// index route and create route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedin,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListingForm));

// new route
router.get("/new",isLoggedin,listingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync (listingController.showListing))
    .put(isLoggedin,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
    .delete(isLoggedin,isOwner,wrapAsync(listingController.destroyListing))

// edit route
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingController.editListingForm));

module.exports = router; 