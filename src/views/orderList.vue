<template>
  <div class="order_list">
    <div v-for="(item, index) in orders" :key="index" class="each_order_card">
      <!-- <a-card size="small" :title="item.phone + item.status" style="width: 100%; padding: 6px 12px 12px 12px"> -->
      <a-card size="small" style="width: 100%; padding: 6px 12px 12px 12px; border-radius: 6px; border: none; border-top: solid 20px #ec5659">
        <div class="status_block">
          <!-- <div v-if="item.single_number">{{ item.phone[0] }}</div> -->
          <a-select
              :defaultValue="item.phone[0].phone"
              style="width: 130px"
              @change="handleChange"
            >
              <a-select-option v-for="(phone, p_index) in item.phone" :key="p_index" :value="phone.phone">{{phone.phone}}</a-select-option>
          </a-select>
          <!-- <div><a-icon type="down-circle" /></div> -->

          <!-- <div
            v-if="item.phone.length > 1"
            @click="showMultipleNumber(index, item.single_number)"
          > 
            <div v-if="item.single_number"><a-icon type="down-circle" /></div>
            <div v-else><a-icon type="up-circle" /></div>
          </div> -->
          <div class="order_edit_block">
            <a-select
              :defaultValue="item.status"
              style="width: 90px"
              @change="handleChange"
              v-model="orders[index].status"
            >
              <a-select-option value="doing">未完成</a-select-option>
              <a-select-option value="done">已完成</a-select-option>
              <a-select-option value="no_answer">未接</a-select-option>
            </a-select>
            <div class="edit_block"><a-icon type="edit" /></div>
          </div>
          <!-- <div>{{item.status}}</div> -->
        </div>
        <div
          v-for="(value, num) in item.data"
          :key="num"
          class="per_dog_status"
        >
        <div class="name_block">{{ value.name }}</div>
          <div :style="{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}">
          <div class="items_block">
            <div class="single_item_block" v-if="value.wash">
              <button
                @click="toggle(index, 'wash', item.wash)"
                class="salon_item is_selected"
              >
                洗澡
              </button>
            </div>
            <div class="single_item_block" v-if="value.cut">
              <button
                @click="toggle(index, 'cut', item.cut)"
                class="salon_item is_selected"
              >
                美容
              </button>
            </div>
            <div class="single_item_block" v-if="value.head">
              <button
                @click="toggle(index, 'head', item.head)"
                class="salon_item is_selected"
              >
                修頭
              </button>
            </div>
            <div class="single_item_block" v-if="value.feet">
              <button
                @click="toggle(index, 'feet', item.feet)"
                class="salon_item is_selected"
              >
                剃腳
              </button>
            </div>
            <div class="single_item_block" v-if="value.mouth">
              <button
                @click="toggle(index, 'mouth', item.mouth)"
                class="salon_item is_selected"
              >
                剃嘴
              </button>
            </div>
            <div class="single_item_block" v-if="value.bug">
              <button
                @click="toggle(index, 'bug', item.bug)"
                class="salon_item is_selected"
              >
                除蚤
              </button>
            </div>
            <div class="single_item_block" v-if="value.herbWash">
              <button
                @click="toggle(index, 'herbWash', item.herbWash)"
                class="salon_item is_selected"
              >
                藥浴
              </button>
            </div>
            <div class="single_item_block" v-if="value.messyHair">
              <button
                @click="toggle(index, 'messyHair', item.messyHair)"
                class="salon_item is_selected"
              >
                打結
              </button>
            </div>
            <!-- <div class="price_row">           -->
          </div>
          <div>
            <a-input
                placeholder="$$"
                :style="[priceInput]"
                v-model="item.price"
              />
          </div>
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
import { db } from "../firebase";
const fStore = db.firestore();

export default {
  name: 'orderList',
  data() {
    return {
      test: '',
      commentInput: {
        width: "100%",
        marginTop: "10px"
      },
      priceInput: {
        width: "80px"
      },
      orders: [
        {
          // single_number: true,
          phone: ["0981738759", "123 123"],
          status: "打電話未接",
          comment: '測試測試測試測試測試測試',
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
          // single_number: true,
          phone: ["09333333456", "456"],
          status: "未完成",
          comment: "有零食還沒付錢",
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
            }
          ]
        }
      ]
    };
  },
  mounted(){
    this.getAllOrders()
  },
  methods: {
    // showMultipleNumber(index, status) {
    //   this.orders[index].single_number = !status;
    // },
    handleChange(value) {
      this.test = value
      // console.log(`selected ${value}`);
    },
    getAllOrders(){
      fStore.collection('order').get().then(data => {
        data.forEach(doc => {
          let current_data = {};
          current_data['data'] = [];
          current_data['data'].push(doc.data());
          current_data['phone'] = doc.data().phone;
          current_data['status'] = '未完成'
          this.orders.push(current_data)
        })
      })
    }
  },
  // computed:{
  //   getOrder(){
  //     return this.$store.state.orderList.orderList
  //   }
  // },
  // watch:{
  //   getOrder(data){
  //     this.orders.push(data)
  //   }
  // }
};
</script>

<style lang="sass">
$main-color: #4a707a
$pet-name-color: rgba(0,0,0,.7)

//test
// $main-color: #064789
// 064789
$main-color: #ec5659

.order_list
  width: 90vw
  margin: 20px auto 30px auto

.items_block
  display: flex
  justify-content: flex-start
  flex-wrap: wrap
  width: 65%

  .single_item_block
    padding: 2px

    .salon_item
      width: 45px
      height: 25px
      font-size: 12px
      padding: 0
      background-color: $main-color
      border: none


.per_dog_status
    display: flex
    align-items: center
    margin-top: 16px
    flex-wrap: wrap

.name_block
  margin-right: 5px
  width: 60%
  text-align: left
  color: $pet-name-color
  font-weight: 700
  padding-left: 5px
  font-size: 16px

.each_order_card
  margin: 10px 0
  box-shadow: -3px 3px 5px rgba(0,0,0,.1)

.price_row
  display: flex
  align-items: center
  justify-content: space-between
  width: 100%

.status_block
  display: flex
  justify-content: space-between
  border-bottom: solid 1px rgba(0,0,0,.1)
  padding-bottom: 8px
  align-items: center

.order_edit_block
  display: flex
  align-items: center
  width: 100%
  justify-content: space-between
  margin-left: 20px

.edit_block
  font-size: 16px
  color: $main-color

</style>
