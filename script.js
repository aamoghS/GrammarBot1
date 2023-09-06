window.location.href = "notes.html";

function setupDropdowns() {
  var dropdowns = document.querySelectorAll(".dropdown");

  for (var i = 0; i < dropdowns.length; i++) {
    // Add hover event listener
    dropdowns[i].addEventListener("mouseenter", function () {
      toggleDropdown(this);
    });

    // Add click event listener
    dropdowns[i].addEventListener("click", function () {
      toggleDropdown(this);
    });

    // Add mouseleave event listener to hide the submenu when not hovering
    dropdowns[i].addEventListener("mouseleave", function () {
      var dropdownContent = this.querySelector(".dropdown-content");
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Add click event listener to dropdown menu items
  var dropdowns = document.querySelectorAll(".dropdown");
  for (var i = 0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener("click", function (event) {
      var dropdownContent = this.querySelector(".dropdown-content");
      // Close other open submenus
      closeAllSubmenus();

  
      dropdownContent.classList.toggle("show");

    
      event.stopPropagation();
    });

   
    dropdowns[i].addEventListener("mouseleave", function () {
      var dropdownContent = this.querySelector(".dropdown-content");
      if (dropdownContent.classList.contains("show")) {
        dropdownContent.classList.remove("show");
      }
    });
  }

  // Close submenus when clicking outside
  window.addEventListener("click", function () {
    closeAllSubmenus();
  });

  function closeAllSubmenus() {
    var dropdownContents = document.querySelectorAll(".dropdown-content");
    for (var i = 0; i < dropdownContents.length; i++) {
      dropdownContents[i].classList.remove("show");
    }
  }
});

function updateClock() {
  const currentTimeElement = document.getElementById("currentTime");
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  currentTimeElement.textContent = timeString;
}

setInterval(updateClock, 1000);

updateClock();
setupDropdowns();
