/* Parts taken from https://github.com/adobe/aem-boilerplate/blob/main/blocks/columns/columns.js */
export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns and buttons
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      // Handle pictures (existing functionality)
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }

      // Handle buttons
      const buttons = col.querySelectorAll('a.button');
      buttons.forEach((button, index) => {
        // Add indexed class to each button
        button.classList.add(`columns-button-${index + 1}`);
        button.classList.add('columns-button');

        // Replace <br/> text with actual line breaks
        if (button.textContent.includes('<br/>')) {
          button.innerHTML = button.textContent.replace(/<br\/>/g, '<br>');
        }

        // Add SVG to button-2
        if (index === 1) { // Second button (0-based index)
          const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="button-icon">
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"></path>
          </svg>`;
          button.innerHTML = `${button.innerHTML} ${svg}`;
        }

        // Handle button container
        const buttonContainer = button.closest('.button-container');
        if (buttonContainer) {
          buttonContainer.classList.add('columns-button-container');
        }
      });
    });
  });
}
