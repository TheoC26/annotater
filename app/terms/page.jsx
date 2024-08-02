"use client"
import Footer from '@/components/Footer';
import Header from '@/components/about/Header';
import React, { useState } from 'react'

const Terms = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <main>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <section className="m-10 lg:m-32">
        <b>Introduction</b> This document outlines the terms and conditions that
        apply to the use of the AI Powered annotater and summarizer, a tool
        provided by Notator. By accessing or using the Annotater and
        Summarizer, you agree to be bound by these terms and conditions. <br />
        <br />
        <b>Service Description</b> The annotater and summarizer is designed to
        assist students in reading and understanding their readings faster and
        better. It uses advanced algorithms and artificial intelligence
        technology to summarize and annotate content from various sources.{" "}
        <br /> <br />
        <b>User Responsibility</b> You are solely responsible for all activities
        that occur under your account, including the use of the annotater and
        summarizer. You agree to comply with all applicable laws and regulations
        in using the service. <br /> <br />
        <b>User Content</b> The annotater and summarizer may allow you to upload
        or provide content to the service. You retain all rights to any such
        content and are solely responsible for it. By uploading or providing
        content, you grant Notator a non-exclusive, worldwide,
        royalty-free, perpetual license to use, copy, modify, and distribute
        such content in connection with the annotater and summarizer. <br />{" "}
        <br />
        <b>Disclaimer of Warranty</b> The annotater and summarizer is provided
        on an "as is" basis, without warranty of any kind, express or implied,
        including but not limited to the implied warranties of merchantability,
        fitness for a particular purpose, and non-infringement. Notator
        does not guarantee that the service will be uninterrupted or error-free,
        and will not be liable for any errors or omissions in the service or for
        any loss or damage of any kind incurred as a result of your use of the
        service. <br /> <br />
        <b>Limitation of Liability</b> You agree to indemnify and hold
        Notator, its officers, directors, employees, agents, and
        affiliates harmless from any claim, demand, or damage, including
        reasonable attorneys' fees, arising from or related to your use of the
        annotater and summarizer. In no event shall Notator be liable for
        any damages, including, but not limited to, direct, indirect,
        incidental, special, or consequential damages, arising from or related
        to your use of the annotater and summarizer, even if Notator has
        been advised of the possibility of such damages. <br /> <br />
        <b>Termination</b> Notator reserves the right to terminate your
        access to the annotater and summarizer at any time without notice and
        for any reason. <br /> <br />
        <b>Governing Law</b> These terms and conditions shall be governed by and
        construed in accordance with the laws of the State of Delaware, without
        giving effect to any principles of conflicts of law. <br /> <br />
        <b>Entire Agreement</b> These terms and conditions constitute the entire
        agreement between you and Notator with respect to the use of the
        annotater and summarizer, and supersedes all prior or contemporaneous
        communications, negotiations, and agreements between you and
        Notator. By accessing or using the annotater and sumizer, you
        acknowledge that you have read, understood, and agree to be bound by
        these terms and conditions. If you do not agree to these terms and
        conditions, you should not use the annotater and summarizer. <br />{" "}
        <br />
        <b>Modification of Terms</b> Notator reserves the right to modify
        these terms and conditions at any time without prior notice. Your
        continued use of the annotater and summarizer after any such
        modification constitutes your agreement to be bound by the modified
        terms and conditions.
        <b>Contact Information</b> If you have any questions regarding these
        terms and conditions, please contact Notator at
        notator.app@gmail.com. <br /> <br />
        Last updated Jun 27, 2024.
      </section>
      <Footer />
    </main>
  );
}

export default Terms