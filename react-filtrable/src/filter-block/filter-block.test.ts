import createFilterBlock from "./index";
import { IColumnsDefinitions } from "../types";
import FilterGenerator from "../filter-generator";
import { shallow } from "enzyme";

describe("FilterBlock testing", () => {
  test("Creating Filter Block compoent", () => {
    const aw: IColumnsDefinitions = {
      id: { title: "sdfsd", filter: new FilterGenerator(null, null) }
    };

    const FilterBlock = createFilterBlock(aw) as any;
    console.log(FilterBlock);
    console.log("sdf");

    const w = shallow(FilterBlock);
    console.log(w);

    expect(FilterBlock).toEqual(w);
  });
});
