"use client"
import React from "react";

const CommentBox = ({ reference, titleReference, contentReference, title, content }) => {
  return (
    <div
      ref={reference}
      id="commentBox"
      className="bg-accent p-4 rounded-2xl w-64 right-8 absolute transition-all hidden"
    >
      <div ref={titleReference} className=" uppercase text-xs font-bold">
        {/* Setting */}
        {title}
      </div>
      <div ref={contentReference} className="text-sm">
        {/* This passage highlights the main scene of the story and introduces the
        main character. We learn her name is Elara and that she is curious */}
        {content}
      </div>
    </div>
  );
};

export default CommentBox;
