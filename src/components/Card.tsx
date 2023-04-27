import { useCallback, useEffect, useState } from "react";
import styles from "./Card.module.scss";
import NumericInput from "./NumericInput";
import TipSelector from "./TipSelector";
import InfoText from "./InfoText";

interface ITipDataProps {
  bill: number | undefined;
  people: number | undefined;
  total: number;
  personTotal: number;
  tips: number | undefined;
  customTip: number | undefined;
  personTips: number;
}

function Card() {
  const [tipData, setTipData] = useState<ITipDataProps>({
    bill: undefined,
    people: undefined,
    total: 0,
    personTotal: 0,
    tips: undefined,
    customTip: undefined,
    personTips: 0,
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
      personTips: 0,
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

  interface IMemoSetTipDataProps {
    (tipDataToUpdate: Partial<ITipDataProps>): void;
  }

  const memoSetTipData: IMemoSetTipDataProps = useCallback(
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
        personTotal: tipData.total / tipData.people,
        personTips:
          tipData.tips && tipData.bill
            ? (tipData.bill * (tipData.tips / 100)) / tipData.people
            : 0,
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
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
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
          activeTip={tipData.tips || 0}
          onClick={onPercentClick}
          onChange={onInputChange}
        />
        <NumericInput
          label="Number of People"
          onChange={onInputChange}
          icon="people"
          maxLength={2}
          value={tipData.people}
          field="people"
          errorMessage={tipData.people ? undefined : "Can't be zero"}
        />
      </div>
      <div className={styles.resultWrapper}>
        <div className={styles.resultTextWrapper}>
          <InfoText text="Tip Amount" value={tipData.personTips} />
          <InfoText text="Total" value={tipData.personTotal} />
        </div>
        <button onClick={handleReset} disabled={!tipData.total}>
          RESET
        </button>
      </div>
    </div>
  );
}

export default Card;
