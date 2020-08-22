<template>
  <div id="app">
    <div id="nav">
      <router-link to="/week">This Week</router-link> |
      <router-link to="/month">This Month</router-link> | 
      <router-link to="/year">This Year</router-link> | 
      <router-link to="/categories">Categories</router-link>
    </div>
    <router-view/>
  </div>
</template>

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
<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
</script>
