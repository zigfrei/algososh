import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { v4 as uuidv4 } from "uuid";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [stringValue, setStringValue] = useState("");
  const [loader, setLoder] = useState(false);
  let temp: { letter: string; color: ElementStates }[] = [];
  let arr: string[] = [];

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
              letter={el.letter}
              key={uuidv4()}
              state={el.color}
              extraClass="mr-8"
            ></Circle>
          );
        })}
      </div>
    );
  };

  const reverseString = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoder(true);
    if (stringValue) {
      arr = stringValue.split("");
      for (let i = 0; i < arr.length; i++) {
        temp.push({ letter: arr[i], color: ElementStates.Default });
      }
    }

    for (let i = 0, j = temp.length - 1; i < temp.length; i++, j--) {
      if (temp.length === 1) {
        temp[i].color = ElementStates.Modified;
        drawCircles();
        break;
      }

      if (i === j) {

        temp[i].color = ElementStates.Modified;
        drawCircles();
        break;
      }

      if (i > j) {
        break;
      }
      temp[i].color = ElementStates.Changing;
      temp[j].color = ElementStates.Changing;
      drawCircles();
      await sleep(DELAY_IN_MS);
      let pemmmpp = temp[i];
      temp[i] = temp[j];
      temp[j] = pemmmpp;

      temp[i].color = ElementStates.Modified;
      temp[j].color = ElementStates.Modified;
      drawCircles();
    }
    setLoder(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.content}>
        <Input
          type="text"
          maxLength={11}
          isLimitText={true}
          extraClass="mr-6 mb-40"
          value={stringValue}
          onChange={(e) =>
            setStringValue((e.target as HTMLTextAreaElement).value)
          }
        ></Input>
        <Button
          text="Развернуть"
          onClick={reverseString}
          isLoader={loader}
        ></Button>{" "}
      </div>
      {circles}
    </SolutionLayout>
  );
};
