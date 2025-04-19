import { useEffect, useState } from "react";
import useListingStore from "../store/listing";
import { useParams } from "react-router-dom";
import { DateInput } from "@mantine/dates";
import useReserveListingStore from "../store/reserve";

const Listing = () => {
  const { getSingleListing } = useListingStore();
  const [listing, setListing] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [daysDifference, setDaysDifference] = useState<number | null>(null);
  const { id } = useParams();

  const { checkAvailability, available, reserve } = useReserveListingStore();

  const clearAvailable = () => {
    useReserveListingStore.setState({ available: false });
  };

  useEffect(() => {
    clearAvailable();
  }, [id]);

  useEffect(() => {
    const fetchListing = async () => {
      const listingData = await getSingleListing(id as string);
      setListing(listingData);
    };

    fetchListing();
  }, [id]);

  const handleAvailability = () => {
    useReserveListingStore.setState({ available: false });
    if (startDate && endDate) {
      setDateError(null);
      const dates = {
        _id: listing._id,
        startDate: startDate,
        endDate: endDate,
      };

      checkAvailability(dates);
    } else {
      setDateError("Please select both dates.");
    }
  };

  useEffect(() => {
    if (available && startDate && endDate) {
      const diff = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      setDaysDifference(diff);
    }
  }, [available, startDate, endDate]);

  const reserveListing = async () => {
    if (startDate && endDate) {
      const dates = {
        _id: listing._id,
        startDate: startDate,
        endDate: endDate,
      };
      reserve(dates);
    }
  };

  return (
    <div className="px-10 flex flex-col items-center justify-center mt-5">
      <div className="w-[100%] flex flex-col">
        {listing ? (
          <>
            <div>
              <h1 className="font-semibold text-3xl py-3">{listing.title}</h1>
              <div className="grid grid-cols-7 grid-row-3 gap-4">
                <div className="col-span-3">
                  <img
                    className="h-[250px] w-full object-cover rounded-md"
                    src={listing.image}
                    alt={listing.title}
                  />
                </div>
                <div className="col-span-2">
                  <div className="flex flex-col gap-2">
                    <img
                      className="rounded-md object-cover"
                      src={listing.image1}
                      alt=""
                    />
                    <img
                      className="rounded-md object-cover"
                      src={listing.image2}
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex flex-col gap-2">
                    <img
                      className="rounded-md object-cover"
                      src={listing.image3}
                      alt=""
                    />
                    <img
                      className="rounded-md object-cover"
                      src={listing.image4}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-2">
                <h1 className="font-semibold text-2xl pt-3">
                  {listing.address}
                </h1>
                <p className="text-lg">
                  {listing.bedrooms} bedroom - {listing.beds} bed -{" "}
                  {listing.bathrooms} bath
                </p>
                <p className="text-lg">
                  <i className="ri-star-s-fill"></i> 4.98 -{" "}
                  <span className="underline">199 reviews</span>
                </p>
                <div className="border border-gray-300 rounded-lg py-3 px-5 mt-10">
                  <h1 className="front-semobold text-xl font-semibold">
                    Hosted by Hasnain
                  </h1>
                  <h1 className="text-gray-500">
                    Super host - 5 years hosting
                  </h1>
                </div>
                <p className="mt-10">{listing.description}</p>

                <div className="border border-gray-300 rounded-lg py-3 px-5 mt-10">
                  <h1 className="front-semobold text-xl font-semibold">
                    Self check-in
                  </h1>
                  <h1 className="text-gray-500">
                    You can check in with the building staff.
                  </h1>
                </div>

                <div className="border border-gray-300 rounded-lg py-3 px-5 mt-10">
                  <h1 className="front-semobold text-xl font-semibold">
                    Great location
                  </h1>
                  <h1 className="text-gray-500">
                    Guests who stayed here in the past year loved the location.
                  </h1>
                </div>

                <div className="border border-gray-300 rounded-lg py-3 px-5 mt-10">
                  <h1 className="front-semobold text-xl font-semibold">
                    Where you sleep
                  </h1>
                  <h1 className="text-gray-500">
                    There are 2 beeds in this appartment
                  </h1>
                </div>

                <h1 className="mt-10 font-semibold text-2xl">
                  Reviews and ratings
                </h1>

                <div className="border border-gray-300 rounded-lg py-3 px-5 mt-4">
                  <p className="text-lg py-2">
                    <i className="ri-star-s-fill"></i> 4.98 -{" "}
                    <span className="underline">199 reviews</span>
                  </p>

                  <div className="border border-gray-300 rounded-lg py-3 px-5">
                    <div className="flex justify-between items-center">
                      <h1 className="front-semobold text-xl font-semibold">
                        Hasnain Ali
                      </h1>
                      <h1>April 23, 2024</h1>
                    </div>
                    <h1 className="text-gray-500">
                      Ths is an amazing place to live by
                    </h1>
                  </div>
                </div>
              </div>

              <div className="col-span-1">
                <div className="border border-gray-300 p-3 mt-10 rounded-md">
                  <h1 className="text-xl">{listing.price}$ / night</h1>
                  <div className="flex flex-col border border-gray-400 rounded-md mt-5">
                    <div className="flex">
                      <DateInput
                        value={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                          clearAvailable();
                        }}
                        placeholder="Start date"
                        className="w-[50%] border border-gray-400 px-2 py-1"
                        type="text"
                      />
                      <DateInput
                        value={endDate}
                        onChange={(date) => {
                          setEndDate(date);
                          clearAvailable();
                        }}
                        placeholder="End date"
                        className="w-[50%] border border-gray-400 px-2 py-1"
                        type="text"
                      />
                    </div>
                  </div>

                  {dateError && (
                    <p className="text-red-600 px-2">
                      Please select both dates
                    </p>
                  )}

                  <button
                    disabled={available}
                    onClick={handleAvailability}
                    className={`btn btn-primary bg-red-700 border ${
                      available ? "border-white" : "border-red-700"
                    } border-red-700 mt-5 w-full`}
                  >
                    Check Avability
                  </button>
                  <div>
                    {available && (
                      <>
                        <p className="text-red-500 text-center mt-2">
                          You wont be charged yet
                        </p>
                        <div className="flex justify-between items-center mt-5">
                          <h2>
                            {listing.price}$ x {daysDifference}days
                          </h2>
                          <h2>${listing.price * daysDifference!}</h2>
                        </div>
                        <div className="flex justify-between items-center mt-9">
                          <h2>Total ammount</h2>

                          <h2>${listing.price * daysDifference!}</h2>
                        </div>
                        <button
                          onClick={reserveListing}
                          className="btn btn-primary bg-red-700 border border-red-700 mt-5 w-full"
                        >
                          Reserve
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>No listing found</div>
        )}
      </div>
    </div>
  );
};

export default Listing;
