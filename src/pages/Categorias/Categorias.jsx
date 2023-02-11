import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import styles from "./Categorias.module.css"
import CardProduto from '../../components/CardsProduto/CardProduto';

//setas
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

import { Link } from 'react-router-dom';

const Categorias = () => {
    const [lista, setLista] = useState([]);
    const url = 'http://localhost:3001/produtos';
    //p pegar a ref do carrossel
    const carousel = useRef(null);

    async function carregaDados(){
        await axios.get(url).
        then(response => setLista(response.data),
        console.log('lista',lista))    }

    useEffect(() => {
        carregaDados()
    }, [])

    if (!lista || !lista.length) return null;

    const handleLeftClick = (e) => {
        e.preventDefault();
        console.log(carousel.current.offsetWidth)
        carousel.current.scrollLeft  -= carousel.current.offsetWidth;

    }

    const handleRightClick = (e) => {
        console.log(carousel.current.offsetWidth)
        e.preventDefault();
        carousel.current.scrollLeft  += carousel.current.offsetWidth;        
    }

    return ( 
    <div className={styles.categoria}>  
    <h1>Categorias</h1> 

        <div className={styles.categorias}>   
            <h1>Smartphones</h1>
            <hr/>  
            <div className={styles.coluna}>  

                <button onClick={handleLeftClick}>                    
                    <GoChevronLeft/>                    
                </button>    

                <div className={styles.carousel} ref={carousel}>   
            
                    {lista.map(result => 
                    <li key = { result.id } to={`/produtos/${result.id}`}> 
                        <Link to={`/produtos/${result.id}`}>                       
                            { <CardProduto nome={result.nome}
                            preco={result.preco} imagem ={result.imagem[0]}                    
                            /> } 
                        </Link>
                    </li>)}
                </div>

                <button onClick={handleRightClick}>                    
                        <GoChevronRight/>                    
                </button>

            </div> 
        </div>  

        
    </div>
    )
}

export default Categorias