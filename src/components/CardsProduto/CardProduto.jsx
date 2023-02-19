import styles from "./CardProduto.module.css";

const CardProduto = (props) => {
  return (
    <div className={styles.card}>
      <img src={props.imagem}></img>
      <h2>{props.nome}</h2>
      <div className={styles.preco}>
        <p>
          {" "}
          R${" "}
          {parseFloat(props.preco).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </p>
        <i>
          ou 10x de R${" "}
          {(parseFloat(props.preco) / 10).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}{" "}
          sem juros
        </i>
      </div>
    </div>
  );
};

export default CardProduto;
