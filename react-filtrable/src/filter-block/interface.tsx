import { SMState, Column, IColumnsDefinitions } from '../types';

export interface IState {
  filters: Record<string, SMState>;
}

export interface IProps {
  columns?: Column[] | null;
  columnsDefinitions: IColumnsDefinitions;
  onFiltersChange?(filters: Record<string, SMState>): void;
}
