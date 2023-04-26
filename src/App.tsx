import { useCallback, useEffect, useState } from "react";
import "./App.scss";
import NumericInput from "./components/NumericInput";
import TipSelector from "./components/TipSelector";

interface ITipDataProps {
  bill: number | undefined;
  people: number | undefined;
  total: number;
  personTotal: number;
  tips: number | undefined;
  customTip: number | undefined;
}

function App() {
  const [tipData, setTipData] = useState<ITipDataProps>({
    bill: undefined,
    people: undefined,
    total: 0,
    personTotal: 0,
    tips: undefined,
    customTip: undefined,
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;

    if (input.value.length > input.maxLength) {
      input.value = input.value.slice(0, input.maxLength);
    }

    setTipData({
      ...tipData,
      [input.name]: parseFloat(input.value),
    });
  };

  const handleReset = () => {
    setTipData({
      bill: undefined,
      people: undefined,
      total: 0,
      personTotal: 0,
      tips: undefined,
      customTip: undefined,
    });
  };

  const onPercentClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setTipData({
      ...tipData,
      tips: parseFloat(e.currentTarget.value),
    });
  };

  interface IMemoizedSetTipDataProps {
    (tipDataToUpdate: Partial<ITipDataProps>): void;
  }

  const memoSetTipData: IMemoizedSetTipDataProps = useCallback(
    (tipDataToUpdate) => {
      setTipData((prevTipData: ITipDataProps) => ({
        ...prevTipData,
        ...tipDataToUpdate,
      }));
    },
    [setTipData]
  );

  useEffect(() => {
    if (tipData.bill) {
      memoSetTipData({
        total: tipData.tips
          ? tipData.bill + tipData.bill * (tipData.tips / 100)
          : tipData.bill,
      });
    } else {
      memoSetTipData({
        total: 0,
      });
    }

    if (tipData.people) {
      memoSetTipData({
        personTotal: parseFloat((tipData.total / tipData.people).toFixed(2)),
      });
    } else {
      memoSetTipData({
        personTotal: 0,
      });
    }
  }, [
    memoSetTipData,
    tipData.bill,
    tipData.people,
    tipData.tips,
    tipData.total,
  ]);

  return (
    <>
      <NumericInput
        label="Bill"
        onChange={onInputChange}
        icon="bill"
        maxLength={10}
        value={tipData.bill}
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
        value={tipData.people}
        field="people"
      />
      <p>Total:{tipData.total}</p>
      <p>Total per person:{tipData.personTotal}</p>
      <button onClick={handleReset} disabled={!tipData.total}>
        RESET
      </button>
    </>
  );
}

export default App;
