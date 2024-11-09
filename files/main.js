let includes = document.getElementsByTagName('add');
for (var i = 0; i < includes.length; i++) {
  let add = includes[i];
  load_file(add.attributes.src.value, function(text) {
    add.insertAdjacentHTML('afterend', text);
    add.remove();
  });
}

function load_file(filename, callback) {
  fetch(filename)
    .then(response => response.text())
    .then(text => callback(text));
}


    // Function to toggle the navigation menu (hamburger)
    function toggleMenu() {
      document.querySelector('.nav-links').classList.toggle('show');
    }

    // Close the menu when clicking outside
    document.addEventListener('click', function(event) {
      const menu = document.querySelector('.nav-links');
      const hamburger = document.querySelector('.hamburger');

      // If the menu is open and the click is outside the menu and hamburger
      if (menu.classList.contains('show') && !menu.contains(event.target) && !hamburger.contains(event.target)) {
        menu.classList.remove('show');
      }
    });