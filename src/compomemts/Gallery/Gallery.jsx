import React, { useRef, useState } from "react";
import "./Gallery.css";

const VideoItem = ({ src, onClick, isActive }) => {
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="video-container" onMouseEnter={handlePlay} onMouseLeave={handlePause} onClick={onClick}>
      <div className="video-overlay"></div>
      <video
        className={`viii ${isActive ? "active" : ""}`}
        ref={videoRef}
        width="300"
        loop
        muted
        style={{ cursor: "pointer", borderRadius: "10px", zIndex: isActive ? 20 : 1 }}
      >
        <source src={src} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
    </div>
  );
};

const Gallery = () => {
  const videos = [
    { src: "./Video/vii1.mp4", title: "Solo Leveling", text: "Igris, the Blood-Red Commander, is a high-ranking knight with exceptional swordsmanship and loyalty, holding the position of marshal that rivals Beru but overshadowed by Bellion. He kneels before his master after battles. Igris dislikes Iron's foolish behavior in battle. Despite being a battle lover, Igris values education and argues with Bellion about Suho's schooling.", className: "text-1" },
    { src: "./Video/vii2.mp4", title: "Solo Leveling", text: "Beru is an ant shadow that has been extracted from the Ant King, a powerful S-Rank beast that overpowered all S-Rank hunters with ease, which killed Goto Ryuji, and incapacitated Cha Hae-In, until Jinwoo managed to kill it. Beru is one of the most powerful shadows holding the position of General, which later he became Marshal that rivals Igris but overshadowed by Bellion. He also has a very fond streak for Jinwoo's son, Suho.", className: "text-2" },
    { src: "./Video/vii3.mp4", title: "Solo Leveling", text: "A high orc shaman shadow, previously known as Kargalgan, he is the boss an A-rank dungeon, as he nearly the defeated the Hunter Guild's strike team, he is also the first one to realized that Jinwoo was a Monarch. As an Elite Knight Grade shadow, his power is the same level of an S-Rank hunter.", className: "text-3" },
    { src: "./Video/vii4.mp4", title: "Solo Leveling", text: "Iron was the shadow of Kim Chul. During Jinwoo's fight with Baruka, a crazed Kim Chul attempted to kill Jinwoo only to be killed himself by Igris. Knowing that he would have a hard time defeating Baruka only with Igris' help, Jinwoo quickly extracted Kim Chul's shadow from his corpse and named him Iron. He is known for being an idiotic and dunced shadow, even copying Igris' habit of bringing a head to Jinwoo, much to the knight's annoyance.", className: "text-4" }
  ];
  
  const [activeVideo, setActiveVideo] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [overlayText, setOverlayText] = useState("");
  const [overlayTitle, setOverlayTitle] = useState("");
  const [overlayClass, setOverlayClass] = useState("");

  const handleVideoClick = (src, title, text, className) => {
    if (activeVideo === src) {
      setIsOverlayVisible(false);
      setTimeout(() => setActiveVideo(null), 500);
    } else {
      setActiveVideo(src);
      setOverlayTitle(title);
      setOverlayText(text);
      setIsOverlayVisible(true);
      setOverlayClass(className || "");
    }
  };

  return (
    <div className="gallery">
      <div className={`overlay ${isOverlayVisible ? "visible" : ""} ${overlayClass}`} style={{ zIndex: 15 }}>
        <div className="overlay-content">
          <h1>{overlayTitle}</h1>
          <p>{overlayText}</p>
        </div>
      </div>
      
      {videos.map((video, index) => (
        <VideoItem
          key={index}
          src={video.src}
          onClick={() => handleVideoClick(video.src, video.title, video.text, video.className)}
          isActive={activeVideo === video.src}
        />
      ))}
    </div>
  );
};

export default Gallery;
