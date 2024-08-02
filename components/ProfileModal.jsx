import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

const ProfileModal = ({ initial }) => {
  const [isOpened, setIsOpened] = useState(false);

  const { currentUser, logout, authLoading } = useAuth();

  const [userDoc, setUserDoc] = useState(null);

  const checkIfUserDocExists = async () => {
    const userRef = doc(db, "users", currentUser.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      setUserDoc(userDoc.data());
      return true;
    }
    return false;
  };

  useEffect(() => {
    console.log(currentUser);
    if (!currentUser && !authLoading) {
      window.location.replace("/login");
    } else if (currentUser) {
      checkIfUserDocExists().then((exists) => {
        if (!exists) {
          window.location.replace("/signup/onboarding");
        }
      });
    }
  }, [authLoading, currentUser]);

  return (
    <>
      <button
        className="font-bold bg-accent flex items-center justify-center rounded-xl aspect-square w-11 h-11"
        onClick={() => setIsOpened(!isOpened)}
      >
        {initial}
      </button>
      {isOpened && (
        <div
          className="fixed inset-0 text-left z-50"
          onClick={(e) => setIsOpened(false)}
        >
          <div
            className="absolute right-6 top-20 bg-white p-6 px-5 rounded-xl shadow-md z-50"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className="flex gap-6 items-center mr-3 mb-2">
              <div className="font-bold bg-accent flex items-center justify-center rounded-xl aspect-square w-11 h-11">
                {initial}
              </div>
              <div className="">
                <div className="font-bold">{userDoc && userDoc.name}</div>
                <div className="text-sm">
                  {currentUser && currentUser.email}
                </div>
              </div>
            </div>
            {/* line seperator */}
            <div className="w-full h-[1px] bg-black opacity-15 my-2"></div>
            <div className="flex flex-col">
              <Link
                href={"/profile"}
                className="p-1 px-2 transition-all rounded-lg hover:bg-gray-100"
              >
                My profile
              </Link>
              <Link
                href={"/sources"}
                className="p-1 px-2 transition-all rounded-lg hover:bg-gray-100"
              >
                My sources
              </Link>
              {/* <Link
                href={"/profile"}
                className="p-1 px-2 transition-all rounded-lg hover:bg-gray-100"
              >
                Manage subscription
              </Link> */}
            </div>

            <div className="w-full h-[1px] bg-black opacity-15 my-2"></div>
            <button
              className="p-1 px-2 text-left w-full transition-all rounded-lg hover:bg-gray-100"
              onClick={logout}
            >
              Logout
            </button>
            <div className="w-full h-[1px] bg-black opacity-15 my-2"></div>
            <div className="flex flex-col">
              <Link
                href={"/terms"}
                className="p-1 px-2 transition-all rounded-lg hover:bg-gray-100"
              >
                Terms
              </Link>
              <Link
                href={"#"}
                className="p-1 px-2 transition-all rounded-lg hover:bg-gray-100"
              >
                Help and feedback
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileModal;
