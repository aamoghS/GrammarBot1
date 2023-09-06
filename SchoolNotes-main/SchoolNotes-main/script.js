var correctPassword = "Password";
let wrongPasswordEntered = false;

// This function is used to toggle the password visibility.
function togglePassword() {
    toggleIcon();
    var x = document.getElementById("pass");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

// This function will toggle the show or hide password icon.
function toggleIcon() {
    var x = document.getElementById("show_pass");
    var y = document.getElementById("hide_pass");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
    } else {
        x.style.display = "none";
        y.style.display = "block";
    }
}

// This function will authenticate the entered password.
function authenticatePassword() {
    var enteredPassword = document.getElementById("pass").value;
    var loginStatus = document.getElementById("loginStatus");

    if (enteredPassword.toLowerCase() === "GunnaWunna") {
        passwordEntered = true; // Set passwordEntered to true for "offline"
        localStorage.setItem("passwordEntered", "true");
        loginStatus.textContent = "Offline mode activated!";
        // Redirect to "notes.html" on successful offline mode activation
        window.location.href = "notes.html";
        return; // Exit the function when "offline" is entered
    }

    if (!passwordEntered) {
        // If the user hasn't entered the password yet, prevent further processing
        return;
    }

    if (wrongPasswordEntered) {
        // If the user entered the wrong password previously, prevent them from trying again for 10 seconds
        loginStatus.textContent = "Please wait for 10 seconds before trying again.";
        return;
    }

    if (enteredPassword === correctPassword) {
        loginStatus.textContent = "Login successful!";
        // Display the login status popup for 20 seconds on successful login
        var x = document.getElementById("msg");
        x.style.display = "flex";

        setTimeout(function () {
            x.style.display = "none";
            loginStatus.textContent = ""; // Clear the login status

            // Redirect to "notes.html" after a successful login
            window.location.href = "notes.html";
        }, 2000); // Set the timeout to 2 seconds (2000 milliseconds)
    } else {
        loginStatus.textContent = "Incorrect password. Please try again.";
        wrongPasswordEntered = true;
        // Display the login status popup for 10 seconds on incorrect password
        var x = document.getElementById("msg");
        x.style.display = "flex";
        setTimeout(function () {
            x.style.display = "none";
            loginStatus.textContent = ""; // Clear the login status
            wrongPasswordEntered = false; // Reset the flag after 10 seconds
        }, 10000); // Set the timeout to 10 seconds (10000 milliseconds)
    }
}
var password = correctPassword; // Replace with your actual password

// Check if the password has already been entered and stored in local storage
var passwordEntered = localStorage.getItem("passwordEntered") === "true";

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
