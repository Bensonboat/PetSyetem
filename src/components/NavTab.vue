<template>
  <div>
    <div id="nav" class="nav_tab">
      <router-link to="/Home" class="tab">首頁</router-link>
      <router-link to="/List" class="tab">工作單</router-link>
    </div>
    <div class="view">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
    name: "NavTab",
}

</script>

<style lang="sass" scoped>
$main-color: rgb(236, 86, 89)

.nav_tab
  background-color: $main-color
  padding: 15px 12px
  display: flex
  justify-content: space-around
  height: 50px

#nav .tab
  text-decoration: none
  color: #eee
  opacity: .5
  font-size: 15px

#nav .router-link-exact-active
    opacity: 1

.view
  min-height: -webkit-fill-available
</style>