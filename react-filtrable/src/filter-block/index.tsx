import * as React from "react";
import { columnsMapper, getDefaultFilters } from "../utils";
import { SMState } from "../types";
import { IState, IProps } from "./interface";

class FilterBlock extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      filters: this.defaultFilters
    };
  }

  public get defaultFilters() {
    return getDefaultFilters(this.columns, this.props.columnsDefinitions);
  }

  public get columns() {
    const { columns, columnsDefinitions } = this.props;

    return columns ? columns : columnsMapper(columnsDefinitions);
  }

  public render() {
    const {
      handleFilterClick,
      props: { columnsDefinitions }
    } = this;
    const { filters } = this.state;

    return this.columns.map(column => {
      const columnDefinition = columnsDefinitions[column.name];

      if (!columnDefinition) {
        throw new Error(
          `'${column.name}' is not specified in ColumnDefinitions`
        );
      }

      const Component = columnDefinition.component;

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
    const { columnsDefinitions } = this.props;

    return Object.keys(filters).filter(columnName => {
      return columnsDefinitions[columnName].group === group;
    });
  };

  public changeFilterState = (columnName: string, nextState: SMState) => {
    const filters = { ...this.state.filters };
    const { columnsDefinitions } = this.props;

    const filterGroup = columnsDefinitions[columnName].group;

    // Переключаем остальные фильтры в группе в исходное состояние
    if (filterGroup) {
      const columnNamesWithSameGroup = this.getGroupColumnNames(filterGroup);

      columnNamesWithSameGroup.forEach((filterName: string) => {
        filters[filterName] = this.defaultFilters[filterName];
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
    const filter = this.props.columnsDefinitions[columnName].filter;

    if (filter) {
      const nextState = filter.getNextState(currentState);

      this.changeFilterState(columnName, nextState);
    }
  };
}

export default FilterBlock;
