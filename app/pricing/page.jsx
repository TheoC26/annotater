"use client";
import Footer from "@/components/Footer";
import Header from "@/components/about/Header";
import MobileHeader from "@/components/about/MobileHeader";
import CheckIcon from "@/components/svg/CheckIcon";
import Link from "next/link";
import React, { useState } from "react";

const Pricing = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <main>
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <section className="mt-32 max-w-screen-xl mx-auto">
          <h1 className="text-3xl text-center font-semibold mb-3 md:mb-16">Pricing</h1>
          <div className="grid grid-cols-1 px-10 sm:px-40 md:px-60 lg:px-0 xl:px-20 lg:grid-cols-3 w-full gap-10">
            <div className="bg-gray-200 h-full blur-md rounded-xl "></div>
            <div className="bg-accent h-full scale-110 rounded-xl shadow-lg p-10">
              <div className="font-semibold text-xl">Free</div>
              <div className="text-[10px] opacity-80">
                *There will always be a free version of this app
              </div>
              <Link href={"/login"}>
                <button className="p-2 px-6 rounded-xl bg-white text-sm font-semibold my-5 mx-auto">
                  Get started
                </button>
              </Link>
              <div className="h-0.5 rounded-full w-full bg-white"></div>
              <div className="text-[10px] mt-5 mb-2 opacity-80 font-semibold">
                Unlimited
              </div>
              <ul className="text-xs mb-2">
                <li className="flex gap-2 mb-1">
                  <div className="w-[12px] h-[12px]">
                    <CheckIcon className="" />
                  </div>
                  <div className=" flex-shrink">
                    Detailed annotated sources including highlights and
                    descriptions
                  </div>
                </li>
                <li className="flex gap-2 mb-1">
                  <CheckIcon className="h-[12px] w-[12px]" />
                  <div>Concise summaries</div>
                </li>
                <li className="flex gap-2 mb-1">
                  <CheckIcon />
                  <div>Succinct notes</div>
                </li>
                <li className="flex gap-2 mb-1">
                  <CheckIcon />
                  <div>Share to friends</div>
                </li>
                <li className="flex gap-2 mb-1">
                  <CheckIcon />
                  <div>Storage to store and search sources</div>
                </li>
                <li className="flex gap-2 mb-1">
                  <CheckIcon />
                  <div>Collections to easily organize your sources</div>
                </li>
                <li className="flex gap-2 mb-1">
                  <CheckIcon />
                  <div>PDF annotations (PDF OCR)</div>
                </li>
                <li className="flex gap-2 mb-1">
                  <CheckIcon />
                  <div>Up to 20,000 character count</div>
                </li>
              </ul>
            </div>
            <div className="bg-gray-200 h-full blur-md rounded-xl "></div>
          </div>
        </section>
        <Footer />
      </main>
      <MobileHeader menuOpen={menuOpen} />
    </>
  );
};

export default Pricing;
