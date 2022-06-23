import React from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { useState } from "react";
import Navbar from "../components/navbar.js";
import { bookmarkPlugin } from '@react-pdf-viewer/bookmark'

export default function Reader() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(3);

  function onDocummentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(pageNumber);
  }

  function changePage(offSet) {
    setPageNumber(prevPageNumber => prevPageNumber + offSet);
  }

  function changePageBack() {
   changePage(-1);
  }

  function changePageNext() {
    changePage(+1);
  }

  return (
    <center>
      <div>
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        <main className="relative">
          <div className="">
            <Document file="/sample.pdf" pageNumber={pageNumber} onLoadSuccess={onDocummentLoadSuccess}>
              {/* {Array.from(new Array(numPages), (el, index) => ( */}
                <Page height={600} >
                  {console.log(pageNumber)}
                </Page>
                <p>Page {pageNumber} of {numPages}</p>
                {pageNumber > 1 &&
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={changePageBack}>Sebelumnya</button>
                }
                {
                  pageNumber < numPages &&
                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={changePageNext}>Selanjutnya</button>
                }
              {/* ))} */}
              
            </Document>
          </div>
        </main>
      </div>
    </center>
  );
}
