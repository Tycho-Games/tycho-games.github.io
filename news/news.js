// News section has ID "news"

news = document.getElementById("news").innerText.split(" ")
for (let i = 0; i < news.length; i++) {
    newsArticle = "";
    // Generated by ChatGPT because I suck at JavaScript 👍
    function getArticleIdFromHash() {
        return parseInt(news[i]);
    }

    async function fetchArticles() {
        try {
            const response = await fetch('news/news.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch articles:', error);
            return null;
        }
    }

    async function loadArticle() {
        const articleId = getArticleIdFromHash();
        const articlesData = await fetchArticles();
        if (articlesData && articlesData.articles) {
            const article = articlesData.articles[articleId];
            if (article) {
                newsArticle = "<div class='newsArticle'><h2>" + article.title + "</h2><img src='" + article.image + "'><div>" + article.description + "</div>";
            } else {
                newsArticle = 'Article not found.';
            }
        } else {
            newsArticle = 'Failed to load articles.';
        }
    }

    window.onload = loadArticle;
    window.onhashchange = loadArticle;

    document.getElementById("news").innerHTML = document.getElementById("news").innerHTML + newsArticle;
}