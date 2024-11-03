document.addEventListener("DOMContentLoaded", function() {
  const postsContainer = document.getElementById("posts-container");
  const paginationControls = document.getElementById("pagination-controls");
  const postsPerPage = 10;
  let currentPage = 1;
  let posts = [];

  // Fetch posts list from JSON file
  fetch('/files/posts-list.json')
    .then(response => response.json())
    .then(data => {
      posts = data;
      renderPosts();
      setupPagination();
    })
    .catch(error => {
      console.error("Error fetching posts list:", error);
      postsContainer.innerHTML = "<p>Failed to load posts.</p>";
    });

  // Function to render posts for the current page
  function renderPosts() {
    postsContainer.innerHTML = ""; // Clear existing posts

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const postsToDisplay = posts.slice(start, end);

    postsToDisplay.forEach(post => {
      const postElement = document.createElement("div");
      postElement.classList.add("post-item");
      postElement.innerHTML = `<a href="${post["post-link"]}">${post["post-name"]}</a>`;
      postsContainer.appendChild(postElement);
    });
  }

  // Function to set up pagination buttons
  function setupPagination() {
    paginationControls.innerHTML = ""; // Clear existing pagination

    const totalPages = Math.ceil(posts.length / postsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.classList.add("page-button");
      if (i === currentPage) pageButton.disabled = true;

      pageButton.addEventListener("click", function() {
        currentPage = i;
        renderPosts();
        setupPagination();
      });

      paginationControls.appendChild(pageButton);
    }
  }
});