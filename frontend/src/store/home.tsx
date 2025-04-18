import { create } from "zustand";
import axiosInstance from "../utils/axios";

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
}

interface ListingStore {
  listings: Listing[];
  listing: Listing | null;
  getAllListings: () => void;
}

const useHomeListingStore = create<ListingStore>((set) => ({
  listings: [],
  listing: null,
  getAllListings: async () => {
    try {
      const response = await axiosInstance.get("/v2/listing/get/getAllListings");
      set({ listings: response.data.listings });
    } catch (error) {}
  },
}));

export default useHomeListingStore;
