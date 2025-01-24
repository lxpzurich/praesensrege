(function() {
  // Configuration
  const config = {
    animationDelay: 100, // Delay between each card animation (ms)
    observerThreshold: 0.2, // Percentage of element visible before triggering
    animationDistance: '30px', // Initial offset distance
  };

  function initServicesGrid() {
    const gridItems = document.querySelectorAll('.services-grid > div');
    
    // Set initial states
    gridItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = `translateY(${config.animationDistance})`;
      item.style.transition = `all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) ${index * config.animationDelay}ms`;
    });

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
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
      rootMargin: '50px'
    });

    // Start observing
    gridItems.forEach(item => observer.observe(item));
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServicesGrid);
  } else {
    initServicesGrid();
  }
})();
