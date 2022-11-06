import renderer from "react-test-renderer";
import { Circle } from "../circle/circle"
import { ElementStates } from "../../../types/element-states";
import "@testing-library/jest-dom/extend-expect";


describe("testing Circle component for render and Match Snapshot", () => {
  it("circle without text", () => {
    const CircleWithoutText = renderer.create(<Circle />);
    expect(CircleWithoutText).toMatchSnapshot();
  });
  it("circle with text", () => {
    const CircleWithText = renderer.create(<Circle letter={"Snapshot"} />);
    expect(CircleWithText).toMatchSnapshot();
  });
  it("circle with text head", () => {
    const CircleWithTextHead = renderer.create(<Circle head={"Snapshot"} />);
    expect(CircleWithTextHead).toMatchSnapshot();
  });
  it("circle with element head", () => {
    const CircleWithElementHead = renderer.create(
      <Circle head={<Circle isSmall={true} />} />
    );
    expect(CircleWithElementHead).toMatchSnapshot();
  });
  it("circle with text tail", () => {
    const CircleWithTextTail = renderer.create(<Circle tail={"Snapshot"} />);
    expect(CircleWithTextTail).toMatchSnapshot();
  });
  it("circle with element tail", () => {
    const CircleWithElementTail = renderer.create(
      <Circle tail={<Circle isSmall={true} />} />
    );
    expect(CircleWithElementTail).toMatchSnapshot();
  });
  it("small circle", () => {
    const SmallCircle = renderer.create(<Circle isSmall={true} />);
    expect(SmallCircle).toMatchSnapshot();
  });
  it("default circle", () => {
    const DefaultCircle = renderer.create(<Circle />);
    expect(DefaultCircle).toMatchSnapshot();
  });
  it("changing circle", () => {
    const ChangingCircle = renderer.create(
      <Circle state={ElementStates.Changing} />
    );
    expect(ChangingCircle).toMatchSnapshot();
  });
  it("modified circle", () => {
    const ModifiedCircle = renderer.create(
      <Circle state={ElementStates.Modified} />
    );
    expect(ModifiedCircle).toMatchSnapshot();
  });
});
