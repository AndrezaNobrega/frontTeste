import {useState, useEffect} from 'react'
import axios from 'axios'
import styles from "./Home.module.css"
import CardProduto from '../../components/CardsProduto/CardProduto';

import { Link } from 'react-router-dom';


const Home = () => {
    const [lista, setLista] = useState([]);
    const url = 'http://localhost:3001/produtos';

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
        <div>   
            <h1>Home page</h1>
            <div className={styles.cards}>    
                {lista.map(result => 
                <li key = { result.id } to={`/produtos/${result.id}`}> 
                    <Link to={`/produtos/${result.id}`}>                       
                        { <CardProduto nome={result.nome}
                        preco={result.preco} imagem ={result.imagem[0]}                    
                        /> } 
                    </Link>
                </li>)}
            </div>
        </div>  
    </div>
    )
}

export default Home