import * as React from "react";
import { columnsMapper, getDefaultFilters } from "../utils";
import { IColumnsDefinitions } from "../types";
import { IState, IProps, DFMState } from "./interface";

function createFilterBlock(columnsDefinitions: IColumnsDefinitions) {
  const columns = columnsMapper(columnsDefinitions);
  const defaultFilters = getDefaultFilters(columns, columnsDefinitions);

  return class FilterBlock extends React.PureComponent<IProps, IState> {
    state = {
      filters: defaultFilters
    };

    getGroupColumnNames = (group: number) => {
      const { filters } = this.state;

      return Object.keys(filters).filter(columnName => {
        return columnsDefinitions[columnName].group === group;
      });
    };

    changeFilterState = (columnName: string, nextState: DFMState) => {
      const filters = { ...this.state.filters };

      const filterGroup = columnsDefinitions[columnName].group;

      // Переключаем остальные фильтры в группе в исходное состояние
      if (filterGroup) {
        const columnNamesWithSameGroup = this.getGroupColumnNames(
          filterGroup
        );

        columnNamesWithSameGroup.forEach((filterName: string) => {
          filters[filterName] = defaultFilters[filterName];
        });
      }

      filters[columnName] = nextState;

      this.setState({ filters });
    };

    handleFilterClick = (columnName: string) => () => {
      const currentState = this.state.filters[columnName];
      const filter = columnsDefinitions[columnName].filter;

      if (filter) {
        const nextState = filter.getNextState(currentState);

        this.changeFilterState(columnName, nextState);
      }
    };

    render() {
      const { handleFilterClick } = this;
      const { filters } = this.state;

      return columns.map(column => {
        const filter = columnsDefinitions[column.name].filter;

        if (filter) {
          const FilterComponent = filter.getComponent();

          return (
            <FilterComponent
              key={column.name}
              currentState={filters[column.name]}
              onClick={handleFilterClick(column.name)}
            />
          );
        }
      });
    }
  };
}

export default createFilterBlock;
