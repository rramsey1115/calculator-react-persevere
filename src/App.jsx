import { useState } from "react";
import "./App.css";
import { evaluate } from "mathjs";

function App() {
  const [output, setOutput] = useState(0);
  const [equation, setEquation] = useState("");

  const handleClear = () => {
    // clears the equation and display output
    setOutput(0);
    setEquation("");
  };

  const handleDelete = () => {
    // deletes the latest entry to the equation
    const newEquation = equation.slice(0, -1);
    setEquation(newEquation);
  };

  const handleNumber = (e) => {
    const lastEl = equation.split(" ").pop();
    // doesn't allow multiple leading zeroes
    if (!(lastEl === "0" && e.target.value === "0")) {
      setEquation((previous) => (previous += e.target.value));
    }
  };

  const handleOperator = (e) => {
    const arr = equation.split(" ");
    const lastEl = arr[arr.length - 1];
    const operatorRegex = /^[+\-*/]$/;

    // Prevent adding an operator if the last element is an operator or a decimal
    if (!operatorRegex.test(lastEl) && lastEl !== "." && lastEl !== "") {
      const newEquation = equation + " " + e.target.value + " ";
      setEquation(newEquation);
    } else if (lastEl === "" && arr.length > 1) {
      // Replace the last operator if the user tries to enter a new one
      arr[arr.length - 2] = e.target.value;
      setEquation(arr.join(" "));
    }
  };

  const handleDecimal = (e) => {
    const arr = equation.split(" ");
    const lastEl = arr[arr.length - 1];

    // Check if lastEl is a number and does not already include a decimal point
    if (!lastEl.includes(".") && !isNaN(lastEl)) {
      setEquation((equation) => equation + ".");
    } else if (lastEl === "" || isNaN(lastEl)) {
      // Handle the case where the last element is an operator or empty
      // Prevent adding multiple decimals in sequence
      if (lastEl !== ".") {
        setEquation((equation) => equation + "0.");
      }
    }
  };

  const handleEqual = () => {
    console.log("handle Equals Clicked: ", equation);

    // Remove trailing operator if present
    const trimmedEquation = equation.trim().replace(/[\+\-\*\/]$/, "");

    try {
      // Use mathjs to evaluate the equation with correct order of operations
      const result = evaluate(trimmedEquation);

      // Check if the result has decimal places
      const formattedResult = Number.isInteger(result)
        ? result.toString()
        : result.toFixed(4);

      setOutput(formattedResult);
      setEquation(formattedResult);
    } catch (error) {
      // Handle invalid equations gracefully
      setOutput("Error");
      setEquation("");
    }
  };

  return (
    <>
      <header id="header">
        <h1 id="header_title">Calculator React Project</h1>
      </header>
      <main id="main">
        <div id="calculator">
          <p className="calculator-text">Equation:</p>
          <div id="equation-display">{equation}</div>
          <p className="calculator-text">Result:</p>
          <div id="output-display">{output}</div>
          <div id="button-container">
            <div>
              <button
                id="clear"
                value="AC"
                className="btn lg-btn"
                onClick={handleClear}
              >
                AC
              </button>
              <button
                id="delete"
                value="DE"
                className="btn sm-btn"
                onClick={handleDelete}
              >
                DE
              </button>
              <button
                id="divide"
                value="/"
                className="btn sm-btn operator-btn"
                onClick={handleOperator}
              >
                /
              </button>
            </div>
            <div>
              <button
                id="seven"
                value="7"
                className="btn sm-btn"
                onClick={handleNumber}
              >
                7
              </button>
              <button
                id="8"
                value="8"
                className="btn sm-btn"
                onClick={handleNumber}
              >
                8
              </button>
              <button
                id="nine"
                value="9"
                className="btn sm-btn"
                onClick={handleNumber}
              >
                9
              </button>
              <button
                id="mulitply"
                value="*"
                className="btn sm-btn operator-btn"
                onClick={handleOperator}
              >
                x
              </button>
            </div>
            <div>
              <button
                id="four"
                value="4"
                className="btn sm-btn"
                onClick={handleNumber}
              >
                4
              </button>
              <button
                id="five"
                value="5"
                className="btn sm-btn"
                onClick={handleNumber}
              >
                5
              </button>
              <button
                id="six"
                value="6"
                className="btn sm-btn"
                onClick={handleNumber}
              >
                6
              </button>
              <button
                id="subtract"
                value="-"
                className="btn sm-btn operator-btn"
                onClick={handleOperator}
              >
                -
              </button>
            </div>
            <div>
              <button
                id="one"
                value="1"
                className="btn sm-btn"
                onClick={handleNumber}
              >
                1
              </button>
              <button
                id="two"
                value="2"
                className="btn sm-btn"
                onClick={handleNumber}
              >
                2
              </button>
              <button
                id="three"
                value="3"
                className="btn sm-btn"
                onClick={handleNumber}
              >
                3
              </button>
              <button
                id="add"
                value="+"
                className="btn sm-btn operator-btn"
                onClick={handleOperator}
              >
                +
              </button>
            </div>
            <div>
              <button
                id="decimal"
                value="."
                className="btn sm-btn"
                onClick={handleDecimal}
              >
                .
              </button>
              <button
                id="zero"
                value="0"
                className="btn sm-btn"
                onClick={handleNumber}
              >
                0
              </button>
              <button
                id="equals"
                value="="
                className="btn lg-btn"
                onClick={handleEqual}
              >
                =
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
