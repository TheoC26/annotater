import React from 'react'

const EditNameInput = ({setRenameText, renameText, title, submitEditName, setEditingNameID}) => {
  return (
    <>
      <div className="flex w-full gap-3">
        <input
          className="font-medium bg-transparent w-full flex-1 px-1 -mx-1 outline-none"
          type="text"
          autoFocus
          placeholder={title}
          value={renameText}
          onChange={(e) => setRenameText(e.target.value)}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitEditName(e);
            }
          }}
          onBlur={() => {
            setEditingNameID("");
            setRenameText("");
          }}
        ></input>
        <button
          className="px-2 rounded text-sm transition-all bg-gray-200 hover:bg-gray-300 hover:shadow-sm"
          onClick={(e) => {
            submitEditName(e);
          }}
        >
          Enter
        </button>
        <button
          className="px-2 rounded mr-2 text-sm transition-all bg-gray-200 hover:bg-gray-300 hover:shadow-sm"
          onClick={(e) => {
            e.preventDefault();
            setEditingNameID("");
            setRenameText("");
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default EditNameInput