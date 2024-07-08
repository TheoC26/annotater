"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
import { db } from "@/firebase";
import { doc, updateDoc, deleteDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const SourceContext = React.createContext();

export const useSource = () => {
  return useContext(SourceContext);
};

export const SourceProvider = ({ children }) => {

  const { currentUser } = useAuth();
  const [sourceProviderError, setSourceProviderError] = useState(null);
  const [sourceProviderCollections, setSourceProviderCollections] = useState([]);

  async function renameSource(sourceID, title) {
    try {
      const docRef = doc(db, "sources", sourceID);
      await updateDoc(docRef, {
        name: title,
      });
    } catch {
      setSourceProviderError("Error renaming source");
    }
  }

  async function renameCollection(collectionID, title) {
    try {
      const userRef = doc(db, "usersv2", currentUser.uid);
      const userDoc = await getDoc(userRef);
      const data = userDoc.data();
      const collections = data.collections;

      const index = collections.findIndex((collection) => collection.id === collectionID);
      collections[index] = title;

      await updateDoc(userRef, {
        collections: collections,
      });
    } catch (error) {
      console.log(error)
      setSourceProviderError("Error renaming collection");
    }
  }

  async function updateCollection(sourceID, collectionID) {
    try {
      const docRef = doc(db, "sources", sourceID);
      await updateDoc(docRef, {
        collection: collectionID,
      });
    } catch {
      setSourceProviderError("Error updating collection");
    }
  }

  async function toggleFavoriteSource(sourceID) {
    try {
      const docRef = doc(db, "sources", sourceID);

      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      await updateDoc(docRef, {
        favorite: !data.favorite,
      });
    } catch {
      setSourceProviderError("Error favoriting source");
    }
  }

  async function toggleArchiveSource(sourceID) {
    try {
      const docRef = doc(db, "sources", sourceID);

      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      console.log(data)

      if (data.archiveDate == null) {
        await updateDoc(docRef, {
          archiveDate: serverTimestamp(),
        });
      } else {
        await updateDoc(docRef, {
          archiveDate: null,
        });
      }
    } catch (e) {
      console.log(e)
      setSourceProviderError("Error archiving source");
    }
  }

  async function deleteSource(sourceID) {
    try {
      const docRef = doc(db, "sources", sourceID);
      await deleteDoc(docRef);
    } catch {
      setSourceProviderError("Error deleting source");
    }
  }




  let value = {
    renameSource,
    updateCollection,
    toggleFavoriteSource,
    toggleArchiveSource,
    deleteSource,
    sourceProviderError,
    sourceProviderCollections,
    setSourceProviderCollections,
    renameCollection,
  };

  return (
    <SourceContext.Provider value={value}>{children}</SourceContext.Provider>
  );
};
