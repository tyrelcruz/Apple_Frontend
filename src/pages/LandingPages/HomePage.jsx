import React from "react";
import appleVideo from "../../assets/videos/applevids.webm";
import "../../styles/HomePage.css";
import Footer from "../../components/Footer";

const HomePage = () => {
  return (
    <main>
      <div className="homepage">
        <video
          className="apple-video"
          src={appleVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <div style={{ marginTop: "auto" }}>
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;
