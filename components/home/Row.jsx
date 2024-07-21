import React, { useState } from "react";
import MoreVert from "../svg/MoreVert";
import Link from "next/link";
import StarIcon from "../svg/StarIcon";
import StarFilledIcon from "../svg/StarFilledIcon";
import useStateRef from "@/hooks/stateRef";
import EditNameInput from "./EditName";

const Row = ({
  title,
  date,
  id,
  setContextMenuShowing,
  setContextMenuType,
  setContextMenuX,
  setContextMenuY,
  setContextMenuSourceID,
  renameSource,
  favoriteSource,
  favorite,
  // isEditingName,
  // setEditingNameID,
  sources,
  setSources,
  collection,
}) => {
  const [renameText, setRenameText, renameTextRef] = useStateRef("");
  const [favoriteState, setFavoriteState] = useState(favorite);
  const contextMenuWidth = 224;
  const contextMenuHeight = 160;

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
    setContextMenuType("source");
    setContextMenuSourceID(id);
  };

  const toggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavoriteState(!favoriteState);
    favoriteSource(id);
  };

  const submitEditName = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (renameTextRef.current === "") return;
    renameSource(id, renameTextRef.current);

    const newSources = sources.map((source) => {
      if (source.id === id) {
        return { ...source, name: renameTextRef.current };
      }
      return source;
    });
    console.log(newSources);
    setSources(newSources);
    setEditingNameID("");
    setRenameText("");
  };

  return (
    <Link
      href={"/sources/source/" + id}
      onContextMenu={(e) => onTwoFingerClick(e)}
    >
      <div className="flex justify-between my-2">
        <div className="flex justify-between flex-1 pr-3">
          {/* {isEditingName ? (
            <EditNameInput
              setRenameText={setRenameText}
              renameText={renameText}
              title={title}
              submitEditName={submitEditName}
              setEditingNameID={setEditingNameID}
            />
          ) : (
            <div className="font-medium">{title} • {collection}</div>
          )} */}
          <div className="font-medium">
            {title} • {collection}
          </div>
          <button onClick={(e) => toggleFav(e)}>
            {favoriteState ? (
              <StarFilledIcon className="rounded transition-all hover:bg-gray-200" />
            ) : (
              <StarIcon className="rounded transition-all hover:bg-gray-200" />
            )}
          </button>
        </div>
        <div className="flex w-56 justify-between">
          <div className="mr-6 font-medium">{date}</div>
          <button onClick={(e) => onTwoFingerClick(e)}>
            <MoreVert className="rounded transition-all hover:bg-gray-200" />
          </button>
        </div>
      </div>
      <div className="w-full h-[1px] bg-black opacity-25 mt-0.5"></div>
    </Link>
  );
};

export default Row;
