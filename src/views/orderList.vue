<template>
  <div class="order_list">
    <transition name="topIn">
      <div 
        v-show="showContactInfo"
        class="contact_block"
      >
        <contact-card
          @hideContactBlock="hideContactBlock"
          :contact="contactInfo"
        />
      </div>
    </transition>
    <div class="today_date">日期: {{ todayDate }}</div>
    <div class="filter_row">
      <div class="process_filter">
        <button class="salon_item un_select" :class="currentFilter === 'all' ? 'is_selected' : ''" @click="getAllOrders">全部</button>
        <button class="salon_item un_select" :class="currentFilter === 'doing' ? 'is_selected' : ''" @click="getDoingOrders">
          未完成
        </button>
        <button class="salon_item un_select" :class="currentFilter === 'done' ? 'is_selected' : ''" @click="getDoneOrders">
          已完成
        </button>
      </div>
      <div class="totoal_num_block">總量: {{totalNumToday}}</div>
    </div>
    <div v-if="searchingData" :style="[loadingBlock]">
      <a-icon type="loading" />
    </div>
    <div v-else>
      <div v-if="noData" class="no_orders">
        <a-icon type="warning" />
        查無資料
      </div>
      <div
        v-else
        v-for="(item, index) in orders"
        :key="item.time"
        class="each_order_card"
        :class="[ showSalonSelectBlock || showContactInfo ? 'turn_disabled' : '', item.process === 'done' ? 'turn_opacity' : '']"
      >
        <a-card size="small" :style="[cardStyle]">
          <div class="status_block">
            <div class="check_contact" @click="showContactCard(index)">查看電話</div>
            <div class="order_edit_block">
              <a-select
                :defaultValue="item.process"
                style="width: 90px"
                @change="setStatus(item.family_id, orders[index].process, item.time)"
                v-model="orders[index].process"
              >
                <a-select-option value="doing">未完成</a-select-option>
                <a-select-option value="done">已完成</a-select-option>
                <a-select-option value="no_answer">未接</a-select-option>
              </a-select>
              <div class="edit_block">{{ index + 1 }}</div>
            </div>
          </div>
          <div
            v-for="(pet, num) in item.data"
            :key="num"
            class="per_dog_status"
          >
            <div
              class="name_block"
            >
              <div>
                <span 
                  class="name"
                  @click="editSalonData(pet.family_id, pet.id, item.time)"
                >
                  {{ pet.name }}
                </span>
                <span class="breed">- {{ pet.breed }}</span>
              </div>
            </div>
            <div class="item_price_block">
              <div class="items_block">
                <div class="single_item_block" v-if="pet.wash">
                  <button class="salon_item is_selected">洗澡</button>
                </div>
                <div class="single_item_block" v-if="pet.cut">
                  <button class="salon_item is_selected">美容</button>
                </div>
                <div class="single_item_block" v-if="pet.head">
                  <button class="salon_item is_selected">修頭</button>
                </div>
                <div class="single_item_block" v-if="pet.feet">
                  <button class="salon_item is_selected">剃腳</button>
                </div>
                <div class="single_item_block" v-if="pet.mouth">
                  <button class="salon_item is_selected">剃嘴</button>
                </div>
                <div class="single_item_block" v-if="pet.bug">
                  <button class="salon_item is_selected">除蚤</button>
                </div>
                <div class="single_item_block" v-if="pet.herbWash">
                  <button class="salon_item is_selected">藥浴</button>
                </div>
                <div class="single_item_block" v-if="pet.messyHair">
                  <button class="salon_item is_selected">打結</button>
                </div>
                <div class="single_item_block" v-if="pet.spa">
                  <button class="salon_item is_selected">SPA</button>
                </div>
              </div>
              <div>
                <a-input
                  placeholder="$$"
                  :style="[priceInput]"
                  v-model="pet.price"
                  type="number"
                  pattern="\d*"
                  @click="getInitialPrice(index, pet.id)"
                  @blur="updatePrice(index, num, pet.id, pet.family_id, item.time)"
                />
              </div>
            </div>
          </div>
          <div class="comment_row">
            <input
              placeholder="備註"
              :style="[commentInput]"
              v-model="item.comment"
              @click="getInitialComment(index)"
              @blur="updateComment(index, item.family_id)"
            />
            <div class="delete_btn" @click="deleteOrderList(index, item.family_id, item.time)">
              <a-icon type="delete" class="delete_icon"/>
            </div>
          </div>
        </a-card>
      </div>
      <!-- 下方為美容項目修改選擇區塊 -->
      <transition name="rightIn">
        <div class="salon_select_block" v-show="showSalonSelectBlock">
          <div class="salon_select_text">美容項目</div>
          <div>
            <button
              class="salon_item is_selected"
              v-if="salonSelect.wash"
              @click="toggleSalonItem('wash', false)"
            >
              洗澡<a-icon type="check" />
            </button>
            <button
              class="salon_item un_select"
              v-else
              @click="toggleSalonItem('wash', true)"
            >
              洗澡
            </button>

            <button
              class="salon_item is_selected"
              v-if="salonSelect.cut"
              @click="toggleSalonItem('cut', false)"
            >
              美容<a-icon type="check" />
            </button>
            <button
              class="salon_item un_select"
              v-else
              @click="toggleSalonItem('cut', true)"
            >
              美容
            </button>

            <button
              class="salon_item is_selected"
              v-if="salonSelect.head"
              @click="toggleSalonItem('head', false)"
            >
              修頭<a-icon type="check" />
            </button>
            <button
              class="salon_item un_select"
              v-else
              @click="toggleSalonItem('head', true)"
            >
              修頭
            </button>

            <button
              class="salon_item is_selected"
              v-if="salonSelect.feet"
              @click="toggleSalonItem('feet', false)"
            >
              剃腳<a-icon type="check" />
            </button>
            <button
              class="salon_item un_select"
              v-else
              @click="toggleSalonItem('feet', true)"
            >
              剃腳
            </button>

            <button
              class="salon_item is_selected"
              v-if="salonSelect.mouth"
              @click="toggleSalonItem('mouth', false)"
            >
              剃嘴<a-icon type="check" />
            </button>
            <button
              class="salon_item un_select"
              v-else
              @click="toggleSalonItem('mouth', true)"
            >
              剃嘴
            </button>

            <button
              class="salon_item is_selected"
              v-if="salonSelect.bug"
              @click="toggleSalonItem('bug', false)"
            >
              除蚤<a-icon type="check" />
            </button>
            <button
              class="salon_item un_select"
              v-else
              @click="toggleSalonItem('bug', true)"
            >
              除蚤
            </button>

            <button
              class="salon_item is_selected"
              v-if="salonSelect.herbWash"
              @click="toggleSalonItem('herbWash', false)"
            >
              藥浴<a-icon type="check" />
            </button>
            <button
              class="salon_item un_select"
              v-else
              @click="toggleSalonItem('herbWash', true)"
            >
              藥浴
            </button>

            <button
              class="salon_item is_selected"
              v-if="salonSelect.messyHair"
              @click="toggleSalonItem('messyHair', false)"
            >
              打結<a-icon type="check" />
            </button>
            <button
              class="salon_item un_select"
              v-else
              @click="toggleSalonItem('messyHair', true)"
            >
              打結
            </button>
            <button
              class="salon_item is_selected"
              v-if="salonSelect.spa"
              @click="toggleSalonItem('spa', false)"
            >
              SPA<a-icon type="check" />
            </button>
            <button
              class="salon_item un_select"
              v-else
              @click="toggleSalonItem('spa', true)"
            >
              SPA
            </button>
          </div>
          <div class="update_item_btn_block">
            <button class="salon_item update_item_btn" @click="salonUpdateConfirm">確認<a-icon type="check" /></button>
            <button class="salon_item update_item_btn" :style="{backgroundColor: '#F0F0F0'}" @click="hideSalonSelectBlock">取消<a-icon type="close" /></button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import contactCard from '@/components/ContactCard';

