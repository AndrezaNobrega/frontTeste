import styles from "./Carrossel.module.css";
import CardProduto from "../../components/CardsProduto/CardProduto";
import { useRef } from "react";

//setas
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

//redirecionamento
import { Link } from "react-router-dom";

const Carrossel = (props) => {
  const carousel = useRef(null);

  const handleLeftClick = (e) => {
    e.preventDefault();
    console.log(carousel.current.offsetWidth);
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  };

  const handleRightClick = (e) => {
    console.log(carousel.current.offsetWidth);
    e.preventDefault();
    carousel.current.scrollLeft += carousel.current.offsetWidth;
  };

  return (
    <div className={styles.categorias}>
      <hr />
      <div className={styles.coluna}>
        <button className="btnCarroussel" onClick={handleLeftClick}>
          <GoChevronLeft />
        </button>

        <div className={styles.carousel} ref={carousel}>
          {props.lista.map((result) => (
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

        <button className="btnCarroussel" onClick={handleRightClick}>
          <GoChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Carrossel;
