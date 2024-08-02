"use client";
import Footer from "@/components/Footer";
import Header from "@/components/about/Header";
import MobileHeader from "@/components/about/mobileHeader";
import React, { useState } from "react";

const Pricing = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <main>
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <h1>Pricing</h1>
        <Footer />
      </main>
      <MobileHeader menuOpen={menuOpen} />
    </>
  );
};

export default Pricing;
