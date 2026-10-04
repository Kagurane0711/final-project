import axios from "axios";

export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://api.polin.probolinggokota.go.id";
export const API_REDIRECT_URL =
  process.env.REACT_APP_API_REDIRECT_URL || (typeof window !== "undefined" ? window.location.origin : "");

// Axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to attach access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && token !== "undefined" && token !== "null") {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for centralized error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: Handle unauthorized, expired token
      console.warn("Unauthorized API call:", error.config?.url);
    }
    return Promise.reject(error);
  }
);

// Helper for constructing absolute URLs for images and assets
export const getAssetUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

// Books API
export const booksApi = {
  getAll: (page = 0, limit = 12) =>
    api.get(`/books?page_id=${page}&limit=${limit}`),

  getById: (id) => api.get(`/book/${id}`),

  search: (type = "title", term = "") =>
    api.get(`/books/search?type=${encodeURIComponent(type)}&term=${encodeURIComponent(term)}`),

  getCategories: () => api.get("/books/categories"),

  getAuthors: () => api.get("/books/authors"),

  add: (formData) =>
    api.post("/admin/books/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  update: (id, formData) =>
    api.put(`/admin/books/update?book_id=${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  remove: (id) =>
    api.delete(`/admin/books/remove?book_id=${id}`),
};

// User API
export const userApi = {
  getProfile: () => api.get("/user/profile"),

  getFavorites: () => api.get("/user/favorites"),

  addFavorite: (bookId) =>
    api.put(`/user/favorites/add?book_id=${bookId}`),

  removeFavorite: (bookId) =>
    api.delete(`/user/favorites/remove?book_id=${bookId}`),

  setAdmin: (enabled = 1) =>
    api.post(`/user/admin/set?enabled=${enabled}`),
};

// Google OAuth URL helper
export const getGoogleAuthUrl = () => {
  return `${API_BASE_URL}/auth/google?redirect=${encodeURIComponent(API_REDIRECT_URL)}`;
};

export default api;

