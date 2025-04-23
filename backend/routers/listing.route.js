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
  getNewOrder,
  acceptRejectOrder,
  getRattingRatio,
} = require("../controllers/listing.controller");

const router = express.Router();

router.route("/").post(protectedRoute, addListing);
router.route("/").put(protectedRoute, editListing);
router.route("/:id").delete(protectedRoute, deleteListing);
router.route("/").get(protectedRoute, getMyListings);
router.route("/:id").get(getSingleListing);
router.route("/category/:category").get(getListingOnCategory);
router.route("/rating").post(protectedRoute, addRating);
router.route("/get/getAllListings").get(getAllListings);
router.route("/get/new-orders").get(protectedRoute, getNewOrder);
router.route("/get/order-status/:orderId").post(protectedRoute, acceptRejectOrder);
router.route("/get-total-seller-rating").post(protectedRoute, getRattingRatio);

module.exports = router;
