"use client"
import Header from '@/components/about/Header';
import MobileHeader from '@/components/about/mobileHeader';
import React, { useState } from 'react'

const About = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <main>
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </main>
      <MobileHeader menuOpen={menuOpen} />
    </>
  );
}

export default About