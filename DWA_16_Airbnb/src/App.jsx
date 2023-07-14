/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Card from "./Components/Card";
import data from "./Data";
import katieZaferesImg from "../src/assets/katieZaferes.png";
import weddingPhotographyImg from "../src/assets/weddingPhotography.png";
import mountainBikeImg from "../src/assets/mountainBike.png";
import starImage from "../src/assets/star.png";

export default function App() {
  const cards = data.map((item) => {
    let coverImg;
    if (item.id === 1) {
      coverImg = katieZaferesImg;
    } else if (item.id === 2) {
      coverImg = weddingPhotographyImg;
    } else if (item.id === 3) {
      coverImg = mountainBikeImg;
    }

    return (
      <Card
        key={item.id}
        item={item}
        />
    );
  });

  return (
    <div>
      <Navbar />
      <Hero />
      <section className="cards-list">{cards}</section>
    </div>
  );
}
