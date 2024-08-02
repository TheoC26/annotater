import React from "react";
import LongLogo from "../svg/LongLogo";
import Link from "next/link";
import CloseIcon from "../svg/CloseIcon";
import MenuIcon from "../svg/MenuIcon";

const Header = ({ menuOpen, setMenuOpen }) => {
  return (
    <header className="flex justify-between font-bold p-3 px-2 pr-5 md:px-5 text-base items-center fixed top-0 w-full bg-gradient-to-b from-white to-transparent z-20">
      <div className="hidden md:flex items-center gap-12">
        <Link href={"/"} className=" mt-1">
          <LongLogo className="mb-1 ml-1 md:ml-3" />
        </Link>
        <Link href={"/features"} className=" mt-1">
          Features
        </Link>
        <Link href={"/pricing"} className=" mt-1">
          Pricing
        </Link>
        <Link href={"/about"} className=" mt-1">
          About
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-6 lg:gap-12">
        <Link href={"/login"} className=" mt-1">
          Login
        </Link>
        <Link
          href={"/signup"}
          className=" mt-1 p-3 px-4 text-white bg-accent rounded-xl"
        >
          Try for free
        </Link>
      </div>
      <Link href={"/"} className="md:hidden mt-1">
        <LongLogo className="mb-1 ml-3" />
      </Link>
      <button
        className={`md:hidden ${!menuOpen && "scale-110"}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
    </header>
  );
};

export default Header;
