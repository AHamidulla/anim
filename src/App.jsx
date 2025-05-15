import { useState, useEffect, useRef } from "react";
import "./App.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";
import Body from "./compomemts/Body/Body";
import Box from "./compomemts/Box/Box";
import Part from "./compomemts/Part/Part";
import Gallery from "./compomemts/Gallery/Gallery";
import Contact from "./compomemts/Contact/Contact";

function App() {
  const navRef = useRef(null);
  const hoverSoundRef = useRef(null);
  const backgroundMusicRef = useRef(null);
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    hoverSoundRef.current = new Audio("/tap2.mp3");
    hoverSoundRef.current.volume = 0.5;

    backgroundMusicRef.current = new Audio("/fon.mp3");
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = 0.5;

    const enableAudio = () => {
      setAudioEnabled(true);
      document.removeEventListener("click", enableAudio);
      backgroundMusicRef.current.play().catch((err) => {
        console.error("Audio Error:", err);
      });
      setIsPlaying(true);
    };

    document.addEventListener("click", enableAudio);

    return () => {
      hoverSoundRef.current = null;
      backgroundMusicRef.current = null;
      document.removeEventListener("click", enableAudio);
    };
  }, []);

  const handleNavClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const toggleBackgroundMusic = () => {
    if (isPlaying) {
      backgroundMusicRef.current.pause();
    } else {
      backgroundMusicRef.current
        .play()
        .catch((err) => console.error("Audio Error:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleHoverSound = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current
        .play()
        .catch((err) => console.error("Audio Error:", err));
    }
  };

  return (
    <>
      <div className="header">
        <div className="header__wrapper">
          <div className="top1">
            <img src="./image/Log.png" alt="Logo" />
            <div className="bbt">
              <a
                href="#"
                className="btn-flip"
                data-back="Anime"
                data-front="Anime"
              ></a>
              <a
                href="#"
                className="btn-flip"
                data-back="Manga"
                data-front="Manga"
              ></a>
            </div>
          </div>
          <div className="top-2">
            <ul ref={navRef}>
              {["SOLO", "WRAP", "ANIM", "ABOUT", "CONTACT"].map(
                (item, index) => (
                  <li
                    key={index}
                    onClick={() => handleNavClick(index)}
                    onMouseEnter={handleHoverSound} // Добавлен звук при наведении
                  >
                    {item}
                  </li>
                )
              )}
              <div className="animation start-home"></div>
            </ul>
            <button
              className="btn-flip"
              data-back="Pause Music"
              data-front="Play Music"
              onClick={toggleBackgroundMusic}
            >
              <span className="hidden-text">
                {isPlaying ? "Pause Music" : "Play Music"}
              </span>
            </button>
          </div>
        </div>
      </div>

      <Swiper
        ref={swiperRef}
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        speed={2000}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
      >
        <SwiperSlide>
          <Body />
        </SwiperSlide>
        <SwiperSlide>
          <Box />
        </SwiperSlide>
        <SwiperSlide>
          <Part />
        </SwiperSlide>
        <SwiperSlide>
          <Gallery />
        </SwiperSlide>
        <SwiperSlide>
          <Contact />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default App;
