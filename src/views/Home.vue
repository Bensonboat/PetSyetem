<template>
  <div>
    <div class="home" :class="[this.showCard ? 'card_showing' : '']">
      <div class="time_block">{{time}}</div>
      <div :style="{display: 'flex'}">
        <div v-if="showPhoneSearch" class="phone_search">
          <input type="number" v-model="phone" placeholder="請輸入電話" :class="[this.phone !== '' ? 'number_font' : '', this.showCard ? 'card_showing' : '']">
          <div v-if="this.phone !== ''" @click="clearPhone" class="clear_phone phone_blcok_icon">x</div>
          <!-- <a-icon type="search" @click="phoneConfirm" class="phone_blcok_icon"/> -->
        </div>
        <div v-else :style="[nameDataBlock]">
            <a-input
              placeholder="請輸入名稱"
              v-model="name_data.name"
              :style="[petNameBlock]"
            />
            <div class="feed_select_block">
              <div :style="[feedSelectBlcok]">犬種</div>
              <a-select defaultValue="Amy" style="width: 100px" v-model="name_data.feed">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="Amy">Amy</a-select-option>
                <a-select-option value="disabled" disabled>Disabled</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
              </a-select>
            </div>
        </div>
        <div :style="[switchIcon]" @click="switchSearchMode(showPhoneSearch)">
          <a-icon type="sync"/>
        </div>
      </div>
      <button v-if="!showCard" class="search_btn" @click="phoneConfirm">確認</button>
    </div>
    <div>
      <transition name="fade">
        <pet-card v-if="showCard" class="show_card_block"/>
      </transition>
      <button v-if="showCard" class="search_btn" @click="phoneConfirm" :style="{marginBottom: '30px'}">確認</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

import PetCard from '../components/PetCard.vue'

export default {
  name: "home",
  components: {
    // HelloWorld
    PetCard
  },
  data() {
    return {
      time: '',
      phone: '0912345678',
      name_data: {
        name: '',
        feed: 'Amy'
      },
      showPhoneSearch: true,
      showCard: false,
      switchIcon: {
        display: 'flex',
        alignSelf: 'center',
        fontSize: '15px',
        marginLeft: '10px',
        color: '#7697a0'
      },
      feedSelectBlcok: {
        marginRight: '10px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '12px'
      },
      petNameBlock: {
        width: '40%',
        letterSpacing: '2px',
        fontSize: '12px',
        fontWeight: 700,
        color: '#216583',
      },
      nameDataBlock: {
        width: '100%',
        display: 'flex', 
        backgroundColor: 'white', 
        padding: '8px 12px', 
        height: '50px', 
        borderRadius: '5px', 
        justifyContent: 'space-between', 
        boxShadow: '1px 3px 5px rgba(0,0,0,.1)'
      }
    }
  },
  created(){
    this.getCurrentTime()
  },
  methods: {
    phoneConfirm(){
      // alert(this.phone)
      this.showCard = true
    },
    clearPhone(){
      this.phone = '';
      this.showCard = false
    },
    // createName(){
    //   this.$router.push({ path: 'createName'})
    // },
    switchSearchMode(change){
      this.showPhoneSearch = !change
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

<style lang='sass'>
  $fz-color: rgba(0,0,0,.4)
  // $main-btn: #49D49D
  // $main-btn: #99ddcc
  $main-btn: #4a707a

  .home
    margin: 30px auto 0 auto
    width: 80vw
    
  .phone_search
    box-shadow: 1px 3px 5px rgba(0,0,0,.1)
    padding: 8px 12px
    height: 50px
    border-radius: 5px
    background-color: #fff
    display: flex
    align-items: center
    width: 100%
    
    input
      outline: none
      border: none
      width: 100%
      letter-spacing: 2px
      height: 50px
      font-size: 16px
      color: $fz-color
      font-weight: 700
      font-family: 'Courier New'

    .number_font
      font-size: 18px

  // .phone_confirm
  //   background-color: #fff
  //   box-shadow: 1px 3px 5px rgba(0,0,0,.1)
  //   width: 100px
  //   height: 40px
  //   font-size: 16px
  //   margin-top: 30px
  //   background-color: $main-btn
  //   color: #fff
  //   letter-spacing: 2px
  //   border-radius: 15px
  //   border: none
  //   outline: none
  //   cursor: pointer

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
    width: 85vw

  .clear_phone
    // font-size: 18px
    // color: $fz-color
    font-weight: 700
    font-family: 'Papyrus'
    margin-right: 12px

  .phone_blcok_icon
    font-size: 20px
    color: rgba(0,0,0,.2)

  .feed_select_block
    display: flex
    align-items: center 

  .search_btn
    margin-top: 15px
    letter-spacing: 2px
    width: 70px
    font-size: 12px
    user-select: none
    -ms-touch-action: manipulation
    touch-action: manipulation
    height: 32px
    padding: 0 15px
    border-radius: 4px
    position: relative
    display: inline-block
    font-weight: 400
    white-space: nowrap
    text-align: center
    outline: none
    background-color: $main-btn
    color: #eee

</style>