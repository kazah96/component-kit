import * as React from 'react';
import { DFMState } from './filter-block/interface';

export interface IColumnDefinition {
  title: string;
  group?: number;
  enabled?: boolean;
  filter?: Filter;
}

export interface IColumnsDefinitions extends Record<string, IColumnDefinition> {
  [index: string]: IColumnDefinition;
}

export interface Column {
  name: string;
  title: string;
}

export interface FilterComponentProps {
  currentState: DFMState;
  onClick(columnName: string): void;
}

export interface Filter {
  getComponent(): React.ComponentType<FilterComponentProps>;
  getNextState(currentState: DFMState): DFMState;
}