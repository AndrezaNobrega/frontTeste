import {useState, useEffect} from 'react'
import axios from 'axios'


import Carrossel from '../../components/Carrossel/Carrossel';


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
    <div>          
        <Carrossel lista={listaMonitor} categoria={"Monitores"}/>    
        <Carrossel lista={listaSmartphones} categoria={"Smartphones"}/>    
        <Carrossel lista={listaNotebook} categoria={"Notebooks"}/>       
    </div>
    )
}

export default Categorias