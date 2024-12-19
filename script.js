document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  let currentValue = "0";
  let operator = null;
  let previousValue = null;

  const updateDisplay = (value) => {
      display.textContent = value;
  };

  const handleNumber = (num) => {
      currentValue = currentValue === "0" ? num : currentValue + num;
  };

  const handleOperator = (op) => {
      if (previousValue === null) {
          previousValue = currentValue;
      } else if (operator) {
          previousValue = calculate(previousValue, currentValue, operator);
      }
      currentValue = "0";
      operator = op;
  };

  const calculate = (prev, curr, op) => {
      const a = parseFloat(prev);
      const b = parseFloat(curr);
      if (isNaN(a) || isNaN(b)) return "Error";

      switch (op) {
          case "+":
              return (a + b).toString();
          case "-":
              return (a - b).toString();
          case "*":
              return (a * b).toString();
          case "/":
              return b === 0 ? "Error" : (a / b).toString();
          default:
              return curr;
      }
  };

  const handleAction = (action) => {
      switch (action) {
          case "clear":
              currentValue = "0";
              operator = null;
              previousValue = null;
              break;
          case "equals":
              if (operator && previousValue !== null) {
                  currentValue = calculate(previousValue, currentValue, operator);
                  operator = null;
                  previousValue = null;
              }
              break;
          case "decimal":
              if (!currentValue.includes(".")) {
                  currentValue += ".";
              }
              break;
          case "sqrt":
              currentValue = Math.sqrt(parseFloat(currentValue)).toString();
              break;
          case "percent":
              currentValue = (parseFloat(currentValue) / 100).toString();
              break;
      }
  };

  document.querySelector(".buttons").addEventListener("click", (e) => {
      const target = e.target;
      if (!target.matches("button")) return;

      const action = target.dataset.action;
      const value = target.textContent;

      if (!action) {
          handleNumber(value);
      } else if (["add", "subtract", "multiply", "divide"].includes(action)) {
          handleOperator(action === "add" ? "+" : action === "subtract" ? "-" : action === "multiply" ? "*" : "/");
      } else {
          handleAction(action);
      }

      updateDisplay(currentValue);
  });
});
