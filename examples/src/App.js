import React from "react";
import "./App.css";
import ReactSelectable from "@kazah96/react-selectable/lib/src/index";

const Item = ({ onClick, isSelected }) => (
  <div onClick={onClick}>
    sdfsdf
    {isSelected && "sdfsd"}
  </div>
);

function App() {
  return (
    <div className="App">
      <ReactSelectable>
        <Item />
        <Item />
        <Item />
      </ReactSelectable>
    </div>
  );
}

export default App;
