import React from "react";
import "../Styles/Home.css";
import Shipping from "../assets/images/Freeshipping-pana.svg";
import Header from "../Components/Header";
export default function Home() {
  return (
    <div className="landing-page">
      <div className="container">
       <Header/>
        <div className="info">
          <h1>Looking For Shipping</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            odit nihil ullam nesciunt quidem iste, Repellendus odit nihil
          </p>
          <button>Read More</button>
        </div>
        <div className="image">
          <img src={Shipping} alt="Pixel Free Shipping"/>
        </div>
      </div>
    </div>
  );
}
