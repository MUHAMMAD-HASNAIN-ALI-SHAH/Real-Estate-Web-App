import useAuthStore from "../store/auth";
import useBlogStore from "../store/listing";

export const completelogout = () => {
  useBlogStore.getState().clearState();
  useAuthStore.getState().logout();
};
