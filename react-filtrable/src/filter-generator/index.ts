import { Filter, FilterComponentProps } from "../types";

export default class FilterGenerator implements Filter {
  stateMachine: any;
  renderComponent: React.ComponentType<FilterComponentProps>;

  constructor(stateMachine: any, renderComponent: any) {
    this.stateMachine = stateMachine;
    this.renderComponent = renderComponent;
  }

  getNextState() {
    return { active: false };
  }

  getDefaultState() {}

  getComponent = (): React.ComponentType<FilterComponentProps> => {
    return this.renderComponent;
  };
}
