import dataSchemas from "./dataSchemas";
import { IColumnsDefinitions, IColumnDefinition, Column, Filter } from './types';
import { DFMState } from './filter-block/interface';

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

export function getDefaultFilters(columns: Array<Column>, columnsDefinitions: IColumnsDefinitions): Record<string, DFMState> {
  const filters = {};

  columns.forEach(column => {
    const defaultFilterState = columnsDefinitions[
      column.name
    ];

    if(defaultFilterState) {
      Object.assign(filters, { [column.name]: defaultFilterState });
    }

  });

  return filters;
}


