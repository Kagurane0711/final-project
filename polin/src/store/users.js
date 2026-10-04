import create from "zustand";
import { userApi } from "../services/api";

const useUsers = create((set, get) => ({
  user: null,
  userFavorites: [],
  loggedIn: false,
  loading: false,

  fetchUser: async () => {
    try {
      const response = await userApi.getProfile();
      if (response.status === 200 && response.data) {
        set({
          user: response.data,
          loggedIn: true,
        });
        return response.data;
      }
    } catch (err) {
      console.warn("fetchUser failed or not authenticated:", err.message);
      set({ user: null, loggedIn: false });
    }
    return null;
  },

  fetchFav: async () => {
    try {
      const response = await userApi.getFavorites();
      if (response.status === 200 && response.data) {
        set({ userFavorites: response.data });
        return response.data;
      }
    } catch (err) {
      console.warn("fetchFav failed:", err.message);
      set({ userFavorites: [] });
    }
    return [];
  },

  addFavorite: async (id) => {
    try {
      const response = await userApi.addFavorite(id);
      // Refresh favorites to keep store in sync
      get().fetchFav();
      return response.data;
    } catch (err) {
      console.error("addFavorite error:", err);
      throw err;
    }
  },

  removeFavorite: async (id) => {
    try {
      const response = await userApi.removeFavorite(id);
      set((state) => ({
        userFavorites: state.userFavorites.filter(
          (item) => String(item.id) !== String(id)
        ),
      }));
      return response.data;
    } catch (err) {
      console.error("removeFavorite error:", err);
      throw err;
    }
  },

  changeRole: async (enabled = 1) => {
    try {
      const response = await userApi.setAdmin(enabled);
      // Refresh profile to update role
      get().fetchUser();
      return response.data;
    } catch (err) {
      console.error("changeRole error:", err);
      throw err;
    }
  },
}));

export default useUsers;