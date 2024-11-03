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