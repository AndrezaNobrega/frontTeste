import styles from "./Cupom.module.css";
import { BsCashCoin } from "react-icons/bs";

const Cupom = (props) => {
  return (
    <div className={styles.cupom}>
      <h2>{props.nome}</h2>
      <p>{props.validade}</p>
      <a className="icone">
        <BsCashCoin />
      </a>
    </div>
  );
};

export default Cupom;
