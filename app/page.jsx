"use client";
import Footer from "@/components/Footer";
import AnnotationCard from "@/components/about/AnnotationCard";
import Header from "@/components/about/Header";
import MobileHeader from "@/components/about/MobileHeader";
import AnnotateIcon from "@/components/svg/AnnotateIcon";
import AnnotaterLogo from "@/components/svg/AnnotaterLogo";
import CheckIcon from "@/components/svg/CheckIcon";
import CloseIcon from "@/components/svg/CloseIcon";
import Logo from "@/components/svg/Logo";
import LogoS from "@/components/svg/LogoS";
import LongLogo from "@/components/svg/LongLogo";
import MenuIcon from "@/components/svg/MenuIcon";
import SmallLogo from "@/components/svg/SmallLogo";
import Squig from "@/components/svg/Squig";
import SummerizeIcon from "@/components/svg/SummerizeIcon";
import UnderlineDecoration from "@/components/svg/UnderlineDecoration";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <main className="">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Squig className="w-full h-full absolute -z-10" />
        <section className="max-w-screen-2xl mx-auto mb-64 md:mb-56 lg:mb-20 flex flex-col items-leading px-3 md:px-10 lg:px-16 lg:pb-16 pt-28 md:pt-40 gap-10 lg:gap-20 xl:gap-24">
          <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">
            Elevate Your <br />{" "}
            <span className=" underline text-accent">Understanding</span>
          </div>
          <div className="flex gap-3 lg:gap-6">
            <Link
              href={"/login"}
              className="p-3 leading-tight bg-accent border-2 border-accent px-4 md:px-8 rounded-xl text-white font-bold text-xl lg:text-2xl transition-all hover:shadow-lg hover:scale-105"
            >
              Try for free
            </Link>
            <Link
              href={"/features"}
              className="p-3 leading-tight border-2 border-accent px-4 md:px-8 rounded-xl text-accent font-bold text-xl lg:text-2xl transition-all hover:shadow-lg hover:scale-105"
            >
              Learn more
            </Link>
          </div>
          <AnnotationCard
            type={"setting"}
            content={
              "This passage highlights the main scene of the story and introduces the main character. We learn her name is Elara and that she is curious."
            }
            styles={
              "left-16 md:left-auto md:right-10 xl:right-32 rotate-6 md:rotate-12 scale-110 top-[23rem] md:top-32 xl:top-48"
            }
          />
          <AnnotationCard
            type={"analysis"}
            content={
              "The ESH guidelines specifically advise against using cuffless measurement devices due to concerns about accuracy and the requirement for periodic calibration."
            }
            styles={
              "hidden md:block right-10 lg:right-32 xl:right-80 -rotate-3 scale-105 top-[23rem] lg:top-[20rem] xl:top-[25rem]"
            }
          />
        </section>
        <section className="max-w-screen-2xl mx-auto">
          <div className="text-center font-medium text-xl">
            Trusted by thousands of <span className="font-bold">students</span>{" "}
            and <span className="font-bold">professionals</span> world wide
          </div>
          <div class="hidden lg:grid lg:grid-cols-6 lg:grid-rows-6 gap-4 h-[40rem] p-12">
            <div class="col-span-2 row-span-2 bg-gray-200 rounded-2xl flex p-3 justify-between flex-col items-center">
              <div className="font-medium">Up to</div>
              <div className="text-6xl font-bold bg-gradient-to-r from-accent to-indigo-400 text-transparent bg-clip-text">
                80%
              </div>
              <div className="font-medium">faster reading</div>
            </div>
            <div class="col-span-2 row-span-6 bg-gradient-to-br from-accent to-indigo-300 rounded-2xl flex items-center justify-center">
              <LogoS className="scale-[3]" />
            </div>
            <div class="col-span-2 row-span-3 bg-gray-200 rounded-2xl flex flex-col items-center justify-between p-6 gap-6">
              <div></div>
              <div>
                <div className=" text-5xl leading-tight bg-gradient-to-r from-accent to-indigo-400 text-transparent bg-clip-text text-center font-bold">
                  <span className="font-black">Supercharge</span>
                </div>
                <div className="text-center font-bold text-xl text-gray-800">
                  your learning
                </div>
              </div>
              <div></div>
            </div>
            <div class="col-span-2 row-span-4 bg-gray-200 rounded-2xl flex flex-col items-center justify-between p-6 gap-6">
              <div></div>
              <div>
                <div className=" text-5xl leading-tight bg-gradient-to-r from-accent to-indigo-400 text-transparent bg-clip-text text-center font-bold">
                  <span className="font-black">Organize</span>
                </div>
                <div className="text-center font-bold text-xl text-gray-800">
                  your life
                </div>
              </div>
              <div></div>
            </div>
            <div class="col-span-1 row-span-3 bg-gray-200 rounded-2xl flex p-3 justify-between flex-col items-center py-6">
              <div className="font-medium">Up to</div>
              <div className="text-6xl font-bold bg-gradient-to-r from-accent to-indigo-400 text-transparent bg-clip-text">
                50%
              </div>
              <div className="font-medium text-center">
                better understanding
              </div>
            </div>
            <Link
              href={"/signup"}
              class="col-span-1 row-span-3 bg-gray-200 rounded-2xl flex items-center justify-around transition-all hover:scale-105 hover:shadow-lg"
            >
              <div>
                <div className=" text-3xl leading-tight bg-gradient-to-r from-accent to-indigo-400 text-transparent bg-clip-text text-center font-bold">
                  <span className="font-black">Get</span>
                </div>
                <div className=" text-4xl leading-tight bg-gradient-to-r from-accent to-indigo-400 text-transparent bg-clip-text text-center font-bold">
                  <span className="font-black">Started</span>
                </div>
                <div className=" text-4xl leading-tight bg-gradient-to-r from-accent to-indigo-400 text-transparent bg-clip-text text-center font-bold">
                  <span className="font-black">👉</span>
                </div>
              </div>
            </Link>
          </div>
          <div class="grid lg:hidden grid-cols-2 md:grid-cols-4 md:grid-rows-6 gap-4 h-[40rem] p-3 md:p-12">
            <div class="col-span-2 row-span-2 bg-gray-200 rounded-2xl flex flex-col items-center justify-between p-3 gap-1">
              <div></div>
              <div>
                <div className=" text-4xl leading-tight bg-gradient-to-r from-accent to-indigo-400 text-transparent bg-clip-text text-center font-bold">
                  <span className="font-black">Supercharge</span>
                </div>
                <div className="text-center font-bold text-lg text-gray-800">
                  your learning
                </div>
              </div>
              <div></div>
            </div>
            <div class="col-span-2 row-span-6 bg-gradient-to-br from-accent to-indigo-300 rounded-2xl flex items-center justify-center">
              <LogoS className="md:scale-[3]" />
            </div>
            <div class="col-span-2 row-span-3 bg-gray-200 rounded-2xl flex p-3 justify-between flex-col items-center">
              <div className="font-medium">Up to</div>
              <div className="text-6xl font-bold bg-gradient-to-r from-accent to-indigo-400 text-transparent bg-clip-text">
                80%
              </div>
              <div className="font-medium">faster reading</div>
            </div>
            <div class="col-span-2 row-span-4 bg-gray-200 rounded-2xl flex flex-col items-center justify-between p-6 gap-6">
              <div></div>
              <div>
                <div className=" text-5xl leading-tight bg-gradient-to-r from-accent to-indigo-400 text-transparent bg-clip-text text-center font-bold">
                  <span className="font-black">Organize</span>
                </div>
                <div className="text-center font-bold text-xl text-gray-800">
                  your life
                </div>
              </div>
              <div></div>
            </div>
            <div class="col-span-1 row-span-3 bg-gray-200 rounded-2xl flex p-3 justify-between flex-col items-center py-6">
              <div className="font-medium">Up to</div>
              <div className="text-6xl font-bold bg-gradient-to-r from-accent to-indigo-400 text-transparent bg-clip-text">
                50%
              </div>
              <div className="font-medium text-center">
                better understanding
              </div>
            </div>
            <Link
              href={"/signup"}
              class="col-span-1 row-span-3 bg-gray-200 rounded-2xl flex items-center justify-around transition-all hover:scale-105 hover:shadow-lg"
            >
              <div>
                <div className=" text-3xl leading-tight bg-gradient-to-r from-accent to-indigo-400 text-transparent bg-clip-text text-center font-bold">
                  <span className="font-black">Get</span>
                </div>
                <div className=" text-4xl leading-tight bg-gradient-to-r from-accent to-indigo-400 text-transparent bg-clip-text text-center font-bold">
                  <span className="font-black">Started</span>
                </div>
                <div className=" text-4xl leading-tight bg-gradient-to-r from-accent to-indigo-400 text-transparent bg-clip-text text-center font-bold">
                  <span className="font-black">👉</span>
                </div>
              </div>
            </Link>
          </div>
        </section>
        <section className="mt-40 md:mt-10 max-w-screen-xl mx-auto">
          <h2 className="text-center font-bold text-xl md:text-2xl mb-10 md:mb-0">
            Everything you need to boost your productivity
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
        <section className="mt-20 max-w-screen-xl mx-auto">
          <h1 className="text-3xl text-center font-medium mb-16">
            Get started now
          </h1>
          <div className="grid grid-cols-1 px-10 sm:px-40 md:px-60 lg:px-0 xl:px-20 lg:grid-cols-3 w-full gap-10">
            <div className="bg-gray-200 h-full blur-md rounded-xl "></div>
            <div className="bg-accent h-full scale-110 rounded-xl shadow-lg p-10">
              <div className="font-semibold text-xl">Free</div>
              <div className="text-[10px] opacity-80">
                *There will always be a free version of this app
              </div>
              <Link href={"/signup"}>
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
}
