import { ISortingColumn } from "../../types/sorting-column";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils/utils";
import { getRandomInt } from "../../utils/utils";
import { Dispatch, SetStateAction } from "react";
import {
  SHORT_DELAY_IN_MS,
  EXTRA_SHORT_DELAY_IN_MS,
} from "../../constants/delays";

export const ascendingBubleSort = async (
  temp: ISortingColumn[],
  setState: Dispatch<SetStateAction<ISortingColumn[]>>
) => {
  if (temp[0] == undefined) {
    return;
  }
  for (let j = temp.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if (temp[i].index > temp[i + 1].index) {
        temp[i].color = ElementStates.Changing;
        temp[i + 1].color = ElementStates.Changing;
        await sleep(EXTRA_SHORT_DELAY_IN_MS);
        setState([...temp]);
        let tempory = temp[i];
        temp[i] = temp[i + 1];
        temp[i + 1] = tempory;
        await sleep(EXTRA_SHORT_DELAY_IN_MS);

        setState([...temp]);
        temp[i].color = ElementStates.Default;
        temp[i + 1].color = ElementStates.Default;
        await sleep(SHORT_DELAY_IN_MS);
      }
    }
    temp[j].color = ElementStates.Modified;
    setState([...temp]);
  }
  temp[temp.length - 1].color = ElementStates.Modified;
  temp[0].color = ElementStates.Modified;
  setState([...temp]);
};

export const descendingBubleSort = async (
  temp: ISortingColumn[],
  setState: Dispatch<SetStateAction<ISortingColumn[]>>
) => {
    if (temp[0] == undefined) {
        return;
      }
  for (let j = temp.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if (temp[i].index < temp[i + 1].index) {
        temp[i].color = ElementStates.Changing;
        temp[i + 1].color = ElementStates.Changing;
        await sleep(EXTRA_SHORT_DELAY_IN_MS);
        setState([...temp]);
        let tempory = temp[i + 1];
        temp[i + 1] = temp[i];
        temp[i] = tempory;
        await sleep(EXTRA_SHORT_DELAY_IN_MS);

        setState([...temp]);
        temp[i].color = ElementStates.Default;
        temp[i + 1].color = ElementStates.Default;
        await sleep(SHORT_DELAY_IN_MS);
      }
    }
    temp[j].color = ElementStates.Modified;
    setState([...temp]);
  }
  temp[temp.length - 1].color = ElementStates.Modified;
  temp[0].color = ElementStates.Modified;
  setState([...temp]);
};

export const ascendingSelectSort = async (
  temp: ISortingColumn[],
  setState: Dispatch<SetStateAction<ISortingColumn[]>>
) => {
    if (temp[0] == undefined) {
        return;
      }
  for (let i = 0, l = temp.length, k = l - 1; i < k; i++) {
    temp[i].color = ElementStates.Changing;
    let indexMin = i;
    for (let j = i + 1; j < l; j++) {
      temp[j].color = ElementStates.Changing;
      setState([...temp]);
      await sleep(EXTRA_SHORT_DELAY_IN_MS);
      if (temp[indexMin].index > temp[j].index) {
        temp[indexMin].color = ElementStates.Default;

        indexMin = j;
      }
      temp[i].color = ElementStates.Changing;
      temp[indexMin].color = ElementStates.Changing;
      temp[j].color = ElementStates.Default;
    }

    setState([...temp]);
    if (indexMin !== i) {
      [temp[i], temp[indexMin]] = [temp[indexMin], temp[i]];
    }
    temp[indexMin].color = ElementStates.Default;
    temp[i].color = ElementStates.Modified;
    await sleep(EXTRA_SHORT_DELAY_IN_MS);
    setState([...temp]);
  }
  temp[temp.length - 1].color = ElementStates.Modified;
  temp[0].color = ElementStates.Modified;
  setState([...temp]);
};

export const descendingSelectSort = async (
  temp: ISortingColumn[],
  setState: Dispatch<SetStateAction<ISortingColumn[]>>
) => {
    if (temp[0] == undefined) {
        return;
      }
  for (let i = 0, l = temp.length, k = l - 1; i < k; i++) {
    temp[i].color = ElementStates.Changing;

    let indexMin = i;
    for (let j = i + 1; j < l; j++) {
      temp[j].color = ElementStates.Changing;

      await sleep(EXTRA_SHORT_DELAY_IN_MS);
      setState([...temp]);
      if (temp[indexMin].index < temp[j].index) {
        temp[indexMin].color = ElementStates.Default;

        indexMin = j;
      }
      temp[i].color = ElementStates.Changing;
      temp[indexMin].color = ElementStates.Changing;
      temp[j].color = ElementStates.Default;
    }

    setState([...temp]);
    if (indexMin !== i) {
      [temp[i], temp[indexMin]] = [temp[indexMin], temp[i]];
    }
    temp[indexMin].color = ElementStates.Default;
    temp[i].color = ElementStates.Modified;
    await sleep(EXTRA_SHORT_DELAY_IN_MS);
    setState([...temp]);
  }
  temp[temp.length - 1].color = ElementStates.Modified;
  temp[0].color = ElementStates.Modified;
  setState([...temp]);
};

export const randomArr = () => {
  const tempArr: ISortingColumn[] = [];
  const length = getRandomInt(3, 17);
  for (let i = 0; i < length; i++) {
    tempArr.push({ index: getRandomInt(1, 100), color: ElementStates.Default });
  }
  return tempArr;
};
