import create from "zustand";
import { persist } from "zustand/middleware";

const useBookStore = create((set) => ({
  books: [],
  addBooks: (book) =>
    set((state) => ({
      books: [
        {
          id: state.books.length + 1,
          cover: book.cover,
          title: book.title,
          category: book.category,
          author: book.author,
        },
      ],
    })),
  removeBooks: (id) =>
    set((state) => ({
      currentBook: state.books.find((book) => book.id !== id),
    })),
  updateBooks: (book) =>
    set((state) => ({
      books: state.books.map((item) => {
        return {
          ...item,
          title: book.title,
          author: book.author,
          category: book.category,
          cover: book.cover,
        };
      }),
    })),
}));

export default useBookStore;
