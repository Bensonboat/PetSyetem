<template>
  <div>
    <div
      v-if="
        phoneData.length === 0 &&
          petData.length === 0 &&
          familyData.length === 0
      "
      :style="[loadingBlock]"
    >
      <a-icon type="loading" />
    </div>
    <div v-else>
      <div class="home" :class="[this.showCard ? 'card_showing' : '']">
        <!-- <div class="time_block">{{time}}</div> -->
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
              placeholder="請輸入名稱"
              v-model="nameData.name"
              :style="[petNameBlock]"
            />
            <div class="breed_search_block">
              <div class="breed_select_block">
                <div :style="[breedSelectBlcok]">犬種</div>
                <a-select
                  defaultValue=""
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
            v-if="noData && showPhoneSearch"
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
            v-if="showCard"
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
                v-if="showCard"
                placeholder="備註"
                :style="[commentInput]"
                v-model="comment"
              />
            </div>
          </pet-card>
        </transition>
        <button
          v-if="showCard && !noData"
          class="search_btn"
          @click="addToOrders"
          :style="{ marginBottom: '30px' }"
        >
          確認 - 工單
        </button>
        <button
          v-if="showCard && noData"
          class="search_btn"
          @click="confirmCreate"
          :style="{ marginBottom: '30px' }"
        >
          新增中的資料
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

import petCard from "../components/PetCard.vue";

import { db } from "../firebase";
const fStore = db.firestore();

