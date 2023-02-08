//css
import styles from "./Produto.module.css";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Produto = () => {
  const [mostrar, setMostrar] = useState("0");
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
            <img onClick={() => setMostrar("0")} src={produtos.imagem[0]} />
            <img onClick={() => setMostrar("1")} src={produtos.imagem[1]} />
            <img onClick={() => setMostrar("2")} src={produtos.imagem[2]} />
            <img onClick={() => setMostrar("3")} src={produtos.imagem[3]} />
            <img onClick={() => setMostrar("4")} src={produtos.imagem[4]} />
          </div>
          <div className={styles.imagemPrincipal}>
            {mostrar == "0" && <img src={produtos.imagem[0]}></img>}
            {mostrar == "1" && <img src={produtos.imagem[1]}></img>}
            {mostrar == "2" && <img src={produtos.imagem[2]}></img>}
            {mostrar == "3" && <img src={produtos.imagem[3]}></img>}
            {mostrar == "4" && <img src={produtos.imagem[4]}></img>}
          </div>
          <div className={styles.lateral}>
            <h2>{produtos.nome}</h2>
            <a>R$ {produtos.preco}</a>
            <i>ou 10x de R$ {produtos.preco / 10} sem juros</i>
            <span>{produtos.descricao}</span>
            <i>Mais {produtos.estoque} unidades disponíveis</i>
            <div className={styles.botoes}>
              <button className="btn btn-outline">Adicionar ao carrinho</button>
              <i className={styles.comprarAgora}>
                <button className="btn">Comprar agora</button>
              </i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produto;
