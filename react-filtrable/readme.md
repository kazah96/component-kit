# React Filtrable

## Getting Started

**React Filtrable** allows you to build filters. Filter is made from **FilterGenerators**. Each filter works as finite state machine.

## Basic usage

```
import { FilterBlock, BoolFilter } from "@kazah96/react-filtrable";
...
// Component to render
const BoolFilterComponent = ({title, onClick, currentState}) => (
  <div onClick={onClick}>
    {currentState.order === "asc" && "Ascending}
    {currentState.order === "desc" && "Descending"}
    {!currentState.active && "inactive"}
  </div>
)

const columnDefinitions = {
  id: {
    title: "ID",
    filter: BoolFilter
  }
}

render() {
  return (
	<FilterBlock columnDefinitions={columnDefinitions} onFilterChange={(filters) => console.log(filters)}/>
  )
}

```