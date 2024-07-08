import { sendShareEmail } from "@/app/lib/mail";
import useStateRef from "@/hooks/stateRef";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "./svg/CloseIcon";

const ShareDialogue = ({
  open,
  setOpen,
  sourceTitle,
  userName,
  userEmail,
  sourceID,
}) => {
  const [email, setEmail, emailRef] = useStateRef("");

  const send = () => {
    // check is valid email
    if (!emailRef.current.includes("@")) {
      toast.error("Invalid email");
      return;
    }
    try {
      sendShareEmail(
        emailRef.current,
        userName,
        userEmail,
        sourceID,
        sourceTitle
      );
      toast.success("Source shared successfully");
    } catch {
      toast.error("Error sharing source");
    }
  };

  return (
    <>
      {open ? (
        <div
          className="grid content-center justify-center fixed inset-0 bg-black bg-opacity-40 z-20"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-[35rem] bg-white rounded-2xl shadow-lg p-6"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className="flex justify-between items-center">
              <div className="font-medium">Share {sourceTitle}</div>
              <button className="rounded-lg transition-all hover:bg-gray-100" onClick={() => setOpen(false)}>
                <CloseIcon className="scale-90" />
              </button>
            </div>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-lg p-3 mt-3"
              placeholder="Email address"
            />

            <button
              className="font-medium w-full h-10 px-3 bg-accent text-white rounded-lg mt-4"
              onClick={send}
            >
              Share
            </button>
            <button
              className="font-medium w-full h-10 px-3 bg-white text-black border border-1 rounded-lg mt-2"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard");
              }}
            >
              Copy link
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ShareDialogue;
