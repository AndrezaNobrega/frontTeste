import React from "react";

import styles from "./Paginacao.module.css";

//setas
import { GoChevronLeft, GoChevronRight } from "react-icons/go";



//total = n de elementos
const Paginacao = ({ limite = 5, total, offSet, setOffSet }) => {
  const atual = offSet ? +1 : 1;
  const pages = Math.ceil(total / limite);
  const primeiro = Math.max(atual - maxEsquerda, 1);

  const maxEsquerda = (limite - 1) / 2;

  return (
    <ul className={styles.paginacao}>
      <button
        className="botaoPaginacao"
        disabled={offSet == 1}
        onClick={() => setOffSet(offSet - 1)}
      >
        {" "}
        <GoChevronLeft />
      </button>
      {/* tirar um map */}
      {Array.from({ length: Math.min(limite, pages) })
        .map((_, index) => index + primeiro)
        .map((page) => (
          <li key={page}>
            <button className="botaoPaginacao" onClick={() => setOffSet(page)}>
              {page}
            </button>
          </li>
        ))}
      <button
        className="botaoPaginacao"
        onClick={() => setOffSet(offSet + 1)}
        disabled={offSet == pages}
      >
        {" "}
        <GoChevronRight />
      </button>
    </ul>
  );
};

export default Paginacao;
