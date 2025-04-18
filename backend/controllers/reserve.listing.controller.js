const Availability = require("../models/availability.listing.model");
const Listing = require("../models/listing.model");

const checkAvailability = async (req, res) => {
  try {
    const { _id, startDate, endDate } = req.body;

    const listingId = _id;

    const currentDate = new Date();

    if (new Date(startDate) < currentDate || new Date(endDate) < currentDate) {
      return res.status(400).json({ msg: "Dates must be in the future." });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return res
        .status(400)
        .json({ msg: "Start date must be before the end date." });
    }

    const durationInDays = (end - start) / (1000 * 3600 * 24);

    if (durationInDays < 1 || durationInDays > 3) {
      return res
        .status(400)
        .json({ msg: "Reservation must be between 1 and 3 days." });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ msg: "Listing not found" });
    }

    const existingReservations = await Availability.find({
      listingId,
      $or: [
        {
          startDate: { $lt: end },
          endDate: { $gt: start },
        },
      ],
    });

    if (existingReservations.length > 0) {
      return res.status(400).json({ msg: "These dates are already reserved." });
    }

    return res
      .status(201)
      .json({ msg: "Contratulations these dates are available" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

const reserve = async (req, res) => {
  try {
    console.log("Debugging reserve function");
    const user = req.user;
    const { _id, startDate, endDate } = req.body;

    const listingId = _id;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return res
        .status(400)
        .json({ msg: "Start date must be before the end date." });
    }

    const durationInDays = (end - start) / (1000 * 3600 * 24);

    if (durationInDays < 1 || durationInDays > 3) {
      return res
        .status(400)
        .json({ msg: "Reservation must be between 1 and 3 days." });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ msg: "Listing not found" });
    }

    const existingReservations = await Availability.find({
      listingId,
      $or: [
        {
          startDate: { $lt: end },
          endDate: { $gt: start },
        },
      ],
    });

    if (existingReservations.length > 0) {
      return res.status(400).json({ msg: "These dates are already reserved." });
    }

    const newReservation = new Availability({
      listingId,
      startDate: start,
      endDate: end,
      userId: user._id,
    });

    await newReservation.save();

    return res
      .status(201)
      .json({ msg: "Reserved request sent plz wait for the approval" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

const getAllReservations = async (req, res) => {
  try {
    const user = req.user;

    const reservations = await Availability.find({ userId: user._id });

    if (!reservations) return res.status(404).json({ reservations: [] });

    res.status(200).json({ reservations });
  } catch (err) {
    res.status(500).json({ msg: err.message });
    console.log(err.message);
  }
};

module.exports = {
  checkAvailability,
  reserve,
  getAllReservations,
};
