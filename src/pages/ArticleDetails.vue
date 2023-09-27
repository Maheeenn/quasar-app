<!-- ArticleDetails.vue -->

<template>
  <div>
    <h2>{{ article.title }}</h2>
    <p>{{ article.description }}</p>
    <p>{{ article.content }}</p>
    <!-- Display other article details as needed -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      article: null,
    };
  },
  created() {
    // Get the article ID from the route parameter
    const articleId = this.$route.params.id;

    axios.get(`https://example.com/api/articles/${articleId}`)
      .then(response => {
        this.article = response.data;
      })
      .catch(error => {
        console.error('Error fetching article:', error);
      });
  },
};
</script>
