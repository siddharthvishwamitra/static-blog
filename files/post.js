document.addEventListener('DOMContentLoaded', function() {
  const blogContainer = document.getElementById('blog-container');

  const queryString = window.location.search;
  const postFileName = queryString.substring(1); // Extracts post name from URL

  if (postFileName) {
    const postFile = `posts/${postFileName}.json`;

    // Check if the post is already in local storage
    const cachedPost = localStorage.getItem(postFileName);

    if (cachedPost) {
      // If cached post exists, parse and use it
      const post = JSON.parse(cachedPost);
      displayPost(post);
    } else {
      // Fetch the post if not cached
      fetch(postFile)
        .then(response => {
          if (!response.ok) {
            throw new Error('Post not found');
          }
          return response.json();
        })
        .then(post => {
          // Cache the fetched post
          localStorage.setItem(postFileName, JSON.stringify(post));
          displayPost(post);
        })
        .catch(error => {
          console.error('Error loading the post:', error);
          blogContainer.innerHTML = `<h3>Page Not Found</h3><p>Sorry, this post could not be loaded. Please check the URL or try again later.</p>`;
        });
    }
  } else {
    blogContainer.innerHTML = '<h3>Page Not Found</h3><p>No post specified. Please provide a valid post identifier in the URL.</p>';
  }

  // Function to display the post on the page
  function displayPost(post) {
    document.title = post.title; // Set the page title

    document.getElementById('title').textContent = post.title;
    document.getElementById('date').textContent = `Published on: ${post.date}`;
    document.getElementById('author').textContent = `Author: ${post.author}`;

    // Display the featured image if it exists and center it
    const postImage = document.getElementById('post-image');
    if (post.image) {
      postImage.src = post.image;
      postImage.style.display = 'block'; // Make sure to display it as a block
      postImage.style.margin = '0 auto'; // Center the image
    }

    // Set content as HTML directly
    document.getElementById('content').innerHTML = post.content;
  }
});