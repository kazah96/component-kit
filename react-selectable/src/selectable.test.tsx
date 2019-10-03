import Selectable from "./index";
import * as React from "react";
import { shallow } from "enzyme";

describe("Selectable tests", () => {
  test("Dumb test", () => {
    expect(true).toBeTruthy();
  });

  test("Should emmit handleChage on first elemtn", () => {
    const fn = jest.fn();
    const q = shallow(
      <Selectable onSelectedItemChanged={fn}>
        <div>sdfsdf</div>
      </Selectable>
    );

    expect(fn.mock.calls.length).toEqual(1)
  });

});
