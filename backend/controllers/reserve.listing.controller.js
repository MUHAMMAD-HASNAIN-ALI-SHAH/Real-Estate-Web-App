const Availability = require('../models/availability.listing.model');
const Listing = require('../models/listing.model');

const checkAvailability = async (req, res) => {
  try {
    const { _id, startDate, endDate } = req.body;

    const listingId = _id;

    // Ensure that the start and end dates are Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if the start date is before the end date
    if (start >= end) {
      return res.status(400).json({ msg: "Start date must be before the end date." });
    }

    // Calculate the difference between start and end date
    const durationInDays = (end - start) / (1000 * 3600 * 24); // Convert ms to days

    // Check if the duration is between 1 and 3 days
    if (durationInDays < 1 || durationInDays > 3) {
      return res.status(400).json({ msg: "Reservation must be between 1 and 3 days." });
    }

    // Check if listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ msg: "Listing not found" });
    }

    // Check for overlapping reservations
    const existingReservations = await Availability.find({
      listingId,
      $or: [
        {
          startDate: { $lt: end },
          endDate: { $gt: start }
        }
      ]
    });

    if (existingReservations.length > 0) {
      return res.status(400).json({ msg: "These dates are already reserved." });
    }

    return res.status(201).json({ msg: "Contratulations these dates are available" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
    checkAvailability,
};
