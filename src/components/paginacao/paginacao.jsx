import React from 'react'

import styles from "./Paginacao.module.css";

//setas
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

const maxItens = 5; //max de botões
const maxEsquerda = (maxItens - 1)/2

//total = n de elementos
const Paginacao = ({limite, total, offSet, setOffSet}) => {
    const atual = offSet ? + 1 : 1;
    const pages = Math.ceil(total/limite)
    const primeiro = Math.max(atual - maxEsquerda, 1)



    
    return (
        <ul className={styles.paginacao}>
            <button
            disabled={offSet == 1}
            onClick={() => setOffSet(offSet - 1)}
            > <GoChevronLeft/></button>
            {Array.from({length: Math.min(maxItens, pages)})
            .map((_, index)=>index + primeiro)
            .map((page) =>(
                <li key={page}>                    
                    <button              
                     onClick={() => setOffSet(page)}
                     >{page}
                    </button>
                </li>
            ))}
            <button
            onClick={() => setOffSet(offSet + 1)}
            disabled={offSet == pages}
            > <GoChevronRight/></button>
        </ul>
    )
}

export default Paginacao