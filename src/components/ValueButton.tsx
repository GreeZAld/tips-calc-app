import styles from "./ValueButton.module.scss";

interface IValueButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  value?: number;
}

const ValueButton: React.FC<IValueButtonProps> = (props: IValueButtonProps) => {
  return (
    <button
      value={props.value}
      onClick={props.onClick}
    >{`${props.value}%`}</button>
  );
};

export default ValueButton;
