import Link from "next/link";
import React from "react";

const SearchingModal = ({ sources, searching }) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    searching && (
      <div className="absolute inset-0 text-left">
        <div className="flex-col ml-16 sm:ml-[19rem] mr-16 sm:mr-20 bg-white rounded-2xl shadow-lg mt-16 p-2">
          {sources.length != 0 ? (
            sources.map((source) => (
              <Link
                href={`/sources/source/${source.id}`}
                key={source.id}
                className="flex items-center justify-between py-1 px-2 rounded-xl transition-all hover:bg-gray-100"
              >
                <div className="font-medium line-clamp-1 flex-1">{source.name}</div>
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
