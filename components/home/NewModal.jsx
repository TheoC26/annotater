"use client";
import React, { useState } from "react";
import CloseIcon from "../svg/CloseIcon";
import { v4 as uuid } from "uuid";
import FileUpload from "./FileUpload";
import pdfToImages from "@/app/lib/pdfToImages";
import OCRImages from "@/app/lib/OCRImages";

import { toast } from "react-toastify";

const NewModal = ({ setModalState, collection }) => {
  const [sourceText, setSourceText] = useState("");
  const startAnnotating = () => {
    // setSourceAnnotatingText(sourceText);
    // setSourceCollection(collection);
    // setIsAnnotating(true);

    let sourceContextCollection = collection;
    collection == "archived" ||
      (collection == "favorites" && (sourceContextCollection = "my sources"));

    let sourceContext = {
      isAnnotating: true,
      sourceAnnotatingText: sourceText,
      sourceCollection: sourceContextCollection,
    };

    // NEED TO USE LOCALSTORAGE INSTEAD
    localStorage.setItem(
      "ANNOTATER_SOURCECONTEXT",
      JSON.stringify(sourceContext)
    );

    window.location.href = "/sources/source/" + uuid();
  };

  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [PDFResult, setPDFResult] = useState("");

  function concatenateObjectValues(obj) {
    let result = "";
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        result += obj[key];
      }
    }
    return result;
  }

  const handleFileSelect = async (file) => {
    if (file?.type !== "application/pdf") {
      toast.error("Please upload a pdf");
      return;
    }
    const pdfUrl = URL.createObjectURL(file);

    const imageUrls = await pdfToImages(pdfUrl, {
      scale: 2,
      onStart: (progress) =>
        setProgress({
          ...progress,
          total: progress.total * 2,
          type: "Processing",
        }),
      onProgress: (progress) =>
        setProgress({
          ...progress,
          total: progress.total * 2,
          type: "Processing",
        }),
    });
    const recognisedImages = await OCRImages(imageUrls, {
      onStart: (progress) =>
        setProgress({
          current: progress.total + progress.current,
          total: progress.total * 2,
          type: "Recognising",
        }),
      onProgress: (progress) =>
        setProgress({
          current: progress.total + progress.current,
          total: progress.total * 2,
          type: "Recognising",
        }),
    });

    let recognisedText = concatenateObjectValues(recognisedImages);
    setSourceText(recognisedText);
    setPDFResult(recognisedText);
  };

  return (
    <button
      className="fixed inset-0 grid place-content-center"
      onClick={() => setModalState(false)}
    >
      <div
        className="w-[55rem] h-[35rem] bg-white rounded-3xl shadow-lg p-3 relative overflow-hidden cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setModalState(false)}
          className="w-fit absolute left-3 top-3"
        >
          <CloseIcon />
        </button>
        <div className="mx-12 flex align-middle justify-center flex-col h-full">
          {sourceText.length < 51 && (
            <>
              <div className="bg-accent rounded-full p-4 px-9 text-lg font-bold text-center mt-6 w-fit mx-auto transition-all cursor-pointer hover:scale-105 hover:shadow-lg">
                Upload a PDF
              </div>
              {progress.total === 0 ? (
                <FileUpload onFileAccepted={handleFileSelect} />
              ) : (
                <div className="my-5">
                  {/* progress bar */}
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{
                        width: `${(progress.current / progress.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="text-center font-medium text-xl mb-5">OR</div>
              <div className="w-full h-[1px] bg-black opacity-75"></div>
            </>
          )}

          <textarea
            type="text"
            className="w-full h-full mb-6 mt-3 resize-none outline-none"
            placeholder="Paste your source here..."
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
          />
        </div>
        <div className="w-full -mx-3 h-16 absolute bottom-0 bg-gradient-to-t from-white to-transparent"></div>
        {sourceText.length > 50 && (
          <button
            onClick={startAnnotating}
            className=" bg-gradient-to-r from-purple-200 to-accent rounded-full p-3 px-9 text-lg font-bold text-center w-fit absolute bottom-3 right-3 cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
          >
            Annotate!
          </button>
        )}
      </div>
    </button>
  );
};

export default NewModal;
