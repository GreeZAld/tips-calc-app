import styles from "./InfoText.module.scss";

interface IInfoTextProps {
  text: string;
  value: number;
}

function InfoText(props: IInfoTextProps) {
  return (
    <div className={styles.infoWrapper}>
      <div className={styles.infoTextWrapper}>
        <p className={styles.text}>{`${props.text}`}</p>
        <label className={styles.personLabel}>/ person</label>
      </div>
      <p className={styles.value}>${props.value.toFixed(2)}</p>
    </div>
  );
}

export default InfoText;
