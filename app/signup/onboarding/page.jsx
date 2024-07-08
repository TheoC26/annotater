"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/firebase";
import {
  doc,
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import SmallLogo from "@/components/svg/SmallLogo";

const content = [
  {
    header: "Welcome!",
    subtitle:
      "We would love to learn a little about you to make your experience the best it can be",
  },
  {
    header: "Oh hey ",
    subtitle:
      "Great to have you with us! To personalize your experience, what do you plan on using annotater for?",
  },
  {
    header: "Let’s make our first collection",
    subtitle:
      "Collections are like folders: they help organize all of your sources. What would you like to name your first collection?",
  },
];

const suggestedCollections = [
  ["Articles", "Research Papers", "Guidlines"],
  ["World History", "10th Grade", "Research Project"],
  ["Stories", "News", "Essays"],
];

const Onboarding = () => {
  const { currentUser, authLoading } = useAuth();

  const [name, setName] = useState("");
  const [forWhat, setForWhat] = useState("work");
  const [forWhatNumber, setForWhatNumber] = useState(0);
  const [collection, setCollection] = useState("");

  const [page, setPage] = useState(0);

  const [headerContent, setHeaderContent] = useState(content[0].header);
  const [subtitleContent, setSubtitleContent] = useState(content[0].subtitle);

  const checkIfUserDocExists = async () => {
    const userRef = doc(db, "usersv2", currentUser.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!currentUser && !authLoading) {
      window.location.replace("/login");
    } else if (currentUser) {
      checkIfUserDocExists().then((exists) => {
        if (exists) {
          window.location.replace("/sources");
        }
      });
    }
  }, [authLoading, currentUser]);

  useEffect(() => {
    setHeaderContent(content[page].header);
    setSubtitleContent(content[page].subtitle);
    page === 1 && setHeaderContent(content[page].header + name);
  }, [page]);

  useEffect(() => {
    if (forWhat == "work") setForWhatNumber(0);
    if (forWhat == "school") setForWhatNumber(1);
    if (forWhat == "personal") setForWhatNumber(2);
  }, [forWhat]);

  const createUserDoc = async () => {
    const docRef = doc(db, "usersv2", currentUser.uid);
    await setDoc(docRef, {
      name: name,
      email: currentUser.email,
      createdAt: serverTimestamp(),
      subscriptionLevel: 0,
      sources: [],
      collections: [collection.toLocaleLowerCase()],
      type: forWhat,
    });

    window.location.replace("/sources");
  };

  return (
    <main className="w-full flex p-12 px-24 gap-12 h-[100vh] bg-white">
      <div className="flex-1 h-full border-4 border-background rounded-2xl p-5 relative">
        <SmallLogo />
        <div className=" font-extrabold text-gray-600 text-2xl mt-5 mb-2">
          {headerContent}
        </div>
        <div className=" text-lg text-gray-600 mr-12 mb-12">
          {subtitleContent}
        </div>
        {page === 0 && (
          <input
            type="text"
            className="outline-none border-4 border-background rounded-2xl p-4 w-full font-medium text-gray-600"
            placeholder="What should we call you?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        {page === 1 && (
          <div className="flex flex-col gap-4">
            <button
              className={`p-6 flex flex-col items-baseline rounded-2xl transition-all ${
                forWhat == "work"
                  ? "bg-background shadow-md outline-none scale-105"
                  : "outline outline-4 outline-background"
              }`}
              onClick={() => setForWhat("work")}
            >
              <div className="text-gray-600 font-semibold">For work</div>
              <div className="text-gray-400 font-medium text-sm">
                Annotate sources for my work and summarize long documents
              </div>
            </button>
            <button
              className={`p-6 flex flex-col items-baseline rounded-2xl transition-all ${
                forWhat == "school"
                  ? "bg-background shadow-md outline-none scale-105"
                  : "outline outline-4 outline-background"
              }`}
              onClick={() => setForWhat("school")}
            >
              <div className="text-gray-600 font-semibold">For school</div>
              <div className="text-gray-400 font-medium text-sm">
                Annotate sources for my school and analyze complex readings
              </div>
            </button>
            <button
              className={`p-6 flex flex-col items-baseline rounded-2xl transition-all ${
                forWhat == "personal"
                  ? "bg-background shadow-md outline-none scale-105"
                  : "outline outline-4 outline-background"
              }`}
              onClick={() => setForWhat("personal")}
            >
              <div className="text-gray-600 font-semibold">For personal</div>
              <div className="text-gray-400 font-medium text-sm">
                Annotate sources for myself and increase productivity
              </div>
            </button>
          </div>
        )}
        {page === 2 && (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              className="outline-none border-4 border-background rounded-2xl p-4 w-full font-medium text-gray-600"
              placeholder="Collection name"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
            />
            <button
              className="p-3 px-5 bg-background rounded-2xl font-semibold text-left text-gray-600"
              onClick={() =>
                setCollection(suggestedCollections[forWhatNumber][0])
              }
            >
              {suggestedCollections[forWhatNumber][0]}
            </button>
            <button
              className="p-3 px-5 bg-background rounded-2xl font-semibold text-left text-gray-600"
              onClick={() =>
                setCollection(suggestedCollections[forWhatNumber][1])
              }
            >
              {suggestedCollections[forWhatNumber][1]}
            </button>
            <button
              className="p-3 px-5 bg-background rounded-2xl font-semibold text-left text-gray-600"
              onClick={() =>
                setCollection(suggestedCollections[forWhatNumber][2])
              }
            >
              {suggestedCollections[forWhatNumber][2]}
            </button>
          </div>
        )}

        {page !== 2 ? (
          <button
            className="absolute bottom-6 right-8 font-bold text-gray-600"
            onClick={() => name.length > 0 && setPage(page + 1)}
          >
            Continue
          </button>
        ) : (
          <button
            className="absolute bottom-6 right-8 font-bold text-gray-600"
            onClick={() => createUserDoc()}
          >
            Lets go
          </button>
        )}

        {page > 0 && (
          <button
            className="absolute bottom-6 left-8 font-bold text-gray-600"
            onClick={() => setPage(page - 1)}
          >
            Back
          </button>
        )}
      </div>
      <div class="flex-1 h-full bg-gradient-to-br from-accent to-indigo-300 rounded-2xl flex items-center justify-center">
            <SmallLogo stroke="white" className="scale-[3]" />
          </div>
    </main>
  );
};

export default Onboarding;
