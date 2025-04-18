import { create } from "zustand";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

interface DatesFormData {
  _id: string | null;
  startDate: Date | null;
  endDate: Date | null;
}

interface Reservations {
  _id: string | null;
  listingId: string | null;
  userId: string | null;
  startDate: Date | null;
  endDate: Date | null;
  status: string | null;
}
[];

interface ListingStore {
  available: boolean;
  reservations: Reservations[];
  checkAvailability: (dates: DatesFormData) => void;
  reserve: (dates: DatesFormData) => void;
  getMyReservations: () => void;
}

const useReserveListingStore = create<ListingStore>((set) => ({
  available: false,
  reservations: [],
  checkAvailability: async (dates) => {
    try {
      const response = await axiosInstance.post(
        "/v3/reserve/check-availability",
        dates
      );
      toast.success(response.data.msg, { duration: 3000 });
      set({ available: true });
    } catch (error: any) {
      toast.error(error?.response.data.msg, { duration: 3000 });
    }
  },
  reserve: async (dates) => {
    try {
      const response = await axiosInstance.post("/v3/reserve/reserve", dates);
      toast.success(response.data.msg, { duration: 3000 });
      set({ available: true });
    } catch (error: any) {
      toast.error(error?.response.data.msg, { duration: 3000 });
    }
  },
  getMyReservations: async () => {
    try {
      const response = await axiosInstance.get("/v3/reserve");
      set({ reservations: response.data.reservations });
    } catch (error: any) {
      toast.error("Failed to get Listings", { duration: 3000 });
      console.error(error);
    }
  },
}));

export default useReserveListingStore;
