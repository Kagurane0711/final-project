import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import axios from "axios";

const useBookStore = create((set) => ({
  books: [
    {
      id: 1,
      cover:
        "https://cgtranslations321782266.files.wordpress.com/2020/07/p1alt2en.png",
      title: "Konosuba Vol. 17",
      category: "Light Novel",
      author: "Akatsuki Natsume",
    },
    {
      id: 2,
      cover:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Sangatsu_no_Lion.jpg/220px-Sangatsu_no_Lion.jpg",
      title: "Sangatsu no Lion",
      category: "Manga",
      author: "author",
    },
    {
      id: 3,
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1598798091l/54303330.jpg",
      title: "Kaguya-sama wa Kokurasetai",
      category: "Manga",
      author: "Akasaka Aka",
    },
    {
      id: 4,
      cover:
        "https://2.bp.blogspot.com/-JKtwCh6ttZA/YM732sQy-BI/AAAAAAAAMOA/jUSoTaG9JpQx5E_Ii5lsdgJYRoupwxy9gCLcBGAsYHQ/s1178-rw/oshi-no-ko.jpg",
      title: "Oshi no Ko",
      category: "manga",
      author: "Aka Akasaka",
    },
    {
      id: 5,
      cover:
        "https://cgtranslations321782266.files.wordpress.com/2020/07/p1alt2en.png",
      title: "Konosuba Vol. 17",
      category: "Light Novel",
      author: "Akatsuki Natsume",
    },
    {
      id: 6,
      cover:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Sangatsu_no_Lion.jpg/220px-Sangatsu_no_Lion.jpg",
      title: "Sangatsu no Lion",
      category: "Manga",
      author: "author",
    },
    {
      id: 7,
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1598798091l/54303330.jpg",
      title: "Kaguya-sama wa Kokurasetai",
      category: "Manga",
      author: "Akasaka Aka",
    },
    {
      id: 8,
      cover:
        "https://2.bp.blogspot.com/-JKtwCh6ttZA/YM732sQy-BI/AAAAAAAAMOA/jUSoTaG9JpQx5E_Ii5lsdgJYRoupwxy9gCLcBGAsYHQ/s1178-rw/oshi-no-ko.jpg",
      title: "Oshi no Ko",
      category: "manga",
      author: "Aka Akasaka",
    },
    {
      id: 9,
      cover:
        "https://cgtranslations321782266.files.wordpress.com/2020/07/p1alt2en.png",
      title: "Konosuba Vol. 17",
      category: "Light Novel",
      author: "Akatsuki Natsume",
    },
    {
      id: 10,
      cover:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Sangatsu_no_Lion.jpg/220px-Sangatsu_no_Lion.jpg",
      title: "Sangatsu no Lion",
      category: "Manga",
      author: "author",
    },
    {
      id: 11,
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1598798091l/54303330.jpg",
      title: "Kaguya-sama wa Kokurasetai",
      category: "Manga",
      author: "Akasaka Aka",
    },
    {
      id: 12,
      cover:
        "https://2.bp.blogspot.com/-JKtwCh6ttZA/YM732sQy-BI/AAAAAAAAMOA/jUSoTaG9JpQx5E_Ii5lsdgJYRoupwxy9gCLcBGAsYHQ/s1178-rw/oshi-no-ko.jpg",
      title: "Oshi no Ko",
      category: "manga",
      author: "Aka Akasaka",
    },
    {
      id: 13,
      cover:
        "https://cgtranslations321782266.files.wordpress.com/2020/07/p1alt2en.png",
      title: "Konosuba Vol. 17",
      category: "Light Novel",
      author: "Akatsuki Natsume",
    },
    {
      id: 14,
      cover:
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Sangatsu_no_Lion.jpg/220px-Sangatsu_no_Lion.jpg",
      title: "Sangatsu no Lion",
      category: "Manga",
      author: "author",
    },
    {
      id: 15,
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1598798091l/54303330.jpg",
      title: "Kaguya-sama wa Kokurasetai",
      category: "Manga",
      author: "Akasaka Aka",
    },
    {
      id: 16,
      cover:
        "https://2.bp.blogspot.com/-JKtwCh6ttZA/YM732sQy-BI/AAAAAAAAMOA/jUSoTaG9JpQx5E_Ii5lsdgJYRoupwxy9gCLcBGAsYHQ/s1178-rw/oshi-no-ko.jpg",
      title: "Oshi no Ko",
      category: "manga",
      author: "Aka Akasaka",
    },
  ],
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
