"use strict";

let header = $(`
<nav class="navbar navbar-expand-lg navbar-light fixed-top" id="navbar">
<a class="navbar-brand" href="index.html">Jasleen Minhas </a>
<div class="hamburger_wrapper navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

  <div id="js-hamburger" class="hamburger">
    <span class="first"></span>
    <span class="second"></span>
    <span class="third"></span>
  </div>

</div>

<div class="collapse navbar-collapse " id="navbarSupportedContent">
  <ul class="navbar-nav ml-auto" id = "navbar-content">
   <li class="nav-item nav-item-hover"><a class="nav-link" href="index.html">Home</a></li>
   <li class="nav-item nav-item-hover"><a class="nav-link" href="experience.html">Experience</a></li>
   <li class="nav-item nav-item-hover"><a class="nav-link" href="projects.html">Projects</a></li>

   <!--<li class="nav-item nav-item-hover"><a class="nav-link" href="research.html">Research</a></li>-->

   <li class="nav-item nav-item-hover"><a class="nav-link" href="education.html">Education</a></li>
   <li class="nav-item nav-item-hover"><a class="nav-link" href="./assets/docs/Jasleen_Minhas_Resume.pdf" target="_blank">Resume</a></li>
   <li class="nav-item">
   <input type="checkbox" class="dark_toggler" aria-label="Toggle Light Mode" onclick="toggle_light_mode()">
   </li>

 </div>
  </ul>
</div>
</nav>`);






//"Scroll to top" button
let upArrow = $(`
  <button id="btnScrollToTop" onclick="scrollToTop()"><i class="fas fa-2x fa-angle-up"></i></button>
  <link rel="stylesheet" type="text/css" href="./css/style.css" />
  })
`);

//function for the "Scroll To Top" button to detect the footer
$(document).ready(function () {
  $(window).scroll(function () {
    //The button will be hidden until we scroll more than the window's height
    if ($(window).scrollTop() < $(window).height()) {
      $("#btnScrollToTop").css("visibility", "hidden");
    } else {
      $("#btnScrollToTop").css("visibility", "visible");
      //The button will change it's color when it hits the footer
      if (
        $(window).scrollTop() + $(window).height() >
        $(document).height() - 838
      ) {
        // 838 should be changed if footer's height is changed so that the button changes it's color exactly when it hits the footer (preferably 14 less than the computer height of the footer)
        $("#btnScrollToTop").css("background-color", "#1f9fee");
      } else {
        $("#btnScrollToTop").css("background-color", "#1f9fee");
      }
    }
  });
});

//function to scroll to top
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

// Window Loads
$(function () {
  let bodyElement = $(`body`);
  bodyElement.prepend(header);
  bodyElement.append(footer);
  bodyElement.append(upArrow);
  $("#btnScrollToTop").css("visibility", "hidden");

  //toggler hamburger functions
  const menuBtn = document.querySelector(".navbar-toggler");
  let menuOpen = false;
  menuBtn.addEventListener("click", () => {
    if (!menuOpen) {
      menuBtn.classList.add("open");
      menuOpen = true;
    } else {
      menuBtn.classList.remove("open");
      menuOpen = false;
    }
  });
});

// function for toggling hamburger is-active class

$(function () {
  $("#js-hamburger").on("click", function () {
    $(this).toggleClass("is-active");
  });
});

// Navbar current page highlight

let loader = document.querySelector(".loader-container");

window.addEventListener("load", vanish);

function vanish() {
  loader.classList.add("disappear");
}
$(function () {
  $("a.nav-link").each(function () {
    if ($(this).prop("href") == window.location.href) {
      $(this).addClass("current-link");
    }
  });
});

//function to remove underline on hover

$(document).ready(function () {
  $("a.nav-link").hover(
    function () {
      $(this).removeClass("current-link");
    },
    function () {
      if ($(this).prop("href") == window.location.href) {
        $(this).addClass("current-link");
      }
    }
  );
});

function toggle_light_mode() {
  var app = document.getElementsByTagName("HTML")[0];
  var nav = document.getElementById("navbar");
  if (localStorage.lightMode == "dark") {
    localStorage.lightMode = "light";
    app.setAttribute("light-mode", "light");
    nav.classList.remove("dark-theme");
    var sc = document.getElementsByClassName("socialicon");
    for(var i=0; i<sc.length; i++) {
      sc[i].classList.remove("dsc");
   }
  } else {
    nav.classList.add("dark-theme");
    localStorage.lightMode = "dark";
    app.setAttribute("light-mode", "dark");
    var sc = document.getElementsByClassName("socialicon");
    for(var i=0; i<sc.length; i++) {
      sc[i].classList.add("dsc");
   }
  }
}


window.addEventListener("storage", function () {
  if (localStorage.lightMode == "dark") {
    app.setAttribute("light-mode", "dark");
  } else {
    app.setAttribute("light-mode", "light");
  }
}, window.localStorage.clear());

// Function to remove scroll bar during preload
$(window).on('load', function() {
  setTimeout(function(){
    $('.no-scroll-preload').css('overflow', 'visible');
  },1000);
  $('.loader-container').fadeOut(2500);
});






















// Firebase

// Initialize Firebase (ADD YOUR OWN DATA)
var firebaseConfig = {
  apiKey: "AIzaSyApl481FyGsV0Y6w9Q10LZ0WIwfZbgwAd4",
  authDomain: "jasleen-minhas-website.firebaseapp.com",
  databaseURL: "https://jasleen-minhas-website-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jasleen-minhas-website",
  storageBucket: "jasleen-minhas-website.appspot.com",
  messagingSenderId: "545371813689",
  appId: "1:545371813689:web:2a79f0d6e6e7a15a1d1ae8",
  measurementId: "G-KXZTQ2YJDG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);





// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var email = getInputVal('email');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, email, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  }, 2000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email:email,
    message:message
  });
}

 