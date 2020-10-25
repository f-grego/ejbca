<template>
  <div id="app">
    <md-toolbar>
      <h3 class="md-title">{{ headerTitle }}</h3>
    </md-toolbar>
    
    <router-view />
  </div>
</template>

<script>
export default {
  data: () => ({
    title: ""
  }),
  mounted() {
    this.$root.$on("setTitle", title => this.title = title)
  },
  computed: {
    headerTitle() {
      return (this.title !== "" && this.$route.meta.title === "") ? this.title : this.$route.meta.title
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
