<template>
  <div>
    <div @click="addNewCard" class="add_btn">
        <a-icon type="plus-circle" />
    </div>
    <div
      v-for="(item, index) in allCards"
      :key="index"
      :style="{marginBottom: '15px'}"
    >
      <!-- <a-card size="small" :title="item.title" class="card_block"> -->
      <a-card size="small" class="card_block" :class="[item.status ? 'select_border' : '']">
        <div>
          <div :style="[dogBasicData]">
            <a-input
              placeholder="名稱"
              v-model="item.name"
              :style="[petNameBlock]"
            />
            <div class="feed_select_block">
              <div :style="[feedSelectBlcok]">犬種</div>
              <a-select defaultValue="Amy" style="width: 120px" v-model="item.feed">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="disabled" disabled
                  >Disabled</a-select-option
                >
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
              </a-select>
            </div>
          </div>
          <div :style="[itemBlock]">
            <div class="single_item_block">
              <button
                v-if="item.wash"
                @click="toggle(index, 'wash', item.wash)"
                class="salon_item is_selected">洗澡<a-icon type="check" />
              </button>
              <button 
                v-else
                @click="toggle(index, 'wash', item.wash)"
                class="salon_item un_select">洗澡
              </button>
            </div>
            <div class="single_item_block">
              <button
                v-if="item.cut"
                @click="toggle(index, 'cut', item.cut)"
                class="salon_item is_selected">美容<a-icon type="check" />
              </button>
              <button 
                v-else
                @click="toggle(index, 'cut', item.cut)"
                class="salon_item un_select">美容
              </button>
            </div>
            <div class="single_item_block">
              <button
                v-if="item.head"
                @click="toggle(index, 'head', item.head)"
                class="salon_item is_selected">修頭<a-icon type="check" />
              </button>
              <button 
                v-else
                @click="toggle(index, 'head', item.head)"
                class="salon_item un_select">修頭
              </button>
            </div>
            <div class="single_item_block">
              <button
                v-if="item.feet"
                @click="toggle(index, 'feet', item.feet)"
                class="salon_item is_selected">剃腳<a-icon type="check" />
              </button>
              <button 
                v-else
                @click="toggle(index, 'feet', item.feet)"
                class="salon_item un_select">剃腳
              </button>
            </div>
            <div class="single_item_block">
              <button
                v-if="item.mouth"
                @click="toggle(index, 'mouth', item.mouth)"
                class="salon_item is_selected">剃嘴<a-icon type="check" />
              </button>
              <button 
                v-else
                @click="toggle(index, 'mouth', item.mouth)"
                class="salon_item un_select">剃嘴
              </button>
            </div>
            <div class="single_item_block">
              <button
                v-if="item.bug"
                @click="toggle(index, 'bug', item.bug)"
                class="salon_item is_selected">除蚤<a-icon type="check" />
              </button>
              <button 
                v-else
                @click="toggle(index, 'bug', item.bug)"
                class="salon_item un_select">除蚤
              </button>
            </div>
            <div class="single_item_block">
              <button
                v-if="item.herbWash"
                @click="toggle(index, 'herbWash', item.herbWash)"
                class="salon_item is_selected">藥浴<a-icon type="check" />
              </button>
              <button 
                v-else
                @click="toggle(index, 'herbWash', item.herbWash)"
                class="salon_item un_select">藥浴
              </button>
            </div>
            <div class="single_item_block">
              <button
                v-if="item.messyHair"
                @click="toggle(index, 'messyHair', item.messyHair)"
                class="salon_item is_selected">打結<a-icon type="check" />
              </button>
              <button 
                v-else
                @click="toggle(index, 'messyHair', item.messyHair)"
                class="salon_item un_select">打結
              </button>
            </div>
          </div>
          <div :style="{padding: '4px 5px'}">
            <a-icon v-if="!item.showComment" type="down-circle" @click="showCommentBlock(index)"/>
            <a-input v-else placeholder="備註" :style="[commentInput]" v-model="item.comment"/>
          </div>
          <div :style="{padding: '0 5px', display: 'flex', justifyContent: 'space-between', height: '35px', alignItems: 'flex-end'}">
            <!-- <a-input placeholder="$$" :style="[priceInput]" v-model="item.price"/> -->
            <button v-if="item.status" class="dog_card_select is_selected" @click="toggle(index, 'status', item.status)">GO <a-icon type="smile" class="status_icon"/></button>
            <button v-else class="dog_card_select un_select" @click="toggle(index, 'status', item.status)">NO <a-icon type="frown" class="status_icon"/></button>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "petCard",
  data() {
    return {
      feed: "",
      commentInput: {
        width: '100%',
        fontSize: '12px',
        outline: 'none',
        letterSpacing: '1px',
      },
      priceInput: {
        width: '30%',
        marginTop: '8px',
        fontSize: '15px',
        color: '#ff6473',
        fontWeight: 800,
        letterSpacing: '1px',
        fontFamily: 'Courier New'
      },
      dogBasicData: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: 'solid 1px rgba(0,0,0,.1)',
        paddingBottom: '10px',
        justifyContent: 'space-between'
      },
      petNameBlock: {
        width: '40%',
        border: 'none',
        letterSpacing: '2px',
        fontSize: '20px',
        fontWeight: 700,
        color: '#4a707a'
      },
      feedSelectBlcok: {
        marginRight: '10px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '12px'
      },
      itemBlock: {
        marginTop: '15px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
      },
      allCards: [
        {
          name: "123",
          feed: 'VIP',
          wash: false,
          cut: false,
          head: false,
          feet: false,
          mouth: false,
          bug: false,
          herbWash: false,
          messyHair: false,
          showComment: false,
          comment: '留頭尾',
          price: 300,
          status: true
        },
        {
          name: "阿滑",
          feed: 'Dash',
          wash: true,
          cut: true,
          head: true,
          feet: true,
          mouth: true,
          bug: true,
          herbWash: true,
          messyHair: true,
          showComment: false,
          comment: '腳臭',
          price: 900,
          status: false
        }
      ]
    }
  },
  methods: {
    toggle(index, name, v) {
      this.allCards[index][name] = !v;
    },
    addNewCard() {
      this.allCards.push({
        name: "",
        wash: false,
        cut: false,
        head: false,
        feet: false,
        mouth: false,
        bug: false,
        herbWash: false,
        messyHair: false,
        status: false
      });
    },
    showCommentBlock(index){
      this.allCards[index]['showComment'] = true
    }
  }
};
</script>

