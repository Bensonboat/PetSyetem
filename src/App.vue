<template>
  <div id="app">
    <nav-tab/>
    <!-- <img src="./assets/No.018.jpg" alt=""> -->
  </div>
</template>

<script>
import navTab from './components/NavTab'
export default{
  name: 'App',
  components: {
    navTab
  }
}
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  /* background-color: #eef9bf; */
  background-color: #e8f1f5;
  overflow: scroll;
  padding: 0;
  margin: 0;
  -webkit-overflow-scrolling: touch;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

/* #nav a.router-link-exact-active {
  color: #42b983;
} */

</style>
