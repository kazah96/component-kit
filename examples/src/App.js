import React from "react";
import "./App.css";
import ReactSelectable from "@kazah96/react-selectable/lib/src/index";

const Item = ({ onClick, isSelected }) => (
  <div onClick={onClick}>
    sdfsdf
    {isSelected && "sdfsd"}
  </div>
);

class App extends React.PureComponent {
  state = { items: [1, 2, 3] };
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
      </div>
    );
  }
}

export default App;
