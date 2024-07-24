import React, { useState } from "react";
import EditIcon from "../svg/EditIcon";
import ShareIcon from "../svg/ShareIcon";
import FolderOpenIcon from "../svg/FolderOpenIcon";
import DeleteIcon from "../svg/DeleteIcon";
import UnarchiveIcon from "../svg/UnarchiveIcon";

const CustomContextMenu = ({
  posX,
  posY,
  type,
  setShowing,
  archiveSource,
  unArchiveSource,
  fullDeleteSource,
  // setEditingNameID,
  updateSourceCollection,
  sourceID,
  collections,
  deleteCollection,
  setEditNameModalOpen,
  setShareDialogueOpen,
}) => {
  const [organize, setOrganize] = useState(false);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div
      className="fixed inset-0"
      onClick={(e) => setShowing(false)}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        className="flex flex-col fixed bg-white shadow-md p-3 rounded-xl w-56"
        style={{ left: posX + "px", top: posY + "px" }}
      >
        {type === "source" ? (
          <>
            <button
              className="flex gap-2 items-center p-1 hover:bg-gray-100 cursor-pointer rounded-md"
              onClick={() => {
                setEditNameModalOpen(true);
              }}
            >
              <EditIcon className="w-5 h-5" />
              <div>Rename</div>
            </button>
            <button
              className="flex gap-2 items-center p-1 hover:bg-gray-100 cursor-pointer rounded-md"
              onClick={() => setShareDialogueOpen(true)}
            >
              <ShareIcon className="w-5 h-5" />
              <div>Share</div>
            </button>
            <button
              className="flex gap-2 items-center p-1 hover:bg-gray-100 cursor-pointer rounded-md"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOrganize(!organize);
              }}
            >
              <FolderOpenIcon className="w-5 h-5" />
              <div>Organize</div>
            </button>
            {/* line seperator */}
            <div className="w-full h-[1px] bg-black opacity-25 my-0.5"></div>
            <button
              className="flex gap-2 items-center p-1 hover:bg-red-100 cursor-pointer rounded-md"
              onClick={archiveSource}
            >
              <DeleteIcon className="w-5 h-5" />
              <div>Archive</div>
            </button>
          </>
        ) : type === "folder" ? (
          <>
            <button
              className="flex gap-2 items-center p-1 hover:bg-gray-100 cursor-pointer rounded-md"
              onClick={() => {
                setEditNameModalOpen(true);
              }}
            >
              <EditIcon className="w-5 h-5" />
              <div>Rename</div>
            </button>
            {/* line seperator */}
            <div className="w-full h-[1px] bg-black opacity-25 my-0.5"></div>
            <button
              className="flex gap-2 items-center p-1 hover:bg-red-100 cursor-pointer rounded-md"
              onClick={deleteCollection}
            >
              <DeleteIcon className="w-5 h-5" />
              <div>Delete</div>
            </button>
          </>
        ) : (
          type === "archive" && (
            <>
              <button
                className="flex gap-2 items-center p-1 hover:bg-gray-100 cursor-pointer rounded-md"
                onClick={unArchiveSource}
              >
                <UnarchiveIcon className="w-5 h-5" />
                <div>Unarchive</div>
              </button>
              {/* line seperator */}
              <div className="w-full h-[1px] bg-black opacity-25 my-0.5"></div>
              <button
                className="flex gap-2 items-center p-1 hover:bg-red-100 cursor-pointer rounded-md"
                onClick={fullDeleteSource}
              >
                <DeleteIcon className="w-5 h-5" />
                <div>Delete</div>
              </button>
            </>
          )
        )}
      </div>
      {console.log(window.innerWidth - posX < 450)}
      {organize && (
        <div
          className="flex flex-col fixed bg-white shadow-md p-3 rounded-xl w-56 max-h-[185px] overflow-scroll"
          style={{
            left:
              window.innerWidth - posX < 450
                ? posX - 230 + "px"
                : posX + 230 + "px",
            top:
              window.innerHeight - posY < 300
                ? posY - 70 + "px"
                : posY + 70 + "px",
          }}
        >
          <button
            className="flex gap-2 items-center p-1 hover:bg-gray-100 cursor-pointer rounded-md"
            onClick={() => updateSourceCollection("my sources")}
          >
            <FolderOpenIcon className="w-5 h-5" />
            <div>My sources</div>
          </button>
          {collections.map((collection) => (
            <button
              key={collection}
              className="flex gap-2 items-center p-1 hover:bg-gray-100 cursor-pointer rounded-md"
              onClick={() => updateSourceCollection(collection)}
            >
              <FolderOpenIcon className="w-5 h-5" />
              <div>{capitalizeFirstLetter(collection)}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomContextMenu;
