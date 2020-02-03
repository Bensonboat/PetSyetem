<template>
  <div :style="{ paddingBottom: '30px' }">
    <div @click="addNewCard" class="add_btn">
        <a-icon type="plus-circle" />
    </div>
    <div
      v-for="(item, index) in allCards"
      :key="index"
      :style="{ margin: '15px 0' }"
    >
      <!-- <a-card size="small" :title="item.title" class="card_block"> -->
      <a-card size="small" class="card_block">
        <div>
          <div :style="[dogBasicData]">
            <a-input
              placeholder="名稱"
              v-model="item.name"
              :style="[petNameBlock]"
            />
            <div class="feed_select_block">
              <div :style="[feedSelectBlcok]">犬種</div>
              <a-select defaultValue="lucy" style="width: 120px">
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
                v-if="!item.wash"
                @click="toggle(index, 'wash', item.wash)"
                class="salon_item un_select">洗澡
              </button>
              <button
                v-else
                @click="toggle(index, 'wash', item.wash)"
                class="salon_item is_selected">洗澡<a-icon type="check" />
              </button>
            </div>
            <div class="single_item_block">
              <button 
                v-if="!item.cut"
                @click="toggle(index, 'cut', item.cut)"
                class="salon_item un_select">美容
              </button>
              <button
                v-else
                @click="toggle(index, 'cut', item.cut)"
                class="salon_item is_selected">美容<a-icon type="check" />
              </button>
              <!-- <a-button
                type="primary"
                v-model="item.cut"
                v-if="!item.cut"
                @click="toggle(index, 'cut', item.cut)"
                class="salon_item"
                :ghost="true"
                >美容</a-button
              > -->
              <!-- <a-button
                type="primary"
                v-else
                @click="toggle(index, 'cut', item.cut)"
                class="salon_item"
              >
                美容
                <a-icon type="check" />
              </a-button> -->
            </div>
            <div class="single_item_block">
              <button 
                v-if="!item.head"
                @click="toggle(index, 'head', item.head)"
                class="salon_item un_select">修頭
              </button>
              <button
                v-else
                @click="toggle(index, 'head', item.head)"
                class="salon_item is_selected">修頭<a-icon type="check" />
              </button>
              <!-- <a-button
                type="primary"
                v-model="item.head"
                v-if="!item.head"
                @click="toggle(index, 'head', item.head)"
                class="salon_item"
                :ghost="true"
                >修頭</a-button
              >
              <a-button
                type="primary"
                v-else
                @click="toggle(index, 'head', item.head)"
                class="salon_item"
              >
                修頭
                <a-icon type="check" />
              </a-button> -->
            </div>
            <div class="single_item_block">
              <button 
                v-if="!item.feet"
                @click="toggle(index, 'feet', item.feet)"
                class="salon_item un_select">剃腳
              </button>
              <button
                v-else
                @click="toggle(index, 'feet', item.feet)"
                class="salon_item is_selected">剃腳<a-icon type="check" />
              </button>

              <!-- <a-button
                type="primary"
                v-model="item.feet"
                v-if="!item.feet"
                @click="toggle(index, 'feet', item.feet)"
                class="salon_item"
                :ghost="true"
                >剃腳</a-button
              >
              <a-button
                type="primary"
                v-else
                @click="toggle(index, 'feet', item.feet)"
                class="salon_item"
              >
                剃腳
                <a-icon type="check" />
              </a-button> -->
            </div>
            <div class="single_item_block">
              <button 
                v-if="!item.mouth"
                @click="toggle(index, 'mouth', item.mouth)"
                class="salon_item un_select">剃嘴
              </button>
              <button
                v-else
                @click="toggle(index, 'mouth', item.mouth)"
                class="salon_item is_selected">剃嘴<a-icon type="check" />
              </button>

              <!-- <a-button
                type="primary"
                v-model="item.mouth"
                v-if="!item.mouth"
                @click="toggle(index, 'mouth', item.mouth)"
                class="salon_item"
                :ghost="true"
                >剃嘴</a-button
              >
              <a-button
                type="primary"
                v-else
                @click="toggle(index, 'mouth', item.mouth)"
                class="salon_item"
              >
                剃嘴
                <a-icon type="check" />
              </a-button> -->
            </div>
            <div class="single_item_block">
              <button 
                v-if="!item.bug"
                @click="toggle(index, 'bug', item.bug)"
                class="salon_item un_select">除蚤
              </button>
              <button
                v-else
                @click="toggle(index, 'bug', item.bug)"
                class="salon_item is_selected">除蚤<a-icon type="check" />
              </button>

              <!-- <a-button
                type="primary"
                v-model="item.bug"
                v-if="!item.bug"
                @click="toggle(index, 'bug', item.bug)"
                class="salon_item"
                :ghost="true"
                >除蚤</a-button
              >
              <a-button
                type="primary"
                v-else
                @click="toggle(index, 'bug', item.bug)"
                class="salon_item"
              >
                除蚤
                <a-icon type="check" />
              </a-button> -->
            </div>
            <div class="single_item_block">
              <button 
                v-if="!item.herbWash"
                @click="toggle(index, 'herbWash', item.herbWash)"
                class="salon_item un_select">藥浴
              </button>
              <button
                v-else
                @click="toggle(index, 'herbWash', item.herbWash)"
                class="salon_item is_selected">藥浴<a-icon type="check" />
              </button>

              <!-- <a-button
                type="primary"
                v-model="item.herbWash"
                v-if="!item.herbWash"
                @click="toggle(index, 'herbWash', item.herbWash)"
                class="salon_item"
                :ghost="true"
                >藥浴</a-button
              >
              <a-button
                type="primary"
                v-else
                @click="toggle(index, 'herbWash', item.herbWash)"
                class="salon_item"
              >
                藥浴
                <a-icon type="check" />
              </a-button> -->
            </div>
            <div class="single_item_block">
              <button 
                v-if="!item.messyHair"
                @click="toggle(index, 'messyHair', item.messyHair)"
                class="salon_item un_select">打結
              </button>
              <button
                v-else
                @click="toggle(index, 'messyHair', item.messyHair)"
                class="salon_item is_selected">打結<a-icon type="check" />
              </button>

              <!-- <a-button
                type="primary"
                v-model="item.messyHair"
                v-if="!item.messyHair"
                @click="toggle(index, 'messyHair', item.messyHair)"
                class="salon_item"
                :ghost="true"
                >打結</a-button
              >
              <a-button
                type="primary"
                v-else
                @click="toggle(index, 'messyHair', item.messyHair)"
                class="salon_item"
              >
                打結
                <a-icon type="check" />
              </a-button> -->
            </div>
          </div>
          <div :style="{padding: '4px 5px'}">
            <a-input placeholder="備註" :style="{width: '100%', fontSize: '12px', outline: 'none'}" v-model="item.comment"/>
            <a-input placeholder="$$" :style="{width: '30%', marginTop: '8px', fontSize: '12px'}" v-model="item.price"/>
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
        color: '#216583'
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
          wash: false,
          cut: false,
          head: false,
          feet: false,
          mouth: false,
          bug: false,
          herbWash: false,
          messyHair: false,
          comment: '留頭尾',
          price: 300
        },
        {
          name: "阿滑",
          wash: true,
          cut: true,
          head: true,
          feet: true,
          mouth: true,
          bug: true,
          herbWash: true,
          messyHair: true,
          comment: '腳臭',
          price: 900
        }
      ]
    }
  },
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    },
    toggle(index, name, v) {
      this.allCards[index][name] = !v;
    },
    addNewCard() {
      this.allCards.push({
        name: "88",
        wash: false,
        cut: false,
        head: false,
        feet: false,
        mouth: false,
        bug: false,
        herbWash: false,
        messyHair: false
      });
    }
  }
};
</script>

<style lang="sass">
$fz-color: rgba(0,0,0,.4)
// $item-btn-bgc: #283c63
// $item-btn-bgc: #008891
$item-btn-bgc: #65c0ba
// $item-btn-color: #455d7a
$item-btn-color: #fefaec
$second-btn-color: #216583


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

.ant-card.card_block
    border-radius: 5px

.ant-dropdown.ant-dropdown-placement-bottomLeft
    width: 80vw
    margin: auto
    background-color: #fff

.single_item_block
    padding: 4px 5px

.ant-btn.ant-btn-background-ghost.salon_item
    background-color: $item-btn-bgc
    border-color: $item-btn-bgc
    color: $item-btn-color
    width: 70px
    font-size: 12px

.salon_item
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

    .anticon-check
        margin-left: 5px

.un_select
    background-color: transparent
    border-color: $item-btn-bgc
    color: $item-btn-bgc

.is_selected
    background-color: $item-btn-bgc
    border-color: $item-btn-bgc
    color: $item-btn-color

.feed_select_block
    display: flex
    align-items: center   

.add_btn
    text-align: right, 
    font-size: 20px
    color: $second-btn-color

.comment



</style>
