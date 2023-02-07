
//css
import styles from "./ProdutosTabela.module.css";

import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";






const ProdutosTabela = () => {

    const [produtos, setprodutos] = useState([]);
    const url = 'http://localhost:3001/produtos';

    async function carregaDados(){
        await axios.get(url).
        then(response => setprodutos(response.data),
        console.log(produtos))
    }

    useEffect(() => {
        carregaDados()
    }, [])


    return (
        <div className= {styles.produtosTabela}>
            <h1>Tabela Produtos</h1>
            <p>Gerencie os seus produtos</p>  
            <>
                <div className={styles.post_header}> 
                    <span>Produto</span>                                 
                </div>
                {produtos && produtos.map((result) => <div key={result.id} className={styles.post_row}>
                    <p>{result.id} | {result.nome}</p>                    
                    <div> 
                        <Link to={`/produtos/${result.id}`} className="btn btn-outline"> 
                            Detalhes do produto
                        </Link>
                    </div>
                    </div>)}
                </>         
        </div>
    )
}

export default ProdutosTabela