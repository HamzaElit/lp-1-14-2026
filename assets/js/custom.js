document.addEventListener("DOMContentLoaded", () => {
  // Get all summary elements
  const summaries = document.querySelectorAll(".accordion__quesion");
  // Add click event listener to each summary
  summaries.forEach((summary) => {
    summary.addEventListener("click", function (e) {
      // Prevent the default toggle behavior
      e.preventDefault();

      // Get the details element that contains this summary
      const currentDetails = this.parentElement;

      // Find the closest section parent
      const parentSection = currentDetails.closest("section");

      if (parentSection) {
        // Find all details elements within this section
        const allDetails = parentSection.querySelectorAll(
          "details.accordion__item"
        );

        // Close all other details elements in this section
        allDetails.forEach((details) => {
          if (details !== currentDetails) {
            details.removeAttribute("open");
          }
        });

        // Toggle the current details element
        if (currentDetails.hasAttribute("open")) {
          currentDetails.removeAttribute("open");
        } else {
          currentDetails.setAttribute("open", "");
        }
      }
    });
  });


});

window.addEventListener("load", function () {
  // GSAP Shampoo Scroll Animation
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    const shampooElement = document.querySelector('.lp-hair-transplant-intro__shampoo');
    const sectionElement = document.querySelector('.lp-hair-transplant-intro');
    
    if (shampooElement && sectionElement) {
      // Set initial state
      gsap.set(shampooElement, {
        y: 0,
        opacity: 1,
        rotation: -15
      });
      
      // Calculate the Y position where the shampoo's center reaches the section bottom
      const calculateEndY = () => {
        // Get section height
        const sectionHeight = sectionElement.offsetHeight;
        
        // Get shampoo's initial position relative to section
        // shampoo is inside .lp-hair-transplant-intro__content which is inside .container
        const contentElement = sectionElement.querySelector('.lp-hair-transplant-intro__content');
        const contentTop = contentElement ? contentElement.offsetTop : 0;
        
        // Shampoo's CSS top value (negative, e.g., -180px)
        const shampooTopCSS = parseInt(getComputedStyle(shampooElement).top) || 0;
        
        // Shampoo height
        const shampooHeight = shampooElement.offsetHeight;
        
        // Shampoo's initial position from section top = contentTop + shampooTopCSS
        const shampooInitialTop = contentTop + shampooTopCSS;
        
        // We want: shampooInitialTop + targetY + (shampooHeight / 2) = sectionHeight
        // targetY = sectionHeight - shampooInitialTop - (shampooHeight / 2)
        const targetY = sectionHeight - shampooInitialTop - (shampooHeight / 2) - 100;
        
        return targetY;
      };
      
      // Desktop animation
      const desktopAnimation = gsap.to(shampooElement, {
        y: calculateEndY,
        rotation: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionElement,
          start: "0% 110%",
          end: "60% bottom",
          scrub: 0.3,
          invalidateOnRefresh: true
        }
      });
      
      // Mobile animation - starts when section top reaches center of viewport
      const mobileMedia = gsap.matchMedia();
      
      mobileMedia.add("(max-width: 768px)", () => {
        // Kill desktop animation on mobile
        desktopAnimation.scrollTrigger?.kill();
        
        // Calculate end Y for mobile
        const calculateMobileEndY = () => {
          const sectionHeight = sectionElement.offsetHeight;
          const contentElement = sectionElement.querySelector('.lp-hair-transplant-intro__content');
          const contentTop = contentElement ? contentElement.offsetTop : 0;
          const shampooTopCSS = parseInt(getComputedStyle(shampooElement).top) || 0;
          const shampooHeight = shampooElement.offsetHeight;
          const shampooInitialTop = contentTop + shampooTopCSS;
          const targetY = sectionHeight - shampooInitialTop - (shampooHeight / 2) - 100;
          return targetY;
        };
        
        // Mobile animation
        gsap.to(shampooElement, {
          y: calculateMobileEndY,
          rotation: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionElement,
            start: "top 20%", 
            end: "bottom 50%",
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      });
      
      // Cleanup on resize
      window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
      });
    }
  }

  // Initialize Swiper for testimonials
  if (document.querySelector('.lp-testmonial-swiper')) {
    const testimonialSwiper = new Swiper('.lp-testmonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 14,
      centeredSlides: true,
      loop: true,
      navigation: {
        nextEl: '.lp-testmonial__nav--next',
        prevEl: '.lp-testmonial__nav--prev',
      },
      breakpoints: {
        // Mobile
        320: {
          slidesPerView: 1.2,
          spaceBetween: 14,
        },
        // Tablet
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // Desktop
        1024: {
          slidesPerView: 3,
          spaceBetween: 29,
        },
      },
    });
  }

  // Vimeo video player functionality
  document.querySelectorAll(".lp-custom-vimeo")?.forEach(function (videoCard) {
    videoCard.addEventListener("click", function () {
      // If already playing, don't recreate the iframe
      if (videoCard.classList.contains("active")) return;
      
      // Close all other videos
      document.querySelectorAll(".lp-custom-vimeo").forEach(function (card) {
        card.classList.remove("active");
        const wrapper = card.querySelector(".lp-custom-vimeo__iframe-wrp");
        if (wrapper) {
          wrapper.innerHTML = "";
        }
      });

      // Get video ID and create iframe
      const vimeoId = this.getAttribute("data-vimeo-id");
      const iframe = document.createElement("iframe");
      const iframeWrapper = videoCard.querySelector(".lp-custom-vimeo__iframe-wrp");
      
      if (!vimeoId || !iframeWrapper) return;

      // Set iframe attributes
      iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
      iframe.frameBorder = "0";
      iframe.allow = "autoplay; fullscreen; picture-in-picture";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.position = "absolute";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.allowFullscreen = true;

      // Add iframe to wrapper and mark as active
      iframeWrapper.innerHTML = "";
      iframeWrapper.appendChild(iframe);
      videoCard.classList.add("active");
    });
  });

  // YouTube video player functionality
  document.querySelectorAll(".lp-custom-youtube")?.forEach(function (videoCard) {
    videoCard.addEventListener("click", function () {
      // If already playing, don't recreate the iframe
      if (videoCard.classList.contains("active")) return;
      
      // Close all other videos
      document.querySelectorAll(".lp-custom-youtube").forEach(function (card) {
        card.classList.remove("active");
        const wrapper = card.querySelector(".lp-custom-youtube__iframe-wrp");
        if (wrapper) {
          wrapper.innerHTML = "";
        }
      });

      // Get video ID and create iframe
      const youtubeId = this.getAttribute("data-youtube-id");
      const iframe = document.createElement("iframe");
      const iframeWrapper = videoCard.querySelector(".lp-custom-youtube__iframe-wrp");
      
      if (!youtubeId || !iframeWrapper) return;

      // Set iframe attributes
      iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
      iframe.frameBorder = "0";
      iframe.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.position = "absolute";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.allowFullscreen = true;

      // Add iframe to wrapper and mark as active
      iframeWrapper.innerHTML = "";
      iframeWrapper.appendChild(iframe);
      videoCard.classList.add("active");
    });
  });
});
