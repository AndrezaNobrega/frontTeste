import styles from "./Footer.module.css";
import { BsGoogle, BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialMedia}>
        <a>
          <BsFacebook />
        </a>
        <a>
          <BsTwitter />
        </a>
        <a>
          <BsInstagram />
        </a>
        <a>
          <BsGoogle />
        </a>
        <a>|</a>
      </div>
      <h3>Encontre tudo voltado para a tecnologia</h3>

      <p>Tech Shopping &copy; 2023</p>
    </footer>
  );
};

export default Footer;
