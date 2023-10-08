
// HEADER ====================================== // 
// Mini plugin for the header
const headers = document.querySelectorAll(".header");

headers.forEach(function (current) {

  let originalClasses = current.className, // Default classes
    scrollClasses = current.getAttribute("data-onscroll-classes"), // Classes to be added on scroll
    scrollLogo = current.getAttribute("data-onscroll-logo"), // Logo to show on scroll
    brandLogo = current.querySelector(".header__logo img"), // Gets the current logo img tag
    brandLogoUrl = current.querySelector(".header__logo img").getAttribute("src"), // Gets the current logo src
    menuToggle = current.querySelector("[data-toggle]"), // Gets the element to toggle the naviagtion on mobile devices
    menuMobile, // Gets the menu for the mobile or submenu
    dropdownLink = current.querySelectorAll(".dropdown-link"), // Gets the dropdown links
    scrollAmount = 100; // how far down (in px) 


  // Preventing the link default action for dropdown
  for (let i = 0; i < dropdownLink.length; i++) {
    dropdownLink[i].addEventListener("click", function (e) {
      e.preventDefault();
    })
  }


  // Opening the mobile menu
  if (menuToggle) menuToggle.addEventListener("click", openMenu);
  // Adds classes on scroll
  if (scrollClasses) addClasses();
  // Changes logo on scroll
  if (scrollLogo) changeLogo();


  // FUNCTIONS ======================== // 
  function openMenu() { // opens mobile menu

    let menuToggleTarget = menuToggle.getAttribute("data-toggle");

    const open = JSON.parse(menuToggle.getAttribute("aria-expanded")); // converts to boolean and returns true or false
    menuToggle.setAttribute("aria-expanded", !open);

    menuMobile = current.querySelector("#" + menuToggleTarget); // Gets the menu that needs to be display
    menuMobile.classList.toggle("active"); // shows and hides the menu
    menuToggle.classList.toggle("rotate"); // little animation for the hamburger icon

    if (document.body.classList.contains("overflow-hidden")) {
      document.body.classList.remove("overflow-hidden"); // enables scrolling on the page while the menu is hidden
    } else {
      document.body.classList.add("overflow-hidden"); // prevent scrolling on the page while the menu is being shown
    }

  };


  function scrollEvents(type) {

    let scrolled = window.scrollY;

    if (scrolled > scrollAmount) {
      if (type === "class") {
        current.className = originalClasses + " " + scrollClasses;
      } else {
        brandLogo.setAttribute("src", scrollLogo);
      }
    }

    else {
      if (type === "class") {
        current.className = "";
        current.className = originalClasses // adding default classes
      } else {
        brandLogo.setAttribute("src", "");
        brandLogo.setAttribute("src", brandLogoUrl); // adding default logo
      }

    }

  }


  function addClasses() { window.addEventListener("scroll", function () { scrollEvents("class") }); };

  function changeLogo() { window.addEventListener("scroll", function () { scrollEvents("logo") }); };

});


// CAROUSELS ================================ // 
// Using Owl Carousel plugin

// Testimonial carousel - Homepage 1
const testimonialCarousel = $('#testimonial-carousel');
//Settings options
const testimonialOptions = {
  items: 1, // how many slide to show on screen
  autoplay: true, // true or false
  autoplayTimeout: 4000, // how long before the next slide come on the screen in milliseconds (ex: 1000ms = 1s)
  autoplaySpeed: 450, //how long it take for a slide to fully come on screen
  slideTransition: "cubic-bezier(.1,.75,.67,.88)", // transition-timing-function (linear, ease-in, ease-in-out, etc...)
  loop: true, // true or false - whether the slideshow repeat or not
  mouseDrag: true, // true or false - laptop & desktop (any non-touch device)
  touchDrag: true, // true or false - mobile (or any touch-friendly device)
  dots: false, // true or false - show dots navigation
  nav: true, // true or false - show 'next' or 'prev' buttons
  autoplayHoverPause: true, // true or false - stop autoplay on hover
  responsiveClass: true // true or false
}

$(testimonialCarousel).owlCarousel(testimonialOptions);

//Settings options
const releaseOptions = {
  margin: 25,
  autoplay: true, // true or false
  autoplayTimeout: 4000, // how long before the next slide come on the screen in milliseconds (ex: 1000ms = 1s)
  autoplaySpeed: 450, //how long it take for a slide to fully come on screen
  slideTransition: "cubic-bezier(.1,.75,.67,.88)", // transition-timing-function (linear, ease-in, ease-in-out, etc...)
  loop: true, // true or false - whether the slideshow repeat or not
  mouseDrag: true, // true or false - laptop & desktop (any non-touch device)
  touchDrag: true, // true or false - mobile (or any touch-friendly device)
  dots: true, // true or false - show dots navigation
  nav: false, // true or false - show 'next' or 'prev' buttons
  autoplayHoverPause: true, // true or false - stop autoplay on hover
  responsiveClass: true, // true or false
  responsive: {
    // breakpoint from 0 up
    0: {
      items: 1, // how many slide to show on screen
    },
    // breakpoint from 553 up
    553: {
      items: 2, // how many slide to show on screen
    },
    // breakpoint from 901 up
    901: {
      items: 3 // how many slide to show on screen
    }
  }
}


// Our leaders - about page
const ourLeaders = $('#our-leaders-carousel');
$(ourLeaders).owlCarousel(releaseOptions); // using the options (settings) above

// Posts from staffs (STAFFS SINGLE)
const staffPosts = $("#staff-posts");
$(staffPosts).owlCarousel(releaseOptions); // using the options (settings) above