export default {
  name: "Home",
  components: {
    // HelloWorld
    petCard
  },
  data() {
    return {
      time: "",
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
        color: "#FF2C55",
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
        width: "40%",
        letterSpacing: "2px",
        fontSize: "12px",
        fontWeight: 700,
        color: "#216583"
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
        fontWeight: 600
      },
      loadingBlock: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "70px",
        color: "#ec5659"
      },
      phoneData: [],
      familyData: [],
      breedData: [],
      petData: [],
      sameFamilyPetData: [],
      noData: "", // 無相關資料
      editData: false,
    };
  },
  created() {
    // this.getCurrentTime();
  },
  mounted() {
    this.getAllData();
    this.$store.commit('searchData/checkClientStatus', false) // 確認是不是第一次來的客人
  },
  watch: {
    phone(val) {
      this.showCard = false;
      this.noData = false;
    },
    nameData: {
      handler(val) {
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

      let new_id = "";
      this.sameFamilyPetData = []; // for 清空

      this.checkPhoneFamilyID().then(status => {
        let family_id = status;

        // family ID 不存在
        if (status === "noData") {
          this.noData = true;
        } else {
          // 該電話號碼有資料 比對 family ID 拉出寵物資料
          this.petData.map(item => {
            if (item.family_id === family_id) {
              this.sameFamilyPetData.push(item);
            }
          });

          // 比對 ID 獲取 family 備註
          fStore
            .collection("family")
            .get()
            .then(data => {
              data.forEach(doc => {
                if (doc.id === family_id) {
                  this.$store.commit('searchData/saveCurrentFamilyID', doc.id) // 儲存當前 family ID
                  this.comment = doc.data().comment;
                }
              });
            });

          this.showCard = true;
        }
      });
    },
    petNameSearch() {
      if(this.nameData.name === '' && this.nameData.breed === ''){
        alert('請輸入搜尋資料');
        return
      }

      this.sameFamilyPetData = [];
      this.checkPetFamilyID().then(ids => {
        let checkFilter = ids[0];

        if (ids.length > 1) {
          if (checkFilter === "both") {
            ids.map(id => {
              this.petData.map(pet => {
                if (id === pet.family_id) {
                  this.sameFamilyPetData.push(pet);
                  this.showCard = true;
                }
              });
            });
          } else if (checkFilter === "breed") {
            ids.map(id => {
              this.petData.map(pet => {
                if (id === pet.family_id && pet.breed === this.nameData.breed) {
                  this.sameFamilyPetData.push(pet);
                  this.showCard = true;
                }
              });
            });
          } else if (checkFilter === "name") {
            ids.map(id => {
              this.petData.map(pet => {
                if (id === pet.family_id && pet.name === this.nameData.name) {
                  this.sameFamilyPetData.push(pet);
                  this.showCard = true;
                }
              });
            });
          }
        } else {
          this.noData = true;
        }
      });
    },
    clearPhone() {
      this.phone = "";
      this.showCard = false;
    },
    // createName(){
    //   this.$router.push({ path: 'createName'})
    // },
    switchSearchMode(change) {
      this.showPhoneSearch = !change;
      this.noData = false;
      this.showCard = false;
    },
    getCurrentTime() {
      let that = this;
      setInterval(() => {
        let time = new Date();
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let date = time.getDate();
        let hour = time.getHours();
        let minute = time.getMinutes();
        let second = time.getSeconds();
        month < 10 ? (month = "0" + month) : month;
        date < 10 ? (date = "0" + date) : date;
        hour < 10 ? (hour = "0" + hour) : hour;
        minute < 10 ? (minute = "0" + minute) : minute;
        second < 10 ? (second = "0" + second) : second;

        let current_time = hour + ":" + minute + ":" + second;
        that.time = year + "/" + month + "/" + date + " - " + "" + current_time;
      }, 1000);
    },
    getPhoneData() {
      fStore
        .collection("member")
        .get()
        .then(data => {
          data.forEach(doc => {
            this.phoneData.push(doc.data());
          });
        });
    },
    getFamilyData() {
      fStore
        .collection("family")
        .get()
        .then(data => {
          data.forEach(doc => {
            let family_data = {
              comment: doc.data(),
              id: doc.id
            };
            this.familyData.push(family_data);
          });
        });
    },
    getBreedsData() {
      fStore
        .collection("breed")
        .get()
        .then(data => {
          data.forEach(doc => {
            this.breedData = doc.data().all_breeds;
          });
        });
    },
    getPetData() {
      fStore
        .collection("pet")
        .get()
        .then(data => {
          data.forEach(doc => {
            this.petData.push(doc.data());
          });
        });
    },
    checkPhoneFamilyID() {
      return new Promise(resolve => {
        this.phoneData.map(item => {
          // item.phone.map(value => {
            if (item.phone.phone === this.phone) {
              resolve(item.family_id);
            }
          // });
        });
        resolve("noData");
      });
    },
    checkPetFamilyID() {
      let validate_family_id = [];

      return new Promise(resolve => {
        if (this.nameData.name !== "" && this.nameData.breed !== "") {
          validate_family_id.push("both");
          fStore
            .collection("pet")
            .where("name", "==", this.nameData.name)
            .where("breed", "==", this.nameData.breed)
            .get()
            .then(data => {
              data.forEach(doc => {
                validate_family_id.push(doc.data().family_id);
              });
              resolve(validate_family_id);
            });
        } else if (this.nameData.name === "" && this.nameData.breed !== "") {
          validate_family_id.push("breed");
          fStore
            .collection("pet")
            .where("breed", "==", this.nameData.breed)
            .get()
            .then(data => {
              data.forEach(doc => {
                validate_family_id.push(doc.data().family_id);
              });
              resolve(validate_family_id);
            });
        } else if (this.nameData.name !== "" && this.nameData.breed === "") {
          validate_family_id.push("name");
          fStore
            .collection("pet")
            .where("name", "==", this.nameData.name)
            .get()
            .then(data => {
              data.forEach(doc => {
                validate_family_id.push(doc.data().family_id);
              });
              resolve(validate_family_id);
            });
        }

        // this.petData.map(item => {
        //   if (item.name === this.nameData.name && item.breed === this.nameData.breed) {
        //     validate_family_id.push(item.family_id)
        //   }
        // });
        // resolve(validate_family_id)
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
      let new_id = this.generateID() // 生成新 family ID

      this.$store.commit('searchData/saveCurrentFamilyID', new_id) // 儲存當前 family ID
      this.$store.commit('searchData/checkClientStatus', true) // 第一次來的客人
      this.$store.commit('searchData/setPhone', this.phone) // 第一次來的客人帶入新增電話
      this.$router.push({ path: 'EditFamilyData'})

      // let new_id = this.generateID();

      // let new_pet_data = {
      //   id: new_id,
      //   family_id: '',
      //   name: "",
      //   breed: "",
      //   status: true,
      //   wash: false,
      //   cut: false,
      //   head: false,
      //   feet: false,
      //   mouth: false,
      //   bug: false,
      //   herbWash: false,
      //   messyHair: false,
      //   price: "",
      //   reject: 'normal'
      // };

      // this.sameFamilyPetData.push(new_pet_data);
    },
    confirmCreate() {
      let family_id = this.generateID();

      // 建立新 family ID
      fStore
        .collection("family")
        .doc(family_id)
        .set({
          comment: this.comment
        });
      this.familyData.push({ id: family_id, comment: this.comment });

      // 建立新電話資料
      // let phones = [];
      let member_id = this.generateID()

      let member = {
        id: member_id,
        name: "",
        phone: this.phone,
      };

      // phones.push(member);
      
      let data = {
        // id: member_id,
        family_id: family_id,
        phone: member
      };

      fStore
        .collection("member")
        .doc()
        .set(data);

      this.phoneData.push(data); // ??????????????????????

      // 建立新寵物資料
      let pet_data = this.sameFamilyPetData;
      this.sameFamilyPetData.map(data => {
        let pet_id = this.generateID();

        data["family_id"] = family_id;
        data['id'] = pet_id;

        fStore
          .collection("pet")
          .doc()
          .set(data);
        this.petData.push(data); //???????????
      });

      alert("新增成功");
    },
    getAllData() {
      return new Promise(resolve => {
        this.getPhoneData();
        this.getBreedsData();
        this.getFamilyData();
        this.getPetData();
        resolve();
      });
    },
    addToOrders() {
      let id = "";
      if (this.sameFamilyPetData.length !== 0) {
        // id = this.sameFamilyPetData[0].family_id
        let check_select = 0;

        this.sameFamilyPetData.map(currentSelect => {
          if (currentSelect.status === true) {
            check_select = 1;
            let id = currentSelect.family_id

            // 新增至工作單的單據加上時間
            let order_data = currentSelect;
            order_data['time'] =  new Date().getTime()           

            // 新增至線上工作單
            fStore
              .collection("order")
              .doc()
              .set(order_data);


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
                alert('function addToOrders-order error')
              })

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
                alert('function addToOrders-comment error')
              })

          }
        });

        if(check_select === 0){
          alert('還沒選誰要洗澡哦')
        } else {
          alert('已新增至工作單');
          this.petData = [];
          this.getPetData();
        }
      }
    },
    clearPetSearch(){
      this.nameData.name = '';
      this.nameData.breed = ''
    },
    editFamilyData() {
      this.$router.push({ path: 'EditFamilyData'})
    },

  }
};
</script>

<style lang="sass">


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

</style>
