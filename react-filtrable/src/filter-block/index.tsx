import * as React from "react";
import { columnsMapper, getDefaultFilters } from "../utils";
import { IColumnsDefinitions, SMState } from "../types";
import { IState } from "./interface";

function createFilterBlock(columnsDefinitions: IColumnsDefinitions) {
  const columns = columnsMapper(columnsDefinitions);
  const defaultFilters = getDefaultFilters(columns, columnsDefinitions);

  return class FilterBlock extends React.PureComponent<
    { onFiltersChange?(filters: Record<string, SMState>): void },
    IState
  > {
    public state = {
      filters: defaultFilters
    };

    public render() {
      const { handleFilterClick } = this;
      const { filters } = this.state;

      return columns.map(column => {
        const Component = columnsDefinitions[column.name].component;

        return (
          <Component
            key={column.name}
            name={column.name}
            title={column.title}
            onClick={handleFilterClick(column.name)}
            currentState={filters[column.name]}
          />
        );
      });
    }

    public getGroupColumnNames = (group: number) => {
      const { filters } = this.state;

      return Object.keys(filters).filter(columnName => {
        return columnsDefinitions[columnName].group === group;
      });
    };

    public changeFilterState = (columnName: string, nextState: SMState) => {
      const filters = { ...this.state.filters };

      const filterGroup = columnsDefinitions[columnName].group;

      // Переключаем остальные фильтры в группе в исходное состояние
      if (filterGroup) {
        const columnNamesWithSameGroup = this.getGroupColumnNames(filterGroup);

        columnNamesWithSameGroup.forEach((filterName: string) => {
          filters[filterName] = defaultFilters[filterName];
        });
      }

      filters[columnName] = nextState;

      this.setState({ filters }, () => {
        if (this.props.onFiltersChange) {
          this.props.onFiltersChange(this.state.filters);
        }
      });
    };

    public handleFilterClick = (columnName: string) => () => {
      const currentState = this.state.filters[columnName];
      const filter = columnsDefinitions[columnName].filter;

      if (filter) {
        const nextState = filter.getNextState(currentState);

        this.changeFilterState(columnName, nextState);
      }
    };
  };
}

export default createFilterBlock;
