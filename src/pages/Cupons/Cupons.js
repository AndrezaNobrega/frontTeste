import {useState, useEffect} from 'react'
import axios from 'axios'
import styles from "./Cupons.module.css"
import Cupom from '../../components/Cupons/Cupom';

const Cupons = () => {
    const [lista, setLista] = useState([]);
    const url = 'http://localhost:3001/cupons';

    async function carregaDados(){
        await axios.get(url).
        then(response => setLista(response.data),
        console.log(lista))
    }

    useEffect(() => {
        carregaDados()
    }, [])

    return ( 
    <div>        
        <div className={styles.cupons}>    
            {lista.map(result => 
            <li key = { result.id }> 
                { <Cupom nome={result.nome}
                validade={result.validade}
                /> } 
            </li>)}
        </div>
    </div>
    )
}

export default Cupons