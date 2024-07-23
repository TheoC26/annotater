import React from "react";
import MoreVert from "../svg/MoreVert";
import Link from "next/link";

const ArchiveRow = ({
  title,
  date,
  id,
  setContextMenuShowing,
  setContextMenuType,
  setContextMenuX,
  setContextMenuY,
  setContextMenuSourceID,
  collection,
}) => {
  const contextMenuWidth = 224;
  const contextMenuHeight = 200;

  const onTwoFingerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
    // console.log the position of the click on the page
    if (window.innerWidth - e.pageX < contextMenuWidth) {
      setContextMenuX(e.pageX - contextMenuWidth);
    } else {
      setContextMenuX(e.pageX);
    }
    if (window.innerHeight - e.pageY < contextMenuHeight) {
      setContextMenuY(e.pageY - contextMenuHeight);
    } else {
      setContextMenuY(e.pageY);
    }
    setContextMenuShowing(true);
    setContextMenuType("archive");
    setContextMenuSourceID(id);
  };

  return (
    <Link
      href={"/sources/source/" + id}
      onContextMenu={(e) => onTwoFingerClick(e)}
    >
      <div className="flex justify-between my-2">
        <div className="font-medium line-clamp-1">
          {title} • {collection}
        </div>
        <div className="flex w-56 justify-between">
          <div className="hidden md:block mr-6 font-medium">{date}</div>
          <MoreVert
            onClick={(e) => onTwoFingerClick(e)}
            className="rounded transition-all hover:bg-gray-200"
          />
        </div>
      </div>
      <div className="w-full h-[1px] bg-black opacity-25 mt-0.5"></div>
    </Link>
  );
};

export default ArchiveRow;
