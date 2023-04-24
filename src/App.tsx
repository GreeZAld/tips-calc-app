import { useEffect, useState } from "react";
import "./App.scss";
import NumericInput from "./components/NumericInput";
import TipSelector from "./components/TipSelector";

function App() {
  const [bill, setBill] = useState<number>();
  const [people, setPeople] = useState<number>();
  const [total, setTotal] = useState<number>();
  const [personTotal, setPersonTotal] = useState<number>();
  const [tips, setTips] = useState<number>();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;

    if (input.value.length > input.maxLength) {
      input.value = input.value.slice(0, input.maxLength);
    }

    switch (input.name) {
      case "bill":
        if (input.value.length) {
          setBill(parseFloat(input.value));
        } else {
          setBill(0);
        }
        break;
      case "people":
        if (input.value.length) {
          setPeople(parseFloat(input.value));
        } else {
          setPeople(0);
        }
        break;
      case "tips":
        if (input.value.length) {
          setTips(parseFloat(input.value));
        } else {
          setTips(0);
        }
        break;

      default:
        break;
    }
  };

  const onPercentClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setTips(parseFloat(e.currentTarget.value));
  };

  useEffect(() => {
    if (bill && people) {
      setTotal(bill);
      setPersonTotal(parseFloat((bill / people).toFixed(2)));
      if (tips) {
        setTotal(bill + bill * (tips / 100));
        total && setPersonTotal(parseFloat((total / people).toFixed(2)));
      }
    }
  }, [bill, tips, total, people]);

  return (
    <>
      <NumericInput
        label="Bill"
        onChange={onInputChange}
        icon="bill"
        maxLength={10}
        value={bill}
        field="bill"
      />
      <TipSelector
        values={[5, 10, 15, 25, 50]}
        onClick={onPercentClick}
        onChange={onInputChange}
      />
      <NumericInput
        label="Number of People"
        onChange={onInputChange}
        icon="people"
        maxLength={3}
        value={people}
        field="people"
      />
      <p>Total:{total}</p>
      <p>Total per person:{personTotal}</p>
    </>
  );
}

export default App;
