<template>
  <div id="app">
    <nav-tab/>
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
  background-color: #eef9bf;
  overflow: scroll;
  padding: 0;
  margin: 0
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
