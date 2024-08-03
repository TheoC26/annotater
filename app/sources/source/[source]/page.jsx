"use client";
import CommentBox from "@/components/source/CommentBox";
import Section from "@/components/source/Section";
import ShareIcon from "@/components/svg/ShareIcon";
import SmallLogo from "@/components/svg/SmallLogo";
import SourcesIcon from "@/components/svg/SourcesIcon";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DOMPurify from "dompurify";
import OpenAI from "openai";
import { v4 as uuid } from "uuid";

import { db } from "@/firebase";
import {
  doc,
  updateDoc,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { GoogleGenerativeAI } from "@google/generative-ai";
import useStateRef from "@/hooks/stateRef";
import { useAuth } from "@/context/AuthContext";
import { useSource } from "@/context/SourceContext";
import { sendShareEmail } from "@/app/lib/mail";
import ProfileModal from "@/components/ProfileModal";
import ShareDialogue from "@/components/ShareDialogue";
import Logo from "@/components/svg/Logo";
import LogoS from "@/components/svg/LogoS";

const Source = () => {
  const { source } = useParams();
  // const { isAnnotating, sourceAnnotatingText } = useSource();

  const { currentUser, authLoading } = useAuth();
  const { renameSource, sourceProviderError } = useSource();

  const [isLoading, setIsLoading] = useState(true);
  const [currentSpan, setCurrentSpan] = useState(null);
  const [currentOutline, setCurrentOutline] = useState("Annotated Source");
  const [sourceCollection, setSourceCollection] = useState("");
  const [mainUserID, setMainUserID] = useState("");

  const [isValidDocument, setIsValidDocument] = useState(true);

  const [annotationMode, setAnnotationMode, annotationModeRef] =
    useStateRef(false);

  const [shareDialogueOpen, setShareDialogueOpen] = useState(false);

  const commentBoxRef = useRef(null);
  const commentBoxTitleRef = useRef(null);
  const commentBoxContentRef = useRef(null);

  const annotatedSourceRef = useRef(null);
  const summaryRef = useRef(null);
  const notesRef = useRef(null);
  const analysisRef = useRef(null);

  const [fullSource, setFullSource, fullSourceRef] = useStateRef(null);
  const [summaryText, setSummaryText, summeryTextRef] = useStateRef(null);
  const [notesText, setNotesText, notesTextRef] = useStateRef(null);
  const [analysisText, setAnalysisText, analysisTextRef] = useStateRef(null);
  const [commentsText, setCommentsText, commentsTextRef] = useStateRef(null);
  const [titleText, setTitleText, titleTextRef] = useStateRef(null);

  const [commentsArray, setCommentsArray, commentsArrayRef] = useStateRef([]);
  const [commentsIndexArray, setCommentsIndexArray, commentsIndexArrayRef] =
    useStateRef([]);

  const [commentTitle, setCommentTitle] = useState("");
  const [commentContent, setCommentContent] = useState("");

  const [userDoc, setUserDoc] = useState(null);

  const [isEditingName, setIsEditingName] = useState(false);

  const checkIfUserDocExists = async () => {
    const userRef = doc(db, "users", currentUser.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      setUserDoc(userDoc.data());
      return true;
    }
    return false;
  };

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const debounceTimerRef = useRef(null);

  function debounce(func, timeout = 300) {
    return (...args) => {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  }

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  function parseCommentTextToJson(text) {
    try {
      const parsedJson = JSON.parse(text.split("```")[1]);
      return parsedJson;
    } catch (error) {
      console.error("Parsing error:", error);
      // Optionally, modify the text or handle the error before retrying
      return parseTextToJson(text);
    }
  }

  async function promptAI(prompt) {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  }

  async function promptOpenAI(prompt) {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
      temperature: 1,
      max_tokens: 4095,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.choices[0].message.content;
  }

  // async function promptAIComments(text) {
  //   let prompt = `Given this source, output a list json response of annotations in this exact format:

  //       [ { type: "this is the type of annotation in a single word (eg. setting, analysis, character)", content: "This is the content of the annotation or what would be written in the margins (eg. This passage highlights the main scene of the story and introduces the main character. We learn her name is Elara and that she is curious.)", quote: "This is the direct quote from the source which should be highlighted in correspondence with the annotation. It should be around a sentence or two long and include the entirety of the quote. You must not under any circumstance use three dots (ellipsis) to shorten the quote.", }, { type: "this is the type of annotation in a single word (eg. setting, analysis, character)", content: "This is the content of the annotation or what would be written in the margins (eg. This passage highlights the main scene of the story and introduces the main character. We learn her name is Elara and that she is curious.)", quote: "This is the direct quote from the source which should be highlighted in correspondence with the annotation. It should be around a sentence or two long and include the entirety of the quote. You must not under any circumstance use three dots (ellipsis) to shorten the quote.", }, { type: "this is the type of annotation in a single word (eg. setting, analysis, character)", content: "This is the content of the annotation or what would be written in the margins (eg. This passage highlights the main scene of the story and introduces the main character. We learn her name is Elara and that she is curious.)", quote: "This is the direct quote from the source which should be highlighted in correspondence with the annotation. It should be around a sentence or two long and include the entirety of the quote. You must not under any circumstance use three dots (ellipsis) to shorten the quote.", }, ]

  //       Add as many objects to the array as deemed necessary but make sure they are only the very most important. Here is the source:
  //       ${text}`;

  //   try {
  //     const jsonString = await promptOpenAI(prompt);
  //     console.log(jsonString);
  //     console.log(jsonString.split("```")[1].replace("json", ""));
  //     const parsedJson = JSON.parse(
  //       jsonString.split("```")[1].replace("json", "")
  //     );
  //     setCommentsArray(parsedJson);
  //     commentsArrayRef.current = parsedJson;
  //     const commentText = convertSourceToHighlightedText(text, parsedJson);
  //     console.log(commentText);
  //     annotatedSourceRef.current.innerHTML = commentText;
  //     setCommentsText(commentText);
  //   } catch (error) {
  //     console.error("Parsing error:", error);
  //     promptAIComments(text);
  //   }

  // }
  async function promptAIComments(text) {
    const maxLength = 8000;
    const thresholdLength = 10000;
    let commentsArray = [];

    async function processChunk(chunk) {
      let prompt = `Given this source, output a list json response of annotations in this exact format:

        [ { type: "this is the type of annotation in a single word (eg. setting, analysis, character)", content: "This is the content of the annotation or what would be written in the margins (eg. This passage highlights the main scene of the story and introduces the main character. We learn her name is Elara and that she is curious.)", quote: "This is the direct quote from the source which should be highlighted in correspondence with the annotation. It should be around a sentence or two long and include the entirety of the quote. You must not under any circumstance use three dots (ellipsis) to shorten the quote.", }, { type: "this is the type of annotation in a single word (eg. setting, analysis, character)", content: "This is the content of the annotation or what would be written in the margins (eg. This passage highlights the main scene of the story and introduces the main character. We learn her name is Elara and that she is curious.)", quote: "This is the direct quote from the source which should be highlighted in correspondence with the annotation. It should be around a sentence or two long and include the entirety of the quote. You must not under any circumstance use three dots (ellipsis) to shorten the quote.", }, { type: "this is the type of annotation in a single word (eg. setting, analysis, character)", content: "This is the content of the annotation or what would be written in the margins (eg. This passage highlights the main scene of the story and introduces the main character. We learn her name is Elara and that she is curious.)", quote: "This is the direct quote from the source which should be highlighted in correspondence with the annotation. It should be around a sentence or two long and include the entirety of the quote. You must not under any circumstance use three dots (ellipsis) to shorten the quote.", }, ]

        Add as many objects to the array as deemed necessary but make sure they are only the very most important. Here is the source:
        ${chunk}`;

      try {
        const jsonString = await promptOpenAI(prompt);
        console.log(jsonString);
        console.log(jsonString.split("```")[1].replace("json", ""));
        const parsedJson = JSON.parse(
          jsonString.split("```")[1].replace("json", "")
        );
        return parsedJson;
      } catch (error) {
        console.error("Parsing error:", error);
        return processChunk(chunk); // Retry for the same chunk
      }
    }

    if (text.length > thresholdLength) {
      let start = 0;
      while (start < text.length) {
        let end = start + maxLength;
        if (end > text.length) end = text.length;

        const chunk = text.slice(start, end);
        const chunkComments = await processChunk(chunk);
        commentsArray = commentsArray.concat(chunkComments);

        start = end;
      }
    } else {
      commentsArray = await processChunk(text);
    }

    setCommentsArray(commentsArray);
    commentsArrayRef.current = commentsArray;

    const commentText = convertSourceToHighlightedText(text, commentsArray);
    console.log(commentText);
    annotatedSourceRef.current.innerHTML = commentText;
    setCommentsText(commentText);
  }

  async function promptAISummary(text) {
    let prompt = `Create a brief summary of this source in plain text. This summary should be very understandable and needs to not use ANY markdown styling: ${text}`;
    const response = await promptAI(prompt);
    setSummaryText(response);
    promptAINotes(response);
    promptAITitle(response);
  }

  async function promptAINotes(text) {
    let prompt = `Turn this summary into a bulleted summary. This summary should be very understandable and needs to come in the form of
    - First bullet
    - Second bullet
    - Third bullet
    - etc...

    It needs to not use ANY markdown styling. Here is the summary: ${text}`;
    const response = await promptAI(prompt);
    setNotesText(response);
  }

  async function promptAIAnalysis(text) {
    let prompt = `Create an in depth but concise analysis of this source. It should be easy to follow and needs to not use ANY markdown styling: ${text}`;
    const response = await promptAI(prompt);
    setAnalysisText(response);
  }

  async function promptAITitle(text) {
    let prompt = `Generate one title for this source based on a summary. This title should be consise and to the point. Do not use ANY markdown styling. Here is the source: ${text}`;
    const response = await promptAI(prompt);
    setTitleText(response);
  }

  function editDistance(s1, s2) {
    let costs = Array(s2.length + 1)
      .fill(0)
      .map((_, j) => j);
    for (let i = 1; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 1; j <= s2.length; j++) {
        const newValue =
          s1[i - 1] === s2[j - 1]
            ? costs[j - 1]
            : Math.min(lastValue, costs[j - 1], costs[j]) + 1;
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
      costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  function findTextIndex(text, source) {
    text = text.toLowerCase();
    source = source.toLowerCase();

    let bestIndex = 0;
    let bestScore = 0;

    for (let i = 0; i <= source.length - text.length; i++) {
      const substring = source.substring(i, i + text.length);
      const longerLength = Math.max(text.length, substring.length);
      const distance = editDistance(text, substring);
      const score = (longerLength - distance) / parseFloat(longerLength);

      if (score > bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    }

    return bestIndex;
  }

  function findClosestComment(text, comments) {
    let bestComment = null;
    let bestScore = 0;

    comments.forEach((comment) => {
      const distance = editDistance(text, comment.quote);
      const longerLength = Math.max(text.length, comment.quote.length);
      const score = (longerLength - distance) / parseFloat(longerLength);

      if (score > bestScore) {
        bestScore = score;
        bestComment = comment;
      }
    });

    return bestComment;
  }

  function createHighlightTextString(index1, index2, source) {
    return `${source.substring(0, index1)}
        <span>
          ${source.substring(index1, index2)}
        </span>
        ${source.substring(index2)}`;
  }

  function highlightText(text, source) {
    const index = findTextIndex(text, source);

    const tempIndexArray = commentsIndexArrayRef.current;
    tempIndexArray.push([index, index + text.length]);
    setCommentsIndexArray(tempIndexArray);

    return createHighlightTextString(index, index + text.length, source);
  }

  function convertSourceToHighlightedText(source, comments) {
    let finalSourceString = source;

    comments.forEach((comment) => {
      finalSourceString = highlightText(comment.quote, finalSourceString);
    });

    console.log("" + finalSourceString + "</>");
    return "" + finalSourceString + "</>";
  }

  function convertSourceToHighlightedTextWithIndex(source, indexArray) {
    let finalSourceString = source;

    indexArray.forEach((index) => {
      console.log(index);
      finalSourceString = createHighlightTextString(
        index[0],
        index[1],
        finalSourceString
      );
    });

    return "" + finalSourceString + "</>";
  }

  async function createSourceDoc() {
    console.log("creating source doc");
    console.log("fullSource", fullSourceRef.current);
    console.log("summeryText", summeryTextRef.current);
    console.log("notesText", notesTextRef.current);
    console.log("analysisText", analysisTextRef.current);
    console.log("sourceCollection", sourceCollection);
    console.log("currentUser", currentUser.uid);
    console.log("titleText", titleTextRef.current);
    console.log("commentsArray", commentsArrayRef.current);
    console.log("commentsIndexArray", commentsIndexArrayRef.current);
    console.log("serverTimestamp", serverTimestamp());

    try {
      const docRef = doc(db, "sources", source);
      await setDoc(docRef, {
        fullSource: fullSourceRef.current,
        summary: summeryTextRef.current,
        notes: notesTextRef.current,
        analysis: analysisTextRef.current,
        collection: sourceCollection,
        mainUser: currentUser.uid,
        name: titleTextRef.current,
        annotationsArray: JSON.stringify(commentsArrayRef.current),
        annotationsIndexArray: JSON.stringify(commentsIndexArrayRef.current),
        createdAt: serverTimestamp(),
        archiveDate: null,
        favorite: false,
      });

      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userSources = userDoc.data().sources;
        userSources.push(source);
        await updateDoc(userRef, {
          sources: userSources,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating source. Please try again later.");
    }
  }

  async function fetchSourceDoc() {
    try {
      const docRef = doc(db, "sources", source);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const data = docSnap.data();

        setSummaryText(data.summary);
        setNotesText(data.notes);
        setAnalysisText(data.analysis);
        setCommentsArray(JSON.parse(data.annotationsArray));
        setCommentsIndexArray(JSON.parse(data.annotationsIndexArray));
        setTitleText(data.name);
        setSourceCollection(data.collection);
        setFullSource(data.fullSource);
        setMainUserID(data.mainUser);

        console.log(fullSourceRef.current);
        console.log(commentsIndexArrayRef.current);

        const commentText = convertSourceToHighlightedTextWithIndex(
          data.fullSource,
          JSON.parse(data.annotationsIndexArray)
        );
        console.log(commentText);
        annotatedSourceRef.current.innerHTML = commentText;
        setCommentsText(commentText);
      } else {
        // doc.data() will be undefined in this case
        // TODO CREATE A THIS PAGE DOES NOT EXIST PAGE
        setIsValidDocument(false);
      }
    } catch {
      toast.error("Error fetching source. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  async function copySourceDoc() {
    try {
      const docRef = doc(db, "sources", source);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const data = docSnap.data();

        const newDocRef = doc(db, "sources", uuid());
        await setDoc(newDocRef, {
          fullSource: data.fullSource,
          summary: data.summary,
          notes: data.notes,
          analysis: data.analysis,
          collection: "my sources",
          mainUser: currentUser.uid,
          name: data.name,
          annotationsArray: data.annotationsArray,
          annotationsIndexArray: data.annotationsIndexArray,
          createdAt: serverTimestamp(),
          archiveDate: null,
          favorite: false,
        });

        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userSources = userDoc.data().sources;
          userSources.push(newDocRef.id);
          await updateDoc(userRef, {
            sources: userSources,
          });
        }
        toast.success("Source copied successfully.");
        // redirect to new source
        window.location.replace(`/sources/source/${newDocRef.id}`);
      }
    } catch {
      toast.error("Error copying source. Please try again later.");
    }
  }

  const processTitleChange = debounce(
    () => renameSource(source, titleTextRef.current),
    1000
  );

  useEffect(() => {
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      // if the rect.top is in the top half of the screen
      return (rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) / 2 &&
        (rect.bottom >=
          (window.innerHeight || document.documentElement.clientHeight) / 2)
      );
    }

    if (!localStorage.getItem("ANNOTATER_SOURCECONTEXT")) {
      let newSourceContext = {
        isAnnotating: false,
        sourceAnnotatingText: "",
        sourceCollection: "",
      };
      localStorage.setItem(
        "ANNOTATER_SOURCECONTEXT",
        JSON.stringify(newSourceContext)
      );
    }

    const sourceContext = JSON.parse(
      localStorage.getItem("ANNOTATER_SOURCECONTEXT")
    );

    window.addEventListener("scroll", (e) => {
      // IDK IF I WILL KEEP ASK TIMMY
      // if (isLoading) return;
      if (isElementInViewport(analysisRef.current)) {
        setCurrentOutline("Analysis");
      } else if (isElementInViewport(notesRef.current)) {
        setCurrentOutline("Notes");
      } else if (isElementInViewport(summaryRef.current)) {
        setCurrentOutline("Summary");
      } else if (isElementInViewport(annotatedSourceRef.current)) {
        setCurrentOutline("Annotated Source");
      }
    });

    // If first time (is annotating == true)
    if (sourceContext.isAnnotating) {
      setSourceCollection(sourceContext.sourceCollection);
      setFullSource(sourceContext.sourceAnnotatingText);
      setAnnotationMode(true);

      // setLocalStorage to reset
      let newSourceContext = {
        isAnnotating: false,
        sourceAnnotatingText: "",
        sourceCollection: "",
      };
      localStorage.setItem(
        "ANNOTATER_SOURCECONTEXT",
        JSON.stringify(newSourceContext)
      );

      let purifiedSourceAnnotatingText = DOMPurify.sanitize(
        sourceContext.sourceAnnotatingText
      );

      promptAIComments(purifiedSourceAnnotatingText);
      promptAISummary(purifiedSourceAnnotatingText);
      // promptAINotes(purifiedSourceAnnotatingText);
      promptAIAnalysis(purifiedSourceAnnotatingText);

      // const AISummary = promptAI(`Create a brief summary of this source:
      //   ${purifiedSourceAnnotatingText}
      //   `);
      // const AINotes = promptAI(`Create a brief bulleted summary of this source:
      //   ${purifiedSourceAnnotatingText}
      //   `);
      // const AIAnalysis = promptAI(`Create an in depth analysis of this source:
      //   ${purifiedSourceAnnotatingText}
      //   `);
      // const AIComments = promptAI(`Given this source, output a list json response of annotations in this exact format:

      //   [ { type: "this is the type of annotation (eg. setting, analysis, character)", content: "This is the content of the annotation or what would be written in the margins (eg. This passage highlights the main scene of the story and introduces the main character. We learn her name is Elara and that she is curious.)", quote: "This is the direct quote from the source which should be highlighted in correspondence with the annotation. It should be around a sentence or two long", }, { type: "this is the type of annotation (eg. setting, analysis, character)", content: "This is the content of the annotation or what would be written in the margins (eg. This passage highlights the main scene of the story and introduces the main character. We learn her name is Elara and that she is curious.)", quote: "This is the direct quote from the source which should be highlighted in correspondence with the annotation. It should be around a sentence or two long", }, { type: "this is the type of annotation (eg. setting, analysis, character)", content: "This is the content of the annotation or what would be written in the margins (eg. This passage highlights the main scene of the story and introduces the main character. We learn her name is Elara and that she is curious.)", quote: "This is the direct quote from the source which should be highlighted in correspondence with the annotation. It should be around a sentence or two long", }, ]

      //   Add as many objects to the array as deemed necessary. Here is the source:
      //   ${purifiedSourceAnnotatingText}
      //   `);
      //   console.log(AIComments)
      //   // console.log(JSON.parse(AIComments.split("```")[1]));
      // setSummaryText(AISummary);
      // setNotesText(AINotes);
      // setAnalysisText(AIAnalysis);
      // setCommentsText(AIComments);

      // check for malicious data
      // call google gemini for comments, summary, notes, analysis
      // save to firestore database
    } else {
      console.log(sourceContext.isAnnotating);
      // get source doc from firestore
      // check if user has access (is main user or added user)
      // set the data to the state
      fetchSourceDoc();
    }

    // annotatedSourceRef.current.innerHTML = fakeSource.fullSource;
    // summaryRef.current.innerText = fakeSource.summery;
    // notesRef.current.innerHTML = fakeSource.notes
    //   .map((note) => `<li>${note}</li>`)
    //   .join("");
    // analysisRef.current.innerText = fakeSource.analysis;
    // setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(currentUser);
    if (!currentUser && !authLoading) {
      // window.location.replace("/login");
      return;
    } else if (currentUser) {
      checkIfUserDocExists();
    }
  }, [authLoading, currentUser]);

  useEffect(() => {
    // TODO: CHECK IF IS IN ANNOTATION MODE
    if (!annotationModeRef.current) return;

    let numberOfLoaded = 0;
    if (summeryTextRef.current !== null) numberOfLoaded++;
    if (notesTextRef.current !== null) numberOfLoaded++;
    if (analysisTextRef.current !== null) numberOfLoaded++;
    if (commentsTextRef.current !== null) numberOfLoaded++;
    if (titleTextRef.current !== null) numberOfLoaded++;

    console.log(numberOfLoaded, "numberOfLoaded");
    if (numberOfLoaded < 5) return;

    // send all data to firestore database
    createSourceDoc();

    setIsLoading(false);
  }, [summaryText, notesText, analysisText, commentsText, titleText]);

  useEffect(() => {
    // add event listener to every span element
    if (commentsText == null) return;
    // get access to every span element in the annotated source
    const spans = annotatedSourceRef.current.querySelectorAll("span");
    console.log(spans);
    // on click set the current span to the clicked span
    spans.forEach((span) => {
      console.log("added!", span);
      span.addEventListener("click", () => {
        console.log("click");
        setCurrentSpan(span);
      });
    });
  }, [commentsText]);

  useEffect(() => {
    // change position and content of comment box
    console.log(commentsArrayRef.current, "commentsArrayRef.current");
    console.log(commentBoxRef);
    if (!commentBoxRef.current || commentsArrayRef.current == []) return;
    if (currentSpan) {
      // find the object that has the quote that matches the current span -> the quote might not be EXACTLY the same
      const comment = findClosestComment(
        currentSpan.innerText,
        commentsArrayRef.current
      );

      const rect = currentSpan.getBoundingClientRect();
      console.log(rect);

      const spans = annotatedSourceRef.current.querySelectorAll("span");
      // on click set the current span to the clicked span
      spans.forEach((span) => {
        span.classList.remove("selected-span");
      });

      currentSpan.classList.add("selected-span");

      commentBoxRef.current.style.display = "block";
      if (window.innerWidth > 768) {
        commentBoxRef.current.style.top = `${rect.top + window.scrollY - 20}px`;
      } else {
        commentBoxRef.current.style.top = `${
          rect.top + window.scrollY + rect.height + 10
        }px`;
      }
      // commentBoxTitleRef.current.innerText = comment.type.toUpperCase();
      // commentBoxContentRef.current.innerText = comment.content;
      setCommentTitle(comment.type.toUpperCase());
      setCommentContent(comment.content);
    }
  }, [currentSpan]);

  useEffect(() => {
    if (sourceProviderError) {
      toast.error(sourceProviderError);
    }
  }, [sourceProviderError]);

  return (
    <div>
      <header className="fixed w-full z-20">
        <div className="flex justify-between items-center py-3 px-5 bg-background">
          <div className="flex gap-5 flex-1">
            <Link href={"/sources/my sources"} className="hidden sm:block">
              <LogoS className={"mt-2"} />
            </Link>
            <div className="flex-col w-full pr-6">
              {isEditingName ? (
                <input
                  className="font-bold text-base md:text-xl w-full bg-transparent pl-2 -ml-2"
                  value={titleText}
                  onChange={(e) => setTitleText(e.target.value)}
                  onKeyUp={processTitleChange}
                  autoFocus
                />
              ) : (
                <div
                  className="font-bold text-base md:text-xl w-full bg-transparent pl-2 -ml-2 line-clamp-1"
                  onClick={() => {
                    if (!currentUser || currentUser.uid !== mainUserID) return;
                    setIsEditingName(true);
                  }}
                >
                  {titleText}
                </div>
              )}

              <div className="font-bold capitalize text-[10px] md:text-xs">
                {sourceCollection.toUpperCase()}
              </div>
            </div>
          </div>
          {!authLoading && currentUser ? (
            <div className="flex items-center justify-between gap-4">
              <Link
                href={"/sources/my sources"}
                className="p-3 px-4 md:px-6 bg-gray-200 rounded-full flex gap-2 transition-all hover:scale-105 hover:shadow-lg hover:bg-accent"
              >
                <SourcesIcon />
                <div className="font-semibold hidden md:block">Sources</div>
              </Link>
              <button
                onClick={() => setShareDialogueOpen(!shareDialogueOpen)}
                className="p-3 px-4 md:px-6 bg-gray-200 rounded-full flex gap-2 transition-all hover:scale-105 hover:shadow-lg hover:bg-accent"
              >
                <ShareIcon />
                <div className="font-semibold hidden md:block">Share</div>
              </button>
              <ProfileModal
                initial={userDoc && userDoc.name[0].toUpperCase()}
              />
            </div>
          ) : (
            !authLoading && (
              <div className="flex items-center justify-between gap-4">
                <Link
                  href={"/login"}
                  className="p-2 leading-tight bg-accent border-2 border-accent px-4 rounded-xl text-white font-bold text-xl transition-all hover:shadow-lg hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  href={"#learn-more"}
                  className="p-2 leading-tight border-2 border-accent px-4 rounded-xl text-accent font-bold text-xl hidden sm:block transition-all hover:shadow-lg hover:scale-105"
                >
                  Try for free
                </Link>
              </div>
            )
          )}
        </div>
      </header>
      <div className="h-20"></div>
      {isValidDocument ? (
        <>
          <div className="fixed left-0 md:left-6 top-[4.5rem] bg-background shadow-sm md:shadow-none md:top-36 w-full md:w-auto justify-around flex md:flex-col z-20">
            <div className="text-sm font-semibold mb-2 hidden md:block">
              Outline
            </div>
            <Link
              href={"#Annotated Source"}
              className={`text-base sm:text-lg ${
                currentOutline === "Annotated Source" && "underline"
              }`}
              // onClick={() => {
              //   setCurrentOutline("Annotated Source");
              // }}
            >
              Annotated Source
            </Link>
            <Link
              href={"#Summary"}
              className={`text-base sm:text-lg ${
                currentOutline === "Summary" && "underline"
              }`}
              // onClick={() => {
              //   setCurrentOutline("Summary");
              // }}
            >
              Summary
            </Link>
            <Link
              href={"#Notes"}
              className={`text-base sm:text-lg ${
                currentOutline === "Notes" && "underline"
              }`}
              // onClick={() => {
              //   setCurrentOutline("Notes");
              // }}
            >
              Notes
            </Link>
            <Link
              href={"#Analysis"}
              className={`text-base sm:text-lg ${
                currentOutline === "Analysis" && "underline"
              }`}
              // onClick={() => {
              //   setCurrentOutline("Analysis");
              // }}
            >
              Analysis
            </Link>
          </div>
          <CommentBox
            reference={commentBoxRef}
            titleReference={commentBoxTitleRef}
            contentReference={commentBoxContentRef}
            title={commentTitle}
            content={commentContent}
          />
          <main className="ml-6 md:ml-52 mr-6 lg:mr-80 pt-6 mb-[30vh]">
            <Section title={"Annotated Source"} isLoading={isLoading}>
              <div
                ref={annotatedSourceRef}
                className={`annotatedSource ${isLoading ? "hidden" : ""}`}
                // dangerouslySetInnerHTML={{ __html: commentsText }}
              ></div>
            </Section>
            <Section title={"Summary"} isLoading={isLoading}>
              <div ref={summaryRef} className={`${isLoading && "hidden"}`}>
                {summaryText}
              </div>
            </Section>
            <Section title={"Notes"} isLoading={isLoading}>
              <div className={`ml-4 ${isLoading && "hidden"}`} ref={notesRef}>
                <ul className=" list-disc">
                  {notesText &&
                    notesText
                      .split("\n")
                      .map(
                        (note) =>
                          note != "" && (
                            <li className="">{note.replace("-", "")}</li>
                          )
                      )}
                </ul>
              </div>
            </Section>
            <Section title={"Analysis"} isLoading={isLoading}>
              <div
                ref={analysisRef}
                className={`${isLoading && "hidden"}`}
              >
                {analysisText}
              </div>
            </Section>
          </main>
          {/* if user is logged in and user != mainUser */}
          {!authLoading &&
            mainUserID != "" && currentUser &&
            currentUser.uid !== mainUserID && (
              <div className="fixed bottom-0 right-0 p-4 bg-background shadow-lg z-10 rounded-tl-xl flex flex-col items-end">
                <div className="text-sm font-medium mb-2">
                  You are viewing this source as a guest
                </div>
                <button
                  className="text-xs p-3 px-4 rounded-xl bg-accent transition-all bg-opacity-50 hover:bg-opacity-100 font-bold"
                  onClick={copySourceDoc}
                >
                  Copy to your own account
                </button>
              </div>
            )}
        </>
      ) : (
        <div className="flex justify-center items-center h-[80vh]">
          <div className="text-2xl font-medium">
            Oops looks like this source doesn't exist!
          </div>
        </div>
      )}
      <ToastContainer />
      <ShareDialogue
        open={shareDialogueOpen}
        setOpen={setShareDialogueOpen}
        sourceTitle={titleText}
        userName={userDoc ? userDoc.name : "name"}
        userEmail={currentUser ? currentUser.email : "email"}
        sourceID={source}
      />
    </div>
  );
};

export default Source;
