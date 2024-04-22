document.addEventListener("DOMContentLoaded", function() {
  const display = document.querySelector('#display');
  const historyDisplay = document.querySelector('#history');
  const buttons = document.querySelectorAll('button');
  let history = [];

  buttons.forEach((item) => {
      item.addEventListener('click', () => {
          if (item.id === 'clear') {
              display.textContent = '';
              history = []; // Clear the history array
              updateHistory(); // Update the history display
          } else if (item.id === 'backspace') {
              display.textContent = display.textContent.slice(0, -1);
          } else if (item.id === '=') {
              try {
                  const expression = display.textContent;
                  const result = evaluateExpression(expression);
                  if (result !== null) {
                      const operation = `${expression} = ${result}`;
                      history.push(operation);
                      updateHistory();
                      display.textContent = result;
                  } else {
                      display.textContent = 'Error';
                  }
              } catch (error) {
                  console.error('Error:', error.message);
                  display.textContent = 'Error';
              }
          } else {
              display.textContent += item.textContent;
          }
      });
  });

  function evaluateExpression(expression) {
      const sanitizedExpression = expression.replace(/÷/g, '/').replace(/×/g, '*');
      const result = eval(sanitizedExpression);
      if (!isFinite(result) || isNaN(result)) {
          throw new Error('Invalid expression');
      }
      return result;
  }

  function updateHistory() {
      historyDisplay.innerHTML = '';
      history.forEach((operation, index) => {
          const item = document.createElement('div');
          item.textContent = `${index + 1}. ${operation}`;
          historyDisplay.appendChild(item);
      });
  }

  const themeToggleBtn = document.querySelector('.theme-toggler');
  const calculator = document.querySelector('.calculator');
  let isDark = true;

  themeToggleBtn.addEventListener('click', () => {
      calculator.classList.toggle('dark');
      themeToggleBtn.classList.toggle('active');
      isDark = !isDark;
  });
});
