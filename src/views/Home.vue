<template>
  <div class="home">
    <div>{{time}}</div>
    <br>
    <div>
      <input type="tel" placeholder="請輸入電話" v-model="phone" :style="{border: 'solid 1px lightblue', width: '70vw', padding: '8px 12px'}"/>
      <!-- <div :style="salonItem">
        <div class="mgRight">
          <input type="checkbox" value="1">
          測試
        </div>
        <div class="mgRight">
          <input type="checkbox" value="1">
          測試          
        </div>
        <div class="mgRight">
          <input type="checkbox" value="1">
          測試          
        </div>
        <div class="mgRight">
          <input type="checkbox" value="1">
          測試          
        </div>
        <div class="mgRight">
          <input type="checkbox" value="1">
          測試          
        </div>
        <div class="mgRight">
          <input type="checkbox" value="1">
          測試          
        </div>
      </div> -->
      <div :style="{top: '150px', position: 'relative'}">
          <button @click='createPhone'>Confirm</button>
          <button>Cancel</button>
      </div>
      <!-- <CreateName v-if="create_name"></CreateName> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import CreateName from './CreateName.vue'

export default {
  name: "home",
  components: {
    // HelloWorld
    // CreateName
  },
  data() {
    return {
      time: '',
      phone: '',
      salonItem: {
        width: '70vw',
        display: "flex",
        justifyContent: 'flex-start',
        top: "25%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: 'absolute',
        flexWrap: 'wrap'
      },
      create_name: false
    }
  },
  created(){
    this.getCurrentTime()
  },
  methods: {
    createName(){
      this.$router.push({ path: 'createName'})
    },
    createPhone(){
      let phone_data = this.$store.state.test.phone

      if(phone_data.length === 0){
        this.$router.push({ path: 'createName'})
        this.$store.commit('test/addPhone', this.phone)
        return
      } 
      
      if(phone_data.length !== 0 && phone_data.indexOf(this.phone) === -1){
        alert('請輸入名稱')
        this.$router.push({ path: 'createName'})
      }

      if(phone_data.length !== 0 && phone_data.indexOf(this.phone) !== -1){
        alert('新增成功')
      }

    },
    getCurrentTime(){
      let that = this;
      setInterval(() => {
        let time = new Date()
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let date = time.getDate()
        let current_time =  time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
        that.time = year + '/' + month + '/' + date+ '/' + '' + current_time
      }, 1000)
    }
  }
};
</script>

<style scoped lang='sass'>
  .mgRight
    margin-right: 0px
</style>