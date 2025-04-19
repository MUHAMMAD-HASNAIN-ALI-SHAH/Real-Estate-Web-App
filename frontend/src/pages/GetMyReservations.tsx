import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useReserveListingStore from "../store/reserve";

function GetMyReservations() {
  const { getMyReservations, reservations } = useReserveListingStore();
  const navigate = useNavigate();

  useEffect(() => {
    getMyReservations();
  }, []);

  const handleListing = (listingId: string | null) => {
    navigate(`/listing/${listingId}`);
  };

  return (
    <div className="px-5 md:px-10 h-[70vh]">
      <div className="overflow-x-auto mt-6">
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th>Start Date</th>
              <th>End Date</th>
              <th>Listing</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations && reservations.map((reservation) => (
              <tr key={reservation._id} className="text-center">
                <td>
                  {reservation.startDate
                    ? new Date(reservation.startDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  {reservation.endDate
                    ? new Date(reservation.endDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <button
                    className="btn btn-primary bg-blue-700 border border-blue-700"
                    onClick={() => handleListing(reservation.listingId)}
                  >
                    See Listing
                  </button>
                </td>
                <td>{reservation.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GetMyReservations;
