// Enhanced Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const menu = document.querySelector('.menu');

if (mobileToggle && menu) {
  mobileToggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    mobileToggle.style.transform = menu.classList.contains('open') ? 'rotate(90deg)' : 'rotate(0deg)';
  });
}

// Enhanced 3D Slider
class HeroSlider {
  constructor(selector) {
    this.slider = document.querySelector(selector);
    if (!this.slider) return;
    
    this.slides = Array.from(this.slider.querySelectorAll('.slide'));
    this.currentSlide = 0;
    this.isAnimating = false;
    
    this.init();
  }
  
  init() {
    this.createControls();
    this.createDots();
    this.updateSlides();
    this.startAutoplay();
    this.addEventListeners();
  }
  
  createControls() {
    const prevBtn = document.createElement('button');
    prevBtn.className = 'slider-controls prev';
    prevBtn.innerHTML = '<span class="slider-btn">❮</span>';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'slider-controls next';
    nextBtn.innerHTML = '<span class="slider-btn">❯</span>';
    
    this.slider.appendChild(prevBtn);
    this.slider.appendChild(nextBtn);
    
    prevBtn.addEventListener('click', () => this.prevSlide());
    nextBtn.addEventListener('click', () => this.nextSlide());
  }
  
  createDots() {
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    
    this.slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.addEventListener('click', () => this.goToSlide(index));
      dotsContainer.appendChild(dot);
    });
    
    this.slider.appendChild(dotsContainer);
    this.dots = dotsContainer.querySelectorAll('.dot');
  }
  
  updateSlides() {
    this.slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev', 'next');
      
      if (index === this.currentSlide) {
        slide.classList.add('active');
      } else if (index === (this.currentSlide - 1 + this.slides.length) % this.slides.length) {
        slide.classList.add('prev');
      } else if (index === (this.currentSlide + 1) % this.slides.length) {
        slide.classList.add('next');
      }
    });
    
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });
  }
  
  nextSlide() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlides();
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 800);
  }
  
  prevSlide() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlides();
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 800);
  }
  
  goToSlide(index) {
    if (this.isAnimating || index === this.currentSlide) return;
    
    this.currentSlide = index;
    this.updateSlides();
  }
  
  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
    
    // Pause on hover
    this.slider.addEventListener('mouseenter', () => {
      clearInterval(this.autoplayInterval);
    });
    
    this.slider.addEventListener('mouseleave', () => {
      this.startAutoplay();
    });
  }
  
  addEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    this.slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    this.slider.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    });
  }
}

// Enhanced 3D Card Effects
function enhance3DCards() {
  const cards = document.querySelectorAll('.card-3d, .blog-card, .team-card, .gallery-item');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `
        translateY(-5px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
      `;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// Read More Modal System
class ReadMoreModal {
  constructor() {
    this.createModal();
    this.addEventListeners();
  }
  
  createModal() {
    const modal = document.createElement('div');
    modal.className = 'read-more-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <button class="modal-close">&times;</button>
          <h2 class="modal-title"></h2>
        </div>
        <div class="modal-body"></div>
      </div>
    `;
    
    document.body.appendChild(modal);
    this.modal = modal;
    this.modalContent = modal.querySelector('.modal-body');
    this.modalTitle = modal.querySelector('.modal-title');
  }
  
  addEventListeners() {
    // Close modal events
    this.modal.querySelector('.modal-close').addEventListener('click', () => {
      this.close();
    });
    
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.style.display === 'flex') {
        this.close();
      }
    });
    
    // Read more button events
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-read-more')) {
        e.preventDefault();
        const content = e.target.getAttribute('data-content');
        const title = e.target.getAttribute('data-title');
        this.open(title, content);
      }
    });
  }
  
  open(title, content) {
    this.modalTitle.textContent = title;
    this.modalContent.innerHTML = content;
    this.modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add fade-in animation
    requestAnimationFrame(() => {
      this.modal.style.opacity = '1';
    });
  }
  
  close() {
    this.modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Blog Category Filter
function initBlogFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      
      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter cards
      blogCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'block';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);
  
  // Observe all cards and sections
  document.querySelectorAll('.card-3d, .blog-card, .team-card, .gallery-item, section').forEach(el => {
    observer.observe(el);
  });
}

// Search Functionality
function initSearch() {
  const searchInput = document.querySelector('.search-input');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
      const title = card.querySelector('.blog-title').textContent.toLowerCase();
      const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize slider
  new HeroSlider('.hero-slider');
  
  // Initialize 3D effects
  enhance3DCards();
  
  // Initialize modal system
  new ReadMoreModal();
  
  // Initialize blog filter
  initBlogFilter();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize search
  initSearch();
  
  // Add loading animation to page
  document.body.classList.add('fade-in');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Parallax effect for hero section
function initParallax() {
  const hero = document.querySelector('.hero-slider');
  if (!hero) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    hero.style.transform = `translateY(${parallax}px)`;
  });
}

// Initialize parallax
initParallax();


