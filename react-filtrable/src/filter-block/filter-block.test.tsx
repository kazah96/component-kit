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

  const RenderComponent = ({ currentState, onClick }: FilterComponentProps) => {
    if (currentState.isActive === true) {
      return <div onClick={onClick} className="true"></div>;
    }
    if (currentState.isActive === false) {
      return <div onClick={onClick} className="false"></div>;
    }
    return <div onClick={onClick} className="undef"></div>;
  };

  const columnDefinitions: IColumnsDefinitions = {
    id: {
      title: "ID",
      filter: new FilterGenerator(stateMachine),
      component: RenderComponent
    }
  };

  const columnDefinitionsTwoFilters: IColumnsDefinitions = {
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

  beforeEach(() => {});

  test("Creating single filter", () => {
    const FilterBlock = createFilterBlock(columnDefinitions);
    const BlockComponent = shallow(<FilterBlock />);

    expect(BlockComponent.dive().find(".false").length).toEqual(1);
  });

  test("Creating three filters", () => {
    const FilterBlock = createFilterBlock(columnDefinitionsTwoFilters);
    const BlockComponent = shallow(<FilterBlock />);

    expect(BlockComponent.length).toEqual(3);
  });

  test("Onclick simultation filter", () => {
    const FilterBlock = createFilterBlock(columnDefinitions);
    const BlockComponent = shallow(<FilterBlock />);

    BlockComponent.dive().find('div').simulate('click');

    expect(BlockComponent.dive().find('.true').length).toEqual(1);
  });
});
