import * as React from "react";

export interface IColumnDefinition {
  title: string;
  group?: number;
  enabled?: boolean;
  filter: Filter;
  component: React.ComponentType<FilterComponentProps>;
}

export interface SMState {
  [key: string]: any;
}

export interface SMTransition {
  from: SMState;
  to: SMState;
}

export interface StateMachine {
  initial: SMState;
  transitions: Array<SMTransition>;
}

export interface IColumnsDefinitions extends Record<string, IColumnDefinition> {
  [index: string]: IColumnDefinition;
}

export interface Column {
  name: string;
  title: string;
}

export interface FilterComponentProps {
  currentState: SMState;
  onClick(): any;
}

export interface Filter {
  getNextState(currentState: SMState): SMState;
  getInitialState(): SMState;
}
