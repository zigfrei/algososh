import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Column } from "../ui/column/column";
import styles from "./sorting-page.module.css";
import { v4 as uuidv4 } from "uuid";
import { ElementStates } from "../../types/element-states";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { DELAY_IN_MS } from "../../constants/delays";

interface IArray {
  index: number;
  state: ElementStates;
}

export const SortingPage: React.FC = () => {
  const [arrValue, setArrValue] = useState<IArray[]>();
  const [typeOfSort, setTypeOfSort] = useState("Selection");
  const [ascendingLoader, setAscendingLoder] = useState(false);
  const [descendingLoader, setDescendingLoder] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [sortingArray, setSortingArray] = useState(
    <div className={styles.columns}></div>
  );
  let temp: { index: number; state: ElementStates }[] = [];
  let arr: string[] = [];

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomArr = () => {
    temp = [];
    const length = getRandomInt(3, 17);
    console.log(length);
    for (let i = 0; i < length; i++) {
      temp.push({ index: getRandomInt(1, 100), state: ElementStates.Default });
    }
    console.log(temp);
    drawArr();
    setArrValue(temp);
  };

  const selectSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeOfSort(event.target.value);
  };

  const drawArr = () => {
    setSortingArray(
      <div className={styles.columns}>
        {temp.map((el) => {
          return (
            <Column
              index={el.index}
              key={uuidv4()}
              state={el.state}
              extraClass="mr-8"
            ></Column>
          );
        })}
      </div>
    );
  };

  const ascendingSort = async () => {
    setAscendingLoder(true);
    setDisabled(true);
    if (arrValue != undefined) {
      temp = arrValue;
    }

    if (typeOfSort === "Bubble") {
      for (let j = temp.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
          if (temp[i].index > temp[i + 1].index) {
            temp[i].state = ElementStates.Changing;
            temp[i + 1].state = ElementStates.Changing;
            await sleep(250);
            drawArr();
            let tempory = temp[i];
            temp[i] = temp[i + 1];
            temp[i + 1] = tempory;
            await sleep(250);

            drawArr();
            temp[i].state = ElementStates.Default;
            temp[i + 1].state = ElementStates.Default;
            await sleep(500);
            console.log(temp);
          }
        }
        temp[j].state = ElementStates.Modified;
        drawArr();
      }
    } else {
      for (let i = 0, l = temp.length, k = l - 1; i < k; i++) {
        temp[i].state = ElementStates.Changing;
        let indexMin = i;
        for (let j = i + 1; j < l; j++) {
          temp[j].state = ElementStates.Changing;
          drawArr();
          await sleep(250);
          if (temp[indexMin].index > temp[j].index) {
            temp[indexMin].state = ElementStates.Default;

            indexMin = j;
          }
          temp[i].state = ElementStates.Changing;
          temp[indexMin].state = ElementStates.Changing;
          temp[j].state = ElementStates.Default;
        }

        drawArr();
        if (indexMin !== i) {
          [temp[i], temp[indexMin]] = [temp[indexMin], temp[i]];
        }
        temp[indexMin].state = ElementStates.Default;
        temp[i].state = ElementStates.Modified;
        await sleep(250);
        drawArr();
      }
    }
    temp[temp.length - 1].state = ElementStates.Modified;
    temp[0].state = ElementStates.Modified;
    drawArr();
    setAscendingLoder(false);
    setDisabled(false);
  };

  const descendingSort = async () => {
    setDisabled(true);
    setDescendingLoder(true);
    if (arrValue != undefined) {
      temp = arrValue;
    }

    if (typeOfSort === "Bubble") {
      for (let j = temp.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
          if (temp[i].index < temp[i + 1].index) {
            temp[i].state = ElementStates.Changing;
            temp[i + 1].state = ElementStates.Changing;
            await sleep(250);
            drawArr();
            let tempory = temp[i + 1];
            temp[i + 1] = temp[i];
            temp[i] = tempory;
            await sleep(250);

            drawArr();
            temp[i].state = ElementStates.Default;
            temp[i + 1].state = ElementStates.Default;
            await sleep(500);
            console.log(temp);
          }
        }
        temp[j].state = ElementStates.Modified;
        drawArr();
      }
    } else {
      for (let i = 0, l = temp.length, k = l - 1; i < k; i++) {
        temp[i].state = ElementStates.Changing;

        let indexMin = i;
        for (let j = i + 1; j < l; j++) {
          temp[j].state = ElementStates.Changing;

          await sleep(250);
          drawArr();
          if (temp[indexMin].index < temp[j].index) {
            temp[indexMin].state = ElementStates.Default;

            indexMin = j;
          }
          temp[i].state = ElementStates.Changing;
          temp[indexMin].state = ElementStates.Changing;
          temp[j].state = ElementStates.Default;
        }

        drawArr();
        if (indexMin !== i) {
          [temp[i], temp[indexMin]] = [temp[indexMin], temp[i]];
        }
        temp[indexMin].state = ElementStates.Default;
        temp[i].state = ElementStates.Modified;
        await sleep(250);
        drawArr();
      }
    }
    temp[temp.length - 1].state = ElementStates.Modified;
    temp[0].state = ElementStates.Modified;
    drawArr();
    setDescendingLoder(false);
    setDisabled(false);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.content}>
        <RadioInput
          label={"Выбор"}
          onChange={selectSort}
          value="Selection"
          checked={typeOfSort === "Selection"}
          extraClass="mr-20"
        ></RadioInput>
        <RadioInput
          label={"Пузырёк"}
          onChange={selectSort}
          value="Bubble"
          checked={typeOfSort === "Bubble"}
          extraClass="mr-25"
        ></RadioInput>
        <Button
          text="По возрастанию"
          sorting={Direction.Ascending}
          onClick={ascendingSort}
          isLoader={ascendingLoader}
          disabled={disabled}
          extraClass="mr-6 buttons"
        ></Button>
        <Button
          text="По убыванию"
          sorting={Direction.Descending}
          onClick={descendingSort}
          isLoader={descendingLoader}
          disabled={disabled}
          extraClass="mr-40 buttons"
        ></Button>
        <div className={styles.circles}>
          {" "}
          <Button
            text="Новый массив"
            onClick={randomArr}
            disabled={disabled}
            extraClass="buttons"
          ></Button>
        </div>
      </div>
      {sortingArray}
    </SolutionLayout>
  );
};
