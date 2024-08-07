"use client";
import FAQs from "@/components/FAQs";
import Footer from "@/components/Footer";
import Header from "@/components/about/Header";
import MobileHeader from "@/components/about/MobileHeader";
import AnnotateIcon from "@/components/svg/AnnotateIcon";
import SummerizeIcon from "@/components/svg/SummerizeIcon";
import UnderlineDecoration from "@/components/svg/UnderlineDecoration";
import Image from "next/image";
import React, { useState } from "react";

const faqs = [
  {
    question: "What features does Notator offer?",
    answer:
      "Notator offers a range of features including:\n\n- Annotating: Highlight and add notes to your sources as if you were doing it manually.\n- Summarizing: Quickly generate summaries of long texts.\n- Note-Taking: Keep detailed notes on various readings and materials.\n- Analyzing: Dive deep into your content with analysis tools.\n- Sharing: Share your annotated sources with others.\n- Storing and Organizing: Save and organize your sources in a structured manner.",
  },
  {
    question: "Can Notator be used for different types of sources?",
    answer:
      "Yes, Notator is versatile and can be used for annotating school readings such as history or English texts, work guidelines, tedious articles, and virtually any other type of source.",
  },
  {
    question: "How do I share my annotated sources with others?",
    answer:
      "You can easily share your sources through Notator's sharing feature. Remember, all shared sources are anonymized to protect your privacy.",
  },
  {
    question: "What types of annotations can I make with Notator?",
    answer:
      "You can highlight, add notes, and make detailed annotations that mimic human-like annotations, making it easier to engage with the material.",
  },
  {
    question: "Is my data on Notator secure?",
    answer:
      "Absolutely. While shared sources are public and anonymized, all sensitive content remains private and is stored securely on your device.",
  },
];


const Features = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <main>
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <section className="mt-20 sm:mt-40 md:mt-10 max-w-screen-xl mx-auto">
          <h2 className="text-center font-bold text-xl md:mt-32 md:text-2xl mb-10 md:mb-0">
            All the features you need to boost your productivity
          </h2>
          <UnderlineDecoration className="mx-auto hidden md:block scale-75 -mt-2 mb-10 lg:mb-0" />
          <div className="flex flex-col md:flex-row items-center mx-6 md:mx-20 md:ml-28">
            <div>
              <AnnotateIcon />
              <h3 className="text-3xl lg:text-5xl font-bold my-3 lg:my-6">
                Annotate
              </h3>
              <p className="text-sm lg:text-base w-4/5 mb-6">
                Annotate your sources with ease with our unique approach to
                learning allowing you to gain deep understanding from the exact
                words on the page.
              </p>
            </div>
            <div className="w-full">
              <Image
                src="/AnnotateImage.png"
                width={1000}
                height={1000}
                className="w-full h-auto scale-110"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row items-center mx-6 md:mx-20 md:mr-28">
            <div className="w-full">
              <Image
                src="/SummerizeNoteAnalyzeImage.png"
                width={1000}
                height={1000}
                className="w-full h-auto scale-110"
              />
            </div>
            <div className="flex-col flex md:items-end">
              <SummerizeIcon />
              <h3 className="text-3xl lg:text-5xl font-bold my-3 lg:my-6 md:text-right">
                Summarize
                <br />
                Take notes
                <br />
                Analyze
              </h3>
              <p className="text-sm lg:text-base w-4/5 mb-6 md:text-right">
                Save time reading and gain a deaper understanding of what you
                read with the power of Notator.
              </p>
            </div>
          </div>
        </section>
        <section>
            <FAQs faqs={faqs} />
        </section>
        <Footer />
      </main>
      <MobileHeader menuOpen={menuOpen} />
    </>
  );
};

export default Features;
