
       window.location.href = "notes.html";

// Function to prevent navigation to the linked pages
function preventNavigation(event) {
  if (!passwordEntered) {
    event.preventDefault(); // Prevent the default hyperlink behavior
    var enteredPassword = prompt("Enter the password to unlock the page:");
    if (enteredPassword !== password) {
      alert("Incorrect password. Access denied.");
    } else {
      // Password entered correctly, set the flag and navigate to the clicked page
      passwordEntered = true;
      localStorage.setItem("passwordEntered", "true");
      window.location.href = event.target.getAttribute("href");
    }
  }
}
// disable-right-click.js
window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});
// Add event listeners for both hover and click
function setupDropdowns() {
  var dropdowns = document.querySelectorAll(".dropdown");

  for (var i = 0; i < dropdowns.length; i++) {
    // Add hover event listener
    dropdowns[i].addEventListener("mouseenter", function () {
      if (!passwordEntered) return;
      toggleDropdown(this);
    });

    // Add click event listener
    dropdowns[i].addEventListener("click", function (event) {
      if (!passwordEntered) {
        event.stopPropagation();
        var enteredPassword = prompt("Enter the password to unlock the page:");
        if (enteredPassword === password) {
          passwordEntered = true;
          localStorage.setItem("passwordEntered", "true"); // Store the flag in local storage
        } else {
          alert("Incorrect password. Access denied.");
          return;
        }
      }
      toggleDropdown(this);
    });

    // Add mouseleave event listener to hide the submenu when not hovering
    dropdowns[i].addEventListener("mouseleave", function () {
      if (!passwordEntered) return;
      var dropdownContent = this.querySelector(".dropdown-content");
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // Add click event listener to dropdown menu items
  var dropdowns = document.querySelectorAll(".dropdown");
  for (var i = 0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener("click", function(event) {
      if (!passwordEntered) {
        event.stopPropagation();
        var enteredPassword = prompt("Enter the password to unlock the page:");
        if (enteredPassword !== password) {
          alert("Incorrect password. Access denied.");
          return;
        }
      }

      var dropdownContent = this.querySelector(".dropdown-content");
      // Close other open submenus
      closeAllSubmenus();

      // Toggle the display of the dropdown content
      dropdownContent.classList.toggle("show");

      // Prevent the click event from propagating to the window click handler
      event.stopPropagation();
    });

    // Add mouseleave event listener to hide the submenu when not hovering
    dropdowns[i].addEventListener("mouseleave", function() {
      var dropdownContent = this.querySelector(".dropdown-content");
      if (dropdownContent.classList.contains("show")) {
        dropdownContent.classList.remove("show");
      }
    });
  }

  // Close submenus when clicking outside
  window.addEventListener("click", function() {
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

// Add event listeners to hyperlinks to prevent navigation
var hyperlinks = document.querySelectorAll("a.dropdown-item");
for (var i = 0; i < hyperlinks.length; i++) {
  hyperlinks[i].addEventListener("click", preventNavigation);
}
