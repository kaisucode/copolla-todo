<template>
  <div id="app">
    <div id="nav">

      <router-link to="/week">This Week</router-link> |
      <router-link to="/month">This Month</router-link> | 
      <router-link to="/year">This Year</router-link> | 
      <router-link to="/about">Categories</router-link>
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

const KEY_CODES = {
  "h": 72,
  "j": 74, 
  "k": 75, 
  "l": 76, 
  "d": 68, 
  "f": 70,
  "a": 65, 
  "i": 73
};


function currentPage(){
  return window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
}

document.addEventListener("keydown", (event) => {
  if (event.keyCode == KEY_CODES["h"]){
    
  }
  else if (event.keyCode == KEY_CODES["j"]){
    
  }
  else if (event.keyCode == KEY_CODES["k"]){
    
  }
  else if (event.keyCode == KEY_CODES["l"]){
    var donald_j_trump = ["week", "month", "year", "about"];

    console.log(window.location.href == "year");
    console.log(donald_j_trump.indexOf(window.location.href));
    
    var blah = donald_j_trump[(4+(donald_j_trump.indexOf(window.location.href)-1))%4];
    $(`#{blah}`).click();
  }
  else if (event.keyCode == KEY_CODES["d"]){
    window.location.href = "year";

  }
  else if (event.keyCode == KEY_CODES["f"]){
    
  }
  else if (event.keyCode == KEY_CODES["a"]){
    
  }
  else if (event.keyCode == KEY_CODES["i"]){
    
  }
});

</script>
