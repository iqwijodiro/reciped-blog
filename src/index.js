import './scss/index.scss';

document.addEventListener('DOMContentLoaded', function () {
  // Fix the scroll padding when it´s selected a #link
  const navHeight = document.querySelector('#navigation').offsetHeight;

  document.documentElement.style.setProperty(
    '--scroll-p',
    navHeight + 150 + 'px'
  );

  // Open & Close the navigation drawer on mobile version
  const openBtn = document.querySelector('.open-btn');
  const closeBtn = document.querySelector('.close-btn');
  const overlay = document.querySelector('.overlay');
  const navDrawer = document.querySelectorAll('.nav__drawer');

  window.addEventListener('DOMContentLoaded', {});
  // Add the visible class to show the drawer
  openBtn.addEventListener('click', () => {
    navDrawer.forEach((element) => element.classList.add('visible'));
    overlay.style.display = 'block';
  });

  // Remove the visible class to hide the drawer
  closeBtn.addEventListener('click', () => {
    navDrawer.forEach((element) => element.classList.remove('visible'));
    overlay.style.display = 'none';
  });

  // Remove overlay and drawer when user clicks outside
  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    navDrawer.forEach((element) => element.classList.remove('visible'));
  });

  // Loads image´s data only when observer is watching the element
  let lazyLoadImages;
  if ('IntersectionObserver' in window) {
    lazyLoadImages = document.querySelectorAll('.lazy');
    const imgObserved = new IntersectionObserver(function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.classList.remove('lazy');
          imgObserved.unobserve(image);
        }
      });
    });

    lazyLoadImages.forEach((image) => {
      imgObserved.observe(image);
    });
  } else {
    let lazyLoadThrottle;
    lazyLoadImages = document.querySelectorAll('.lazy');
    function lazyLoad() {
      if (lazyLoadThrottle) {
        clearTimeout(lazyLoadThrottle);
      }

      lazyLoadThrottle = setTimeout(() => {
        const scrollTop = window.pageYOffset;
        lazyLoadImages.forEach((img) => {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
          }
        });

        if (lazyLoadImages.length == 0) {
          document.removeEventListener('scroll', lazyLoad);
          window.removeEventListener('resize', lazyLoad);
          window.removeEventListener('orientationchange', lazyLoad);
        }
      }, 10);
    }

    document.addEventListener('scroll', lazyLoad);
    document.addEventListener('resize', lazyLoad);
    document.addEventListener('orientationchange', lazyLoad);
  }
});
