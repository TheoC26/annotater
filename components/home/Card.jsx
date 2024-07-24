import Link from "next/link";
import React, { useState } from "react";
import StarFilledIcon from "../svg/StarFilledIcon";
import StarIcon from "../svg/StarIcon";

const Card = ({
  title,
  date,
  summary,
  collection,
  id,
  setContextMenuShowing,
  setContextMenuType,
  setContextMenuX,
  setContextMenuY,
  setContextMenuSourceID,
  favoriteSource,
  favorite,
}) => {
  const [favoriteState, setFavoriteState] = useState(favorite);
  const contextMenuWidth = 224;
  const contextMenuHeight = 150;

  const onTwoFingerClick = (e) => {
    e.preventDefault();
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
    setContextMenuType("source");
    setContextMenuSourceID(id);
  };

  const toggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavoriteState(!favoriteState);
    favoriteSource(id);
  };

  return (
    <Link
      href={"/sources/source/" + id}
      className="w-full aspect-[5/4] transition-all bg-gray-100 hover:bg-gray-200 rounded-2xl p-3"
      onContextMenu={(e) => onTwoFingerClick(e)}
    >
      <div className="text-sm line-clamp-1 font-semibold mb-2">{title}</div>
      <div className="h-[73%] bg-white overflow-hidden rounded-xl text-xs p-2 text-gray-400 shadow-inner shadow-gray-200 relative">
        <div>
          {summary}
        </div>
        <div className="absolute bottom-0 right-0 p-1 px-2 rounded-tl-md bg-gray-100 text-gray-600 font-bold">{collection}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-xs font-bold text-gray-500 mt-2">{date}</div>
        {favoriteState ? (
          <StarFilledIcon
            onClick={(e) => toggleFav(e)}
            className="rounded transition-all hover:bg-gray-300 -mb-1 mt-1"
          />
        ) : (
          <StarIcon
            onClick={(e) => toggleFav(e)}
            className="rounded transition-all hover:bg-gray-300 -mb-1 mt-1"
          />
        )}
      </div>
    </Link>
  );
};

export default Card;
