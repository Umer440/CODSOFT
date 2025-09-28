const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let resultDisplayed = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (value === 'C') {
      currentInput = '';
      updateDisplay('0');
    } else if (value === 'DEL') {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput || '0');
    } else if (value === '=') {
      try {
        const safeInput = currentInput.replace(/[^0-9+\-*/%.]/g, '');
        const result = Function(`return ${safeInput}`)();
        updateDisplay(result);
        currentInput = result.toString();
        resultDisplayed = true;
      } catch {
        updateDisplay('Error');
        currentInput = '';
      }
    } else {
      if (resultDisplayed && !isNaN(value)) {
        currentInput = value;
        resultDisplayed = false;
      } else {
        currentInput += value;
      }
      updateDisplay(currentInput);
    }
  });
});

function updateDisplay(content) {
  display.textContent = content;
}

// Optional: Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if ('0123456789.+-*/%'.includes(key)) {
    currentInput += key;
    updateDisplay(currentInput);
  } else if (key === 'Enter') {
    e.preventDefault();
    document.querySelector('[data-value="="]').click();
  } else if (key === 'Backspace') {
    document.querySelector('[data-value="DEL"]').click();
  } else if (key === 'Escape') {
    document.querySelector('[data-value="C"]').click();
  }
});
