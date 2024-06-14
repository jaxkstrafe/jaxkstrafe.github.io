const blogPosts = [
    {
        title: 'First Blog Post',
        content: '1st Blog post example'
    },
    {
        title: 'Second Blog Post',
        content: '2nd Blog post example'
    }
];

const blogPostsContainer = document.getElementById('blog_posts');

blogPosts.reverse().forEach(post => {
    const postBlog = document.createElement('article');
    postBlog.className = 'blog_post';

    const postTitle = document.createElement('h2');
    postTitle.textContent = post.title;
    postBlog.appendChild(postTitle);

    const postContent = document.createElement('p');
    postContent.textContent = post.content;
    postBlog.appendChild(postContent);

    blogPostsContainer.appendChild(postBlog);
});
