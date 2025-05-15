import React, { useState, useRef, useEffect } from "react";
import "./Box.css";

const data = [
  {
    img: "image/img7.jpg",
    title: "Solo leveling",
    topic: "ANIME",
  },
  {
    img: "image/img2.jpg",
    title: "Solo leveling",
    topic: "ANIME",
  },
  {
    img: "image/img3.jpg",
    title: "Solo leveling",
    topic: "ANIME",
  },
  {

    img: "image/img6.jpg",
    title: "Solo leveling",
    topic: "ANIME",
  },
];

const Box = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const carouselRef = useRef(null);
  const timeoutRef = useRef(null);
  const timeRunning = 3000;

  const showSlider = (type) => {
    if (expanded) return;
    const carouselDom = carouselRef.current;
    const sliderDom = carouselDom.querySelector(".list");
    const sliderItemsDom = sliderDom.querySelectorAll(".item");
    const thumbnailBorderDom = carouselDom.querySelector(".thumbnail");
    const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");

    if (type === "next") {
      sliderDom.appendChild(sliderItemsDom[0]);
      thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
      carouselDom.classList.add("next");
    } else {
      sliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
      thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
      carouselDom.classList.add("prev");
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      carouselDom.classList.remove("next");
      carouselDom.classList.remove("prev");
    }, 500);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      showSlider("next");
    }, timeRunning);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  return (
    <div className={`carousel ${expanded ? "expanded" : ""}`} ref={carouselRef}>
      <div className="list">
        {data.map((item, index) => (
          <div className="item" key={index}>
            <img src={item.img} alt={item.title} />
            <div className="content">
              <div className="title">{item.title}</div>
              <div className="topic">{item.topic}</div>
              <div className="new-text">{expanded && "In a world where hunters — human warriors who possess supernatural abilities — must battle deadly monsters to protect mankind from certain annihilation, a notoriously weak hunter named Sung Jin-woo finds himself in a seemingly endless struggle for survival. One day, after narrowly surviving an overwhelmingly powerful double dungeon that nearly wipes out his entire party, a mysterious program called the System chooses him as its sole player and in turn, gives him the unique ability to level up in strength. This is something no other hunter is able to do, as a hunter's abilities are set once they awaken. Jinwoo then sets out on a journey as he fights against all kinds of enemies, both man and monster, to discover the secrets of the dungeons and the true source of his powers. He soon discovers that he has been chosen to inherit the position of Shadow Monarch, essentially turning him into an immortal necromancer who has absolute rule over the dead. He is the only Monarch who fights to save humanity, as the other Monarchs are all trying to kill him and wipe out the humans."}</div>
              <div className="buttons">
                <button onClick={() => setExpanded(true)}>SEE MORE</button>
                <button onClick={() => setExpanded(false)}>REMAIN</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="thumbnail">
        {data.map((item, index) => (
          <div className="item" key={index} onClick={() => setCurrentIndex(index)}>
            <img src={item.img} alt="Thumbnail" />
          </div>
        ))}
      </div>

      <div className="arrows">
        <button onClick={() => showSlider("prev")}>&lt;</button>
        <button onClick={() => showSlider("next")}>&gt;</button>
      </div>
    </div>
  );
};

export default Box;
