import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./Banner.module.css";

const Banner = ({  autoPlay = true,  autoPlayTime = 3000 }) => {
  const [images, setImages] = useState([]);
  const url = "http://localhost:3001/banners";

  const [currentSlide, setCurrentSlide] = useState(0);
  const amountSlides = images.length;

  useEffect(() => {
    async function carregaDados() {
      await axios
        .get(url)
        .then((response) => setImages(response.data));
    }

    carregaDados();

    const timer = setTimeout(() => {
      //p n ultrapassar o tamanho da lista de imagens
      const newSlideIndex =
        currentSlide >= images.length - 1 ? 0 : currentSlide + 1;
      setCurrentSlide(newSlideIndex);
    }, autoPlayTime);
    
    return () => clearTimeout(timer);

  }, [currentSlide, autoPlayTime]);

  return (
    <div className={styles.wrapper}>
      {images.map((image, index) => (
        <div
          key={image.id}
          className={styles.slide}
          style={{
            backgroundImage: `url(${image.image})`,
            marginLeft: index === 0 ? `-${currentSlide * 100}%` : undefined,
          }}
        ></div>
      ))}

      <div className={styles.indicador}>
        {Array(amountSlides)
          .fill(1)
          .map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={currentSlide === i ? styles.isActive : styles.dot}
            />
          ))}
      </div>
    </div>
  );
};

export default Banner;
