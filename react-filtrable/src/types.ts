// tslint:disable-next-line: interface-name
import * as React from "react";

export interface IColumnDefinition {
  title: string;
  group?: number;
  enabled?: boolean;
  filter: Filter;
  component: React.ComponentType<FilterComponentProps>;
}

// tslint:disable-next-line: interface-name
export interface SMState {
  [key: string]: any;
}

// tslint:disable-next-line: interface-name
export interface SMTransition {
  from: SMState;
  to: SMState;
}

// tslint:disable-next-line: interface-name
export interface StateMachine {
  initial: SMState;
  transitions: SMTransition[];
}

export interface IColumnsDefinitions extends Record<string, IColumnDefinition> {
  [index: string]: IColumnDefinition;
}

// tslint:disable-next-line: interface-name
export interface Column {
  name: string;
  title: string;
}

// tslint:disable-next-line: interface-name
export interface FilterComponentProps {
  name: string;
  title: string;
  currentState: SMState;
  onClick(): any;
}

// tslint:disable-next-line: interface-name
export interface Filter {
  getNextState(currentState: SMState): SMState;
  getInitialState(): SMState;
}
