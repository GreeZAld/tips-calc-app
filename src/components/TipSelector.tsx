import { useId } from "react";
import styles from "./TipSelector.module.scss";
import ValueButton from "./ValueButton";

interface ITipSelectorProps {
  values: number[];
  activeTip: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TipSelector: React.FC<ITipSelectorProps> = (props: ITipSelectorProps) => {
  const id = useId();

  return (
    <div className={styles.wrapper}>
      {props.values.map((item) => (
        <ValueButton
          value={item}
          onClick={props.onClick}
          active={props.activeTip === item}
          key={`${id}-${props.values.indexOf(item)}`}
        />
      ))}
      <input
        className={styles.input}
        type="number"
        maxLength={2}
        placeholder="Custom"
        onChange={props.onChange}
        name="tips"
      />
    </div>
  );
};

export default TipSelector;
