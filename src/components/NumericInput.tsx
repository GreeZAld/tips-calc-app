import styles from "./NumericInput.module.scss";

interface INumericInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  icon: string;
  maxLength: number;
  value?: number;
  field: string;
}

const NumericInput: React.FC<INumericInputProps> = (
  props: INumericInputProps
) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{props.label}</label>
      <div className={styles.inputWrapper}>
        <i className={styles[props.icon]}></i>
        <input
          name={props.field}
          className={styles.input}
          type="number"
          maxLength={props.maxLength}
          placeholder="0"
          onChange={props.onChange}
          value={props.value || ""}
        />
      </div>
    </div>
  );
};

export default NumericInput;
