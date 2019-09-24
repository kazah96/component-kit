import createFilterBlock from "./index";
import * as React from "react";
import {
  IColumnsDefinitions,
  StateMachine,
  FilterComponentProps
} from "../types";
import FilterGenerator from "../filter-generator";
import { shallow } from "enzyme";

describe("FilterBlock testing", () => {
  const stateMachine: StateMachine = {
    initial: { isActive: false },
    transitions: [
      {
        from: {
          isActive: true
        },
        to: { isActive: false }
      },
      {
        from: {
          isActive: false
        },
        to: { isActive: true }
      }
    ]
  };

  const RenderComponent = ({
    currentState,
    onClick,
    name,
    title
  }: FilterComponentProps) => {
    if (currentState.isActive === true) {
      return <div onClick={onClick} id={name} className="true"></div>;
    }
    if (currentState.isActive === false) {
      return <div onClick={onClick} id={name} className="false"></div>;
    }
    return <div onClick={onClick} id={name} className="undef"></div>;
  };

  const columnDefinitions: IColumnsDefinitions = {
    id: {
      title: "ID",
      filter: new FilterGenerator(stateMachine),
      component: RenderComponent
    }
  };

  const columnDefinitionsThreeFilters: IColumnsDefinitions = {
    id: {
      title: "ID",
      filter: new FilterGenerator(stateMachine),
      component: RenderComponent
    },
    title: {
      title: "Title",
      filter: new FilterGenerator(stateMachine),
      component: RenderComponent
    },
    titlew: {
      title: "Title",
      filter: new FilterGenerator(stateMachine),
      component: RenderComponent
    }
  };

  test("Creating single filter", () => {
    const FilterBlock = createFilterBlock(columnDefinitions);
    const BlockComponent = shallow(<FilterBlock />);

    expect(BlockComponent.dive().find(".false").length).toEqual(1);
  });

  test("Creating three filters", () => {
    const FilterBlock = createFilterBlock(columnDefinitionsThreeFilters);
    const BlockComponent = shallow(<FilterBlock />);

    expect(BlockComponent.length).toEqual(3);
  });

  test("Onclick simultation filter", () => {
    const FilterBlock = createFilterBlock(columnDefinitions);
    const BlockComponent = shallow(<FilterBlock />);

    BlockComponent.dive()
      .find("div")
      .simulate("click");

    expect(BlockComponent.dive().find(".true").length).toEqual(1);
  });

  describe("Onclick and onFilterChange", () => {
    const FilterBlock = createFilterBlock(columnDefinitions);
    const fn = jest.fn();
    const BlockComponent = shallow(<FilterBlock onFiltersChange={fn} />);

    BlockComponent.dive()
      .find("div")
      .simulate("click");

    BlockComponent.dive()
      .find("div")
      .simulate("click");

    BlockComponent.dive()
      .find("div")
      .simulate("click");

    test("To have first call to be Active", () => {
      expect(fn.mock.calls[0][0].id.isActive).toBeTruthy();
    });

    test("To have second call not to be Active", () => {
      expect(fn.mock.calls[1][0].id.isActive).toBeFalsy();
    });

    test("To have third call to be Active", () => {
      expect(fn.mock.calls[2][0].id.isActive).toBeTruthy();
    });
  });

  describe("Column from props", () => {
    const FilterBlock = createFilterBlock(columnDefinitionsThreeFilters);

    test("To have two columns", () => {
      const columns = [
        { name: "id", title: "sa" },
        { name: "title", title: " sdf" }
      ];

      const BlockComponent = shallow(<FilterBlock columns={columns} />);

      expect(BlockComponent.length).toEqual(2);
    });

    test("To throw error; no such column definition", () => {
      const columns = [
        { name: "no such column", title: "sa" },
      ];

      expect(() => shallow(<FilterBlock columns={columns} />)).toThrowError();
    })
  });

  // describe("Filters grouping", () => {
  //   const FilterBlock = createFilterBlock(columnDefinitionsThreeFilters);
  //   const fn = jest.fn();
  //   const BlockComponent = shallow(<FilterBlock onFiltersChange={fn}/>);

  //   const idComp = BlockComponent.at(0).simulate('click')

  //   console.log(idComp.debug())
  // });
});
