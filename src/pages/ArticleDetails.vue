<template>
  <div>
    <h1>{{ article.title }}</h1>
    <div v-html="article.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {} // Initialize with an empty object
    };
  },
  created() {
    const articleId = this.$route.params.id; // Get the article ID from the route parameter
    const apiUrl = `https://example.com/api/articles/${articleId}`; // Replace with your actual API endpoint

    // Make an Axios GET request to fetch the full article content
    axios
      .get(apiUrl)
      .then(response => {
        this.article = response.data; // Set the retrieved article data to the "article" data property
      })
      .catch(error => {
        console.error('Error fetching article:', error);
      });
  }

};
</script>
