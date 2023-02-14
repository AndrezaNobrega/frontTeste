//css
import styles from "./Categorias.module.css"

import {useState, useEffect} from 'react'
import axios from 'axios'

//components
import Carrossel from '../../components/Carrossel/Carrossel';
import Banner from '../../components/banner/Banner';


const Categorias = () => {
    const [listaSmartphones, setListaSmartphones] = useState([]);
    const [listaMonitor, setListaMonitor] = useState([]);
    const [listaNotebook, setListaNotebook] = useState([]);
    
    
    
    const url = 'http://localhost:3001/produtos?categoria=';


   //multiplas requisições
   const multiple = () => {
    Promise.all([
        axios.get(url+'monitor'),
        axios.get(url+'smartphones'),
        axios.get(url+'notebooks')
    ]).then((response) => {
            setListaSmartphones(response[1].data);
            setListaMonitor(response[0].data);
            setListaNotebook(response[2].data)
        })
    
    }


    useEffect(() => {
        multiple()
    }, [])


    if (!listaMonitor || !listaMonitor.length) return null;


    return ( 
    <div className={styles.categorias}>   
        <Banner/>
        <h1>Monitores</h1>       
        <Carrossel lista={listaMonitor}/> 
        <h1>Smartphones</h1>          
        <Carrossel lista={listaSmartphones}/>   
        <h1>Notebooks</h1>        
        <Carrossel lista={listaNotebook}/>       
    </div>
    )
}

export default Categorias