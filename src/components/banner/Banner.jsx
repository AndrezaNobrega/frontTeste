import React from 'react'
import { useState, useEffect } from 'react';

import styles from "./Banner.module.css";


/* isActive={currentSlide === i} */



const Banner = (
    {autoPlay = true,
    autoPlayTime = 3000}) => {


    const image1 = 'https://www.kabum.com.br/core/_next/image?url=https://themes.kabum.com.br/conteudo/layout/3125/banner_img.jpg&w=1920&h=400&q=100'
    const image2 = 'https://www.kabum.com.br/core/_next/image?url=https://themes.kabum.com.br/conteudo/layout/2839/banner_img.jpg&w=1920&h=400&q=100'
    const image3 = 'https://www.kabum.com.br/core/_next/image?url=https://themes.kabum.com.br/conteudo/layout/3061/banner_img.jpg&w=1920&h=400&q=100'
    const image4 = 'https://www.kabum.com.br/core/_next/image?url=https://themes.kabum.com.br/conteudo/layout/2839/banner_img.jpg&w=1920&h=400&q=100'

    const images = [image1, image2, image3, image4]
    const [currentSlide, setCurrentSlide] = useState(0)
    const amountSlides = images.length

    
   

    useEffect(() => {

        const timer = setTimeout(() => {
            //p n ultrapassar o tamanho da lista de imagens
            const newSlideIndex = currentSlide >= images.length - 1 ? 0 : currentSlide + 1
            setCurrentSlide(newSlideIndex)
        }, autoPlayTime)

        return () => clearTimeout()

    }, [currentSlide])   
    
    
    
    return (

        <div className={styles.wrapper}>
            
            {images.map((imageurl, index)=> 
                <div key={index} 
                className={styles.slide} 
                style={{backgroundImage: `url(${imageurl})`,
                marginLeft: index === 0 ? `-${currentSlide * 100}%` : undefined}}>
                </div>
            )}


            <div className={styles.indicador}>
                {Array(amountSlides).
                fill(1).
                map((_,i) => (
                    <div key={i} 
                    onClick={() => setCurrentSlide(i)}
                    className={(currentSlide === i ? styles.isActive : styles.dot)}/>
                ))}
            </div>
           

        </div>
    )
}

export default Banner