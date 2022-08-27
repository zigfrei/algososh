import React, { useState, useCallback, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { v4 as uuidv4 } from "uuid";
import { ElementStates } from "../../types/element-states";
import { ICircleLetter } from "../../types/circle-letter";
import { reversAlgorithm } from "./utils";
import { splitString } from "./utils";

export const StringPage = () => {
  const [stringValue, setStringValue] = useState("");
  const [loader, setLoder] = useState(false);
  let temp: { letter: string; color: ElementStates }[] = [];

  const [tempCircles, settempCircles] = React.useState<ICircleLetter[]>([]);

  useEffect(() => {}, [tempCircles]);

  const reverseString = useCallback(
    async (value: string) => {
      setLoder(true);
      temp = [];
      settempCircles(temp);

      temp = splitString(value, ElementStates.Default);

      await reversAlgorithm(temp, settempCircles);
      setLoder(false);
      setStringValue("");
    },
    [setStringValue, setLoder]
  );

  return (
    <>
      <div className={styles.content}>
        <Input
          data-testid="input"
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
          onClick={() => reverseString(stringValue)}
          disabled={stringValue ? false : true}
          isLoader={loader}
          data-testid="button"
        ></Button>{" "}
      </div>
      <div className={styles.circles} data-testid="circles">
        {tempCircles.map((el, index) => (
          <Circle
            letter={el.letter}
            key={uuidv4()}
            state={el.color}
            extraClass="mr-8"
            data-testid={`Circle_${index}`}
          ></Circle>
        ))}
      </div>
    </>
  );
};

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <StringPage />
    </SolutionLayout>
  );
};
