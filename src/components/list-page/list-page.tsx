import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./list-page.module.css";
import { v4 as uuidv4 } from "uuid";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./linkedList";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { sleep } from "../../utils/utils";

export interface IList {
  letter: string;
  state: ElementStates;
  head?: string;
  tail?: string;

}

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [indexInput, setIndexInput] = useState("");
  const [list, setList] = useState(new LinkedList<IList>());
  const [disabled, setDisabled] = useState(false);
  const [disabledByIndex, setDisabledByIndex] = useState(false);
  const [addHeadLoader, setAddHeadLoader] = useState(false);
  const [addTailLoader, setAddTailLoader] = useState(false);
  const [deleteHeadLoader, setDeleteHeadLoader] = useState(false);
  const [deleteTailLoader, setDeleteTailLoader] = useState(false);
  const [deleteByIndexLoader, setDeleteByIndexLoader] = useState(false);
  const [addByIndexLoader, setAddByIndexLoader] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((e.target as unknown as HTMLTextAreaElement).value);
  };

  const onIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // let tempIndex = Number((e.target as unknown as HTMLTextAreaElement).value);
    // if(tempIndex<0 || tempIndex >( list.getSize()-1) || isNaN(tempIndex)){
    //   setDisabledByIndex(true);
    // }else {setDisabledByIndex(false)}
    setIndexInput((e.target as unknown as HTMLTextAreaElement).value);
  };

  let temp: (IList | null)[] = [];

  const listValues = useMemo(() => list.toArray(), [list]);
  const inputIsEmpty = useMemo(() => inputValue.length === 0, [inputValue]);
  const indexInputIsEmpty = useMemo(
    () => indexInput.length === 0,
    [indexInput]
  );
  const linkedListIsEmpty = useMemo(
    () => listValues.length === 0,
    [listValues]
  );

  useEffect(() => {
    const array = [0, 34, 8, 1].map((element) => ({
      letter: String(element),
      state: ElementStates.Default,
    }));
    setList(new LinkedList(array));
  }, [setList]);

  useEffect(() => {
    let tempIndex = Number(indexInput);
    if(tempIndex<0 || tempIndex >( list.getSize()-1) || isNaN(tempIndex)){
      setDisabledByIndex(true);
    }else {setDisabledByIndex(false)}
  }, [indexInput, list]);



  const [circles, setCircles] = useState(
    <div className={styles.circles}></div>
  );

  const drawCircles = () => {
    setCircles(
      <div className={styles.circles}>
        {temp.map((el, index, array) => {
          return (
            <div className={styles.wrapper} key={uuidv4()}>
              <Circle
                letter={el?.letter}
                state={el?.state}
                index={index}
                head={
                  el?.head ? (
                    <Circle
                      letter={el?.head}
                      state={ElementStates.Changing}
                      isSmall
                    />
                  ) : index === 0 ? (
                    "head"
                  ) : (
                    ""
                  )
                }
                tail={
                  el?.tail ? (
                    <Circle
                      letter={el?.tail}
                      state={ElementStates.Changing}
                      isSmall
                    />
                  ) : index === array.length - 1 ? (
                    "tail"
                  ) : (
                    ""
                  )
                }
                extraClass={styles.circle}
              />
              {index !== array.length - 1 && <ArrowIcon />}
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    temp = list.toArray();
    drawCircles();
  }, [list]);

  const listPrepend = async () => {
    setInputValue("");
    setDisabled(true);
    setAddHeadLoader(true);

    const headElement = list.getHead();
    if (headElement) {
      headElement.value.head = inputValue;
    }
    setList(new LinkedList(list.toArray()));
    await sleep(SHORT_DELAY_IN_MS);

    if (headElement) {
      headElement.value.head = undefined;
    }
    const element = { letter: inputValue, state: ElementStates.Modified };
    list.prepend(element);
    setList(new LinkedList(list.toArray()));
    await sleep(SHORT_DELAY_IN_MS);

    element.state = ElementStates.Default;
    setList(new LinkedList(list.toArray()));

    setDisabled(false);
    setAddHeadLoader(false);
  };

  const listAppend = async () => {
    setDisabled(true);
    setInputValue("");
    setAddTailLoader(true);

    const tailElement = list.getTail();
    if (tailElement) {
      tailElement.value.head = inputValue;
    }
    setList(new LinkedList(list.toArray()));
    await sleep(SHORT_DELAY_IN_MS);

    if (tailElement) {
      tailElement.value.head = undefined;
    }
    const element = { letter: inputValue, state: ElementStates.Modified };
    list.append(element);
    setList(new LinkedList(list.toArray()));
    await sleep(SHORT_DELAY_IN_MS);

    element.state = ElementStates.Default;
    setList(new LinkedList(list.toArray()));

    setDisabled(false);
    setAddTailLoader(false);
  };

  const deleteFromHead = async () => {
    setDisabled(true);
    setDeleteHeadLoader(true);

    const headElement = list.getHead();
    if (headElement) {
      headElement.value.head = headElement.value.letter;
      headElement.value.letter = "";
    }
    setList(new LinkedList(list.toArray()));
    await sleep(SHORT_DELAY_IN_MS);

    list.deleteHead();
    setList(new LinkedList(list.toArray()));

    setDisabled(false);
    setDeleteHeadLoader(false);
  };

  const deleteFromTail = async () => {
    setDisabled(true);
    setDeleteTailLoader(true);

    const tailElement = list.getTail();
    if (tailElement) {
      tailElement.value.tail = tailElement.value.letter;
      tailElement.value.letter = "";
    }
    setList(new LinkedList(list.toArray()));
    await sleep(SHORT_DELAY_IN_MS);

    list.deleteTail();
    setList(new LinkedList(list.toArray()));

    setDisabled(false);
    setDeleteTailLoader(false);
  };

  const addElementByIndex = async () => {
    setDisabled(true);
    setAddByIndexLoader(true);
    setInputValue("");
    setIndexInput("");

    let findingElement;
    for (let i = 0; i <= Number(indexInput); i++) {
      if (findingElement) {
        findingElement.state = ElementStates.Changing;
        findingElement.head = undefined;
      }

      findingElement = list.getElementByIndex(i);
      if (findingElement) {
        findingElement.head = inputValue;
      }

      setList(new LinkedList(list.toArray()));
      await sleep(SHORT_DELAY_IN_MS);
    }

    for (let i = 0; i <= Number(indexInput); i++) {
      const editingElement = list.getElementByIndex(i);
      if (editingElement) {
        editingElement.state = ElementStates.Default;
        if (i === Number(indexInput)) {
          editingElement.head = undefined;
        }
      }
    }
    const element = { letter: inputValue, state: ElementStates.Modified };
    list.addByIndex(element, Number(indexInput));
    setList(new LinkedList(list.toArray()));
    await sleep(SHORT_DELAY_IN_MS);

    element.state = ElementStates.Default;
    setList(new LinkedList(list.toArray()));

    setDisabled(false);
    setAddByIndexLoader(false);
  };

  const deleteElementByIndex = async () => {
    setDisabled(true);
    setDeleteByIndexLoader(true);
    setIndexInput("");
    for (let i = 0; i <= Number(indexInput); i++) {
      const findingElement = list.getElementByIndex(i);
      if (findingElement) {
        if (i === Number(indexInput)) {
          findingElement.tail = findingElement.letter;
          findingElement.letter = "";
        } else {
          findingElement.state = ElementStates.Changing;
        }
      }

      setList(new LinkedList(list.toArray()));
      await sleep(SHORT_DELAY_IN_MS);
    }

    for (let i = 0; i < Number(indexInput); i++) {
      const editingElement = list.getElementByIndex(i);
      if (editingElement) {
        editingElement.state = ElementStates.Default;
      }
    }

    list.deleteByIndex(Number(indexInput));
    setList(new LinkedList(list.toArray()));

    setDisabled(false);
    setDeleteByIndexLoader(false);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.content}>
        <div className={styles.controls}>
          <Input
            placeholder="Введите значение"
            value={inputValue}
            onChange={onChange}
            maxLength={4}
            isLimitText
            extraClass={styles.input}
          />
          <Button
            text="Добавить в head"
            onClick={listPrepend}
            linkedList="small"
            isLoader={addHeadLoader}
            disabled={inputIsEmpty || disabled}
          />
          <Button
            text="Добавить в tail"
            onClick={listAppend}
            linkedList="small"
            isLoader={addTailLoader}
            disabled={inputIsEmpty || disabled}
          />
          <Button
            text="Удалить из head"
            onClick={deleteFromHead}
            linkedList="small"
            isLoader={deleteHeadLoader}
            disabled={linkedListIsEmpty || disabled}
          />
          <Button
            text="Удалить из tail"
            onClick={deleteFromTail}
            linkedList="small"
            isLoader={deleteTailLoader}
            disabled={linkedListIsEmpty || disabled}
          />
        </div>
        <div className={styles.controls}>
          <Input
            placeholder="Введите индекс"
            value={indexInput}
            onChange={onIndexChange}
            extraClass={styles.input}
          />
          <Button
            text="Добавить по индексу"
            onClick={addElementByIndex}
            linkedList="big"
            isLoader={addByIndexLoader}
            disabled={inputIsEmpty || indexInputIsEmpty || disabled || disabledByIndex}
          />
          <Button
            text="Удалить по индексу"
            onClick={deleteElementByIndex}
            linkedList="big"
            isLoader={deleteByIndexLoader}
            disabled={linkedListIsEmpty || indexInputIsEmpty || disabled || disabledByIndex}
          />
        </div>
      </div>
      {circles}
    </SolutionLayout>
  );
};
