<template>
  <div>
    <div
      v-if="searching"
      :style="[loadingBlock]"
    >
      <a-icon type="loading" />
    </div>
    <div v-else v-show="!showEditFamilyData">
      <div class="home" :class="[this.showCard ? 'card_showing' : '']">
        <div v-if="showPhoneSearch" class="search_text">電話</div>
        <div v-else class="search_text">寵物</div>
        <div class="enter_phone_block">
          <div v-if="showPhoneSearch" class="phone_search">
            <input
              type="number"
              pattern="\d*"
              v-model="phone"
              placeholder="請輸入電話"
              :class="[
                this.phone !== '' ? 'number_font' : '',
                this.showCard ? 'card_showing' : ''
              ]"
              @keyup.enter="phoneSearch"
            />
            <div
              v-if="this.phone !== ''"
              @click="clearPhone"
              class="clear_phone phone_blcok_icon"
            >
              x
            </div>
            <!-- <a-icon type="search" @click="phoneSearch" class="phone_blcok_icon"/> -->
          </div>
          <div v-else :style="[nameDataBlock]">
            <a-input
              placeholder="名稱"
              v-model="nameData.name"
              :style="[petNameBlock]"
              @keyup.enter="petNameSearch"
            />
            <div class="breed_search_block">
              <div class="breed_select_block">
                <div :style="[breedSelectBlcok]">犬種</div>
                <a-select
                  style="width: 75px"
                  v-model="nameData.breed"
                >
                  <a-select-option
                    v-for="(item, index) in breedData"
                    :key="index"
                    :value="item.value"
                    >{{ item.name }}</a-select-option
                  >
                </a-select>
              </div>
              <div
                  @click="clearPetSearch"
                  class="clear_phone phone_blcok_icon"
                  :style="{marginRight: '0', alignSelf: 'flex-end', marginLeft: '5px'}"
              >
                x
              </div>

            </div>
          </div>
          <div :style="[switchIcon]" @click="switchSearchMode(showPhoneSearch)">
            <a-icon type="sync" :style="{lineHeight: '50px'}"/>
          </div>
        </div>
        <div v-if="!showCard">
          <button
            v-if="showPhoneSearch && !noData"
            class="search_btn"
            @click="phoneSearch"
          >
            查詢 phone
          </button>
          <button
            v-if="!showPhoneSearch && !noData"
            class="search_btn"
            @click="petNameSearch"
          >
            查詢 pet
          </button>
          <button
            v-if="noData"
            class="search_btn"
            @click="showNewPetCard"
          >
            新增
          </button>
        </div>
      </div>
      <div>
        <div v-if="noData && !showCard" class="no_data_block"><a-icon type="warning" />沒資料</div>
        <transition name="fade">
          <pet-card
            v-if="showCard && showPhoneSearch"
            class="show_card_block"
            :sameFamilyPetData="sameFamilyPetData"
            :breedData="breedData"
            :editData="editData"
            @createNewCard="showNewPetCard"
          >
            <div slot="editBtn">
              <div @click="editFamilyData" class="edit_btn">
                  <a-icon type="edit"/>
              </div>
            </div>
            <div slot="commentBlock">
              <a-input
                placeholder="備註"
                :style="[commentInput]"
                v-model="comment"
              />
            </div>
          </pet-card>
          <family-card v-if="showCard && !showPhoneSearch" :petSearchData="petSearchData"></family-card>
        </transition>
        <button
          v-if="showCard && !noData && showPhoneSearch"
          class="search_btn"
          @click="addToOrders"
          :style="{ marginBottom: '30px' }"
        >
          確認 - 工單
        </button>
      </div>
    </div>
    <edit-family-data v-if="phoneSearchFamilyID !== ''" v-show="showEditFamilyData" @clearFamilyID="backToPhoneSearch">
      <div slot="backToPetSearch" class="previous_page" @click="backToPhoneSearch">
          <a-icon type="swap-left" />
      </div>
    </edit-family-data>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

