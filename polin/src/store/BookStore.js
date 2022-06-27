import create from "zustand";
import axios from "axios";

const useBookStore = create((set) => ({
  books: [],
  fetchBook: async (url) => {
    const response = await axios.get(url);
    console.log("response", response);
    set({ books: await response.data });
  },
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
  removeBooks: async (id) => {
    const response = await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_BASE_URL}/admin/books/remove?book_id=${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("response", response);
  },
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
