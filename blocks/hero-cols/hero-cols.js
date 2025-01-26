import { createOptimizedPicture } from '../../scripts/aem.js';

/* Parts taken from https://github.com/adobe/aem-boilerplate/blob/main/blocks/columns/columns.js */
export default function decorate(block) {
  // Add block-specific class
  block.classList.add('hero-cols-wrapper');

  const cols = [...block.firstElementChild.children];
  block.classList.add(`hero-cols-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    row.classList.add('hero-cols-row');

    [...row.children].forEach((col) => {
      col.classList.add('hero-cols-col');

      // Handle pictures using AEM's optimized picture helper
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('hero-cols-img-col');

          // Get original image
          const img = pic.querySelector('img');

          if (img) {
            // Add loading eager for LCP
            img.setAttribute('loading', 'eager');
            // Add fetchpriority high
            img.setAttribute('fetchpriority', 'high');

            // Set explicit width and height attributes
            const mobileWidth = 750;
            const desktopWidth = 500;
            // Assuming a 1:1 aspect ratio, adjust if different
            const mobileHeight = 750;
            const desktopHeight = 500;

            // Set sizes attribute for responsive images
            img.setAttribute('sizes', '(min-width: 768px) 500px, 750px');
            
            // Set width and height for the current viewport
            if (window.innerWidth >= 768) {
              img.setAttribute('width', desktopWidth);
              img.setAttribute('height', desktopHeight);
            } else {
              img.setAttribute('width', mobileWidth);
              img.setAttribute('height', mobileHeight);
            }

            // Create optimized picture with explicit dimensions
            const newPic = createOptimizedPicture(
              img.src,
              img.alt,
              true, // eager loading
              [
                { width: mobileWidth.toString(), media: '(max-width: 767px)', height: mobileHeight },
                { width: desktopWidth.toString(), media: '(min-width: 768px)', height: desktopHeight },
              ],
            );

            // Replace original picture
            pic.replaceWith(newPic);
          }
        }
      }

      // Handle buttons
      const buttons = col.querySelectorAll('a.button');
      buttons.forEach((button, index) => {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = `hero-cols-button-wrapper hero-cols-button-${index + 1}-wrapper`;

        button.classList.add('hero-cols-button', `hero-cols-button-${index + 1}`);

        // Replace <br/> text with actual line breaks
        if (button.textContent.includes('<br/>')) {
          button.innerHTML = button.textContent.replace(/<br\/>/g, '<br>');
        }

        // Add SVG to button-2
        if (index === 1) {
          const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="hero-cols-button-icon">
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"></path>
          </svg>`;
          button.innerHTML = `${button.innerHTML} ${svg}`;
        }

        // Wrap button in its container
        const buttonContainer = button.closest('.button-container');
        if (buttonContainer) {
          buttonContainer.classList.add('hero-cols-button-container');
          buttonContainer.appendChild(buttonWrapper);
          buttonWrapper.appendChild(button);
        }
      });
    });
  });
}
