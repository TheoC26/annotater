"use client";
import { db } from "@/firebase";
import {
  doc,
  getDoc,
  deleteDoc,
  getDocs,
  collection,
  where,
  orderBy,
  updateDoc,
  serverTimestamp,
  query,
  setDoc,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import Card from "@/components/home/Card";
import NewModal from "@/components/home/NewModal";
import Row from "@/components/home/Row";
import AnnotaterLogo from "@/components/svg/AnnotaterLogo";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@/components/svg/DeleteIcon";
import { useSource } from "@/context/SourceContext";
import ProfileModal from "@/components/ProfileModal";
import RenameDialogue from "@/components/home/RenameDialogue";
import SearchingModal from "@/components/home/SearchingModal";
import MenuIcon from "@/components/svg/MenuIcon";
import Logo from "@/components/svg/Logo";
import LongLogo from "@/components/svg/LongLogo";
import PlusIcon from "@/components/svg/PlusIcon";

export default function SourcesLayout({ children }) {
  const { collectionSlug } = useParams();
  const [modalState, setModalState] = useState(false);
  const [collections, setCollections] = useState([]);
  const [fixedCollection, setFixedCollection] = useState(
    collectionSlug.replace(/%20/g, " ")
  );
  const [isAddingCollection, setIsAddingCollection] = useState(false);
  const [addingCollectionInput, setAddingCollectionInput] = useState("");

  const [collectionExists, setCollectionExists] = useState(true);

  const [userDoc, setUserDoc] = useState(null);

  const { currentUser, logout, authLoading } = useAuth();
  const { sourceProviderCollections, setSourceProviderCollections } =
    useSource();

  const [sources, setSources] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredSources, setFilteredSources] = useState([]);

  const addCollection = async (collectionNameUpper) => {
    const collectionName = collectionNameUpper.toLowerCase();
    const forbiddenChars = ["#", "$", "[", "]", "/", "."];
    if (forbiddenChars.some((char) => collectionName.includes(char))) {
      toast.error("Collection name cannot contain special characters");
      return;
    }
    const forbiddenNames = ["favorites", "archived", "my sources"];
    if (forbiddenNames.includes(collectionName.toLowerCase())) {
      toast.error("Collection name cannot be a reserved name");
      return;
    }

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userCollections = userDoc.data().collections;
        if (!userCollections.includes(collectionName)) {
          const newCollections = [...userCollections, collectionName];
          let tempUserInfo = userDoc.data();
          tempUserInfo.collections = newCollections;
          await setDoc(userRef, tempUserInfo);
          setSourceProviderCollections(newCollections);
        } else {
          toast.error("Collection already exists");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding collection");
    }
  };

  const deleteCollection = async (collectionName) => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userCollections = userDoc.data().collections;
        const newCollections = userCollections.filter(
          (collection) => collection !== collectionName.toLowerCase()
        );
        let tempUserInfo = userDoc.data();
        tempUserInfo.collections = newCollections;
        await setDoc(userRef, tempUserInfo);
        setSourceProviderCollections(newCollections);

        const sourcesCollectionRef = collection(db, "sources");
        console.log(collectionName, "collectionName");
        const q = query(
          sourcesCollectionRef,
          where("mainUser", "==", currentUser.uid),
          where("collection", "==", collectionName.toLowerCase()),
          orderBy("createdAt", "desc")
        );
        console.log("hi hi");
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.empty, "empty?");
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, {
            archiveDate: serverTimestamp(),
          });
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting collection");
    } finally {
      if (
        collectionSlug != "my sources" &&
        collectionSlug != "favorites" &&
        collectionSlug != "archived"
      ) {
        {
          window.location.replace("/sources/my sources");
        }
      }
    }
  };

  const checkIfUserDocExists = async () => {
    const userRef = doc(db, "users", currentUser.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      setUserDoc(userDoc.data());
      return true;
    }
    return false;
  };

  const getSources = async () => {
    try {
      const sourcesRef = collection(db, "sources");

      let q = query(
        sourcesRef,
        where("mainUser", "==", currentUser.uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return;

      setSources(
        querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
      console.log(querySnapshot.docs[0].data());
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      // });
    } catch (e) {
      console.log("error getting sources", e);
      toast.error("Error getting sources");
    } finally {
      setIsLoading(false);
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

  useEffect(() => {
    // check for user existing
    // get all collections for user from firestore
    // check if current collection (from url) exists within firestore collections -> if it does not then do not display {children} and instead display "This collection does not exist"
    // update UI (change which one is bolded)
    // here is the code:

    // if localsotrage has collections, set collections to that
    const localCollections = JSON.parse(
      localStorage.getItem("ANNOTATER_COLLECTIONS")
    );
    if (localCollections) {
      setSourceProviderCollections(localCollections);
    } else {
      localStorage.setItem("ANNOTATER_COLLECTIONS", JSON.stringify([]));
    }

    if (!currentUser) return;

    const getCollections = async () => {
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userCollections = userDoc.data().collections;
        setSourceProviderCollections(userCollections);
        localStorage.setItem(
          "ANNOTATER_COLLECTIONS",
          JSON.stringify(userCollections)
        );
        if (
          !userCollections.includes(collectionSlug.replace(/%20/g, " ")) &&
          collectionSlug.replace(/%20/g, " ") != "favorites" &&
          collectionSlug.replace(/%20/g, " ") != "archived" &&
          collectionSlug.replace(/%20/g, " ") != "my sources"
        ) {
          setCollectionExists(false);
        }
      }
    };
    getCollections();
    getSources();
  }, [currentUser]);

  useEffect(() => {
    let filteredSources = sources.filter((source) => {
      return source.name.toLowerCase().includes(search.toLowerCase());
    });

    if (search.length == 0) {
      filteredSources = sources;
    }

    console.log(filteredSources);

    setFilteredSources(filteredSources);
  }, [search, searching]);

  return (
    <>
      <main className="flex flex-row mx-5 my-3 align-top h-full sm:flex">
        <div className=" w-72 mt-3 hidden sm:block">
          <Link href={"/sources/my sources"}>
            <LongLogo />
          </Link>
          <button
            className="p-4 rounded-full bg-gray-200 flex w-fit mt-6 transition-all hover:scale-105 hover:shadow-lg"
            onClick={() => setModalState(true)}
          >
            <div className="text-3xl leading-6 px-1 pb-1 font-medium rounded-full bg-accent">
              +
            </div>
            <div className="mx-2 text-xl font-medium">New</div>
          </button>
          <div className="flex flex-col mt-6 pr-20">
            <div className="text-xl font-semibold">Collections</div>
            <div className="flex flex-col mt-3">
              <div className="flex justify-between rounded-md hover:bg-gray-200 pl-1 -ml-1 pr-3">
                <Link
                  className={`text-base ${
                    fixedCollection == "my sources"
                      ? "font-bold"
                      : "font-medium"
                  }`}
                  href={"/sources/my sources"}
                >
                  My sources
                </Link>
                {!isAddingCollection && (
                  <button
                    className="text-xl leading-tight font-medium"
                    onClick={() => setIsAddingCollection(true)}
                  >
                    +
                  </button>
                )}
              </div>
              {/* seperator line */}
              <div className="w-full h-[1px] bg-black opacity-25"></div>

              <div className="ml-2 flex flex-col">
                {isAddingCollection && (
                  <div className="flex justify-between">
                    <input
                      type="text"
                      className="text-base mt-1 rounded-md border-2 border-gray-200 w-full"
                      value={addingCollectionInput}
                      onChange={(e) => setAddingCollectionInput(e.target.value)}
                      autoFocus
                      onBlur={() => {
                        if (addingCollectionInput.length == 0) {
                          setIsAddingCollection(false);
                          return;
                        }
                        addCollection(addingCollectionInput);
                        setIsAddingCollection(false);
                        setAddingCollectionInput("");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (addingCollectionInput.length == 0) {
                            setIsAddingCollection(false);
                            return;
                          }
                          addCollection(addingCollectionInput);
                          setIsAddingCollection(false);
                          setAddingCollectionInput("");
                        }
                      }}
                    />
                    {/* <button
                    className="text-xl leading-tight font-medium"
                    onClick={() => {
                      addCollection(addingCollectionInput);
                      setIsAddingCollection(false);
                      setAddingCollectionInput("");
                    }}
                  >
                    +
                  </button> */}
                  </div>
                )}
                {sourceProviderCollections.map((collection) => (
                  <div className="flex justify-between items-center group rounded-md hover:bg-gray-200 pl-1 -ml-1 pr-2 pb-1 -mb-1">
                    <Link
                      className={`text-base mt-1 w-full ${
                        fixedCollection == collection && "font-bold"
                      }`}
                      href={"/sources/" + collection}
                    >
                      {collection.replace("%20", " ").charAt(0).toUpperCase() +
                        collection.replace("%20", " ").slice(1)}
                    </Link>
                    <DeleteIcon
                      className="w-5 h-5 hidden cursor-pointer group-hover:block transition-all hover:fill-red-400 hover:scale-110"
                      onClick={() => deleteCollection(collection)}
                    />
                  </div>
                ))}

                {/* <div className="text-base font-medium mt-1">10th Grade</div>
              <div className="text-base font-medium mt-1">9th Grade</div> */}
              </div>
              <Link
                href={"/sources/favorites"}
                className="text-base font-semibold mt-2 rounded-md hover:bg-gray-200 pl-1 -ml-1 pr-3"
              >
                Favorites
              </Link>
              <Link
                href={"/sources/archived"}
                className="text-base font-semibold mt-2 rounded-md hover:bg-gray-200 pl-1 -ml-1 pr-3"
              >
                Archived
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <header className="flex justify-between w-full h-fit items-center mt-1 gap-6">
            <SearchingModal
              sources={filteredSources}
              searching={searching}
              setSearching={setSearching}
            />
            <input
              className="bg-gray-200 flex-1 text-base font-semibold p-2 px-4 rounded-2xl text-black outline-none"
              placeholder="Search..."
              onBlur={() => setTimeout(() => setSearching(false), 100)}
              onFocus={() => setSearching(true)}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <ProfileModal initial={userDoc && userDoc.name[0].toUpperCase()} />
          </header>
          <div className="bg-white w-full h-[85vh] mt-6 rounded-2xl p-6 overflow-scroll relative">
            {collectionExists ? (
              children
            ) : (
              <div className="text-center text-lg font-semibold mt-6">
                This collection does not exist
              </div>
            )}
          </div>
        </div>
        {modalState && (
          <NewModal
            setModalState={setModalState}
            collection={fixedCollection}
          />
        )}
        <ToastContainer />
        <button
          className="fixed bottom-3 leading-tight right-3 p-3 rounded-full bg-accent shadow-md scale-110 font-extrabold transition-all hover:scale-105"
          onClick={() => setModalState(true)}
        >
          <PlusIcon />
        </button>
      </main>
      {/* <main className="hidden sm:hidden">
        <header className="w-full p-3 flex gap-3 fixed left-0 top-0 right-0 bg-background">
          <div className="p-2.5 rounded-xl bg-gray-200">
            <MenuIcon />
          </div>
          <SearchingModal
            sources={filteredSources}
            searching={searching}
            setSearching={setSearching}
          />
          <input
            className="bg-gray-200 flex-1 text-base font-semibold p-2 px-4 rounded-2xl text-black outline-none"
            placeholder="Search..."
            onBlur={() => setTimeout(() => setSearching(false), 100)}
            onFocus={() => setSearching(true)}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <ProfileModal initial={userDoc && userDoc.name[0].toUpperCase()} />
        </header>
        <div className="mt-16">
          <div className=" bg-white w-full h-full mt-6 rounded-2xl p-6 overflow-scroll relative">
            {collectionExists ? (
              children
            ) : (
              <div className="text-center text-lg font-semibold mt-6">
                This collection does not exist
              </div>
            )}
          </div>
        </div>
      </main> */}
    </>
  );
}
