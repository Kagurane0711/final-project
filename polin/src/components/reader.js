import React from "react";
import { Link } from "react-router-dom";
import {useState} from "react"
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'


export default function Reader() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocummentLoadSuccess({numPages}){
        setNumPages(numPages);
        setPageNumber(pageNumber);
    }

  return (
    <center>
        <div className="app-header">
            <Document file="/sample.pdf" onLoadSuccess={onDocummentLoadSuccess}>
                {Array.from(
                    new Array(numPages),
                    (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                        />
                    )
                )}
            </Document>
        </div>
    </center>
  )
}