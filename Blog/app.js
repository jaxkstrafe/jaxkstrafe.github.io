
const blogPosts = [
    {
        title: 'How I Gained Millions of Views and Likes On TikTok',
        content: 'Although I only started the account this year and really only started posting seriously in April. Since then I have garnered millions of views and likes using a niche style of content creation. Consistency is one of the most important things I believe for growing any social media account. Trust me I’ve had videos perform very poorly, I’ve had videos one day get hundreds of thousands of views only to watch the next few struggle to reach five thousand. Since April I have posted almost every day which I believe is what helped grow my account at such a rapid rate. Keeping a niche style of content is something I can also attribute to my rapid growth on the platform. Niching down your content to one particular subject, idea, or franchise(like I did) will only benefit you in the algorithm and with retaining followers. Truthfully I do not think it is that difficult to garner a following on TikTok as long as you make decent content consistently. However, if you try one idea and after two weeks or so you have not seen any growth switch it up and try something new.',
        link: 'post1.html'
    // },
    // {
    //     title: 'Second Blog Post',
    //     content: '2nd Blog post example',
    //     link: 'post1.html'
    // },
    // {
    //     title: 'Third Blog Post',
    //     content: `
    //         3rd Blog post example, this is the third example of a blog
    //     `,
    //     link: 'post1.html'
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
