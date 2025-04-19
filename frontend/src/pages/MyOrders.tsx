import { useEffect, useState } from "react";
import useListingStore from "../store/listing";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { getNewOrders, updateOrderStatus } = useListingStore();
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const newOrders = await getNewOrders();
      setOrders(newOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [getNewOrders]);

  const handleStatus = async (status: string, orderId: string) => {
    await updateOrderStatus(status, orderId);
    fetchOrders();
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr className="text-center">
            <th>Order Palced on</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Listing Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr className="text-center">
                <td>{order.createdAt.split("T")[0]}</td>
                <td>{order.startDate.split("T")[0]}</td>
                <td>{order.endDate.split("T")[0]}</td>
                <td>
                  <button className="btn btn-primary bg-red-700 border border-red-700">
                    See Listing
                  </button>
                </td>
                <td className="flex gap-1 justify-center">
                  <button
                    className="btn btn-primary bg-red-700 border border-red-700"
                    onClick={() => handleStatus("reserved", order._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-primary bg-red-700 border border-red-700"
                    onClick={() => handleStatus("rejected", order._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
