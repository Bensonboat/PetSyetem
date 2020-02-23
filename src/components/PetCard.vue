<template>
  <div>
    <slot name="editBtn"></slot>

    <!-- <div @click="editFamilyData" class="edit_btn">
        <a-icon type="edit"/>
    </div> -->
    <div
      v-for="(item, index) in allCards"
      :key="index"
      :style="{marginBottom: '15px'}"
    >
      <a-card size="small" class="card_block">
        <div>
          <div :style="[dogBasicData]">
            <a-input
              placeholder="名稱"
              v-model="item.name"
              :style="[petNameBlock]"
              v-if="editData"
            />
            <div v-else :style="[petNameBlock]">{{item.name}}</div>
            <div class="breed_select_block">
              <div :style="[breedSelectBlcok]">犬種</div>
              <a-select defaultValue="" style="width: 120px" v-model="item.breed" :class="[!editData ? 'read_only' : '']">
                <a-select-option
                  v-for="(item, index) in breedData"
                  :key="index"
                  :value="item.value"
                  >{{ item.name }}</a-select-option
                >
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
          <!-- <div :style="{padding: '4px 5px'}">
            <a-icon v-if="!item.showComment" type="down-circle" @click="showCommentBlock(index)"/>
            <a-input v-else placeholder="備註" :style="[commentInput]" v-model="item.comment"/>
          </div> -->
          <div class="price_row">
            <div>
              <span class="price_txt">金額:</span>
              <a-input  
                type="number"
                pattern="\d*"
                placeholder="$$"
                :style="[priceInput]"
                v-model="item.price"
              />
            </div>
            <button v-if="!editData" class="dog_card_select" :class="[item.status ? 'is_selected' : '']" @click="toggle(index, 'status', item.status)"><a-icon type="check" /></button>
            <!-- <button v-else class="dog_card_select un_select" @click="toggle(index, 'status', item.status)">NO <a-icon type="frown" class="status_icon"/></button> -->
          </div>
          <div v-if="editData" class="status_row">
            <div class="status_operation">
              <div>狀態</div>
              <a-select defaultValue="normal" style="width: 120px" v-model="item.reject" class="reject_pet">
                <a-select-option value="reject">拒接</a-select-option>
                <a-select-option value="normal">正常</a-select-option>
              </a-select>
            </div>
            <!-- <slot name="delete_pet"></slot> -->
            <div @click="deletePet(index)">
              <a-icon type="minus-circle" class="delete_icon"/>
            </div>
          </div>
        </div>
      </a-card>
    </div>
    <slot name="commentBlock"></slot>
  </div>
</template>

<script>
import { db } from "../firebase";
const fStore = db.firestore();

export default {
  name: "petCard",
  props: ['sameFamilyPetData', 'breedData', 'editData'],
  data() {
    return {
      breed: "",
      priceInput: {
        width: '50%',
        marginTop: '8px',
        fontSize: '16px',
        color: '#ff6473',
        fontWeight: 800,
        letterSpacing: '1px',
        fontFamily: 'Courier New',
        border: 'none',
        outline: 'none',
        marginLeft: '5px'
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
      breedSelectBlcok: {
        marginRight: '10px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '12px',
        color: '#4a707a'
      },
      itemBlock: {
        marginTop: '15px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
      },
      allCards: this.sameFamilyPetData
    }
  },
  watch: {
    sameFamilyPetData:{
      immediate: true, 
      handler (val, oldVal) {
        this.allCards = val
      }
    }
  },
  methods: {
    toggle(index, name, v) {
      this.allCards[index][name] = !v;
    },
    deletePet(index){
      this.$emit('deletePet', index)
    }
  }
};
</script>

<style lang="sass">
@import '../styles/basics/_common_var.scss'

//!!FF2C55

$fz-color: rgba(0,0,0,.4)
// $item-btn-bgc: #283c63
// $item-btn-bgc: #008891
// $item-btn-bgc: #65c0ba
// $item-btn-color: #455d7a

// $main-color: #4a707a  // last one 灰藍
// $main-color: #064789  // 深藍
// $main-color: #EF2D56 // 粉色
// $main-color: #F0386B
// $main-color: #E34A6F
// $main-color: #FF4D80
// $main-color: rgb(219, 71, 80)


// $item-btn-color: #fefaec
// $second-btn-color: #216583
// $second-color: #7697a0
// $second-color: #FF2C55

// $third-color: #4a707a


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
    box-shadow: -5px 5px 12px rgba(0,0,0,.1)

.ant-card.card_block
    border-radius: 5px

.ant-dropdown.ant-dropdown-placement-bottomLeft
    width: 80vw
    margin: auto
    background-color: #fff

.single_item_block
    padding: 4px 5px

.ant-btn.ant-btn-background-ghost.salon_item
    background-color: $main-color
    border-color: $main-color
    color: $text-color-light
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
    border-color: $main-color
    color: $main-color

.is_selected
    background-color: $main-color
    border-color: $main-color
    color: $text-color-light

.breed_select_block
    display: flex
    align-items: center   

.edit_btn
    text-align: right, 
    font-size: 20px
    color: $main-color

.dog_card_select
  width: 100px
  border-radius: 5px
  padding: 4px 8px
  border: none
  height: 32px
  font-size: 12px
  letter-spacing: 1px
  outline: none
  font-weight: 700
  background-color: transparent
  border: solid 1px $main-color
  // border-color: $main-color
  color: $main-color


  

  &.un_select
      border: solid 1px $main-color
      color: $main-color

  &.is_selected
      background-color: $main-color
      color: $text-color-light
  .status_icon
    font-size: 16px
    margin-left: 10px

.read_only
  pointer-events: none
  opacity: .5

.price_txt
  color: $text-color-blue

.price_row
  padding: 0 5px
  display: flex
  justify-content: space-between
  height: 35px
  align-items: flex-end
  margin-top: 15px

.status_row  
  display: flex
  justify-content: space-between
  align-items: center
  padding: 0 5px
  margin-top: 10px

  .delete_icon
    align-self: center
    margin-left: 20px
    font-size: 22px
    color: $danger-color

.status_operation  
  display: flex
  justify-content: flex-end
  align-items: center
  color: $text-color-blue
  
  .reject_pet 
    margin-left: 10px
</style>