import petCard from "../components/PetCard.vue"
import familyCard from '../components/FamilyCard'
import editFamilyData from './EditFamilyData'

import { db } from "../firebase";
const fStore = db.firestore();

const familyRef = fStore.collection('family')
const petRef = fStore.collection('pet')
const memberRef = fStore.collection('member')
// const familyRef = fStore.collection('family')

export default {
  name: "Home",
  components: {
    petCard,
    familyCard,
    editFamilyData
  },
  data() {
    return {
      searching: false,
      phone: "",
      comment: "",
      nameData: {
        name: "",
        breed: ""
      },
      showPhoneSearch: true, // 是否用電話搜尋
      showCard: false, // 是否顯示寵物資料卡
      switchIcon: {
        display: "flex",
        alignSelf: "center",
        fontSize: "15px",
        height: '50px',
        borderRadius: '0 5px 5px 0',
        backgroundColor: '#ec5659',
        color: '#eee',
        padding: '0 8px'
      },
      breedSelectBlcok: {
        marginRight: "10px",
        display: "flex",
        alignItems: "center",
        fontSize: "12px",
        width: '25px'
      },
      petNameBlock: {
        width: "45%",
        letterSpacing: "2px",
        fontWeight: 700,
        color: "#216583",
        fontSize: '16px',
      },
      nameDataBlock: {
        width: "100%",
        display: "flex",
        backgroundColor: "white",
        padding: "8px 12px",
        height: "50px",
        borderRadius: "5px",
        justifyContent: "space-between",
        boxShadow: "1px 3px 5px rgba(0,0,0,.1)",
      },
      commentInput: {
        width: "85vw",
        fontSize: "16px",
        outline: "none",
        letterSpacing: "1px",
        border: "none",
        color: 'rgb(74, 112, 122)',
        fontWeight: 600,
        padding: '12px 20px'
      },
      loadingBlock: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "70px",
        color: "#ec5659"
      },
      // phoneData: [],
      // familyData: [],
      breedData: [],
      // petData: [],
      sameFamilyPetData: [],
      noData: '', // 無相關資料
      editData: false,
      petSearchData: [],
      familyID: '',
      phoneSearchFamilyID: '',
      showEditFamilyData: false
    };
  },
  mounted() {
    this.getBreedData();
    this.$store.commit('searchData/checkClientStatus', false) // 確認是不是第一次來的客人
  },
  watch: {
    phone() {
      this.showCard = false;
      this.noData = false;
    },
    nameData: {
      handler() {
        this.showCard = false;
        this.noData = false;
      },
      deep: true
    }
  },
  methods: {
    phoneSearch() {
      if(this.phone === ''){
        alert('請輸入電話');
        return
      }
      this.searching = true;

      this.checkPhoneFamilyID().then(id => {
        // family ID 不存在
        if (id === "noData") {
          this.noData = true;
        } else {
          this.familyID = id; // 組件內儲存 id
          this.getCertainPetData();   // 比對 family ID 拉出寵物資料
          this.getCertainFamilyComment(); // 比對 family ID 拉出備註
          this.showCard = true;
        }
        this.searching = false;
      });
    },
    petNameSearch() {
      this.petSearchData = [];

      if(this.nameData.name === ''){
        alert('名稱為必填資料');
        return
      }

      this.searching = true;

      this.checkPetFamilyID().then(() => {
        if(this.petSearchData.length !== 0){
          this.petSearchData.map(item => {    
            petRef
              .onSnapshot(querySnapshot => {
                querySnapshot.forEach(doc => {
                  if(item.family_id === doc.data().family_id && item.name !== doc.data().name){
                    // 存入同個家庭其他狗狗的名字和犬種
                    let other_pet = {
                      name: doc.data().name,
                      breed: doc.data().breed
                    };
                    item.data.push(other_pet)
                  }
                })
              })
            });
          this.showCard = true;
        } else {
          this.noData = true;
        }

        this.searching = false;
      });
    },
    clearPhone() {
      this.phone = "";
      this.showCard = false;
    },
    switchSearchMode(change) {
      this.showPhoneSearch = !change;
      this.noData = false;
      this.showCard = false;
      this.phone = '';
      this.nameData['name'] = '';
      this.nameData['breed'] = ''
    },
    checkPhoneFamilyID() {
      return new Promise(resolve => {
        memberRef.onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            if(doc.data().phone.phone === this.phone){
              resolve(doc.data().family_id)
            }
          });
          resolve('noData')
        })
      });
    },
    checkPetFamilyID() {
      this.petSearchData = [];

      return new Promise(resolve => {
        let search_name = '';
        let search_breed = '';
        let matched_family = [];

        if(this.nameData.name !== ''){
          search_name = this.nameData.name
        }

        if(this.nameData.breed !== ''){
          search_breed = this.nameData.breed
        }

        fStore
          .collection('pet')
          .get()
          .then(data => {
            data.forEach(doc => {
              let words = search_name.split('');

              for(let i = 0; i < words.length; i++){
                let pattern = new RegExp(search_name[i]); // 模糊搜尋比對名字
                let result = pattern.test(doc.data().name);

                if(search_breed !== ''){
                  if(result === true && search_breed === doc.data().breed){     // 搜尋條件有犬種的話篩選犬種
                    if(matched_family.indexOf(doc.data().family_id) === -1){
                      matched_family.push(doc.data().family_id);
                      let data = {
                        name: doc.data().name,
                        breed: doc.data().breed,
                        family_id: doc.data().family_id,
                        data: []
                      };

                      // 儲存符合條件的對象
                      this.petSearchData.push(data)
                    }
                  }
                } else {
                  if(result === true){
                    if(matched_family.indexOf(doc.data().family_id) === -1){
                      matched_family.push(doc.data().family_id);
                      let data = {
                        name: doc.data().name,
                        breed: doc.data().breed,
                        family_id: doc.data().family_id,
                        data: []
                      };
                      this.petSearchData.push(data)
                    }
                  }
                }
              }
            });
            resolve();
          })
      });
    },
    generateID() {
      var d = Date.now();
      if (
        typeof performance !== "undefined" &&
        typeof performance.now === "function"
      ) {
        d += performance.now(); //use high-precision timer if available
      }
      return "xxxxyxxxxxxxyxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      });
    },
    showNewPetCard() {      
      let new_id = this.generateID(); // 生成新 family ID
      
      this.familyID = new_id;
      this.$store.commit('searchData/saveCurrentFamilyID', new_id); // 儲存當前 family ID
      this.$store.commit('searchData/checkClientStatus', true); // 第一次來的客人
      this.$store.commit('searchData/setPhone', this.phone); // 儲存當前電話


      this.phoneSearchFamilyID = this.familyID; // 掛上修改組件
      this.showEditFamilyData = true; // 顯示修改組件 隱藏搜尋頁面;
    },
    addToOrders() {
      let id = "";

      if (this.sameFamilyPetData.length !== 0) {
        let check_select = 0;
        let order_data = {}; // 以一戶為單位的單據
        order_data['time'] = new Date().getTime();
        order_data['process'] = 'doing';
        order_data['family_id'] = '';
        order_data['data'] = [];

        this.sameFamilyPetData.map(currentSelect => {
          if (currentSelect.status === true) {
            check_select = 1;
            let id = currentSelect.family_id;
            order_data['family_id'] = id;

            // 新增至工作單的單據加上時間
            order_data['data'].push(currentSelect);

            //  更新線上該family id 下寵物資料
            fStore
              .collection("pet")
              .where("family_id", "==", id)
              .where('id', '==', currentSelect.id)
              .get()
              .then(data => {
                data.forEach(doc => {
                  fStore.collection('pet').doc(doc.id).update(currentSelect)
                })            
              })
              .catch(() => {
                alert('系統錯誤! addToOrders-order error')
              })

            // 更新備註
            fStore
              .collection("family")
              .get()
              .then(data => {
                data.forEach(doc => {
                  if(doc.id === id){
                    fStore.collection('family').doc(doc.id).update({comment: this.comment})
                  }
                })            
              })
              .catch(() => {
                alert('系統錯誤! addToOrders-order error')
              })

          }
        });

        if(check_select === 0){
          alert('還沒選誰要洗澡哦');
          return
        } else {
          // 新增至線上工作單
          fStore
            .collection("order")
            .doc()
            .set(order_data);

          alert('已新增至工作單');
          this.petData = [];
        }
      }
    },
    clearPetSearch(){
      this.nameData.name = '';
      this.nameData.breed = ''
    },
    editFamilyData() {
      this.$store.commit('searchData/saveCurrentFamilyID', this.familyID); // 儲存當前 family ID for EditFamilyData 組件拿
      this.phoneSearchFamilyID = this.familyID; // 掛上修改組件
      this.showEditFamilyData = true; // 顯示修改組件 隱藏搜尋頁面;
    },
    backToPhoneSearch(){
      this.showEditFamilyData = false; // 顯示搜尋頁面
      this.phoneSearchFamilyID = ''; // destroy 修改組件
      this.getCertainPetData();
      this.getCertainFamilyComment();
    },
    // 比對 family ID 獲取寵物資料
    getCertainPetData(){
      fStore
        .collection('pet')
        .onSnapshot(querySnapshot => {
          this.sameFamilyPetData = [];
          querySnapshot.forEach(doc => {
            if(doc.data().family_id === this.familyID){
              this.sameFamilyPetData.push(doc.data());
              this.noData = false;
              this.showCard = true;
            }
          });
        });
    },
    // 比對 family ID 獲取備註
    getCertainFamilyComment(){
      familyRef
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            if(doc.id === this.familyID){
              this.comment = doc.data().comment;
            }
          })
        })
    },
    // 獲取品種資料
    getBreedData(){
      fStore
        .collection('breed')
        .get()
        .then(data => {
          data.forEach(doc => {
            doc.data().all_breeds.map(item => {
              this.breedData.push(item);
            })
          })
        })
    }
  }
};
</script>

