import create from "zustand";
import axios from "axios";
import { booksApi } from "../services/api";

const useBookStore = create((set, get) => ({
  books: [],
  loading: false,
  error: null,

  fetchBook: async (url) => {
    set({ loading: true, error: null });
    try {
      const response = typeof url === "string" ? await axios.get(url) : await booksApi.getAll();
      set({ books: response.data || [], loading: false });
      return response.data;
    } catch (err) {
      console.error("fetchBook error:", err);
      set({ error: err.message, loading: false });
      return [];
    }
  },

  addBooks: (book) =>
    set((state) => ({
      books: [
        {
          id: book.id || Date.now(),
          cover: book.cover || book.cover_url,
          title: book.title,
          category: book.category || book.categories,
          author: book.author,
          permalink: book.permalink,
          ...book,
        },
        ...state.books,
      ],
    })),

  removeBooks: async (id) => {
    try {
      await booksApi.remove(id);
      set((state) => ({
        books: state.books.filter((item) => item.id !== id),
      }));
    } catch (err) {
      console.error("removeBooks error:", err);
      throw err;
    }
  },

  updateBooks: (book) =>
    set((state) => ({
      books: state.books.map((item) =>
        item.id === book.id
          ? {
              ...item,
              ...book,
              title: book.title ?? item.title,
              author: book.author ?? item.author,
              category: book.category ?? item.category,
              cover: book.cover ?? item.cover,
            }
          : item
      ),
    })),
}));

export default useBookStore;

