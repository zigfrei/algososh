import "@testing-library/jest-dom/extend-expect";
import {
  ascendingBubleSort,
  descendingBubleSort,
  ascendingSelectSort,
  descendingSelectSort,
} from "./utils";
import { ElementStates } from "../../types/element-states";

const oneElementOutputArray = [{ index: 1, color: ElementStates.Modified }];

const ascendingMultipleOutputArray = [
  { index: 1, color: ElementStates.Modified },
  { index: 2, color: ElementStates.Modified },
  { index: 3, color: ElementStates.Modified },
  { index: 4, color: ElementStates.Modified },
];

const descendingMultipleOutputArray = [
  { index: 4, color: ElementStates.Modified },
  { index: 3, color: ElementStates.Modified },
  { index: 2, color: ElementStates.Modified },
  { index: 1, color: ElementStates.Modified },
];

describe("Testing ascending buble sorting algorithm", () => {
  it("with empty array", async () => {
    const mockSetState = jest.fn();
    jest.setTimeout(6000);
    const inputArray = [];
    await ascendingBubleSort(inputArray, mockSetState);
    expect(mockSetState).toBeCalledTimes(0);
  });

  it("with an array from one element", async () => {
    const oneElementInputArray = [{ index: 1, color: ElementStates.Default }];
    const mockSetState = jest.fn();
    jest.setTimeout(6000);
    await ascendingBubleSort(oneElementInputArray, mockSetState);
    expect(mockSetState).toHaveBeenLastCalledWith(oneElementOutputArray);
  });

  it("with an array of multiple elements", async () => {
    const multipleInputArray = [
      { index: 3, color: ElementStates.Default },
      { index: 1, color: ElementStates.Default },
      { index: 4, color: ElementStates.Default },
      { index: 2, color: ElementStates.Default },
    ];
    const mockSetState = jest.fn();
    jest.setTimeout(6000);
    await ascendingBubleSort(multipleInputArray, mockSetState);
    expect(mockSetState).toHaveBeenLastCalledWith(ascendingMultipleOutputArray);
  });
});

describe("Testing descending buble sorting algorithm", () => {
  it("with empty array", async () => {
    const mockSetState = jest.fn();
    jest.setTimeout(10000);
    const inputArray = [];
    await descendingBubleSort(inputArray, mockSetState);
    expect(mockSetState).toBeCalledTimes(0);
  });

  it("with an array from one element", async () => {
    const oneElementInputArray = [{ index: 1, color: ElementStates.Default }];
    const mockSetState = jest.fn();
    jest.setTimeout(10000);
    await descendingBubleSort(oneElementInputArray, mockSetState);
    expect(mockSetState).toHaveBeenLastCalledWith(oneElementOutputArray);
  });

  it("with an array of multiple elements", async () => {
    const multipleInputArray = [
      { index: 3, color: ElementStates.Default },
      { index: 1, color: ElementStates.Default },
      { index: 4, color: ElementStates.Default },
      { index: 2, color: ElementStates.Default },
    ];
    const mockSetState = jest.fn();
    jest.setTimeout(10000);
    await descendingBubleSort(multipleInputArray, mockSetState);
    expect(mockSetState).toHaveBeenLastCalledWith(
      descendingMultipleOutputArray
    );
  });
});

describe("Testing ascending select sorting algorithm", () => {
  it("with empty array", async () => {
    const mockSetState = jest.fn();
    jest.setTimeout(6000);
    const inputArray = [];
    await ascendingSelectSort(inputArray, mockSetState);
    expect(mockSetState).toBeCalledTimes(0);
  });

  it("with an array from one element", async () => {
    const oneElementInputArray = [{ index: 1, color: ElementStates.Default }];
    const mockSetState = jest.fn();
    jest.setTimeout(6000);
    await ascendingSelectSort(oneElementInputArray, mockSetState);
    expect(mockSetState).toHaveBeenLastCalledWith(oneElementOutputArray);
  });

  it("with an array of multiple elements", async () => {
    const multipleInputArray = [
      { index: 3, color: ElementStates.Default },
      { index: 1, color: ElementStates.Default },
      { index: 4, color: ElementStates.Default },
      { index: 2, color: ElementStates.Default },
    ];
    const mockSetState = jest.fn();
    jest.setTimeout(6000);
    await ascendingSelectSort(multipleInputArray, mockSetState);
    expect(mockSetState).toHaveBeenLastCalledWith(ascendingMultipleOutputArray);
  });
});

describe("Testing descending select sorting algorithm", () => {
  it("with empty array", async () => {
    const mockSetState = jest.fn();
    jest.setTimeout(6000);
    const inputArray = [];
    await descendingSelectSort(inputArray, mockSetState);
    expect(mockSetState).toBeCalledTimes(0);
  });

  it("with an array from one element", async () => {
    const oneElementInputArray = [{ index: 1, color: ElementStates.Default }];
    const mockSetState = jest.fn();
    jest.setTimeout(6000);
    await descendingSelectSort(oneElementInputArray, mockSetState);
    expect(mockSetState).toHaveBeenLastCalledWith(oneElementOutputArray);
  });

  it("with an array of multiple elements", async () => {
    const multipleInputArray = [
      { index: 3, color: ElementStates.Default },
      { index: 1, color: ElementStates.Default },
      { index: 4, color: ElementStates.Default },
      { index: 2, color: ElementStates.Default },
    ];
    const mockSetState = jest.fn();
    jest.setTimeout(6000);
    await descendingSelectSort(multipleInputArray, mockSetState);
    expect(mockSetState).toHaveBeenLastCalledWith(
      descendingMultipleOutputArray
    );
  });
});
