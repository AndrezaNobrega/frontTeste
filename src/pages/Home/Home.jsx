import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";



import { Link } from "react-router-dom";

import Banner from "../../components/banner/Banner";
import CardProduto from "../../components/CardsProduto/CardProduto";

const Home = () => {
  const [lista, setLista] = useState([]);
  
  async function carregaDados() {
    await axios
      .get(process.env.REACT_APP_BASE_URL+'produtos')
      .then((response) => setLista(response.data));
  }

  useEffect(() => {
    carregaDados();
  }, []);

  return (
    <div>
      <div className={styles.home}>
        <Banner />
        <h1>Destaques</h1>
        <div className={styles.cards}>
          {lista.map((result) => (
            <li key={result.id} to={`/produtos/${result.id}`}>
              <Link to={`/produtos/${result.id}`}>
                {
                  <CardProduto
                    nome={result.nome}
                    preco={result.preco}
                    imagem={result.imagem[0]}
                  />
                }
              </Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
