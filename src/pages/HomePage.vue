<template>
  <q-page>
    
      <!-- Search form with advanced filters -->
      <q-form @submit="searchNews">
        <div class="filter-container">
          <!-- Search Input -->
          <div class="filter-item q-col-xs-12 q-col-md-4">
            <q-input
              v-model="searchQuery"
              label="Search for news"
              dense
              outlined
              clearable
              class="filter-item"
              color="#421a42"
            />
          </div>
          <!-- Source Select -->
          <div class="filter-item q-col-xs-12 q-col-md-4">
            <q-select
              v-model="sourceFilter"
              label="Source"
              :options="sourceOptions"
              dense
              class="filter-item"
            />
          </div>
          <!-- Date Filter Dropdown -->
          <div class="filter-item q-col-xs-12 q-col-md-4">
            <q-select
              v-model="dateFilter"
              label="Sort by Date"
              :options="dateOptions"
              dense
              class="filter-item"
            />
          </div>
          <!-- Search Button -->
          <div class="filter-item q-col-xs-12 q-col-md-12">
            <q-btn  id="search-btn"
              type="submit"
              label="Search"
              color="primary"
              dense
              icon="search"
              
              @click.prevent="searchNews"
            />
          </div>
        </div>
      </q-form>

    <!-- List of news articles -->
    <div v-if="articles.length > 0">
      <!-- Use q-card-columns to make cards responsive -->
      <q-card-section q-card-columns>
        <q-card v-for="article in articles" :key="article.url" class="q-mb-md q-col-md-6">
          <q-card-section>
            <div style="display: flex; align-items: flex-start;">
              <!-- Increase the size of the circle by setting the 'size' prop -->
              <q-avatar size="150px">
                <img :src="article.urlToImage" alt="Article Image" />
              </q-avatar>
              <div class="q-ml-md">
                <q-card-title>{{ article.title }}</q-card-title>
                <q-card-main>
                  <!-- Set the background and text color for the article content -->
                  <div style="background-color: white; color: black;">
                    <div v-html="article.content"></div>
                  </div>
                </q-card-main>
                <div class="q-card-separator"></div>
                <div class="q-card-actions">
                  <!-- Add "Read More" button -->
                  <router-link
                    :to="{ name: 'ArticleDetails', params: { id: article.id } }"
                  >
                    <q-btn label="Read more" color="#421a42" />
                  </router-link>
                </div>
                <!-- Show date and source at the end of the article -->
                <div class="q-font-small text-grey-7">
                  Published on: {{ formatDate(article.publishedAt) }}
                  <br />
                  Source: {{ article.source.name }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
    </div>
   
       <!-- Display a message if there are no articles -->
       <q-card v-else class="no-articles-card">

        <q-card-main>No articles found.</q-card-main>
      </q-card>
     <!-- Pagination -->
     
     
     <q-pagination
        v-model="currentPage"
        max="5"
        direction-links
        outline
        color="#251241"
        active-design="unelevated"
        active-color="brown"
        active-text-color="white"
      />

    <!-- </q-container> -->
  </q-page>
</template>



<script>
export default {
  data() {
    return {
      searchQuery: "",
      sourceFilter: "",
      dateFilter: null,
      articles: [],
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 0,
      sourceOptions: [],
      dateOptions: ["Yesterday", "1 week", "1 month"],
    };
  },
  created() {
    this.fetchNewsSources();
    this.searchNews();
  },
  watch: {
    currentPage: "loadPage",
  },
  methods: {
    fetchNewsSources() {
  const apiKey = "2541b8085be64489ac1a0cd9d4e93103";
  const sourceUrl = `https://newsapi.org/v2/sources?apiKey=${apiKey}`;

  this.$axios
    .get(sourceUrl)
    .then((response) => {
      this.sourceOptions = response.data.sources.map((source) => source.name);
    })
    .catch((error) => {
      console.error("Error fetching news sources:", error);
    });
},

searchNews() {
  const apiKey = "2541b8085be64489ac1a0cd9d4e93103";
  let apiUrl = `https://newsapi.org/v2/everything?q=${this.searchQuery}&apiKey=${apiKey}&page=${this.currentPage}&pageSize=${this.itemsPerPage}`;

  if (this.sourceFilter) {
    apiUrl += `&sources=${this.sourceFilter}`;
  }

  if (this.dateFilter) {
    const fromDate = this.calculateDate(this.dateFilter);
    const toDate = new Date().toISOString().split("T")[0];

    apiUrl += `&from=${fromDate}&to=${toDate}`;
  }

  this.$axios
    .get(apiUrl)
    .then((response) => {
      this.articles = response.data.articles;
      this.totalPages = Math.ceil(response.data.totalResults / this.itemsPerPage);
    })
    .catch((error) => {
      console.error("Error fetching news:", error);
    });
},

    calculateDate(filter) {
      const today = new Date();
      switch (filter) {
        case "Yesterday":
          today.setDate(today.getDate() - 1);
          break;
        case "Previous three days":
          today.setDate(today.getDate() - 3);
          break;
        case "1 week":
          today.setDate(today.getDate() - 7);
          break;
        case "1 month":
          today.setMonth(today.getMonth() - 1);
          break;
        default:
          break;
      }
      return today.toISOString().split("T")[0];
    },
    loadPage() {
      this.searchNews();
    },
    
    // Add this method to handle the "Next" button click
    nextPage() {
      if (this.currentPage < this.totalPages) {
        // Increment the current page to load the next page of results
        this.currentPage++;
        this.searchNews();
      }
    },
    formatDate(date) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    },
    showArticleDetails(article) {
      // Create a route to display the article details and pass the article ID as a route parameter
      this.$router.push({ name: 'ArticleDetails', params: { id: article.id } });
    },
  },
};
</script>



  
  <style scoped>
