import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Cupons.module.css";

import Cupom from "../../components/Cupons/Cupom";
import Paginacao from "../../components/paginacao/paginacao";

const Cupons = () => {
  const [lista, setLista] = useState([]);
  const [total, setTotal] = useState("");
  const [offSet, setOffSet] = useState(0);

  const url = `http://localhost:3001/cupons`;

  //multiplas requisições
  const multiple = () => {
    Promise.all([
      axios.get(url + `?_page=${offSet}&_limit=4`),
      axios.get(url),
    ]).then((response) => {
      setLista(response[0].data);
      setTotal(response[1].data.length);
    });
  };

  useEffect(() => {
    multiple();
  }, [offSet]);

  return (
    <div>
      <div className={styles.cupons}>
        {lista.map((result) => (
          <li key={result.id}>
            {<Cupom nome={result.nome} validade={result.validade} />}
          </li>
        ))}
        <Paginacao
          limite={4}
          total={total}
          offSet={offSet}
          setOffSet={setOffSet}
        />
      </div>
    </div>
  );
};

export default Cupons;
