/**
 * Decorates the quiz block
 * @param {Element} block The quiz block element
 */
export default function decorate(block) {
  // Function to show/hide continue button based on selection
  function showContinueButton() {
    const continueButton = block.querySelector('.quiz-continue-button');
    if (block.querySelector('.quiz-option-button.selected')) {
      continueButton.style.display = 'block';
    } else {
      continueButton.style.display = 'none';
    }
  }

  // Find divider heading and replace with styled divider
  const dividerHeading = block.querySelector('h2#divider');
  if (dividerHeading && dividerHeading.textContent.toLowerCase() === 'divider') {
    const divider = document.createElement('div');
    divider.className = 'quiz-divider';
    dividerHeading.parentElement.replaceChild(divider, dividerHeading);
  }

  // Create grid container for options
  const options = block.querySelectorAll('div[data-align="center"] p');
  if (options.length) {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'quiz-options-grid';
    
    // Convert paragraphs to buttons
    options.forEach((option) => {
      const button = document.createElement('button');
      button.className = 'quiz-option-button';
      button.textContent = option.textContent;
      button.addEventListener('click', () => {
        button.classList.toggle('selected');
        showContinueButton();
      });
      gridContainer.appendChild(button);
    });

    // Replace original options with grid
    const firstOption = options[0].closest('div[data-align="center"]').parentElement;
    const parent = firstOption.parentElement;
    options.forEach(option => option.closest('div[data-align="center"]').parentElement.remove());
    parent.appendChild(gridContainer);

    // Create continue button (hidden by default)
    const continueButton = document.createElement('button');
    continueButton.className = 'quiz-continue-button';
    continueButton.textContent = 'Continue →';
    continueButton.style.display = 'none';
    continueButton.addEventListener('click', () => {
      // Remove grid and continue button
      gridContainer.remove();
      continueButton.remove();

      // Create and show message
      const message = document.createElement('h2');
      message.textContent = 'Not yet implemented 🙈';
      message.style.textAlign = 'center';
      message.style.marginTop = '2rem';
      parent.appendChild(message);
    });
    parent.appendChild(continueButton);
  }
}
