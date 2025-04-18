import { Table } from "@mantine/core";
import useReserveListingStore from "../store/reserve";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GetMyReservations() {
  const { getMyReservations, reservations } = useReserveListingStore();
  const navigate = useNavigate();

  useEffect(() => {
    getMyReservations();
  }, []);

  const rows = reservations.map((reservation) => (
    <Table.Tr key={reservation._id}>
      <Table.Td>
        {reservation.startDate
          ? new Date(reservation.startDate).toLocaleDateString()
          : "N/A"}
      </Table.Td>
      <Table.Td>
        {reservation.endDate
          ? new Date(reservation.endDate).toLocaleDateString()
          : "N/A"}
      </Table.Td>
      <Table.Td
        onClick={() => handleListing(reservation.listingId)}
        className="text-blue-700 cursor-pointer hover:underline"
      >
        {reservation.listingId}
      </Table.Td>
      <Table.Td>{reservation.status}</Table.Td>
    </Table.Tr>
  ));

  const handleListing = (listingId: string | null) => {
    navigate(`/listing/${listingId}`);
  };

  return (
    <div className="px-5 md:px-10 h-[70vh]">
      <div className="mt-6">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Start Date</Table.Th>
              <Table.Th>End Date</Table.Th>
              <Table.Th>Listing Id</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
}

export default GetMyReservations;
