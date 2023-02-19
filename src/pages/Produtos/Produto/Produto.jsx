//css
import styles from "./Produto.module.css";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Produto = () => {
  const [mostrar, setMostrar] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [produtos, setProdutos] = useState({});

  //pegando a id do produto da página
  const { id } = useParams();

  const url = `http://localhost:3001/produtos/${id}`;

  async function carregaDados() {
    await axios.get(url).then((response) => {
      setProdutos(response.data);
      setIsLoading(false);
    });
  }
  useEffect(() => {
    carregaDados();
  }, [setProdutos]);

  return (
    <div>
      {!isLoading && (
        <div className={styles.produto}>
          <div className={styles.miniaturas}>
            {produtos.imagem.map((imagem, i) => (
              <img onClick={() => setMostrar(i)} src={produtos.imagem[i]} />
            ))}
          </div>
          <div className={styles.imagemPrincipal}>
            {mostrar === 0 && <img src={produtos.imagem[0]}></img>}
            {mostrar === 1 && <img src={produtos.imagem[1]}></img>}
            {mostrar === 2 && <img src={produtos.imagem[2]}></img>}
            {mostrar === 3 && <img src={produtos.imagem[3]}></img>}
            {mostrar === 4 && <img src={produtos.imagem[4]}></img>}
          </div>
          <div className={styles.lateral}>
            <h2>{produtos.nome}</h2>
            <a className="produtosPreco">
              R${" "}
              {parseFloat(produtos.preco).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </a>
            <i>
              ou 10x de R${" "}
              {(parseFloat(produtos.preco) / 10).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}{" "}
              sem juros
            </i>
            <span>{produtos.descricao}</span>
            <i>Mais {produtos.estoque} unidades disponíveis</i>
            <div className={styles.botoes}>
              <button className="btn btn-outline">Adicionar ao carrinho</button>
              <i className={styles.comprarAgora}>
                <button className="btn1">Comprar agora</button>
              </i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produto;
