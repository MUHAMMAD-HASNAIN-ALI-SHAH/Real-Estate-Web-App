const express = require("express");
const { protectedRoute } = require("../middlewares/auth.middleware");
const {
  checkAvailability,
  reserve,
  getAllReservations,
} = require("../controllers/reserve.listing.controller");

const router = express.Router();

router.route("/check-availability").post(checkAvailability);
router.route("/reserve").post(protectedRoute, reserve);
router.route("/").get(protectedRoute, getAllReservations);
module.exports = router;
