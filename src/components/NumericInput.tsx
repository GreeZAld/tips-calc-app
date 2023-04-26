import { useEffect, useState } from "react";
import styles from "./NumericInput.module.scss";

interface INumericInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  icon: string;
  maxLength: number;
  value?: number;
  field: string;
  errorMessage?: string;
}

const NumericInput: React.FC<INumericInputProps> = (
  props: INumericInputProps
) => {
  const [errorDisplayed, setErrorDisplayed] = useState<boolean>(false);

  useEffect(() => {
    props.errorMessage && setErrorDisplayed(true);
  }, [props.errorMessage]);

  useEffect(() => {
    setErrorDisplayed(false);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.labelWrapper}>
        <label className={styles.label}>{props.label}</label>
        {errorDisplayed && (
          <label className={styles.error}>{props.errorMessage}</label>
        )}
      </div>
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
