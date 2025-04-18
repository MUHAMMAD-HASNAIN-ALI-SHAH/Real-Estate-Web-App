import { useEffect } from "react";
import useListingStore from "../store/listing";
import { useNavigate } from "react-router-dom";

const DashBoardListings = () => {
  const { getMyListings, listings, deleteListing,submitionState } = useListingStore();
  const navigate = useNavigate();

  useEffect(() => {
    getMyListings();
  }, [getMyListings]);

  return (
    <>
      <h1 className="font-semibold text-3xl py-3 mt-10">My Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div
              key={listing._id}
              className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={listing.image || "https://via.placeholder.com/300"}
                alt="Listing"
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="font-semibold text-lg mb-1">
                    {listing.title}
                  </h2>
                  <p className="text-gray-600">$: {listing.price} / night</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button
                    onClick={() => {
                      navigate(`/dashboard/edit/${listing._id}`);
                    }}
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                    <button
                    onClick={() => deleteListing(listing._id ?? "")}
                    className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                    disabled={!!submitionState}
                    >
                    Delete
                    </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg shadow-md w-full">
            <p className="text-gray-500">No listings available</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DashBoardListings;
