<template>
  <div class="about red">
    <h1>This is an about page</h1>
    
    <p class="border"></p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      msg: 'Vuex Module success'
    }
  },

  mounted(){
    this.$store.dispatch('test/test', this.msg)
  }
  
}
</script>

<style scoped lang='sass'>
$mainColor: #42b883

@mixin test($bgcolor)
  border: solid 1px yellow
  padding: 20px
  background-color: $bgcolor


.red
  color: $mainColor

.border
  +test(lightcoral)
</style>
