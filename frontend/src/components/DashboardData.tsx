import { useNavigate } from "react-router-dom";
import useListingStore from "../store/listing";

const DashboardData = () => {

  const {listings} = useListingStore();
  const navigate = useNavigate();

  return (
    <div>
        <h1 className="font-semibold text-3xl py-3">My Listings data</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center">
          <h1 className="font-semibold text-2xl">Total Listings</h1>
          <h2 className="txt-xl">{listings ? listings.length : 0}</h2>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center">
          <h1 className="font-semibold text-2xl">Total Ratings</h1>
          <h2 className="txt-xl">3.5</h2>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center">
          <h1 className="font-semibold text-2xl">Add a new listing</h1>
          <button onClick={()=>{navigate("/dashboard/add-listing")}} className="btn btn-primary bg-red-500 border border-red-500">
            Add a Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardData;
