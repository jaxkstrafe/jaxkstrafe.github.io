// Define an array of blog posts
const blogPosts = [
    {
        title: 'First Blog Post',
        content: '1st Blog Post example',
        link: 'post1.html'
    },
    {
        title: 'Second Blog Post',
        content: '2nd Blog post example',
        link: 'post1.html'
    }
];

function getSnippet(content, sentenceCount = 2) {
    const sentences = content.split('. ');
    const snippet = sentences.slice(0, sentenceCount).join('. ');
    return sentences.length > sentenceCount ? snippet + '...' : snippet;
}

function displayBlogPosts() {
    const blogPostsContainer = document.getElementById('blog_posts');
    
    blogPosts.forEach((post, index) => {
        const postBlog = document.createElement('article');
        postBlog.className = 'blog_post';

        const postTitle = document.createElement('h2');
        const postLink = document.createElement('a');
        
        postLink.href = `${post.link}?post=${index}`;
        postLink.textContent = post.title;
        postTitle.appendChild(postLink);
        postBlog.appendChild(postTitle);

        const postContent = document.createElement('p');
        postContent.textContent = getSnippet(post.content);
        postBlog.appendChild(postContent);

        blogPostsContainer.appendChild(postBlog);
    });
}

function displaySingleBlogPost() {
    const blogPostContainer = document.getElementById('blog_post');

    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('post'));

    if (postId >= 0 && postId < blogPosts.length) {
        const post = blogPosts[postId];

        const postTitle = document.createElement('h2');
        postTitle.textContent = post.title;
        blogPostContainer.appendChild(postTitle);

        const postContent = document.createElement('p');
        postContent.textContent = post.content;
        blogPostContainer.appendChild(postContent);
    } else {
        blogPostContainer.textContent = 'Blog post not found.';
    }
}


window.onload = function() {
    if (document.getElementById('blog_posts')) {
        displayBlogPosts(); 
    } else if (document.getElementById('blog_post')) {
        displaySingleBlogPost();
    }
};
