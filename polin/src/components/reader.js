import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

export default function ReaderView({ file = "/sample.pdf" }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages: total }) {
    setNumPages(total);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prev) => {
      const next = prev + offset;
      if (next < 1) return 1;
      if (numPages && next > numPages) return numPages;
      return next;
    });
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="shadow-lg border border-gray-200 rounded-lg overflow-hidden bg-white p-2">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page height={600} pageNumber={pageNumber} />
        </Document>
      </div>

      <div className="flex items-center space-x-4 mt-4">
        <button
          type="button"
          disabled={pageNumber <= 1}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-gray-800 text-sm font-medium rounded-lg"
          onClick={() => changePage(-1)}
        >
          Sebelumnya
        </button>

        <span className="text-sm font-medium text-gray-700">
          Halaman {pageNumber} dari {numPages || "..."}
        </span>

        <button
          type="button"
          disabled={Boolean(numPages && pageNumber >= numPages)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-gray-800 text-sm font-medium rounded-lg"
          onClick={() => changePage(1)}
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
}

