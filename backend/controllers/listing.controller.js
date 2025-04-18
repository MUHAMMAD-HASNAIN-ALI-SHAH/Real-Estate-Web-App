const Rating = require("../models/ratings.model");
const cloudinary = require("../config/cloudinary");
const Listing = require("../models/listing.model");

// ADD LISTING
const addListing = async (req, res) => {
  try {
    const user = req.user;
    const {
      title,
      description,
      category,
      price,
      country,
      address,
      bedrooms,
      beds,
      bathrooms,
      image,
      image1,
      image2,
      image3,
      image4,
      available,
    } = req.body;

    if (!image) return res.status(400).json({ msg: "Image is required" });

    if (!image1 || !image2 || !image3 || !image4) {
      return res.status(400).json({ msg: "Plz send all the images." });
    }

    const upload = await cloudinary.uploader.upload(image, {
      folder: "listing_images",
    });

    const upload1 = await cloudinary.uploader.upload(image1, {
      folder: "listing_images",
    });

    const upload2 = await cloudinary.uploader.upload(image2, {
      folder: "listing_images",
    });

    const upload3 = await cloudinary.uploader.upload(image3, {
      folder: "listing_images",
    });

    const upload4 = await cloudinary.uploader.upload(image4, {
      folder: "listing_images",
    });

    const listing = new Listing({
      title,
      description,
      category,
      price,
      country,
      address,
      bedrooms,
      beds,
      bathrooms,
      image: upload.secure_url,
      image1: upload1.secure_url,
      image2: upload2.secure_url,
      image3: upload3.secure_url,
      image4: upload4.secure_url,
      available,
      userId: user._id,
    });

    await listing.save();

    res.status(201).json({ msg: "Listing added successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
    console.log(err.message);
  }
};

// EDIT LISTING
const editListing = async (req, res) => {
  try {
    const user = req.user;
    const {
      _id,
      title,
      description,
      category,
      price,
      country,
      address,
      bedrooms,
      beds,
      bathrooms,
      image,
      image1,
      image2,
      image3,
      image4,
      available,
    } = req.body;

    const listing = await Listing.findById(_id);
    if (!listing) return res.status(404).json({ msg: "Listing not found" });

    if (!listing.userId.equals(user._id)) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    if (!image1 || !image2 || !image3 || !image4) {
      return res.status(400).json({ msg: "Plz send all the images." });
    }

    if (image && image !== listing.image) {
      const publicId = listing.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`listing_images/${publicId}`);

      const newUpload = await cloudinary.uploader.upload(image, {
        folder: "listing_images",
      });

      listing.image = newUpload.secure_url;
    }

    if (image1 !== listing.image1) {
      const publicId = listing.image1.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`listing_images/${publicId}`);

      const newUpload1 = await cloudinary.uploader.upload(image1, {
        folder: "listing_images",
      });

      listing.image1 = newUpload1.secure_url;
    }
    if (image2 !== listing.image2) {
      const publicId = listing.image2.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`listing_images/${publicId}`);

      const newUpload2 = await cloudinary.uploader.upload(image2, {
        folder: "listing_images",
      });

      listing.image2 = newUpload2.secure_url;
    }
    if (image3 !== listing.image3) {
      const publicId = listing.image3.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`listing_images/${publicId}`);

      const newUpload3 = await cloudinary.uploader.upload(image3, {
        folder: "listing_images",
      });

      listing.image3 = newUpload3.secure_url;
    }
    if (image4 !== listing.image4) {
      const publicId = listing.image4.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`listing_images/${publicId}`);

      const newUpload4 = await cloudinary.uploader.upload(image4, {
        folder: "listing_images",
      });

      listing.image4 = newUpload4.secure_url;
    }

    listing.title = title;
    listing.description = description;
    listing.category = category;
    listing.price = price;
    listing.country = country;
    listing.address = address;
    listing.bedrooms = bedrooms;
    listing.beds = beds;
    listing.bathrooms = bathrooms;
    listing.available = available;
    listing.userId = user._id;
    listing.updatedAt = Date.now();

    await listing.save();

    res.status(200).json({ msg: "Listing updated successfully", listing });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// DELETE LISTING
const deleteListing = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    const listing = await Listing.findById(id);
    if (!listing) return res.status(404).json({ msg: "Listing not found" });

    if (!listing.userId.equals(user._id)) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    const publicId = listing.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`listing_images/${publicId}`);

    await listing.deleteOne();

    res.status(200).json({ msg: "Listing deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET MY LISTINGS
const getMyListings = async (req, res) => {
  try {
    const user = req.user;

    const listings = await Listing.find({ userId: user._id });

    if (!listings) return res.status(404).json({ listings: [] });

    res.status(200).json({ listings });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET MY LISTINGS
const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find({});

    if (!listings) return res.status(404).json({ listings: [] });

    res.status(200).json({ listings });
  } catch (err) {
    res.status(500).json({ msg: err.message });
    console.log(err.message);
  }
};

// GET SINGLE LISTING
const getSingleListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findOne({ _id: id });

    if (!listing) return res.status(404).json({ listings: null });

    res.status(200).json({ listing });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET LISTINGS BY CATEGORY
const getListingOnCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const listings = await Listing.find({ category });

    res.status(200).json({ listings });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ADD RATING
const addRating = async (req, res) => {
  try {
    const user = req.user;
    const { listingId } = req.params;
    const { rating, message } = req.body;

    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ msg: "Listing not found" });

    const alreadyRated = await Rating.findOne({ userId: user._id, listingId });

    if (alreadyRated) {
      alreadyRated.rating = rating;
      alreadyRated.message = message;
      await alreadyRated.save();
      return res.status(200).json({ msg: "Rating updated successfully" });
    }

    const newRating = new Rating({
      rating,
      message,
      userId: user._id,
      listingId,
    });

    await newRating.save();

    res.status(201).json({ msg: "Rating added successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  addListing,
  editListing,
  deleteListing,
  getMyListings,
  getListingOnCategory,
  addRating,
  getSingleListing,
  getAllListings,
};
