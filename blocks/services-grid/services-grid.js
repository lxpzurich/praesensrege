/**
 * Services Grid Block
 * Displays services in an animated grid layout with icons and content.
 */

export default function decorate(block) {
  // Configuration
  const config = {
    animationDelay: 100, // Delay between each card animation (ms)
    observerThreshold: 0.2, // Percentage of element visible before triggering
    animationDistance: '30px', // Initial offset distance
  };

  // Add block-specific class
  block.classList.add('services-grid-wrapper');

  // Get all grid items
  const gridItems = block.querySelectorAll('.services-grid > div');

  // Set initial animation states
  gridItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = `translateY(${config.animationDistance})`;
    item.style.transition = `all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) ${index * config.animationDelay}ms`;
  });

  // Create intersection observer for animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Animate in
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';

        // Stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: config.observerThreshold,
    rootMargin: '50px',
  });

  // Start observing grid items
  gridItems.forEach((item) => {
    observer.observe(item);
  });

  // Handle icons and content
  gridItems.forEach((item) => {
    item.classList.add('services-grid-card');

    // Handle icon container
    const iconContainer = item.querySelector('div[data-align="center"]');
    if (iconContainer) {
      iconContainer.classList.add('services-grid-icon-container');

      // Add descriptive alt text to icons
      const iconImg = iconContainer.querySelector('img');
      if (iconImg) {
        // Get the service title from the card
        const serviceTitle = item.querySelector('h3')?.textContent || '';
        iconImg.alt = `Icon for ${serviceTitle.trim()}`;

        // Optimize image size for icons
        if (iconImg.src.includes('?')) {
          iconImg.src = `${iconImg.src.split('?')[0]}?width=96&format=webply&optimize=medium`;
        }
      }
    }

    // Handle content container
    const contentContainer = item.querySelector('div:not([data-align="center"])');
    if (contentContainer) {
      contentContainer.classList.add('services-grid-content');

      // Add alt text to any content images
      contentContainer.querySelectorAll('img').forEach((img) => {
        const nearestHeading = img.closest('div').querySelector('h2, h3, h4')?.textContent;
        const nearestParagraph = img.closest('p')?.textContent;
        img.alt = nearestHeading || nearestParagraph || 'Service illustration';
      });

      // Make links accessible
      contentContainer.querySelectorAll('a').forEach((link) => {
        // Get surrounding text context
        const linkText = link.textContent.trim();
        const parentParagraph = link.closest('p')?.textContent.trim();
        const nearestHeading = link.closest('div').querySelector('h2, h3, h4')?.textContent.trim();

        // If link has no text content, create descriptive text
        if (!linkText) {
          const contextText = nearestHeading || parentParagraph || 'Learn more about our services';
          link.setAttribute('aria-label', contextText);
        }

        // Add title attribute if missing
        if (!link.title) {
          link.title = linkText || link.getAttribute('aria-label');
        }

        // Add descriptive aria-label
        if (linkText) {
          const fullContext = nearestHeading ? `${linkText} - ${nearestHeading}` : linkText;
          link.setAttribute('aria-label', fullContext);
        }
      });
    }

    // handle buttons.
    const buttons = item.querySelectorAll('a.button');
    buttons.forEach((button) => {
      const buttonContainer = button.closest('.button-container');
      if (buttonContainer) {
        buttonContainer.classList.add('services-grid-button-container');
      }
      button.classList.add('services-grid-button');

      // Add descriptive text for buttons
      const buttonText = button.textContent.trim();
      const serviceTitle = item.querySelector('h3')?.textContent.trim() || '';
      if (serviceTitle) {
        button.setAttribute('aria-label', `${buttonText} for ${serviceTitle}`);
      }
    });
  });
}
