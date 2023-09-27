<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="custom-toolbar"> 
        <q-toolbar-title>
          Today news
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

</script>
<style scoped>
/* Add custom CSS to style the q-toolbar */
.custom-toolbar {
  background-color:#251241; /* Set the background color to purple */
  color: white; /* Set the text color to white */
}
</style>