<template>
  <div>
    <div class="home" :class="[this.showCard ? 'card_showing' : '']">
      <div class="time_block">{{time}}</div>
      <div>
        <div class="phone_search">
          <input type="text" v-model="phone" placeholder="請輸入電話" :class="[this.phone !== '' ? 'number_font' : '', this.showCard ? 'card_showing' : '']">
          <div v-if="this.phone !== ''" @click="clearPhone" class="clear_phone">x</div>
          <!-- <div @click="phoneConfirm">search</div> -->
        </div>
        <div>
          <button class="phone_confirm" @click="phoneConfirm">確定</button>
        </div>
      </div>
    </div>
    <div class="show_card_block">
      <transition name="fade">
        <pet-card v-if="showCard"/>
      </transition>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import CreateName from './CreateName.vue'

import PetCard from '../components/PetCard.vue'

export default {
  name: "home",
  components: {
    // HelloWorld
    // CreateName
    PetCard
  },
  data() {
    return {
      time: '',
      phone: '',
      showCard: false
    }
  },
  created(){
    this.getCurrentTime()
  },
  methods: {
    phoneConfirm(){
      alert(this.phone)
      this.showCard = true
    },
    clearPhone(){
      this.phone = '';
      this.showCard = false
    },
    createName(){
      this.$router.push({ path: 'createName'})
    },
    getCurrentTime(){
      let that = this;
      setInterval(() => {
        let time = new Date()
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let date = time.getDate();
        let hour = time.getHours();
        let minute = time.getMinutes();
        let second = time.getSeconds()
        month < 10 ? month = '0' + month : month;
        date < 10 ? date = '0' + date : date;
        hour < 10 ? hour = '0' + hour : hour;
        minute < 10 ? minute = '0' + minute : minute;
        second < 10 ? second = '0' + second : second

        let current_time =  hour + ":" + minute + ":" + second
        that.time = year + '/' + month + '/' + date + ' - ' + '' + current_time
      }, 1000)
    }
  }
};
</script>

<style scoped lang='sass'>
  $fz-color: rgba(0,0,0,.4)
  $main-btn: #49D49D

  .home
    margin: 30px auto 0 auto
    width: 80vw
    
  .phone_search
    box-shadow: 1px 3px 5px rgba(0,0,0,.1)
    padding: 8px 12px
    height: 50px
    border-radius: 15px
    background-color: #fff
    display: flex
    align-items: center
    
    input
      outline: none
      width: 100%
      letter-spacing: 2px
      height: 50px
      font-size: 15px
      color: $fz-color
      font-weight: 700
      font-family: 'Courier New'

    .number_font
      font-size: 26px

  .phone_confirm
    background-color: #fff
    box-shadow: 1px 3px 5px rgba(0,0,0,.1)
    width: 100px
    height: 40px
    font-size: 16px
    margin-top: 30px
    background-color: $main-btn
    color: #fff
    letter-spacing: 2px
    border-radius: 15px
    border: none
    outline: none
    cursor: pointer

  .time_block
    margin-bottom: 10px
    text-align: left
    width: 70vw
    padding-left: 5px
    color: $fz-color
    font-size: 16px
    font-weight: 500

  .card_showing
    transition: 1s
    top: 20%

  .fade-enter-active, .fade-leave-active 
    transition: 1s

  .fade-enter, .fade-leave-active
    opacity: 0
    transform: translateY(-200px)

  .fade-leave-to
    transform: translateY(200px)

  .show_card_block
    margin: 30px auto 0 auto
    width: 80vw

  .clear_phone
    font-size: 18px
    color: $fz-color
    font-weight: 700
    font-family: 'Papyrus'
    margin-right: 5px

</style>