// PROGRESS BAR ====================================== // 
const progress = document.querySelectorAll(".progress");
const beforeElement = "$";
const afterElementCurrent = "raised";
const afterElementEnd = "goal";

progress.forEach(function (current) {
  const currentText = current.querySelector(".current"); // hold the current text (ex: amount raised)
  const endText = current.querySelector(".end"); // hold the end text (ex: campaign goal)
  const currentValue = +current.querySelector(".progress__bar").getAttribute("data-current");  // hold the current value (ex: amount raised)
  const endValue = +current.querySelector(".progress__bar").getAttribute("data-end");  // hold the end value (ex: campaign goal)
  const progressFill = current.querySelector(".fill");
  let progressTitle;

  // Making sure it is a real number
  if (isNaN(currentValue) || isNaN(endValue)) {
    current.textContent = "Please provide a real number. Don't use special characters";
    return;
  }

  // Getting the percentage
  const amountRaisedPercentage = Math.floor((currentValue / endValue) * 100);

  if (amountRaisedPercentage > 100) {
    progressFill.style.width = "100%";
  } else {
    progressFill.style.width = amountRaisedPercentage + "%";
  }

  // Adding a comma "," after 3 digit
  const currentFormatted = Number(currentValue).toLocaleString();
  const endFormatted = Number(endValue).toLocaleString();

  // Adding the numbers
  currentText.innerHTML = `${beforeElement}${currentFormatted} <span class="after-text">${afterElementCurrent}</span>`;
  endText.innerHTML = `${beforeElement}${endFormatted} <span class="after-text">${afterElementEnd}</span>`;

  // Adding a title to show on hover to reveal the % of amount raised
  progressTitle = current.setAttribute("title", `This campaign has raised ${amountRaisedPercentage}% of its goal`);
})


// MODAL POP UP ====================================== // 
const modalButton = document.querySelectorAll(".modal-button");

modalButton.forEach(function (current) {

  current.addEventListener("click", function (e) {
    e.preventDefault();
    const modalId = current.getAttribute("data-modal-target");
    const modalTarget = document.querySelector("#" + modalId);

    if (!modalTarget) return;

    modalTarget.classList.add("active");

    document.body.style = "overflow: hidden";
  })

})

// Closing modal
window.addEventListener("mouseup", function (e) {
  let activeModal = document.querySelector(".modal.active")

  if (activeModal) {

    if (e.target !== activeModal.querySelector(".modal__content") && e.target === activeModal) {
      activeModal.classList.remove("active")

      document.body.style = "";
    }
  }
})


// FILTERING SIDEBAR ====================================== // 
const filterBtn = document.querySelectorAll(".filter-button");

filterBtn.forEach(filter => {

  filter.addEventListener("click", (e) => {

    e.preventDefault();
    const targetId = filter.getAttribute("data-filter");
    const target = document.querySelector("#" + targetId);

    if (target.classList.contains("active")) {
      target.classList.remove("active")

      filter.innerHTML = "";
      filter.innerHTML = "Filter";
    } else {
      target.classList.add("active")

      filter.innerHTML = "";
      filter.innerHTML = `Close filter`;
    }

  })

})


// DATEPICKER CALENDAR USING JQUERY UI ============================ // 
const datepicker = $(".datepicker")

if (datepicker.length > 0) { // This "if" condition will make sure it doesn't throw errors on pages where the datepicker plugin is not needed
  $(datepicker).datepicker();
}


// PRINTABLE ====================================== //
const printButton = document.querySelectorAll(".printable-button");
printButton.forEach(print => {
  print.addEventListener("click", (e) => {
    e.preventDefault();
    window.print();
  })
})



// SCROLL BACK TO TOP ================================ // 
let scrollTopEl = document.querySelector(".scroll-to-top");

if (scrollTopEl) window.addEventListener("scroll", scrollToTop);

function scrollToTop() {

  const scrollable = document.documentElement.scrollHeight - window.innerHeight; // entire scrollabe space - the window's height = gives how much you can scroll

  let scrolled = window.scrollY; // how far down user has scrolled

  let scrolledPerc = Math.floor((scrollable * 50) / 100); // how far down user has scrolled in percentage - in this example 30% of the scrollable

  if (scrolled >= scrolledPerc) {
    scrollTopEl.classList.add("active");
  } else {
    scrollTopEl.classList.remove("active");
  }

}

function smoothScroll() {

  if (!scrollTopEl) return;

  scrollTopEl.addEventListener("click", function () {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });

  });

}

smoothScroll();


// DONATION PAGE ============================ // 

// We will remove any amount selected (radio button) so the custom (input text) will be the active one
function customAmount() {
  const customAmountField = document.querySelector(".form .donations__amount #custom"); // gets the input text

  // if there is no input text accepting the custom value, then the code following the below code won't be executed
  if (!customAmountField) return;

  customAmountField.addEventListener("focus", function () {

    // Getting all amount (radio buttons)
    const currentAmount = document.querySelectorAll(".form .donations__amount input[type='radio']");

    for (var i = 0; i < currentAmount.length; i++) {
      if (currentAmount[i].checked) {
        // Remove the current checked
        currentAmount[i].checked = false;
      }
    }

  })
}
customAmount();


// Promotional button - can be removed
const promotionalBtn = headers[0].querySelector(".button--promotion")
if (promotionalBtn) {
  setInterval(() => {
    promotionalBtn.classList.add("shake")
  }, 2000)

  setInterval(() => {
    if (promotionalBtn.classList.contains("shake")) promotionalBtn.classList.remove("shake")
  }, 3000)
}
