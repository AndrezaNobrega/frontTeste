import React from 'react'

import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Cores = () => {

    const {theme, setTheme}= useContext(ThemeContext)


    return <div>
        <h1>Cores</h1>
        <h1>O tema atual é: {theme}</h1>  
        <button onClick={() => setTheme('yellow-theme')}>yellow</button>    
        <button onClick={() => setTheme('red-theme')}>red</button>    
        <button className="btn btn-outline">Teste</button>
        <button className="btn1">Teste</button>  
    </div>
}

export default Cores