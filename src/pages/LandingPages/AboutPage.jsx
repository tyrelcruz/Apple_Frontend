import React from "react";
import "../../styles/AboutPage.css";
import appleBanner from "../../assets/logos/applelong.jpg";
import Footer from "../../components/Footer";
const AboutPage = () => {
  return (
    <main>
      <div className="glass-container">
        <img
          src={appleBanner}
          alt="Apple Banner"
          className="article-hero-image"
        />

        <h1 className="glass-title">About Apple</h1>
        <p className="glass-text">
          Apple Inc. is a global technology company renowned for designing
          innovative hardware, software, and services. From the iconic iPhone
          and Mac to cutting-edge software like iOS and macOS, Apple is
          committed to pushing the boundaries of technology while keeping
          simplicity, security, and beauty at the core of everything.
        </p>
        <p className="glass-text">
          Founded in 1976, Apple revolutionized personal computing and has since
          grown into a lifestyle brand. The company focuses heavily on ecosystem
          integration, customer experience, and elegant design — values that
          continue to define modern computing and communication.
        </p>
      </div>
      <Footer />
    </main>
  );
};

export default AboutPage;
