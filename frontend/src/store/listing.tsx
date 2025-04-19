import { create } from "zustand";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

// Define the Listing interface
interface Listing {
  _id?: string | null;
  title: string;
  description: string;
  category: string;
  price: number;
  country: string;
  address: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  image: string | null;
  image1: string | null;
  image2: string | null;
  image3: string | null;
  image4: string | null;
}

// Define the Zustand store interface
interface ListingStore {
  submitionState: boolean;
  listings: Listing[];
  addListing: (formData: Listing) => void;
  editListing: (formData: Listing) => void;
  getMyListings: () => void;
  deleteListing: (id: string) => void;
  getSingleListing: (id: string) => Promise<Listing>;
  getNewOrders: () => Promise<any[]>;
  updateOrderStatus: (status:string,orderId:string) => void;
  
}

// Zustand store creation
const useListingStore = create<ListingStore>((set, get) => ({
  submitionState: false,
  listings: [],
  addListing: async (listing) => {
    set({ submitionState: true });
    try {
      const response = await axiosInstance.post("/v2/listing", listing);
      toast.success(response.data.msg, { duration: 3000 });
    } catch (error: any) {
      toast.error(error.response.data.msg, { duration: 3000 });
      console.error(error);
    } finally {
      set({ submitionState: false });
    }
  },
  editListing: async (listing) => {
    set({ submitionState: true });
    try {
      const response = await axiosInstance.put("/v2/listing", listing);
      toast.success(response.data.msg, { duration: 3000 });
    } catch (error: any) {
      toast.error("Failed to update Listing", { duration: 3000 });
      console.error(error);
    } finally {
      set({ submitionState: false });
    }
  },
  deleteListing: async (id) => {
    set({ submitionState: true });
    try {
      const response = await axiosInstance.delete(`/v2/listing/${id}`);
      toast.success(response.data.msg, { duration: 3000 });
      get().getMyListings();
    } catch (error: any) {
      toast.error("Failed to delete Listing", { duration: 3000 });
      console.error(error);
    } finally {
      set({ submitionState: false });
    }
  },
  getSingleListing: async (id) => {
    try {
      const response = await axiosInstance.get(`/v2/listing/${id}`);
      return response.data.listing as Listing;
    } catch (error: any) {
      toast.error("Failed to get Listing", { duration: 3000 });
      console.error(error);
      throw error;
    }
  },
  getMyListings: async () => {
    set({ submitionState: true });
    try {
      const response = await axiosInstance.get("/v2/listing");
      set({ listings: response.data.listings });
    } catch (error: any) {
      toast.error("Failed to get Listings", { duration: 3000 });
      console.error(error);
    } finally {
      set({ submitionState: false });
    }
  },
  getNewOrders: async () => {
    try {
      const response = await axiosInstance.get("/v2/listing/get/new-orders");
      console.log(response);
      return response.data.orders || [];
    } catch (error: any) {
      toast.error("Failed to get new orders", { duration: 3000 });
      console.error(error);
      return [];
    }
  },
  updateOrderStatus: async (status,orderId) => {
    try {
      const data = {
        status
      }
      const response = await axiosInstance.post(`/v2/listing/get/order-status/${orderId}`,data);
      console.log(response);
      toast.success(response.data.msg, { duration: 3000 });
      
    } catch (error: any) {
      toast.error(error.response.data.msg, { duration: 3000 });
      console.error(error);
      return [];
    }
  },

}));

export default useListingStore;
