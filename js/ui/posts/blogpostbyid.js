// Function to fetch and display specific blog posts in cards

const baseUrl = "https://sweetheartembroidery.com";
const apiEndpoint = "/wp-json/wp/v2/posts";
const apiPosts = baseUrl + apiEndpoint;

async function fetchBlogPostById(postId) {
  try {
    const response = await fetch(`${apiPosts}/${postId}?_embed`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch blog post: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function displayBlogCard(postId, containerId) {
  const post = await fetchBlogPostById(postId);
  if (post) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
            <div class="blog-card-content">
                <h2>${post.title.rendered}</h2>
                <p>${new Date(post.date).toLocaleDateString()}</p>
                <p>${post.excerpt.rendered}</p>
                <a class="blog-button" href="blog.html?id=${
                  post.id
                }">Read more</a>
            </div>
        `;
    if (post._embedded && post._embedded["wp:featuredmedia"]) {
      const featuredMedia = post._embedded["wp:featuredmedia"][0];
      if (featuredMedia && featuredMedia.source_url) {
        container.innerHTML = `
          <div class="blog-card-image">
          <img src="${featuredMedia.source_url}" alt="${post.title.rendered}">
      </div>
                    <div class="blog-card-content">
                        <h2>${post.title.rendered}</h2>
                        <p class="reduce">${new Date(
                          post.date
                        ).toLocaleDateString()}</p>
                        <p class="no__padding">${post.excerpt.rendered}</p>
                        <a class="blog-button flex" href="blog.html?id=${
                          post.id
                        }">Read </a>
                    </div>
                   
                `;
      }
    }
  }
}
