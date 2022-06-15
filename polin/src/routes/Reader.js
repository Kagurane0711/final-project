import React from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { useState } from "react";
import Navbar from "../components/navbar.js";

export default function Reader() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocummentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(pageNumber);
  }

  return (
    <center>
      <div>
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        <main className="relative">
          <div className="">
            <Document file="/sample.pdf" onLoadSuccess={onDocummentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
        </main>
      </div>
    </center>
  );
}
