import Link from "next/link";
import React from "react";

const SearchingModal = ({ sources, searching }) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    searching && (
      <div className="absolute inset-0 text-left">
        <div className="flex-col ml-[19rem] mr-20 bg-white rounded-2xl shadow-lg mt-16 p-3">
          {sources.length != 0 ? (
            sources.map((source) => (
              <Link
                href={`/sources/source/${source.id}`}
                key={source.id}
                className="flex items-center justify-between py-2 px-3 rounded-xl transition-all hover:bg-gray-100"
              >
                <div className="font-medium">{source.name}</div>
                <div className="font-light text-sm">
                  {capitalizeFirstLetter(source.collection)}
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-3">No sources found</div>
          )}
        </div>
      </div>
    )
  );
};

export default SearchingModal;
