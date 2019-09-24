import { shallow } from "enzyme";
import Selectable from "./index";
import * as React from "react";

describe("Sel3ectable tests", () => {
  const selectable = shallow(
    <Selectable
      onSelectedItemChanged={() => {}}
      notSelectByDefault={false}
      delay={12}
    >
      <div></div>
      <div></div>
      <a className='new'></a>
      <div></div>
    </Selectable>
  );

  selectable.find('a').simulate('click');

  test("saf", () => {
    console.log(selectable.debug());
  });
});
