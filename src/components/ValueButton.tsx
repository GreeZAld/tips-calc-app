import styles from "./ValueButton.module.scss";

interface IValueButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  value?: number;
  active: boolean;
}

const ValueButton: React.FC<IValueButtonProps> = (props: IValueButtonProps) => {
  return (
    <button
      value={props.value}
      onClick={props.onClick}
      className={props.active ? styles.activeButton : styles.inactiveButton}
    >{`${props.value}%`}</button>
  );
};

export default ValueButton;
