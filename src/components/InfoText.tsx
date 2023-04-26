import styles from "./InfoText.module.scss";

function InfoText(props: { text: string }) {
  return <p className={styles.text}>{props.text}</p>;
}

export default InfoText;