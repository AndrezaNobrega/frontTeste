
//css
import styles from "./Produto.module.css";


import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";

const Produto = () => {
    //pegando a id do produto da página    
    const {id} = useParams();

    const [produtos, setProdutos] = useState({});
    const url = 'http://localhost:3001/produtos?id=';

    async function carregaDados(){
        await axios.get(`http://localhost:3001/produtos?id=${id}`)
        .then((response) => {
            setProdutos(response.data[0])
        })
    }

    useEffect(() => {
        carregaDados()
    }, [])


    return (
        <div>
            <h1>{produtos.nome}</h1>
            <div className={styles.produto}>
                <img src={produtos.imagem}></img>
                <div className={styles.lateral}>                    
                    <span>{produtos.descricao}</span>
                    <a className={styles.valor}>Valor: R$ {produtos.preco}</a>
                    <i>Mais {produtos.estoque} unidades disponíveis</i>
                    <div className={styles.botoes}>
                        <button className="btn btn-outline">Adicionar ao carrinho</button>  
                        <button className="btn">Comprar</button>                                
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Produto