<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
import home from './views/Home.vue'

export default {
  name: 'App',
  components: {
    home,
  },
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: scroll;
}
</style>
