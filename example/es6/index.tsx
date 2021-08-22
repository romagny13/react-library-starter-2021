import React from "react";
import ReactDOM from "react-dom";

import { ComponentA } from "../../src/index";

function App() {
  return (
    <>
      <h1>Sample</h1>
      <ComponentA message="It works" />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
