import React from "react";
import "./App.css";
import ReactSelectable from "@kazah96/react-selectable/lib/src/index";
import { FilterBlock, BoolFilter } from "@kazah96/react-filtrable";

const Item = ({ onClick, isSelected }) => (
  <div onClick={onClick}>
    sdfsdf
    {isSelected && "sdfsd"}
  </div>
);

const Filter = ({ currentState, onClick }) => (
  <div onClick={onClick}>FILTER {currentState.bool && "HUU"} {currentState.active && "isactive"} </div>
);

class App extends React.PureComponent {
  state = { items: [] };
  render() {
    return (
      <div className="App">
        <button onClick={() => this.setState({ items: [12, 15, 56, 23] })}>
          sdfsdf
        </button>
        <ReactSelectable onSelectedItemChanged={console.log}>
          {this.state.items.map(item => {
            return <Item key={item} />;
          })}
        </ReactSelectable>

        <FilterBlock
          columnsDefinitions={{
            id: { title: "ID", filter: BoolFilter, component: Filter }
          }}
        />
      </div>
    );
  }
}

export default App;
