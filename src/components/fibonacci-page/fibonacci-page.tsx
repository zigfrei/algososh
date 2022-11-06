import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css";
import { v4 as uuidv4 } from "uuid";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { sleep } from "../../utils/utils";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [loader, setLoder] = useState(false);
  const [disabled, setDisabled] = useState(false);
  let temp: { number: string; index: number }[] = [];

  const [circles, setCircles] = useState(
    <div className={styles.circles} data-testid="circles"></div>
  );

  const drawCircles = () => {
    setCircles(
      <div className={styles.circles} data-testid="circles">
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
    let tempNumber = Number((e.target as unknown as HTMLTextAreaElement).value);
    if (tempNumber < 1) {
      setInputValue("1");
    } else if (tempNumber > 19) {
      setInputValue("19");
    } else {
      setInputValue(`${tempNumber}`);
    }
  };

  const calculateFibonacci = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoder(true);

    temp.push({ number: `1`, index: 0 });
    drawCircles();
    await sleep(SHORT_DELAY_IN_MS);

    temp.push({ number: `1`, index: 1 });
    drawCircles();
    await sleep(SHORT_DELAY_IN_MS);

    let a = 1;
    let b = 1;
    for (let i = 3; i <= Number(inputValue) + 1; i++) {
      let c = a + b;
      a = b;
      b = c;
      temp.push({ number: `${b}`, index: i - 1 });
      drawCircles();
      await sleep(SHORT_DELAY_IN_MS);
    }

    setLoder(false);
    setInputValue("");
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.content}>
        <Input
          data-testid="input"
          type="number"
          max={19}
          isLimitText={true}
          extraClass="mr-6"
          value={inputValue}
          onChange={onChange}
        ></Input>
        <Button
          data-testid="button"
          text="Рассчитать"
          onClick={calculateFibonacci}
          isLoader={loader}
          disabled={inputValue ? false : true}
        ></Button>{" "}
      </div>
      {circles}
    </SolutionLayout>
  );
};
