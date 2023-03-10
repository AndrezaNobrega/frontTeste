import styles from "./Login.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//context
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const usenavigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (validacao()) {
      fetch(`http://localhost:3001/clientes?email=${email}`)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          //ñ encontrou o email
          if (Object.keys(resp).length === 0) {
            setError("Você não possui cadastro");
          } else {
            if (resp[0].senha === senha) {
              console.log("Login feito com sucesso");
              //aqui vai mandar para a página de home
              setAuth(resp[0]);
              usenavigate("/");
            } else {
              setError("Login ou senha inválidos");
            }
          }
        })
        .catch((err) => {
          setError("Erro no login, tente novamente mais tarde.");
        });
    }
  };
  const validacao = () => {
    let result = true;
    if (email === "" || email === null) {
      result = false;
      setError("Escreva o seu email");
    }
    if (senha === "" || senha === null) {
      result = false;
      setError("Escreva a sua senha");
    }
    return result;
  };

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            placeholder="Digite a sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        <label>
          {" "}
          <Link to={"/cadastro"}>Não tem conta? Cadastre-se</Link>{" "}
        </label>
        <button className="btn1">Entrar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
