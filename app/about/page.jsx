"use client";
import FAQs from "@/components/FAQs";
import Footer from "@/components/Footer";
import Header from "@/components/about/Header";
import MobileHeader from "@/components/about/MobileHeader";
import React, { useState } from "react";


const faqs = [
  {
    question: "What is Notator?",
    answer:
      "Notator is a versatile SaaS application designed for students, educators, and avid readers. It offers unique tools for annotating, summarizing, note-taking, and analyzing various types of sources, all stored in a secure, organized manner similar to Google Drive.",
  },
  {
    question: "Who can benefit from using Notator?",
    answer:
      "Notator is ideal for students, education professionals, and anyone who frequently reads and needs to annotate or summarize content. Whether you're tackling school readings, work guidelines, or detailed articles, Notator simplifies the process.",
  },
  {
    question: "What makes Notator unique?",
    answer:
      "Notator stands out with its special highlighting and annotation features that mimic human-like annotations. This makes it easier to comprehend and engage with the material, setting it apart from other platforms.",
  },
  {
    question: "How secure is my data on Notator?",
    answer:
      "Your privacy is our priority. All sensitive content is stored privately on your device. Shared sources are anonymized and public, ensuring your personal information remains secure.",
  },
  {
    question: "Is there a mobile version of Notator?",
    answer:
      "Yes, Notator is completely mobile responsive, allowing you to use it seamlessly on both desktop and mobile devices.",
  },
];


const About = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <main>
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <section>
            <FAQs faqs={faqs} />
        </section>
        <Footer />
      </main>
      <MobileHeader menuOpen={menuOpen} />
    </>
  );
};

export default About;
