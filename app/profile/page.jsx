"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { db } from "@/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import ProfileModal from "@/components/ProfileModal";
import AnnotaterLogo from "@/components/svg/AnnotaterLogo";
import capitalizeFirstLetter from "../lib/utils";
import Link from "next/link";
import EditIcon from "@/components/svg/EditIcon";
import SourcesIcon from "@/components/svg/SourcesIcon";
import Footer from "@/components/Footer";
import Logo from "@/components/svg/Logo";

const ProfilePage = () => {
  const { currentUser, logout, authLoading } = useAuth();

  const [userDoc, setUserDoc] = useState(null);
  const [userName, setUserName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);

  const checkIfUserDocExists = async () => {
    const userRef = doc(db, "usersv2", currentUser.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      setUserDoc(userDoc.data());
      setUserName(userDoc.data().name);
      return true;
    }
    return false;
  };

  const updateUserName = async () => {
    try {
      if (!userName) {
        toast.error("Name cannot be empty");
        return;
      }
      const userRef = doc(db, "usersv2", currentUser.uid);
      await updateDoc(userRef, {
        name: userName,
      });
      toast.success("Name updated successfully");
    } catch {
      toast.error("Error updating name");
    }
  };

  const updateType = async (type) => {
    try {
      const userRef = doc(db, "usersv2", currentUser.uid);
      await updateDoc(userRef, {
        type: type,
      });
      toast.success("Type updated successfully");
    } catch {
      toast.error("Error updating type");
    }
  };

  const eraseAllContent = async () => {
    try {
      const userRef = doc(db, "usersv2", currentUser.uid);
      await updateDoc(userRef, {
        collections: [],
        sources: [],
      });
      const sourcesRef = collection(db, "sources");
      let q = query(sourcesRef, where("mainUser", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      toast.success("All content erased successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error erasing content");
    }
  };

  const deleteAccount = async () => {
    try {
      eraseAllContent();
      const userRef = doc(db, "usersv2", currentUser.uid);
      await deleteDoc(userRef);
      await logout();
      toast.success("Account deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting account");
    }
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
    <div>
      {userDoc && (
        <>
          <header className="flex justify-between w-full h-fit items-center mt-1 gap-6 p-3 px-5">
            <Link href={"/sources"}>
              <Logo className="mb-1" />
            </Link>

            <div className="flex items-center gap-6">
              <Link
                href={"/sources"}
                className="p-3 px-6 bg-gray-200 rounded-full flex gap-2 transition-all hover:scale-105 hover:shadow-lg hover:bg-accent"
              >
                <SourcesIcon />
                <div className="font-semibold">Sources</div>
              </Link>

              <ProfileModal initial={userDoc.name[0].toUpperCase()} />
            </div>
          </header>
          <main className="max-w-2xl mx-auto mt-6 px-2">
            <div className="text-5xl font-bold">Profile</div>
            <div className="text-lg font-semibold mt-12">Personal Info</div>
            <div className="mt-2 p-6 rounded-2xl bg-white -ml-1">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-base font-bold">Name</div>
                  {!isEditingName ? (
                    <div className="text-base font-medium text-gray-600">
                      {userName}
                    </div>
                  ) : (
                    <input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      autoFocus
                      className="border-2 border-gray-300 rounded-lg px-2"
                    />
                  )}
                </div>
                {!isEditingName ? (
                  <button
                    className=" rounded-2xl p-2 transition-all hover:bg-gray-100"
                    onClick={() => setIsEditingName(true)}
                  >
                    <EditIcon />
                  </button>
                ) : (
                  <button
                    className=" rounded-2xl p-2 px-4 transition-all hover:bg-gray-100 font-semibold"
                    onClick={() => {
                      setIsEditingName(false);
                      updateUserName();
                    }}
                  >
                    Submit
                  </button>
                )}
              </div>
              <div className="flex justify-between items-center mt-3">
                <div>
                  <div className="text-base font-bold">Email</div>
                  <div className="text-base font-medium text-gray-600">
                    {currentUser && currentUser.email}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="text-base font-bold">Account Type</div>
                <div className="text-base font-medium text-gray-600">
                  <select
                    value={userDoc.type}
                    onChange={(e) => {
                      setUserDoc({ ...userDoc, type: e.target.value });
                      updateType(e.target.value);
                    }}
                    className="border-2 border-gray-300 rounded-lg p-2"
                  >
                    <option value="work">Work</option>
                    <option value="school">School</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="text-lg font-semibold mt-6 text-red-400">
              Danger Zone
            </div>
            <div className="mt-2 p-6 rounded-2xl bg-white -ml-1">
              <div className="flex justify-between items-center ">
                <div>
                  <div className="text-base font-bold">
                    Erase all your content
                  </div>
                  <div className="text-base font-medium text-gray-600">
                    Will delete all your content but preserve your account.
                  </div>
                </div>
                <button
                  className=" p-3 px-4 font-medium bg-gray-200 rounded-xl transition-all hover:bg-gray-300"
                  onClick={eraseAllContent}
                >
                  Erase all content
                </button>
              </div>

              <div className="flex justify-between items-center mt-6">
                <div>
                  <div className="text-base font-bold">Delete Account</div>
                  <div className="text-base font-medium text-gray-600">
                    Will delete all your content and account.
                  </div>
                </div>
                <button
                  className=" p-3 px-4 font-medium bg-red-400 text-white rounded-xl transition-all hover:bg-red-500"
                  onClick={deleteAccount}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </main>
          <ToastContainer />
          <Footer />
        </>
      )}
    </div>
  );
};

export default ProfilePage;
