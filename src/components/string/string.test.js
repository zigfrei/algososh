import "@testing-library/jest-dom/extend-expect";
import { reversAlgorithm } from "./utils";
import { splitString } from "./utils";
import { ElementStates } from "../../types/element-states";

describe("Testing the string reversal algorithm", () => {
  it("with an even number of characters", async () => {
    const mockSetState = jest.fn();
    jest.setTimeout(6000);
    const inputArray = splitString("1234", ElementStates.Default);
    const outputArray = splitString("4321", ElementStates.Modified);

    await reversAlgorithm(inputArray, mockSetState);
    expect(mockSetState).toBeCalledTimes(4);
    expect(mockSetState).toHaveBeenLastCalledWith(outputArray);
  });

  it("with an odd number of characters", async () => {
    jest.setTimeout(6000);
    const mockSetState = jest.fn();

    const inputArray = splitString("12345", ElementStates.Default);
    const outputArray = splitString("54321", ElementStates.Modified);

    await reversAlgorithm(inputArray, mockSetState);
    expect(mockSetState).toBeCalledTimes(5);
    expect(mockSetState).toHaveBeenLastCalledWith(outputArray);
  });

  it("with one character", async () => {
    jest.setTimeout(6000);
    const mockSetState = jest.fn();
    const inputArray = splitString("1", ElementStates.Default);
    const outputArray = splitString("1", ElementStates.Modified);

    await reversAlgorithm(inputArray, mockSetState);
    expect(mockSetState).toBeCalledTimes(1);
    expect(mockSetState).toHaveBeenLastCalledWith(outputArray);
  });

  it("empty string", async () => {
    const mockSetState = jest.fn();
    const inputArray = [];
    await reversAlgorithm(inputArray, mockSetState);
    expect(mockSetState).toBeCalledTimes(0);
  });
});
