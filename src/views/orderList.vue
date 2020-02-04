<template>
  <div class="order_list">
    <div v-for="(item, index) in orders" :key="index" class="each_order_card">
      <!-- <a-card size="small" :title="item.phone + item.status" style="width: 100%; padding: 6px 12px 12px 12px"> -->
      <a-card size="small" style="width: 100%; padding: 6px 12px 12px 12px">
        <div class="status_block">
          <div>{{item.phone}}</div>
          <div>{{item.status}}</div>
        </div>
        <div v-for="(value, num) in item.data" :key="num" class="per_dog_status">
            <div class="name_block">{{ value.name }} -</div>
            <div class="price_row">
              <div class="items_block">
                <div class="single_item_block" v-if="value.wash">
                  <button
                    @click="toggle(index, 'wash', item.wash)"
                    class="salon_item is_selected"
                  >
                    洗澡
                  </button>
                  <!-- <button 
                  v-else
                  @click="toggle(index, 'wash', item.wash)"
                  class="salon_item un_select">洗澡
                </button> -->
                </div>
                <div class="single_item_block" v-if="value.cut">
                  <button
                    @click="toggle(index, 'cut', item.cut)"
                    class="salon_item is_selected"
                  >
                    美容
                  </button>
                  <!-- <button 
                  v-else
                  @click="toggle(index, 'cut', item.cut)"
                  class="salon_item un_select">美容
                </button> -->
                </div>
                <div class="single_item_block" v-if="value.head">
                  <button
                    @click="toggle(index, 'head', item.head)"
                    class="salon_item is_selected"
                  >
                    修頭
                  </button>
                  <!-- <button 
                  v-else
                  @click="toggle(index, 'head', item.head)"
                  class="salon_item un_select">修頭
                </button> -->
                </div>
                <div class="single_item_block" v-if="value.feet">
                  <button
                    @click="toggle(index, 'feet', item.feet)"
                    class="salon_item is_selected"
                  >
                    剃腳
                  </button>
                  <!-- <button 
                  v-else
                  @click="toggle(index, 'feet', item.feet)"
                  class="salon_item un_select">剃腳
                </button> -->
                </div>
                <div class="single_item_block" v-if="value.mouth">
                  <button
                    @click="toggle(index, 'mouth', item.mouth)"
                    class="salon_item is_selected"
                  >
                    剃嘴
                  </button>
                  <!-- <button 
                  v-else
                  @click="toggle(index, 'mouth', item.mouth)"
                  class="salon_item un_select">剃嘴
                </button> -->
                </div>
                <div class="single_item_block" v-if="value.bug">
                  <button
                    @click="toggle(index, 'bug', item.bug)"
                    class="salon_item is_selected"
                  >
                    除蚤
                  </button>
                  <!-- <button 
                  v-else
                  @click="toggle(index, 'bug', item.bug)"
                  class="salon_item un_select">除蚤
                </button> -->
                </div>
                <div class="single_item_block" v-if="value.herbWash">
                  <button
                    @click="toggle(index, 'herbWash', item.herbWash)"
                    class="salon_item is_selected"
                  >
                    藥浴
                  </button>
                  <!-- <button 
                  v-else
                  @click="toggle(index, 'herbWash', item.herbWash)"
                  class="salon_item un_select">藥浴
                </button> -->
                </div>
                <div class="single_item_block" v-if="value.messyHair">
                  <button
                    @click="toggle(index, 'messyHair', item.messyHair)"
                    class="salon_item is_selected"
                  >
                    打結
                  </button>
                  <!-- <button 
                  v-else
                  @click="toggle(index, 'messyHair', item.messyHair)"
                  class="salon_item un_select">打結
                </button> -->
                </div>
              </div>
              <a-input
                placeholder="$$"
                :style="[priceInput]"
                v-model="item.price"
              />
          </div>
        </div>
        <a-input
          placeholder="備註"
          :style="[commentInput]"
          v-model="item.comment"
        />
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentInput: {
        width: '100%',
        marginTop: '10px'
      },
      priceInput: {
        width: '60px'
      },
      orders: [
        {
          phone: "0981738759",
          status: 'no call',
          data: [
            {
              name: "蹦蹦跳跳",
              wash: true,
              head: true,
              feed: "Dash"
            }
          ]
        },
        {
          phone: "09333333456",
          data: [
            {
              name: "阿諺",
              wash: true,
              cut: true,
              feet: true,
              mouth: true,
              bug: true,
              head: true,
              feed: "Dash"
            },
            {
              name: "阿滑",
              herbWash: true,
              wash: true,
              comment: "有零食還沒付錢"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="sass">
$second-color: #216583

.order_list
  width: 90vw
  margin: auto

.items_block
  display: flex
  justify-content: flex-start
  flex-wrap: wrap

  .single_item_block
    padding: 2px

    .salon_item
      width: 45px
      height: 25px
      font-size: 12px
      padding: 0


.per_dog_status
    display: flex
    align-items: center
    margin-top: 10px
    border-left: solid 3px #216583
    // padding: 10px

.name_block
  margin-right: 5px
  width: 30%
  text-align: center
  color: $second-color
  font-weight: 700

.each_order_card
  margin: 10px 0

.price_row
  display: flex
  align-items: center
  justify-content: space-between
  width: 70%

.status_block
  display: flex
  justify-content: space-between
</style>
