import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import styles from "./sorting-page.module.css";
import { v4 as uuidv4 } from "uuid";
import { ElementStates } from "../../types/element-states";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { ISortingColumn } from "../../types/sorting-column";
import {
  randomArr,
  ascendingBubleSort,
  descendingBubleSort,
  ascendingSelectSort,
  descendingSelectSort,
} from "./utils";

export const SortingPage: React.FC = () => {
  const [arrValue, setArrValue] = useState<ISortingColumn[]>([]);

  const [typeOfSort, setTypeOfSort] = useState("Selection");
  const [ascendingLoader, setAscendingLoder] = useState(false);
  const [descendingLoader, setDescendingLoder] = useState(false);
  const [disabled, setDisabled] = useState(false);
  // const [sortingArray, setSortingArray] = useState(
  //   <div className={styles.columns}></div>
  // );
  let temp: { index: number; color: ElementStates }[] = [];
  let arr: string[] = [];

  const selectSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeOfSort(event.target.value);
  };

  useEffect(() => {
    temp = randomArr();
    setArrValue([...temp]);
  }, []);

  const ascendingSort = async () => {
    setAscendingLoder(true);
    setDisabled(true);
    if (arrValue != undefined) {
      temp = arrValue;
    }

    if (typeOfSort === "Bubble") {
      await ascendingBubleSort(temp, setArrValue);
    } else {
      await ascendingSelectSort(temp, setArrValue);
    }

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
      await descendingBubleSort(temp, setArrValue);
    } else {
      await descendingSelectSort(temp, setArrValue);
    }

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
            onClick={() => {
              temp = randomArr();
              setArrValue([...temp]);
            }}
            disabled={disabled}
            extraClass="buttons"
          ></Button>
        </div>
      </div>
      <div className={styles.columns}>
        {arrValue.map((el) => {
          return (
            <Column
              index={el.index}
              key={uuidv4()}
              state={el.color}
              extraClass="mr-8"
            ></Column>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
