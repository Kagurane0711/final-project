import React, { useEffect } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { useState } from "react";
import Navbar from "../components/navbar.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import { bookmarkPlugin } from "@react-pdf-viewer/bookmark";
import useBookStore from "../store/BookStore.js";

export default function Reader() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { id } = useParams();
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      const url = `${process.env.REACT_APP_API_BASE_URL}/book/${id}`;
      const book = await axios.get(url);
      setBook(book.data);
    };
    getBook();
  }, []);

  function onDocummentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(pageNumber);
  }

  function changePage(offSet) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }

  function changePageBack() {
    changePage(-1);
  }

  function changePageNext() {
    changePage(+1);
  }

  console.log("book", book);
  console.log("id", id);

  return (
    <center>
      <div>
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        <main className="relative">
          <div className="">
            <Document
              file={"https://api.polin.probolinggokota.go.id" + book.url}
              onLoadSuccess={onDocummentLoadSuccess}
            >
              <Page height={580} pageNumber={pageNumber}>
                {sessionStorage.setItem("pageNumber", pageNumber)}
              </Page>
              <p>
                Page {pageNumber} of {numPages}
              </p>
              {pageNumber > 1 && (
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                  onClick={changePageBack}
                >
                  Sebelumnya
                </button>
              )}
              {pageNumber < numPages && (
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                  onClick={changePageNext}
                >
                  Selanjutnya
                </button>
              )}
              {/* ))} */}
            </Document>
          </div>
        </main>
      </div>
    </center>
  );
}
