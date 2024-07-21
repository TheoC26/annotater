import React, { useState } from "react";
import MoreVert from "../svg/MoreVert";
import Link from "next/link";
import FolderIcon from "../svg/FolderIcon";
import FolderOpenIcon from "../svg/FolderOpenIcon";
import useStateRef from "@/hooks/stateRef";
import EditNameInput from "./EditName";
import { useSource } from "@/context/SourceContext";

const Folder = ({
  name,
  setCollections,
  // setEditingNameID,
  // isEditingName,
  setContextMenuShowing,
  setContextMenuType,
  setContextMenuX,
  setContextMenuY,
  setContextMenuSourceID,
}) => {
  const contextMenuWidth = 224;
  const contextMenuHeight = 150;
  const [renameText, setRenameText, renameTextRef] = useStateRef("");

  const { renameCollection } = useSource();

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
    setContextMenuType("folder");
    setContextMenuSourceID(name);
  };

  const submitEditName = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (renameTextRef.current === "") return;

    renameCollection(name, renameTextRef.current).then((res) => {
      setCollections((prev) =>
        prev.map((collection) => {
          if (collection.name === name) {
            return { ...collection, name: renameTextRef.current };
          }
          return collection;
        })
      );
    });
  };

  return (
    <Link
      href={"/sources/" + name.toLowerCase()}
      className="group"
      onContextMenu={(e) => onTwoFingerClick(e)}
    >
      <div className="flex justify-between my-2 py-2 px-2 rounded-xl transition-all bg-gray-100 group-hover:bg-gray-200">
        <div className="flex flex-1 items-center gap-2">
          <div className="group-hover:hidden">
            <FolderIcon />
          </div>
          <div className="hidden group-hover:block">
            <FolderOpenIcon />
          </div>
          {/* {isEditingName ? (
            <EditNameInput
              setRenameText={setRenameText}
              renameText={renameText}
              title={name}
              submitEditName={submitEditName}
              setEditingNameID={setEditingNameID}
            />
          ) : (
            <div className="font-medium">{name}</div>
          )} */}
          <div className="font-medium">{name}</div>
        </div>
        <div className="flex">
          <button onClick={(e) => onTwoFingerClick(e)}>
            <MoreVert className="rounded transition-all hover:bg-gray-300" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Folder;
