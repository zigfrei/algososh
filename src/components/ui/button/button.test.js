import renderer from "react-test-renderer";
import { Button } from "../button/button";
import {
  render,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("testing Button component for render and Match Snapshot", () => {
  it("button with text", () => {
    const ButtonWithText = renderer.create(<Button text="Текст кнопки" />);
    expect(ButtonWithText).toMatchSnapshot();
  });
  it("button without text", () => {
    const ButtonWithoutText = renderer.create(<Button />);
    expect(ButtonWithoutText).toMatchSnapshot();
  });
  it("disabled button", () => {
    const DisabledButton = renderer.create(<Button disabled={true} />);
    expect(DisabledButton).toMatchSnapshot();
  });
  it("button loading", () => {
    const LoadingButton = renderer.create(<Button isLoader={true} />);
    expect(LoadingButton).toMatchSnapshot();
  });
});

describe("should calls the handler", () => {
  it("on click", () => {
    const handler = jest.fn();
    const { getByTestId } = render(
      <Button text="Кнопка для теста" onClick={handler} data-testid="button" />
    );
    const TestButton = getByTestId("button");
    //проверяем является ли кнопкой
    expect(TestButton.tagName).toBe("BUTTON");
    //нажимаем на кнопку
    fireEvent.click(TestButton);
    //проверяем вызвался ли callback
    expect(handler).toHaveBeenCalled();
  });
});