import dataSchemas from "../data-schemas";
import { IColumnsDefinitions, IColumnDefinition, Column, Filter, SMState } from '../types';

// Throws an exception
export function validateColumnsDefinitions(columnsDefinitions: IColumnsDefinitions) {
  return dataSchemas.columnsDefinitions.validateSync(columnsDefinitions);
}

// Throws an exception
export function validateColumnDefinition(columnDefinition: IColumnDefinition) {
  return dataSchemas.columnDefinition.validateSync(columnDefinition);
}

export function columnsMapper(columnsDefinitions: IColumnsDefinitions) {
  validateColumnsDefinitions(columnsDefinitions);

  const keys = Object.keys(columnsDefinitions);

  const columns = keys
    .filter(key => columnsDefinitions[key].enabled !== false)
    .map(key => {
      const columnDefinition = columnsDefinitions[key];

      validateColumnDefinition(columnDefinition);

      return {
        name: key,
        group: columnDefinition.group,
        title: columnDefinition.title
      };
    });

  return columns;
}

export function getDefaultFilters(columns: Array<Column>, columnsDefinitions: IColumnsDefinitions): Record<string, SMState> {
  const filters = {};

  columns.forEach(column => {
    const defaultFilterState = columnsDefinitions[
      column.name
    ].filter.getInitialState();

    if(defaultFilterState) {
      Object.assign(filters, { [column.name]: defaultFilterState });
    }

  });

  return filters;
}


