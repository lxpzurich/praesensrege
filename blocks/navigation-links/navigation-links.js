export default function decorate(block) {
  // Get all navigation links
  const navLinks = block.querySelectorAll('a:not(.button)');
  
  // Set initial active state
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    if (currentPath === '/' && link.getAttribute('title') === 'Home') {
      link.classList.add('active');
    }
  });

  // Add click handlers
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      e.target.classList.add('active');
    });
  });
}
