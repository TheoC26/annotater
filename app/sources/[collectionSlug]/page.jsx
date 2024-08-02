"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/home/Card";
import Row from "@/components/home/Row";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import { toast } from "react-toastify";

import { db } from "@/firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  where,
  orderBy,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import useStateRef from "@/hooks/stateRef";
import Folder from "@/components/home/Folder";
import CustomContextMenu from "@/components/home/CustomContextMenu";
import { useSource } from "@/context/SourceContext";
import ArchiveRow from "@/components/home/ArchiveRow";
import RenameDialogue from "@/components/home/RenameDialogue";
import Link from "next/link";
import ShareDialogue from "@/components/ShareDialogue";

const Collection = () => {
  const { collectionSlug } = useParams();
  const { currentUser } = useAuth();

  const {
    renameSource,
    updateCollection,
    deleteSource,
    toggleArchiveSource,
    toggleFavoriteSource,
    sourceProviderError,
    sourceProviderCollections,
    setSourceProviderCollections,
  } = useSource();

  const [fixedCollection, setFixedCollection] = useState(
    collectionSlug.replace(/%20/g, " ").charAt(0).toUpperCase() +
      collectionSlug.replace(/%20/g, " ").slice(1)
  );

  const [isLoading, setIsLoading] = useState(true);

  const [sources, setSources, sourcesRef] = useStateRef(null);
  const [collections, setCollections] = useState([]);

  const [contextMenuShowing, setContextMenuShowing] = useState(false);
  const [contextMenuSourceID, setContextMenuSourceID, contextMenuSourceIDRef] =
    useStateRef("");
  const [contextMenuType, setContextMenuType, contextMenuTypeRef] =
    useStateRef("");
  const [contextMenuX, setContextMenuX] = useState(0);
  const [contextMenuY, setContextMenuY] = useState(0);
  // const [editingNameID, setEditingNameID] = useState(null);
  const [editNameModalOpen, setEditNameModalOpen] = useState(false);
  const [shareDialogueOpen, setShareDialogueOpen] = useState(false);
  const [userDoc, setUserDoc] = useState(null);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getNameFromID(id) {
    const source =
      sourcesRef.current &&
      sourcesRef.current.find((source) => source.id === id)
        ? sourcesRef.current.find((source) => source.id === id).name
        : id;
    return source;
  }

  function timeAgo(date1, date2 = new Date()) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = date2 - date1;

    if (elapsed < msPerMinute) {
      return "just now";
    } else if (elapsed < msPerHour) {
      const minutes = Math.round(elapsed / msPerMinute);
      return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
    } else if (elapsed < msPerDay) {
      const hours = Math.round(elapsed / msPerHour);
      return hours === 1 ? "an hour ago" : `${hours} hours ago`;
    } else if (elapsed < msPerMonth) {
      const days = Math.round(elapsed / msPerDay);
      return days === 1 ? "yesterday" : `${days} days ago`;
    } else if (elapsed < msPerYear) {
      const months = Math.round(elapsed / msPerMonth);
      return months === 1 ? "a month ago" : `${months} months ago`;
    } else {
      const years = Math.round(elapsed / msPerYear);
      return years === 1 ? "a year ago" : `${years} years ago`;
    }
  }

  const getSources = async () => {
    try {
      const sourcesRef = collection(db, "sources");

      let q;
      if (fixedCollection === "My sources") {
        q = query(
          sourcesRef,
          where("mainUser", "==", currentUser.uid),
          orderBy("createdAt", "desc")
        );
      } else if (fixedCollection === "Favorites") {
        q = query(
          sourcesRef,
          where("mainUser", "==", currentUser.uid),
          where("favorite", "==", true),
          orderBy("createdAt", "desc")
        );
      } else if (fixedCollection === "Archived") {
        q = query(
          sourcesRef,
          where("mainUser", "==", currentUser.uid),
          where("archiveDate", "!=", null),
          orderBy("createdAt", "desc")
        );
      } else {
        q = query(
          sourcesRef,
          where("mainUser", "==", currentUser.uid),
          where("collection", "==", fixedCollection.toLowerCase()),
          orderBy("createdAt", "desc")
        );
      }

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

  const getCollections = async () => {
    const userRef = doc(db, "users", currentUser.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userCollections = userDoc.data().collections;
      setCollections(userCollections);
      if (!userCollections.includes(collectionSlug.replace("%20", " "))) {
        console.log("collection does not exist");
      }
    }
  };

  const renameCollection = async (newName) => {
    const collectionName = contextMenuSourceIDRef.current;
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userCollections = userDoc.data().collections;
        const newCollections = userCollections.map((collection) =>
          collection === collectionName.toLowerCase()
            ? newName.toLowerCase()
            : collection
        );
        let tempUserInfo = userDoc.data();
        tempUserInfo.collections = newCollections;
        await setDoc(userRef, tempUserInfo);
        setSourceProviderCollections(newCollections);
        localStorage.setItem(
          "ANNOTATER_COLLECTIONS",
          JSON.stringify(newCollections)
        );

        const sourcesCollectionRef = collection(db, "sources");
        const q = query(
          sourcesCollectionRef,
          where("mainUser", "==", currentUser.uid),
          where("collection", "==", collectionName.toLowerCase()),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, {
            collection: newName.toLowerCase(),
          });
        });

        const tempSources = sourcesRef.current;
        tempSources.forEach((source) => {
          if (source.collection === collectionName.toLowerCase()) {
            source.collection = newName.toLowerCase();
          }
        });
        setSources(tempSources);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error renaming collection");
    }
  };

  const deleteCollection = async () => {
    const collectionName = contextMenuSourceIDRef.current;
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
        localStorage.setItem(
          "ANNOTATER_COLLECTIONS",
          JSON.stringify(newCollections)
        );

        const sourcesCollectionRef = collection(db, "sources");
        console.log(collectionName, "collectionName");
        const q = query(
          sourcesCollectionRef,
          where("mainUser", "==", currentUser.uid),
          where("collection", "==", collectionName.toLowerCase()),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.empty, "empty?");
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, {
            archiveDate: serverTimestamp(),
          });

          const tempSources = sourcesRef.current;
          const sourceIndex = tempSources.findIndex(
            (source) => source.id === doc.id
          );
          if (sourceIndex === -1) return;
          tempSources[sourceIndex].archiveDate = new Date();
          setSources(tempSources);
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting collection");
    }
  };

  const archiveSource = async () => {
    let sourceID = contextMenuSourceIDRef.current;
    toggleArchiveSource(sourceID);

    const tempSources = sourcesRef.current;
    const sourceIndex = tempSources.findIndex(
      (source) => source.id === sourceID
    );
    if (sourceIndex === -1) return;
    tempSources[sourceIndex].archiveDate = new Date();
    setSources(tempSources);
  };

  const unArchiveSource = async () => {
    let sourceID = contextMenuSourceIDRef.current;
    toggleArchiveSource(sourceID);

    // if source collection is not in user collections, add it
    const userRef = doc(db, "users", currentUser.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      let userCollections = userDoc.data().collections;
      const sourceRef = doc(db, "sources", sourceID);
      const sourceDoc = await getDoc(sourceRef);
      if (sourceDoc.exists()) {
        const sourceCollection = sourceDoc.data().collection;
        if (!userCollections.includes(sourceCollection)) {
          userCollections.push(sourceCollection);
          await updateDoc(userRef, { collections: userCollections });
          setSourceProviderCollections(userCollections);
        }
      }
    }

    const tempSources = sourcesRef.current;
    const sourceIndex = tempSources.findIndex(
      (source) => source.id === sourceID
    );
    tempSources[sourceIndex].archiveDate = null;
    console.log(tempSources);
    setSources([...tempSources]);
  };

  const fullDeleteSource = async () => {
    let sourceID = contextMenuSourceIDRef.current;
    deleteSource(sourceID);

    const tempSources = sourcesRef.current;
    const sourceIndex = tempSources.findIndex(
      (source) => source.id === sourceID
    );
    tempSources.splice(sourceIndex, 1);
    setSources(tempSources);
  };

  const favoriteSource = async (sourceID) => {
    toggleFavoriteSource(sourceID);

    const tempSources = sourcesRef.current;
    const sourceIndex = tempSources.findIndex(
      (source) => source.id === sourceID
    );
    tempSources[sourceIndex].favorite = !tempSources[sourceIndex].favorite;
    setSources(tempSources);
  };

  const updateSourceCollection = async (collectionID) => {
    let sourceID = contextMenuSourceIDRef.current;
    try {
      updateCollection(sourceID, collectionID);
      const tempSources = sourcesRef.current;
      const sourceIndex = tempSources.findIndex(
        (source) => source.id === sourceID
      );
      tempSources[sourceIndex].collection = collectionID;
      setSources(tempSources);
    } catch {
      toast.error("Error updating collection");
    }
  };

  useEffect(() => {
    // find all sources for the current user in this collection (if home then find all)
    // set display data
    // here is the code:
    if (!currentUser) return;

    // getCollections();

    // get userDoc
    const getUserDoc = async () => {
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setUserDoc(userDoc.data());
      }
    };
    getUserDoc();

    getSources();
  }, [currentUser]);

  useEffect(() => {
    if (sourceProviderError) {
      toast.error(sourceProviderError);
    }
  }, [sourceProviderError]);

  return (
    <>
      {fixedCollection != "My sources" ? (
        <div className="text-2xl mb-3">
          <Link href={"/sources/my sources"}>My sources</Link>
          {" > "}
          <span className="font-semibold">{fixedCollection}</span>
        </div>
      ) : (
        <div className="text-2xl mb-3 font-semibold">
          <span className="font-semibold">{fixedCollection}</span>
        </div>
      )}

      <div className="grid gap-3 w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {sources &&
          fixedCollection != "Archived" &&
          sources
            .filter((source) => !source.archiveDate)
            .filter(
              (source) =>
                source.collection == fixedCollection.toLowerCase() ||
                fixedCollection == "My sources"
            )
            .map(
              (source, i) =>
                i < 4 && (
                  <Card
                    key={source.id}
                    id={source.id}
                    title={source.name}
                    collection={capitalizeFirstLetter(source.collection)}
                    date={timeAgo(new Date(source.createdAt.seconds * 1000))}
                    summary={source.summary}
                    setContextMenuShowing={setContextMenuShowing}
                    setContextMenuType={setContextMenuType}
                    setContextMenuX={setContextMenuX}
                    setContextMenuY={setContextMenuY}
                    favoriteSource={favoriteSource}
                    favorite={source.favorite}
                    setContextMenuSourceID={setContextMenuSourceID}
                  />
                )
            )}
      </div>
      <div>
        {fixedCollection == "My sources" &&
          sourceProviderCollections.map((collection) => (
            <Folder
              key={collection}
              name={capitalizeFirstLetter(collection)}
              setContextMenuShowing={setContextMenuShowing}
              setContextMenuType={setContextMenuType}
              setContextMenuX={setContextMenuX}
              setContextMenuY={setContextMenuY}
              setContextMenuSourceID={setContextMenuSourceID}
              setCollections={setSourceProviderCollections}
              // setEditingNameID={setEditingNameID}
              // isEditingName={
              //   editingNameID
              //     ? collection === editingNameID.toLowerCase()
              //     : false
              // }
            />
          ))}
      </div>
      {sources && (
        <>
          <div className="flex w-full justify-between text-base font-semibold mt-6">
            <div>Name</div>
            <div className="hidden md:block mr-[164px]">Created</div>
          </div>
          <div className="w-full h-[1px] bg-black opacity-25 mt-0.5"></div>
        </>
      )}

      <div>
        {sources &&
          fixedCollection != "Archived" &&
          sources
            .filter(
              (source) =>
                source.collection == fixedCollection.toLowerCase() ||
                fixedCollection == "Favorites"
            )
            .map(
              (source, i) =>
                !source.archiveDate &&
                ((fixedCollection == "My sources" &&
                  source.collection == "my sources") ||
                  fixedCollection != "My sources") && (
                  <Row
                    key={source.id}
                    id={source.id}
                    title={source.name}
                    date={new Date(
                      source.createdAt.seconds * 1000
                    ).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                    setContextMenuShowing={setContextMenuShowing}
                    setContextMenuType={setContextMenuType}
                    setContextMenuX={setContextMenuX}
                    setContextMenuY={setContextMenuY}
                    renameSource={renameSource}
                    favoriteSource={favoriteSource}
                    favorite={source.favorite}
                    setContextMenuSourceID={setContextMenuSourceID}
                    // isEditingName={source.id === editingNameID}
                    // setEditingNameID={setEditingNameID}
                    sources={sources}
                    setSources={setSources}
                    collection={capitalizeFirstLetter(source.collection)}
                  />
                )
            )}
        {sources &&
          fixedCollection == "Archived" &&
          sources.map(
            (source, i) =>
              source.archiveDate != null && (
                <ArchiveRow
                  key={source.id}
                  id={source.id}
                  title={source.name}
                  date={new Date(
                    source.createdAt.seconds * 1000
                  ).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                  setContextMenuShowing={setContextMenuShowing}
                  setContextMenuType={setContextMenuType}
                  setContextMenuX={setContextMenuX}
                  setContextMenuY={setContextMenuY}
                  renameSource={renameSource}
                  favorite={source.favorite}
                  setContextMenuSourceID={setContextMenuSourceID}
                  collection={capitalizeFirstLetter(source.collection)}
                />
              )
          )}
        {!sources && !isLoading && (
          <div className="text-center text-lg font-semibold mt-6">
            No sources in this collection
          </div>
        )}
      </div>
      {contextMenuShowing && (
        <CustomContextMenu
          posX={contextMenuX}
          posY={contextMenuY}
          type={contextMenuType}
          setShowing={setContextMenuShowing}
          archiveSource={archiveSource}
          unArchiveSource={unArchiveSource}
          favoriteSource={favoriteSource}
          fullDeleteSource={fullDeleteSource}
          // setEditingNameID={setEditingNameID}
          sourceID={contextMenuSourceID}
          collections={sourceProviderCollections}
          deleteCollection={deleteCollection}
          updateSourceCollection={updateSourceCollection}
          setEditNameModalOpen={setEditNameModalOpen}
          setShareDialogueOpen={setShareDialogueOpen}
        />
      )}
      <RenameDialogue
        open={editNameModalOpen}
        setOpen={setEditNameModalOpen}
        id={contextMenuSourceID}
        title={getNameFromID(contextMenuSourceID)}
        isFolder={
          sourcesRef.current
            ? !sourcesRef.current.find(
                (source) => source.id === contextMenuSourceID
              )
            : false
        }
        sources={sources}
        setSources={setSources}
        setSourceProviderCollections={setSourceProviderCollections}
        renameSource={renameSource}
        renameCollection={renameCollection}
      />
      <ShareDialogue
        open={shareDialogueOpen}
        setOpen={setShareDialogueOpen}
        sourceTitle={getNameFromID(contextMenuSourceID)}
        userName={userDoc ? userDoc.name : "name"}
        userEmail={currentUser ? currentUser.email : "email"}
        sourceID={contextMenuSourceID}
      />
    </>
  );
};

export default Collection;
