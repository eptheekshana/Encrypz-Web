// Main JavaScript Logic

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Navigation Scroll Effect
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = 'var(--shadow)';
    } else {
      navbar.style.boxShadow = 'var(--shadow-sm)';
    }
  });

  // 2. Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in-up');
  fadeElements.forEach(el => observer.observe(el));

  // 3. Form Submission Handling (Waitlist Simulation)
  const forms = document.querySelectorAll('.waitlist-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const input = form.querySelector('input[type="email"]');
      const button = form.querySelector('button');
      
      if (input.value) {
        // Original state saving
        const originalText = button.textContent;
        const originalBg = button.style.backgroundColor;
        
        // Loading state
        button.textContent = 'Joining...';
        button.style.opacity = '0.8';
        
        // Simulate API call
        setTimeout(() => {
          button.textContent = 'Added to Waitlist!';
          button.style.backgroundColor = 'var(--secondary)';
          button.style.boxShadow = 'none';
          input.value = '';
          
          // Reset after 3 seconds
          setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
            button.style.boxShadow = '';
            button.style.opacity = '1';
          }, 3000);
        }, 1000);
      }
    });
  });

  // 4. Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Offset for fixed navbar
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // 5. Copy Command Snippets
  document.querySelectorAll('.btn-copy').forEach(button => {
    button.addEventListener('click', async () => {
      const textToCopy = button.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalHtml = button.innerHTML;
        button.classList.add('copied');
        button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Copied!</span>
        `;
        setTimeout(() => {
          button.classList.remove('copied');
          button.innerHTML = originalHtml;
        }, 2200);
      } catch (err) {
        console.error('Failed to copy to clipboard', err);
      }
    });
  });

});

