<template>
  <div>
    <div id="nav" class="nav_tab">
      <router-link to="/" class="tab">首頁</router-link>
      <router-link to="/list" class="tab">工作單</router-link>
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
.nav_tab
  background-color: #fff
  padding: 8px 12px
  display: flex
  justify-content: space-around

.tab
  text-decoration: none
</style>