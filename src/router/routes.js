import ArticleDetails from 'pages/ArticleDetails.vue';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'index', component: () => import('pages/Index.vue') },
      { path: '', component: () => import('pages/HomePage.vue')},
      {
        path: '/article/:id',
        name: 'ArticleDetails',
        component: () => import('pages/ArticleDetails.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
