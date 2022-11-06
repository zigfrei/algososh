import { Dispatch, SetStateAction } from "react";
import { sleep } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { ICircleLetter } from "../../types/circle-letter";

export const reversAlgorithm = async (
  array: ICircleLetter[],
  setState: Dispatch<SetStateAction<ICircleLetter[]>>
) => {
  for (let i = 0, j = array.length - 1; i < array.length; i++, j--) {
    if (array.length === 1) {
        array[i].color = ElementStates.Modified;
        setState([...array]);
      break;
    }

    if (i === j) {
      array[i].color = ElementStates.Modified;
      setState([...array]);
      break;
    }

    if (i > j) {
      break;
    }
    array[i].color = ElementStates.Changing;
    array[j].color = ElementStates.Changing;
    setState([...array]);
    await sleep(DELAY_IN_MS);
    let tempObject = array[i];
    array[i] = array[j];
    array[j] = tempObject;

    array[i].color = ElementStates.Modified;
    array[j].color = ElementStates.Modified;
    setState([...array]);
  }
};

export const splitString = (
  stringValue: string,
  letterColor: ElementStates
) => {
const letterArray: ICircleLetter[] = [];
  let arr: string[] = [];
  arr = stringValue.split("");
  for (let i = 0; i < arr.length; i++) {
    letterArray.push({ letter: arr[i], color: letterColor });
  }
  return letterArray;
};