const fStore = db.firestore();
const orderRef = fStore.collection("order");
const familyRef = fStore.collection("family");
const memberRef = fStore.collection("member");

export default {
  name: "orderList",
  components: {
    contactCard
  },
  data() {
    return {
      noData: false,
      searchingData: false,
      commentInput: {
        width: "90%",
        border: "solid 1px rgba(0,0,0,.1)",
        padding: "4px 12px",
        borderRadius: "5px",
        outline: "none",
        fontSize: '16px'
      },
      priceInput: {
        width: "80px",
        fontSize: "16px"
      },
      orders: [],
      salonSelect: {
        wash: false,
        cut: false,
        head: false,
        feet: false,
        mouth: false,
        bug: false,
        herbWash: false,
        messyHair: false,
        spa: false
      },
      showSalonSelectBlock: false,
      currentSelect: {
        family_id: "",
        id: ""
      },
      cardStyle: {
        width: "100%",
        padding: "6px 12px 12px 12px",
        borderRadius: "6px",
        border: "none",
        borderTop: "solid 20px #ec5659"
      },
      loadingBlock: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "70px",
        color: "#ec5659"
      },
      todayDate: "",
      currentFilter: '',
      totalNumToday: '',
      currentPrice: '', // 當前點擊的金額,
      showContactInfo: false,
      contactInfo: '',
    };
  },
  created(){
    this.$store.dispatch('searchData/validateAuth')
    this.getTime();
    this.getAllOrders();
  },
  mounted() {
    
  },
  methods: {
    handleChange(value) {
      this.test = value;
      // console.log(`selected ${value}`);
    },
    setStatus(id, process, time) {
      orderRef.get().then(data => {
        data.forEach(doc => {
          if (doc.data().family_id === id && doc.data().time === time) {
            // this.orders = []; //清空等等更新完拿回新資料     
            orderRef.doc(doc.id).update({ process: process });
          }
        });
      });
      alert("更新成功");
    },
    getTime() {
      let current_year = new Date().getFullYear();
      let current_month = new Date().getMonth();
      let current_date = new Date().getDate();
      let time = new Date(current_year, current_month, current_date).getTime();
      
      current_month = current_month + 1
      current_month < 10 ? current_month = '0' + current_month : current_month;
      current_date < 10 ? current_date = '0' + current_date : current_date;
      this.todayDate = current_year + " - " + current_month + " - " + current_date;
      return time;
    },
    getAllOrders() {
      let time = this.getTime();
      this.searchingData = true;
      this.currentFilter = 'all';

      orderRef
        .where("time", ">", time) // 秀今天的工作單
        .orderBy("time", "asc")
        .onSnapshot(querySnapshot => {
          this.orders = [];

          querySnapshot.forEach(doc => {
            let current_data = doc.data();
            current_data['comment'] = ''

            // 取得備註
            familyRef.onSnapshot(querySnapshot => {
              querySnapshot.forEach(familyDoc => {
                if (familyDoc.id === doc.data().family_id) {
                  
                  current_data["comment"] = familyDoc.data().comment;
                }
              });
            });

            // 取得電話
            current_data["phone"] = [];
            memberRef.onSnapshot(querySnapshot => {
              querySnapshot.forEach(memberDoc => {
                if (memberDoc.data().family_id === doc.data().family_id) {
                  current_data["phone"].push(memberDoc.data().phone);
                }
              });
            });
            this.orders.push(current_data);
          });

          if (this.orders.length === 0) {
            this.noData = true;
            this.searchingData = false;
          } else {
            this.noData = false;
            this.searchingData = false;
          }
          this.getTotalNumToday();
        });
    },
    // 線上該寵物的美容項目儲存到組件中
    editSalonData(family_id, id, time) {
      let keys = Object.keys(this.salonSelect);
      // 美容項目的key 值
      this.showSalonSelectBlock = true;
      this.currentSelect["family_id"] = family_id;
      this.currentSelect["id"] = id;
      this.currentSelect['time'] = time;

      orderRef
        .where("family_id", "==", family_id)
        .where('time', '==', time)
        .get()
        .then(data => {
          data.forEach(doc => {
            let pet_data = doc.data().data;
            pet_data.map(item => {
              if (item.id === id) {
                for (let i = 0; i < keys.length; i++) {
                  this.salonSelect[keys[i]] = item[keys[i]];
                }
              }
            });
          });
        });
    },
    toggleSalonItem(item, status) {
      this.salonSelect[item] = status;
    },
    hideSalonSelectBlock() {
      this.showSalonSelectBlock = false;
    },
    // 更新美容項目
    salonUpdateConfirm() {
      let keys = Object.keys(this.salonSelect); // 美容項目的key 值
      let updated_data = []; // 儲存要更新回資料庫的寵物資料

      orderRef
        .where("family_id", "==", this.currentSelect.family_id)
        .where('time', '==', this.currentSelect.time)
        .get()
        .then(data => {
          data.forEach(doc => {
            let pets = doc.data().data;
            pets.map(item => {
              if (item.id === this.currentSelect.id) {
                for (let i = 0; i < keys.length; i++) {
                  item[keys[i]] = this.salonSelect[keys[i]];
                }
              }

              updated_data.push(item);
            });

            this.orders = []; //清空等等更新完拿回新資料
            orderRef.doc(doc.id).update({ data: updated_data });

            this.showSalonSelectBlock = false;
            alert("更新成功");
          });
        });
    },
    getInitialPrice(index, id){     // 儲存修改前金額, 如果沒修改則不更新
      let price = '';
      let pets = this.orders[index].data
      pets.map(item => {
        if(item.id === id){
          price = item.price
        }
      });
      this.currentPrice = price
    },
    // 更新價格
    updatePrice(index, num, id, family_id, time) {
      if(this.currentPrice === this.orders[index].data[num].price){
        return
      }

      // index, data內index, 自身id, family id, 寫入工作單時間
      let updated_data = []; // 儲存要更新回資料庫的寵物資料

      orderRef
        .where("family_id", "==", family_id)
        .where("time", "==", time)
        .get()
        .then(data => {
          data.forEach(doc => {
            let pet_data = doc.data().data;
            pet_data.map(item => {
              if (item.id === id) {
                item.price = this.orders[index].data[num].price;
              }

              updated_data.push(item);
            });

            this.orders = []; //清空等等更新完拿回新資料
            orderRef.doc(doc.id).update({ data: updated_data });

            alert("更新成功");
          });
        });
    },
    getInitialComment(index){
      this.currentComment = this.orders[index].comment
    },
    updateComment(index, family_id) {
      if(this.currentComment === this.orders[index].comment){
        return
      }

      familyRef.doc(family_id).update({ comment: this.orders[index].comment });
      alert("更新成功");
    },
    getDoingOrders() {
      let time = this.getTime();
      this.searchingData = true;
      this.currentFilter = 'doing';

      orderRef
        .where("time", ">", time) // 秀今天的工作單
        .where("process", "==", "doing")
        .orderBy("time", "asc")
        .get()
        .then(querySnapshot => {
          this.orders = [];

          querySnapshot.forEach(doc => {
            let current_data = doc.data();
            current_data['comment'] = ''

            // 取得備註
            familyRef.onSnapshot(querySnapshot => {
              querySnapshot.forEach(familyDoc => {
                if (familyDoc.id === doc.data().family_id) {
                  current_data["comment"] = familyDoc.data().comment;
                }
              });
            });

            // 取得電話
            current_data["phone"] = [];
            memberRef.onSnapshot(querySnapshot => {
              querySnapshot.forEach(memberDoc => {
                if (memberDoc.data().family_id === doc.data().family_id) {
                  current_data["phone"].push(memberDoc.data().phone);
                }
              });
            });
            this.orders.push(current_data);
          });
          
          if (this.orders.length === 0) {
            this.noData = true;
            this.searchingData = false;
          } else {
            this.noData = false;
            this.searchingData = false;
          }
          this.getTotalNumToday();
        });
    },
    getDoneOrders() {
      let time = this.getTime();
      this.searchingData = true;
      this.currentFilter = 'done';

      orderRef
        .where("time", ">", time) // 秀今天的工作單
        .where("process", "==", "done")
        .orderBy("time", "asc")
        .get()
        .then(querySnapshot => {
          this.orders = [];
          querySnapshot.forEach(doc => {
            let current_data = doc.data();
            current_data['comment'] = ''

            // 取得備註
            familyRef.onSnapshot(querySnapshot => {
              querySnapshot.forEach(familyDoc => {
                if (familyDoc.id === doc.data().family_id) {
                  current_data["comment"] = familyDoc.data().comment;
                }
              });
            });

            // 取得電話
            current_data["phone"] = [];
            memberRef.onSnapshot(querySnapshot => {
              querySnapshot.forEach(memberDoc => {
                if (memberDoc.data().family_id === doc.data().family_id) {
                  current_data["phone"].push(memberDoc.data().phone);
                }
              });
            });
            this.orders.push(current_data);
          });

          if (this.orders.length === 0) {
            this.noData = true;
            this.searchingData = false;
          } else {
            this.noData = false;
            this.searchingData = false;
          }
          this.getTotalNumToday();
        });
    },
    getTotalNumToday(){
      let total_num = '';
      if(this.orders.length !== 0){
        this.orders.map(item => {
          item.data.map(() => {
            total_num++
          })
        });
      } else {
        total_num = 0
      }

      this.totalNumToday = total_num;
    },
    showContactCard(index){
      this.contactInfo = this.orders[index].phone
      this.showContactInfo = true
    },
    hideContactBlock(){
      this.showContactInfo = false
    },
    deleteOrderList(index, family_id, time){
      if(confirm('確定要刪除？')){
          fStore
            .collection('order')
            .where("family_id", "==", family_id)
            .where('time', '==', time)
            .get()
            .then(data => {
                data.forEach(doc => {
                  fStore.collection('order').doc(doc.id).delete();
                  alert('刪除成功');
                  this.orders.splice(index, 1)
                });
            });
      }
    }
  }
};
</script>

