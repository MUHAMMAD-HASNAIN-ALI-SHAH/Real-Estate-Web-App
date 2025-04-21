import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useReserveListingStore from "../store/reserve";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Textarea, Text } from "@mantine/core";
import useListingStore from "../store/listing";

function GetMyReservations() {
  const { getMyReservations, reservations } = useReserveListingStore();
  const {addRating} = useListingStore();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getMyReservations();
  }, []);

  const handleListing = (listingId: string | null) => {
    navigate(`/listing/${listingId}`);
  };

  const handleOpenRatingModal = (reservationId: string) => {
    setSelectedReservationId(reservationId);
    setComment("");
    setRating(1);
    setError("");
    open();
  };

  const handleSubmitRating = async () => {
    if (comment.trim().length < 10) {
      setError("Comment must be at least 10 characters long.");
      return;
    }

    const form = {
      availabilityId:selectedReservationId!,
      rating,
      comment
    }
    await addRating(form);
    await getMyReservations();

    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Rating" centered>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">Give Rating</h4>
            <div className="rating flex space-x-1">  
              {[1, 2, 3, 4, 5].map((num) => (
                <input
                  key={num}
                  type="radio"
                  name="rating"
                  className="mask mask-star"
                  aria-label={`${num} star`}
                  checked={rating === num}
                  onChange={() => setRating(num)}
                />
              ))}
            </div>
          </div>
          <Textarea
            placeholder="Write your review here..."
            rows={5}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (error) setError("");
            }}
          />
          {error && <Text color="red" size="sm">{error}</Text>}
          <div className="text-right">
            <button
              className="btn btn-primary bg-red-700 border border-red-700"
              onClick={handleSubmitRating}
            >
              Submit Rating
            </button>
          </div>
        </div>
      </Modal>

      <div className="px-5 md:px-10 h-[70vh]">
        <div className="overflow-x-auto mt-6">
          <table className="table w-full">
            <thead>
              <tr className="text-center">
                <th>Start Date</th>
                <th>End Date</th>
                <th>Listing</th>
                <th>Status</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {reservations &&
                reservations.map((reservation) => (
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
                        className="btn btn-primary bg-red-700 border border-red-700"
                        onClick={() => handleListing(reservation.listingId)}
                      >
                        See Listing
                      </button>
                    </td>
                    <td>{reservation.status}</td>
                    <td>
                      {reservation.status === "reserved" ? (
                        reservation.rated ? (
                          <span>Rated</span>
                        ) : (
                          <button
                            onClick={() => handleOpenRatingModal(reservation._id || "")}
                            className="btn btn-primary bg-red-700 border border-red-700"
                          >
                            Rate
                          </button>
                        )
                      ) : (
                        "---"
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default GetMyReservations;
