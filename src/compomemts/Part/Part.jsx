import React, { useEffect, useRef, useState } from 'react';
import './Part.css';

const Part = () => {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // Запускаем, когда 50% элемента видно
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <div className="part">
      <div className="container">
        <div className="part__wrapper">
          <div className="lis">
            <div className="ite"><img src="./h1.png" alt="f" /></div>
            <div className="ite"><img src="./h2.jpg" alt="f" /></div>
            <div className="ite"><img src="./h3.jpg" alt="f" /></div>
            <div className="ite"><img src="./h4.jpg" alt="f" /></div>
            <div className="ite"><img src="./h5.jpg" alt="f" /></div>
            <div className="ite"><img src="./h6.jpg" alt="f" /></div>
            <div className="ite"><img src="./h7.jpg" alt="f" /></div>
            <div className="ite"><img src="./h8.jpg" alt="f" /></div>
            <div className="ite"><img src="./h9.jpg" alt="f" /></div>
            <div className="ite"><img src="./h10.jpg" alt="f" /></div>
          </div>

          <p ref={textRef} className={`anip ${isVisible ? 'active' : ''}`}>
            Hover to puctures
          </p>

        </div>
      </div>
    </div>
  );
};

export default Part;
