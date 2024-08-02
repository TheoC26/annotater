import Link from 'next/link';
import React from 'react'

const MobileHeader = ({menuOpen}) => {
  return (
    <div
      className={`fixed w-full h-full bg-white flex flex-col justify-between pt-20 p-10 bottom-0 transition-all ${
        menuOpen ? "top-0" : "top-full"
      }`}
    >
      <div className="h-0.5 w-full bg-gray-200 -mt-3"></div>
      <div className="flex flex-col gap-3 text-lg font-medium">
        <Link href={"/features"} className=" mt-1">
          Features
        </Link>
        <div className="h-0.5 w-full bg-gray-200"></div>
        <Link href={"/pricing"} className=" mt-1">
          Pricing
        </Link>
        <div className="h-0.5 w-full bg-gray-200"></div>
        <Link href={"/about"} className=" mt-1">
          About
        </Link>
      </div>
      <div></div>
      <div className="flex justify-around items-center gap-6 font-bold -mx-10">
        <Link
          href={"/login"}
          className=" mt-1 p-3 px-6 border border-gray-300 rounded-xl"
        >
          Login
        </Link>
        <Link
          href={"/signup"}
          className=" mt-1 p-3 px-6 text-white bg-accent rounded-xl"
        >
          Try for free
        </Link>
      </div>
    </div>
  );
}

export default MobileHeader