import { Filter, StateMachine, SMState } from "../types";


export default class FilterGenerator implements Filter {
  public stateMachine: StateMachine;

  public TYPES = {};

  constructor(stateMachine: StateMachine) {
    this.stateMachine = stateMachine;
  }

  public getNextState = (currentState: SMState) => {
    const result = this.stateMachine.transitions.find(item => {
      return JSON.stringify(currentState) === JSON.stringify(item.from);
    });

    if (result) {
      return result.to;
    }

    return this.getInitialState();
  };

  public getInitialState() {
    return this.stateMachine.initial;
  }
}
