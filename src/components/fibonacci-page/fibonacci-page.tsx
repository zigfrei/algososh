import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css";
import { v4 as uuidv4 } from "uuid";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [loader, setLoder] = useState(false);
  const [numberValue, setNumberValue] = useState<number>();
  const [disabled, setDisabled] = useState(false);
  let temp: { number: string; index: number }[] = [];

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const [circles, setCircles] = useState(
    <div className={styles.circles}></div>
  );

  const drawCircles = () => {
    setCircles(
      <div className={styles.circles}>
        {temp.map((el) => {
          return (
            <Circle
              letter={el.number}
              key={uuidv4()}
              index={el.index}
              extraClass="mr-8 mb-35"
            ></Circle>
          );
        })}
      </div>
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((e.target as unknown as HTMLTextAreaElement).value);
  };

  useEffect(() => {
    setNumberValue(Number(inputValue));
    setButtonState();
  });

  const setButtonState = () => {
    if (numberValue != undefined) {
      if (numberValue < 1 || numberValue > 19 || numberValue === null) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  };

  const calculateFibonacci = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoder(true);

    if (numberValue) {
      temp.push({ number: `1`, index: 0 });
      drawCircles();
      await sleep(SHORT_DELAY_IN_MS);

      temp.push({ number: `1`, index: 1 });
      drawCircles();
      await sleep(SHORT_DELAY_IN_MS);

      let a = 1;
      let b = 1;
      for (let i = 3; i <= numberValue + 1; i++) {
        let c = a + b;
        a = b;
        b = c;
        temp.push({ number: `${b}`, index: i - 1 });
        drawCircles();
        await sleep(SHORT_DELAY_IN_MS);
      }
    }
    setLoder(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.content}>
        <Input
          type="number"
          max={19}
          isLimitText={true}
          extraClass="mr-6"
          value={inputValue}
          onChange={onChange}
        ></Input>
        <Button
          text="Рассчитать"
          onClick={calculateFibonacci}
          isLoader={loader}
          disabled={disabled}
        ></Button>{" "}
      </div>
      {circles}
    </SolutionLayout>
  );
};