<style lang="sass">
@import '../styles/basics/_common_var.scss'

// $main-color: #4a707a
// $pet-name-color: rgba(0,0,0,.7)

//test
// $main-color: #064789
// 064789
// $main-color: #ec5659

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
      margin: 2px


.per_dog_status
    display: flex
    align-items: center
    margin-top: 8px
    flex-wrap: wrap

.name_block
  margin-right: 5px
  width: 50%
  text-align: left
  color: $text-color-grey
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
  background-color: $main-color
  width: 20px
  height: 20px
  color: white
  line-height: 17px
  padding: 2px
  font-size: 12px
  font-weight: 600

.no_orders
  background-color: $card-color
  width: 70vw
  border-top: solid 20px $main-color
  font-size: 14px
  font-weight: 500
  padding: 12px 15px
  border-radius: 5px
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

  i
    font-size: 18px
    color: $main-color
    margin-right: 10px

.salon_select_block
  width: 100vw
  height: 100vh
  background-color: $card-color
  position: fixed
  top: 0
  right: 0

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
      margin: 12px 5px

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

.salon_select_text
  color: $text-color-blue
  font-weight: 500
  letter-spacing: 1px
  padding: 12px 15px
  border-bottom: solid 1px rgba(0,0,0,.1)
  margin-bottom: 15px

