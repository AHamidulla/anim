import React from "react";
import "./Body.css";

const Body = () => {
  return (
    <>
      <div className="video-bg relative w-full h-screen overflow-hidden vd">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="./vid/solo.mp4"
        type="video/mp4"
        autoPlay
        loop
        muted
      ></video>
      


      <div className="video-bg__content absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white text-center">
      
        <div className="focus relative inline-block">
          <div className="focus--mask bg-black bg-opacity-50 p-4 rounded-lg">
            <div className="focus--mask-inner text-4xl font-bold">Anime</div>
          </div>
        </div>
        <p className="mt-4 text-lg">Web-sayt create by A.Hamidulla.</p>
      </div>
    </div>
    </>
  );
};

export default Body;
