
//css
import styles from "./ProdutosTabela.module.css";

import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import Paginacao from "../../components/paginacao/paginacao";






const ProdutosTabela = () => {
    const [total, setTotal] = useState("");
    const [produtos, setProdutos] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const url = `http://localhost:3001/produtos/?_page=${offSet}&_limit=5`;

    


    //multiplas requisições
    const multiple = () => {
    Promise.all([
        axios.get(url),
        axios.get('http://localhost:3001/produtos')        
    ]).then((response) => {
            setProdutos(response[0].data);
            setTotal((response[1].data).length);
        })    
    }

    useEffect(() => {
        multiple()
    }, [offSet])


    async function carregaDados(){
        await axios.get(url).
        then(response => setProdutos(response.data),
        console.log(produtos))
    }

    useEffect(() => {
        carregaDados()
    }, [offSet] )



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
                <Paginacao limite = {5}
                total = {total}
                offSet={offSet}
                setOffSet={setOffSet} />   
        </div>
    )
}

export default ProdutosTabela