<style lang="sass">
@import '../styles/basics/_common_var.scss'

// !!FF2C55
$fz-color: rgba(0,0,0,.4)
// $main-color: #49D49D
// $main-color: #99ddcc
// $main-color: #064789 深藍
// $main-color: #EF2D56 // 粉色
// $main-color: #F0386B
$main-color: #ec5659

$second-color: #FF2C55

$third-color: #4a707a


.home
  margin: 30px auto 0 auto
  width: 80vw

.search_text
  text-align: left
  padding: 0 0 5px 10px
  color: $main-color
  font-weight: 500
  letter-spacing: 2px

.enter_phone_block
  display: flex
  box-shadow: 1px 3px 5px rgba(0,0,0,.1)
  border-radius: 5px

.phone_search
  padding: 8px 12px
  height: 50px
  border-radius: 5px 0 0 5px
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
    color: $text-color-blue
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
//   background-color: $main-color
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

.breed_select_block
  display: flex
  align-items: center

.search_btn
  border: none
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
  font-weight: 500
  white-space: nowrap
  text-align: center
  outline: none
  background-color: $main-color
  box-shadow: 1px 3px 5px rgba(0,0,0,.1)
  color: #eee

.breed_search_block
  display: flex
  width: 50%
  justify-content: space-between

.no_data_block
  line-height: 40px
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  background-color: #fff
  width: 85vw
  height: 50px
  border-top: solid 10px $main-color
  color: $main-color
  font-weight: 600
  letter-spacing: 1px
  border-radius: 10px
  box-shadow: 1px 3px 5px rgba(0,0,0,.1)
  
  i
    color: #6B0504
    margin-right: 10px
    font-size: 15px  

.previous_page 
  text-align: left
  color: $danger-color
  font-size: 35px
  margin-top: 10px

</style>
