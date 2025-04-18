import { create } from "zustand";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

interface DatesFormData {
  _id: string | null;
  startDate: Date | null;
  endDate: Date | null;
}

interface ListingStore {
  available: boolean;
  checkAvailability: (dates: DatesFormData) => void;
  reserve: (dates: DatesFormData) => void;
}

const useReserveListingStore = create<ListingStore>((set) => ({
  available: false,
  checkAvailability: async (dates) => {
    try {
      const response = await axiosInstance.post(
        "/v3/reserve/check-availability",
        dates
      );
      toast.success(response.data.msg, { duration: 3000 });
        set({ available: true });
    } catch (error:any) {
      toast.error(error?.response.data.msg, { duration: 3000 });

    }
  },
  reserve: async (dates) => {
    try {
      const response = await axiosInstance.post(
        "/v3/reserve/reserve",
        dates
      );
      toast.success(response.data.msg, { duration: 3000 });
        set({ available: true });
    } catch (error:any) {
      toast.error(error?.response.data.msg, { duration: 3000 });

    }
  },
}));

export default useReserveListingStore;