.rightIn-enter
  right: -100vh

.rightIn-enter-active
  transition: 1.5s

.rightIn-enter-to
  right: 0

.rightIn-leave
  right: 0

.rightIn-leave-active
  transition: 1s

.rightIn-leave-to
  right: -100vh

.turn_disabled
  opacity: .5
  pointer-events: none

.name_block
  display: flex
  justify-content: space-between
  width: 100%
  .name
    color: $text-color-blue
    font-size: 16px
    margin-right: 5px
    border-bottom: solid 1px $text-color-blue
    letter-spacing: 2px

  .breed
    color: $text-color-grey
    font-size: 12px

.today_date
  color: $text-color-blue
  font-weight: 500
  text-align: left
  font-size: 18px
  font-size: 14px

.turn_opacity
  opacity: .6

.process_filter
  margin: 12px 0 20px 0
  display: flex
  button 
    margin-right: 10px
    &:focus
      background-color: $main-color
      color: white

.filter_row
  display: flex
  align-items: center
  justify-content: space-between
  color: $text-color-blue
  font-weight: 500

.update_item_btn_block
  background-color: $main-color

.update_item_btn
  border: none
  color: $danger-color
  background-color: $card-color

.totoal_num_block
  font-weight: 600
  padding-right: 10px

.contact_block
  position: fixed
  z-index: 2
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  border-radius: 5px
  letter-spacing: 1px

.topIn-enter
  top: -1000px

.topIn-enter-active
  transition: 1s
  
.topIn-enter-to
  top: 50%
  transform: translateY(-50%)

.topIn-leave-active
  transition: 1.5s

.topIn-leave-to
  top: -1000px

.check_contact
  width: 100px
  color: $text-color-blue
  font-weight: 600

.item_price_block
  display: flex
  justify-content: space-between
  align-items: center
  width: 100%
  margin-top: 5px

.delete_btn
  color: $danger-color

.comment_row 
  display: flex
  align-items: center
  justify-content: space-between
  margin-top: 10px

</style>