.filter-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* Allow items to wrap to the next row if the container is too narrow */
  margin-top: 10px;
  margin-left: 30px;
  
}

.filter-item {
  flex: 1; /* Each filter item takes equal space */
  margin-right: 10px; /* Add spacing between filter items */
}

  /* Custom CSS for styling the search bar and filters */
  .q-input {
    width: 100%;
  }
  
  .q-icon {
    position: absolute;
    top: 12px;
    left: 10px;
    font-size: 20px;
    color: #888;
  }
  
  .q-select,
  .q-date {
    width: 100%;
    margin-bottom: 10px;
  }
  
  .q-btn[type="submit"] {
    width: 100%;
  }

  #search-btn {
  background-color: #1e0a3d; /* Change the background color */
  color: #fff; /* Change the text color */
  font-size: 14px; /* Adjust the font size */
  padding: 6px 12px; /* Adjust the padding to make the button smaller */
  border-radius: 4px; /* Add border-radius for rounded corners */
}
  
  /* Custom CSS for "Read more" button */
  .q-card-actions .q-btn {
    background-color: #1e0a3d; /* Change the background color as desired */
    color: #fff; /* Change the text color as desired */
    border-radius: 4px; /* Add border-radius for rounded corners */
  }
  
  /* Custom CSS for cards */
  .q-card {
    border: 1px solid #ccc; /* Add a border to the cards */
    border-radius: 8px; /* Add border-radius for rounded corners */
    padding: 10px; /* Adjust padding as needed */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add a box shadow for a card-like effect */
  }
  
  .q-card-title {
    font-size: 18px; /* Customize the title font size */
    font-weight: bold; /* Customize the title font weight */
  }
  
  .q-card-main {
    font-size: 16px; /* Customize the description font size */
  }
  
  .q-card-actions .q-btn {
    margin-top: 10px; /* Add margin to separate "Read more" buttons */
  }
  .no-articles-card {
  text-align: center; /* Center-align the card content */
  margin: 50px auto; /* Add margin to center the card vertically */
}

.no-articles-card img {
  margin-bottom: 10px; /* Add some spacing below the avatar image */
}

.filter-item {
  flex: 1;
  margin-right: 10px;
  margin-bottom: 10px;
}

/* Custom CSS for styling the search bar and filters */
.q-input {
  width: 100%;
}

/* Custom CSS for search button */
.filter-item .q-btn {
  width: 100%;
  max-width: 200px; /* Adjust the max-width as needed */
  font-size: 16px;
  background-color: #100427; /* Change the background color to purple (#421a42) */
  color: #fff; /* Change the text color to white (#fff) */
}


/* Custom CSS for "No articles found" card */
.no-articles-card {
  text-align: center;
  margin: 50px auto;
}

.no-articles-card img {
  margin-bottom: 10px;
}

/* Responsive styles */
@media screen and (max-width: 600px) {
  .filter-item.q-col-xs-12 {
    flex: 1 1 100%; /* Full width on small screens */
  }
}
</style>