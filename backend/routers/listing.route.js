const express = require("express");
const { protectedRoute } = require("../middlewares/auth.middleware");
const {
  addListing,
  editListing,
  deleteListing,
  getMyListings,
  getListingOnCategory,
  addRating,
  getSingleListing,
  getAllListings,
} = require("../controllers/listing.controller");

const router = express.Router();

router.route("/").post(protectedRoute, addListing);
router.route("/").put(protectedRoute, editListing);
router.route("/:id").delete(protectedRoute, deleteListing);
router.route("/").get(protectedRoute, getMyListings);
router.route("/:id").get(getSingleListing);
router.route("/category/:category").get(getListingOnCategory);
router.route("/rating/:listingId").post(protectedRoute, addRating);
router.route("/get/getAllListings").get(getAllListings);

module.exports = router;
