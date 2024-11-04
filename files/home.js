document.addEventListener("DOMContentLoaded", function() {
  const postsContainer = document.getElementById("posts-container");
  const paginationControls = document.getElementById("pagination-controls");
  const postsPerPage = 8; // Adjust this value based on how many posts you want per page
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

    // Helper function to create a page button
    function createPageButton(page) {
      const pageButton = document.createElement("button");
      pageButton.textContent = page;
      pageButton.classList.add("page-button");
      if (page === currentPage) pageButton.disabled = true;

      pageButton.addEventListener("click", function() {
        currentPage = page;
        renderPosts();
        setupPagination();
      });

      paginationControls.appendChild(pageButton);
    }

    if (totalPages <= 5) {
      // If there are 5 or fewer pages, show all page buttons
      for (let i = 1; i <= totalPages; i++) {
        createPageButton(i);
      }
    } else {
      // Show first page button
      createPageButton(1);

      // Determine the range for the middle buttons
      let startPage, endPage;

      if (currentPage <= 3) {
        startPage = 2;
        endPage = 4;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
        endPage = totalPages - 1;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }

      // Create the middle buttons
      for (let i = startPage; i <= endPage; i++) {
        createPageButton(i);
      }

      // Show last page button
      createPageButton(totalPages);
    }
  }
});