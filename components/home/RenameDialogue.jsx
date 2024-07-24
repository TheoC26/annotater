import { sendShareEmail } from "@/app/lib/mail";
import useStateRef from "@/hooks/stateRef";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "../svg/CloseIcon";

const RenameDialogue = ({
  open,
  setOpen,
  title,
  id,
  sources,
  setSources,
  isFolder,
  renameSource,
  renameCollection,
}) => {
  const [renameText, setRenameText, renameTextRef] = useStateRef("");

  console.log("isFolder", isFolder);

  const submitEditName = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (renameTextRef.current === "") return;

    if (isFolder) {
      renameCollection(renameTextRef.current);
      setRenameText("");
      setOpen(false);
    } else {
      renameSource(id, renameTextRef.current);

      const newSources = sources.map((source) => {
        if (source.id === id) {
          return { ...source, name: renameTextRef.current };
        }
        return source;
      });
      console.log(newSources);
      setSources(newSources);
      setRenameText("");
      setOpen(false);
    }
  };

  //   const submitEditNameFolder = (e) => {

  return (
    <>
      {open ? (
        <div
          className="grid content-center justify-center fixed inset-0 bg-black bg-opacity-40 z-20"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full sm:w-[35rem] bg-white rounded-2xl shadow-lg p-6"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className="flex justify-between items-center">
              <div className="font-medium">Rename: {title}</div>
              <button
                className="rounded-lg transition-all hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <CloseIcon className="scale-90" />
              </button>
            </div>

            <input
              type="text"
              autoFocus
              value={renameText}
              onChange={(e) => setRenameText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitEditName(e);
                }
              }}
              className="w-full h-10 border border-gray-300 rounded-lg p-3 mt-3"
              placeholder={title}
            />

            <button
              className="font-medium w-full h-10 px-3 bg-accent text-white rounded-lg mt-4"
              onClick={submitEditName}
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default RenameDialogue;
