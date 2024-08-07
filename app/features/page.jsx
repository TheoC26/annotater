"use client";
import Footer from "@/components/Footer";
import Header from "@/components/about/Header";
import MobileHeader from "@/components/about/MobileHeader";
import AnnotateIcon from "@/components/svg/AnnotateIcon";
import SummerizeIcon from "@/components/svg/SummerizeIcon";
import UnderlineDecoration from "@/components/svg/UnderlineDecoration";
import Image from "next/image";
import React, { useState } from "react";

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
        <Footer />
      </main>
      <MobileHeader menuOpen={menuOpen} />
    </>
  );
};

export default Features;
