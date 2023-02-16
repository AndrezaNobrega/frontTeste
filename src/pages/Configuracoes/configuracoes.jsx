import React from 'react'

import styles from "./Cores.module.css"
import { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';


const Cores = () => {
    const [mostrar, setMostrar] = useState("Cores");

    const {theme, setTheme}= useContext(ThemeContext)


    return <div className={styles.telaCores}>
           <div className={styles.lateral}>
          <lu>
            <li>
              <a 
              className={(mostrar =="Cores" ? "activePerfil" : '')}
              onClick={() => setMostrar("Cores")}>Cores</a>
            </li>
            <li>
              <a
              className={(mostrar =="Banner" ? "activePerfil" : '')}
              onClick={() => setMostrar("Banner")}>Banners
              </a>
            </li>
            <li>
              <a 
              className={(mostrar =="Descontos" ? "activePerfil" : '')}
              onClick={() => setMostrar("Descontos")}>Descontos</a>
            </li>            
          </lu>
        </div>
            <div className={styles.principal}>

                {mostrar == "Cores" && (
                    <>
                        <h1 className={styles.cores}>Configurações de cor do Ecommerce</h1>
                        <p>O tema atual é: {theme === '' ? 'Blue-theme' : theme}</p>  
                        <p>Escolha a cor de destaque do site:</p>
                        <div className={styles.themeOptions}>
                        <div className={styles.blue} onClick={() => setTheme('')}/> 
                        <div className={styles.green} onClick={() => setTheme('green-theme')}/> 
                        <div className={styles.red} onClick={() => setTheme('red-theme')}/>
                        </div>                   
                    </>
                )}

                {mostrar == "Banner" && (
                    <>
                        <h1 className={styles.cores}>Escolha os banners da loja</h1>                       
                                         
                    </>
                )}

                {mostrar == "Descontos" && (
                    <>
                        <h1 className={styles.cores}>Configure os descontos</h1>
                                         
                    </>
                )} 
        </div>        
    </div>
}

export default Cores