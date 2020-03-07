<template>
  <div id="app" ref="app_block">
    <router-view @scrollHeightToTop="scrollHeightToTop"/>
    <!-- <nav-tab/> -->
    <!-- <img src="./assets/No.018.jpg" alt=""> -->
  </div>
</template>
<script>
import navTab from './components/NavTab'
export default{
  name: 'App',
  components: {
    navTab
  },
  methods: {
    scrollHeightToTop(){
      let current_height = this.$refs.app_block.scrollTop;
      if(current_height > 2000 && current_height !== 0){
        current_height = 2000
      }
      setInterval(() => {
        if(current_height > 0){
          current_height = current_height - 20
          this.$refs.app_block.scrollTop = current_height
          console.log(current_height,'333')
        } else {
          clearInterval()
        }
      }, 1)
    }
  }
}
</script>

<style>
html, body {
  height: 100%;
}

#app {
  font-family: 微軟正黑體, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* height: 90vh; */
  height: 100%;
  /* background-color: #eef9bf; */
  /* background-color: #e8f1f5; */
  background-color: rgb(239, 204 , 210);
  overflow: scroll;
  padding: 0;
  margin: 0;
  -webkit-overflow-scrolling: touch;
  /* min-height: -webkit-fill-available */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

/* #nav a.router-link-exact-active {
  color: #42b983;
} */

</style>
