import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./queue-page.module.css";
import { v4 as uuidv4 } from "uuid";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./queue";
import { sleep } from "../../utils/utils";

export interface IQueue {
  letter: string;
  state: ElementStates;
  head?: string;
  tail?: string;
}

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const queueSize = 7;
  const [queue, setQueue] = useState(new Queue<IQueue>({ size: queueSize }));
  let temp: (IQueue | null)[] = [];

  const queueValues = useMemo(() => queue.toArray(), [queue]);
  const inputIsEmpty = useMemo(() => inputValue.length === 0, [inputValue]);
  const queueIsEmpty = useMemo(
    () => queueValues.every((el) => el === null),
    [queueValues]
  );

  const [circles, setCircles] = useState(
    <div className={styles.circles}></div>
  );

  const drawCircles = () => {
    setCircles(
      <div className={styles.circles}>
        {temp.map((el, index, array) => {
          return (
            <Circle
              letter={el?.letter}
              state={el?.state}
              key={uuidv4()}
              index={index}
              extraClass="mr-8 mb-35"
              head={
                queue.getHead() % queue.getSize() === index && el?.letter
                  ? "head"
                  : ""
              }
              tail={
                ((queue.getTail() - 2) % queue.getSize() === index &&
                  array[(queue.getTail() - 1) % queue.getSize()]?.letter ===
                    "") ||
                ((queue.getTail() - 1) % queue.getSize() === index &&
                  el?.letter)
                  ? "tail"
                  : ""
              }
            ></Circle>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    temp = queue.toArray();
    drawCircles();
  }, [queue]);

  const [addLoader, setAddLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [clearLoader, setClearLoader] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((e.target as unknown as HTMLTextAreaElement).value);
  };

  const getQueueOptions = (queue: Queue<IQueue>) => ({
    size: 7,
    options: {
      container: queue.toArray(),
      head: queue.getHead(),
      tail: queue.getTail(),
      size: queue.getSize(),
      length: queue.getLength(),
    },
  });

  const handlerEnqueue = async () => {
    setDisabled(true);
    setAddLoader(true);
    setInputValue("");

    const element = { letter: "", state: ElementStates.Changing };
    queue.enqueue(element);
    setQueue(new Queue(getQueueOptions(queue)));
    temp = queue.toArray();

    await sleep(SHORT_DELAY_IN_MS);

    element.letter = inputValue;
    element.state = ElementStates.Default;
    setQueue(new Queue(getQueueOptions(queue)));
    temp = queue.toArray();

    setDisabled(false);
    setAddLoader(false);
  };

  const handlerDequeue = async () => {
    setDeleteLoader(true);
    setDisabled(true);

    const lastElement = queue.peak();
    if (lastElement) {
      lastElement.state = ElementStates.Changing;
      setQueue(new Queue(getQueueOptions(queue)));
    }
    temp = queue.toArray();

    await sleep(SHORT_DELAY_IN_MS);

    queue.dequeue();
    setQueue(new Queue(getQueueOptions(queue)));
    temp = queue.toArray();

    setDeleteLoader(false);
    setDisabled(false);
  };

  const clear = async () => {
    setDisabled(true);
    setClearLoader(true);

    await sleep(SHORT_DELAY_IN_MS);
    setQueue(new Queue({ size: queueSize }));
    temp = queue.toArray();
    setDisabled(false);
    setClearLoader(false);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.content}>
        <Input
          type="text"
          maxLength={4}
          isLimitText={true}
          extraClass="mr-6"
          value={inputValue}
          onChange={onChange}
        ></Input>
        <Button
          text="Добавить"
          onClick={handlerEnqueue}
          isLoader={addLoader}
          disabled={disabled || inputIsEmpty}
          extraClass="mr-6"
        ></Button>{" "}
        <Button
          text="Удалить"
          onClick={handlerDequeue}
          isLoader={deleteLoader}
          disabled={disabled || queueIsEmpty}
          extraClass="mr-40"
        ></Button>{" "}
        <Button
          text="Очистить"
          onClick={clear}
          isLoader={clearLoader}
          disabled={disabled || queueIsEmpty}
          extraClass="mr-6"
        ></Button>{" "}
      </div>
      {circles}
    </SolutionLayout>
  );
};
