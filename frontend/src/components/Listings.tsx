import { useEffect } from "react";
import useHomeListingStore from "../store/home";
import { useNavigate } from "react-router-dom";

const Listings = () => {
  const { listings, getAllListings } = useHomeListingStore();
  const navigate = useNavigate();

  useEffect(() => {
    getAllListings();
  }, [getAllListings]);

  return (
    <div className="grid grid-cols-3 gap-5">
      {listings.length > 0 ? (
        listings.map((listing) => (
          <div
            onClick={() => navigate(`/listing/${listing._id ?? ""}`)}
            key={listing._id}
            className="flex flex-col h-[300px] bg-white cursor-pointer hover:transform hover:scale-105 transition duration-300 ease-in-out shadow-2xl rounded-2xl overflow-hidden"
          >
            <img
              src={listing.image ?? ""}
              alt=""
              className="h-[70%] rounded-2xl p-2"
            />
            <h1 className="font-semibold px-2">
              {listing.title.trim().length > 40
                ? `${listing.title.trim().slice(0, 40)}...`
                : listing.title.trim()}
            </h1>
            <p className="px-2">
              {listing.description.trim().length > 70
                ? `${listing.description.trim().slice(0, 70)}...`
                : listing.description.trim()}
            </p>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg shadow-md">
          <p className="text-gray-500">No listings available</p>
        </div>
      )}
    </div>
  );
};

export default Listings;
