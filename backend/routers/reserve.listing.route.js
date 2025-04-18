const express = require("express");
const { protectedRoute } = require("../middlewares/auth.middleware");
const { checkAvailability } = require("../controllers/reserve.listing.controller");

const router = express.Router();

router.route("/check-availability").post(checkAvailability);
module.exports = router;
