import { Filter, StateMachine, SMState } from "../types";


export default class FilterGenerator implements Filter {
  stateMachine: StateMachine;

  constructor(stateMachine: StateMachine) {
    this.stateMachine = stateMachine;
  }

  getNextState = (currentState: SMState) => {
    const result = this.stateMachine.transitions.find(item => {
      return JSON.stringify(currentState) === JSON.stringify(item.from);
    });

    if (result) {
      return result.to;
    }

    return this.getInitialState();
  };

  getInitialState() {
    return this.stateMachine.initial;
  }
}
