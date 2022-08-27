import React, { useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack-page.module.css";
import { v4 as uuidv4 } from "uuid";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "./stack";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils/utils";

export interface IStack {
  letter: string;
  state: ElementStates;
  head?: string;
  tail?: string;
}

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const [stack, setStack] = useState(new Stack<IStack>());
  let temp: IStack[] = [];

  const [addLoader, setAddLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const stackValues = useMemo(() => stack.toArray(), [stack]);
  const stackIsEmpty = useMemo(() => stackValues.length === 0, [stackValues]);
  const inputIsEmpty = useMemo(() => inputValue.length === 0, [inputValue]);

  const [deleteLoader, setDeleteLoader] = useState(false);
  const [clearLoader, setClearLoader] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((e.target as unknown as HTMLTextAreaElement).value);
  };

  const push = async () => {
    setAddLoader(true);
    setDisabled(true);
    setInputValue("");
    const element = { letter: inputValue, state: ElementStates.Changing };
    stack.push(element);
    temp = stack.toArray();
    drawCircles();

    setStack(new Stack(stack.toArray()));

    await sleep(SHORT_DELAY_IN_MS);
    element.state = ElementStates.Default;
    setStack(new Stack(stack.toArray()));
    temp = stack.toArray();
    drawCircles();
    setAddLoader(false);
    setDisabled(false);
  };

  const pop = async () => {
    setDeleteLoader(true);
    setDisabled(true);

    const lastElement = stack.peak();
    if (lastElement) {
      lastElement.state = ElementStates.Changing;
      setStack(new Stack(stack.toArray()));
      temp = stack.toArray();
      drawCircles();
    }

    await sleep(SHORT_DELAY_IN_MS);

    stack.pop();
    setStack(new Stack(stack.toArray()));
    temp = stack.toArray();
    drawCircles();

    setDeleteLoader(false);
    setDisabled(false);
  };

  const clear = async () => {
    setDisabled(true);
    setClearLoader(true);

    await sleep(SHORT_DELAY_IN_MS);
    setStack(new Stack());
    temp = [];

    drawCircles();

    setDisabled(false);
    setClearLoader(false);
  };

  const [circles, setCircles] = useState(
    <div className={styles.circles} data-testid="circles"></div>
  );

  const drawCircles = () => {
    setCircles(
      <div className={styles.circles} data-testid="circles">
        {temp.map((el, index, array) => {
          return (
            <Circle
              letter={el.letter}
              state={el.state}
              key={uuidv4()}
              index={index}
              extraClass="mr-8 mb-35"
              head={index === array.length - 1 ? "top" : ""}
            ></Circle>
          );
        })}
      </div>
    );
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.content}>
        <Input
          type="text"
          maxLength={4}
          isLimitText={true}
          extraClass="mr-6"
          value={inputValue}
          onChange={onChange}
          data-testid="input"
        ></Input>
        <Button
          text="Добавить"
          onClick={push}
          isLoader={addLoader}
          disabled={disabled || inputIsEmpty}
          extraClass="mr-6"
          data-testid="addButton"

        ></Button>{" "}
        <Button
          text="Удалить"
          onClick={pop}
          isLoader={deleteLoader}
          disabled={disabled || stackIsEmpty}
          extraClass="mr-40"
          data-testid="deleteButton"
        ></Button>{" "}
        <Button
          text="Очистить"
          onClick={clear}
          isLoader={clearLoader}
          disabled={disabled || stackIsEmpty}
          extraClass="mr-6"
          data-testid="clearButton"
        ></Button>{" "}
      </div>
      {circles}
    </SolutionLayout>
  );
};
