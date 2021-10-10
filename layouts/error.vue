<template>
  <v-app>
    <div class="text-center pt-10 rounded-lg">
      <v-icon color="error" size="80">mdi-alert-circle</v-icon>
      <h1
        v-if="error.statusCode === 404"
        class="error--text text-lighten-2"
        style="font-size: 3rem"
      >
        {{ pageNotFound }}
      </h1>
      <h1 v-else class="error--text text-lighten-2" style="font-size: 3rem">
        {{ otherError }}
      </h1>
      <NuxtLink to="/">
        <h2>Go to Home page</h2>
      </NuxtLink>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
