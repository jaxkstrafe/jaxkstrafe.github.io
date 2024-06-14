const blogPosts = [
    {
        title: 'A Galaxy Far, Far Away: The Everlasting Appeal of Star Wars',
        content: 'Few franchises have achieved the cultural impact of Star Wars. Since its debut in 1977, Star Wars has transcended the realm of cinema to become a global phenomenon. With a rich tapestry of characters, a mythic narrative, and groundbreaking special effects, its no wonder that the series continues to captivate audiences across generations. Lets dive into why Star Wars remains an enduring icon of popular culture.'
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
