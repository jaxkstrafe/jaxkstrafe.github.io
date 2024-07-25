
const blogPosts = [
    {
        title: 'How I Gained Millions of Views and Likes On TikTok',
        content: 'I only started my account this year and began posting seriously in April. Since then, I\'ve garnered millions of views and likes by using a niche style of content creation. Consistency, in my opinion, is crucial for growing any social media account. I\'ve had videos perform poorly, but I\'ve also had videos that received hundreds of thousands of views one day, only to see the next few struggle to reach five thousand. Since April, I\'ve posted almost every day, which I believe has helped my account grow rapidly. \n\nMy style of content is easy to make; I spend at most an hour a day working on it. This makes it easy to keep up with daily posting. There are honestly no excuses not to post consistently. \n\nThe second key to my rapid growth is maintaining a niche style of content. Focusing your content on a particular subject, idea, or franchise (like I did) benefits you in the algorithm and helps retain followers. I post Star Wars content, which is a huge franchise with millions of fans. If I were to post Star Wars one day, Harry Potter the next, and then Marvel or DC after that, I wouldn\'t retain followers and returning viewers as well as I do now. It would be difficult to grow a fanbase. \n\nIn truth, I don\'t think it\'s that difficult to garner a following on TikTok as long as you make decent content consistently. However, if you try one idea and don\'t see any growth after two weeks or so, switch it up and try something new.',
        link: 'post1.html',
        date: '2024-07-23'
    // },
    // {
    //     title: 'Second Blog Post',
    //     content: '2nd Blog post example',
    //     link: 'post2.html',
    //     date: '2024-07-24'
    // },
    // {
    //     title: 'Third Blog Post',
    //     content: '3rd Blog post example, this is the third example of a blog',
    //     link: 'post3.html',
    //     date: '2024-07-23'
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

        const postDate = document.createElement('p');
        postDate.className = 'post_date';
        postDate.textContent = `Published on: ${post.date}`;
        postBlog.appendChild(postDate);

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

        const postDate = document.createElement('p');
        postDate.className = 'post_date';
        postDate.textContent = `Published on: ${post.date}`;
        blogPostContainer.appendChild(postDate);
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