<style lang="sass">
$fz-color: rgba(0,0,0,.4)
// $item-btn-bgc: #283c63
// $item-btn-bgc: #008891
// $item-btn-bgc: #65c0ba
// $item-btn-color: #455d7a

$main-btn-bgc: #4a707a

// $item-btn-color: #fefaec
// $second-btn-color: #216583
$second-color: #7697a0


.card_block
    background-color: #fff
    border-radius: 15px
    padding: 8px 12px
    text-align: left
    letter-spacing: 2px
    font-size: 15px
    color: $fz-color
    font-weight: 700
    font-family: '微軟正黑體'
    box-shadow: 1px 3px 5px rgba(0,0,0,.1)
    opacity: .4

.ant-card.card_block
    border-radius: 5px

    &.select_border
      transition: 1s
      opacity: 1

.ant-dropdown.ant-dropdown-placement-bottomLeft
    width: 80vw
    margin: auto
    background-color: #fff

.single_item_block
    padding: 4px 5px

.ant-btn.ant-btn-background-ghost.salon_item
    background-color: $main-btn-bgc
    border-color: $main-btn-bgc
    color: #eee
    width: 70px
    font-size: 12px

.salon_item
    letter-spacing: 2px
    width: 60px
    font-size: 12px
    user-select: none
    -ms-touch-action: manipulation
    touch-action: manipulation
    height: 32px
    padding: 0 12px
    border-radius: 4px
    position: relative
    display: inline-block
    font-weight: 400
    white-space: nowrap
    text-align: center
    outline: none

    .anticon-check
        margin-left: 1px
        font-size: 10px

.un_select
    background-color: transparent
    border-color: $main-btn-bgc
    color: $main-btn-bgc

.is_selected
    background-color: $main-btn-bgc
    border-color: $main-btn-bgc
    color: #eee

.feed_select_block
    display: flex
    align-items: center   

.add_btn
    text-align: right, 
    font-size: 20px
    color: $second-color

.dog_card_select
  width: 100%
  border-radius: 5px
  padding: 4px 8px
  border: none
  height: 32px
  font-size: 12px
  letter-spacing: 1px
  outline: none
  font-weight: 700

  &.un_select
      border: solid 1px $main-btn-bgc
      color: $main-btn-bgc

  &.is_selected
      background-color: $main-btn-bgc
      color: #eee
  .status_icon
    font-size: 16px
    margin-left: 10px

</style>
