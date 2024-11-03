document.addEventListener('DOMContentLoaded', function() {
  const blogContainer = document.getElementById('blog-container');

  // Get the full query string from the URL (e.g., ?blog1)
  const queryString = window.location.search;

  // Remove the '?' from the query string to get the blog name (e.g., 'blog1')
  const postFileName = queryString.substring(1); // This removes the '?'

  if (postFileName) {
    // Construct the full file path based on the query parameter (e.g., posts/blog1.json)
    const postFile = `posts/${postFileName}.json`;

    // Fetch the corresponding JSON file
    fetch(postFile)
      .then(response => {
        if (!response.ok) {
          throw new Error('Post not found'); // Simplified error message
        }
        return response.json();
      })
      .then(post => {
        // Set the document title
        document.title = post.title; // Set the title of the page

        // Populate the HTML with the post data
        document.getElementById('title').textContent = post.title;
        document.getElementById('date').textContent = `Published on: ${post.date}`;
        document.getElementById('author').textContent = `Author: ${post.author}`;

        // Set the image
        const postImage = document.getElementById('post-image');
        if (post.image) {
          postImage.src = post.image; // Set the image source
          postImage.style.display = 'block'; // Show the image
          postImage.style.maxWidth = '100%'; // Set max-width
          postImage.style.margin = '0 auto'; // Center the image horizontally
        }

        // Set the content as HTML
        document.getElementById('content').innerHTML = post.content; // Allow HTML
      })
      .catch(error => {
        console.error('Error loading the post:', error);
        // Display a user-friendly error message
        blogContainer.innerHTML = `<h3>Page Not Found</h3><p>Sorry, this post could not be loaded. Please check the URL or try again later.</p>`;
      });
  } else {
    // If no query parameter is provided, show an error message
    blogContainer.innerHTML = '<h3>Page Not Found</h3><p>No post specified. Please provide a valid post identifier in the URL.</p>';
  }
});