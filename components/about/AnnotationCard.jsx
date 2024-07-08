import React from "react";

const AnnotationCard = ({type, content, styles}) => {
  return (
    <div
      id="commentBox"
      className={"bg-accent p-5 rounded-2xl w-72 absolute transition-all "+styles}
    >
      <div className="uppercase text-xs font-bold mb-1">{type}</div>
      <div className="text-sm">
        {content}
      </div>
    </div>
  );
};

export default AnnotationCard;
