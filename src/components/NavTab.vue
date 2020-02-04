<template>
  <div>
    <div id="nav" class="nav_tab">
      <router-link to="/" class="tab">首頁</router-link>
      <router-link to="/List" class="tab">工作單</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
    name: "navTab"
}

</script>

<style lang="sass" scoped>
$second_color: #7697a0

.nav_tab
  background-color: $second_color
  padding: 15px 12px
  display: flex
  justify-content: space-around

#nav .tab
  text-decoration: none
  color: #eee
  opacity: .5
  font-size: 15px

#nav .router-link-exact-active
    opacity: 1

</style>