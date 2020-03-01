<template>
    <div class="edit_family_data" ref="edit_family_data">
        <div v-if="loading" :style="[loadingBlock]">
            <a-icon type="loading"/>
        </div>
        <div v-else>
            <slot name="backToPetSearch"></slot>
            <!-- <div class="previous_page" @click="backToSearchPage">
                <a-icon type="swap-left" />
            </div> -->
            <div class="update_member_block">
                <div class="header">客人資料</div>
                <div class="phone_data">
                    <div class="phone_data_header">
                        <div class="name">暱稱</div>
                        <div class="phone">電話</div>
                        <div class="plus_icon" @click="addNewPhone">
                            <a-icon type="plus" />
                        </div>
                    </div>
                    <div v-if="phonesData.length === 0" class="no_data">尚無資料</div>
                    <div v-else class="phone_data_info" v-for="(item, index) in phonesData" :key="item.id"> 
                        <div class="name">
                            <input type="text" :placeholder="'暱稱'" v-model="phonesData[index].name">
                        </div>
                        <div class="phone">
                            <input               
                                type="number"
                                pattern="\d*"
                                :placeholder="'電話'" 
                                v-model="phonesData[index].phone
                            ">
                        </div>
                        <div class="delete_icon" @click="deletePhone(index)">
                            <a-icon type="delete" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="update_pet_block">
                <div class="header">
                    <div>寵物資料</div>
                    <div class="plus_icon" @click="addNewPet">
                        <a-icon type="plus-circle"/>
                    </div>
                </div>
                <div v-if="petsData.length === 0" class="no_data">尚無資料</div>
                <div v-else>
                    <pet-card :sameFamilyPetData="petsData" :editData="true" :breedData="breedsList" @deletePet="deletePet"/>
                </div>
            </div>
            <div>
                <div class="header">備註</div>
                <input type="text" placeholder="請輸入備註" class="comment" v-model="comment">
            </div>
            <button class="search_btn update_confirm_btn" @click="updateConfirm">確認更新</button>
        </div>
    </div>
</template>

<script>
import petCard from '@/components/PetCard'
import { db } from "../firebase";
const fStore = db.firestore();

export default {
    name: 'EditFamilyData',
    components: {
        petCard
    },
    props: ['petSearchFamilyID'],
    data(){
        return{
            loadingBlock: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "70px",
                color: "#ec5659"
            },
            loading: false,
            familyID: '',
            comment: '',
            breedsList: [],
            phonesData: [],
            petsData: [],
            deletePhonesData: [],
            deletePetsData: [],
        }
    },
    mounted(){
        this.getBreedsData();
        this.getFamilyID().then(() => {
            if(this.familyID === ''){
                alert('系統錯誤，請重新操作');
                this.$router.push({path: '/'})       
            }

            this.getEditPhonesData();
            this.getEditPetsData();
        });

        // 首次新增時
        if(this.$store.state.searchData.new_client === true){
            let new_id = this.generateID();
            this.phonesData.push({
                id: new_id,
                name: '',
                phone: this.$store.state.searchData.phone
            })
        }  else {
            fStore
                .collection('family')
                .doc(this.familyID)
                .get()
                .then(doc => {
                    this.comment = doc.data().comment
                })
        }
    },
    computed: {
        getPetSearchFamilyID(){
            return this.$store.state.searchData.family_id;
        }
    },
    watch: {
        getPetSearchFamilyID(id){
            this.phonesData = [];
            this.petsData = [];
            this.familyID = id;
            this.getEditPhonesData();
            this.getEditPetsData();
        }
    },
    destroyed(){
        this.$store.commit('searchData/saveCurrentFamilyID', '');
        this.$store.commit('searchData/checkClientStatus', false);
    },
    methods: {
        addNewPhone(){
            let new_id = this.generateID();

            let blank_phone_data = {
                id: new_id,
                name: '',
                phone: ''
            };

            this.phonesData.push(blank_phone_data)
        },
        getBreedsData() {
            fStore
                .collection("breed")
                .get()
                .then(data => {
                data.forEach(doc => {
                    this.breedsList = doc.data().all_breeds;
                    });
                });
            },
        addNewPet(){
            let new_id = this.generateID();

            let blank_pet_data = {
                family_id: this.familyID,
                id: new_id,
                name: '',
                breed: '',
                wash: false,
                cut: false,
                head: false,
                feet: false,
                mouth: false,
                bug: false,
                herbWash: false,
                messyHair: false,
                price: '',
                status: false,
                reject: 'normal'
            };

            this.petsData.push(blank_pet_data);

            // 自動滾至下方
            let that = this;
            setTimeout(() => {
                that.$refs.edit_family_data.parentElement.parentElement.scrollTop = that.$refs.edit_family_data.parentElement.parentElement.scrollHeight + 1000
            }, 200)
        },
        deletePhone(index){
            if(confirm('確定要刪除？')){
                this.deletePhonesData.push(this.phonesData[index]);
                this.phonesData.splice(index, 1)
            }
        },
        deletePet(index){
            if(confirm('確定要刪除？')){
                this.deletePetsData.push(this.petsData[index]);
                this.petsData.splice(index, 1)
            }
        },
        generateID() {
            let d = Date.now();
            if (
                typeof performance !== "undefined" &&
                typeof performance.now === "function"
            ) {
                d += performance.now(); //use high-precision timer if available
            }
            return "xxxxyxxxxxxxyxxxxxxx".replace(/[xy]/g, function(c) {
                let r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
            });
        },
        getFamilyID(){
            return new Promise(resolve => {
                this.familyID = this.$store.state.searchData.family_id;
                resolve()
            })
        },
        getEditPhonesData(){
            let id = this.familyID;
            fStore
                .collection("member")
                .where("family_id", "==", id)
                .get()
                .then(data => {
                    data.forEach(doc => {
                        this.phonesData.push(doc.data().phone)
                    });
                });
        },
        getEditPetsData(){
            let id = this.familyID;

            fStore
                .collection("pet")
                .where("family_id", "==", id)
                .get()
                .then(data => {
                    data.forEach(doc => {
                        this.petsData.push(doc.data())
                    });
                });
        },
        // backToSearchPage(){
        //     this.$router.push({ path: '/'})
        // },
        updateConfirm(){
            // 驗證資料防呆
            let validate_phone_data = this.validatePhoneData();
            let validate_pet_data = this.validatePetData();

            if(validate_phone_data === false){
                alert('請填入電話');
                return                
            }

            if(validate_pet_data === false){
                alert('請輸入寵物名稱及犬種');
                return
            }

            let new_client = this.$store.state.searchData.new_client;

            if(this.petsData.length === 0 || this.phonesData.length === 0){
                alert('請輸入至少一筆資料');
                return
            }

            if(new_client === true){  // 新客人
                // 建立新 family ID 與備註
                fStore
                    .collection("family")
                    .doc(this.familyID)
                    .set({comment: this.comment});
            } 

            // 比對電話更新並儲存
            this.phonesData.map(item => {
                let old_data = false;

                fStore
                    .collection("member")
                    .where("family_id", "==", this.familyID)
                    .get()
                    .then(data => {
                        data.forEach(doc => {
                            let data = {
                                phone: item
                                };

                            if(doc.data().phone.id === item.id){
                                // 有資料就更新
                                fStore.collection('member').doc(doc.id).update(data);
                                old_data = true
                            }                           
                        });
                    })
                    .then(() => {
                        // 資料庫還沒有資料 所以新增
                        if(old_data === false){
                            let data = {
                                family_id: this.familyID,
                                phone: item
                            };

                            fStore
                                .collection("member")
                                .doc()
                                .set(data);
                        }
                    })
            });

            this.petsData.map(item => {
                let old_data = false;

                // 比對寵物資料更新並儲存
                fStore
                    .collection("pet")
                    .get()
                    .then(data => {
                        data.forEach(doc => {
                            if(doc.data().family_id === this.familyID && doc.data().id === item.id){
                                old_data = true;
                                fStore.collection('pet').doc(doc.id).update(item)
                            }
                        });
                    })
                    .then(() => {
                        // 資料庫沒資料, 新增一筆
                        if(old_data === false){
                            fStore
                                .collection("pet")
                                .doc()
                                .set(item);
                        }
                    });
            });

            this.deletePhonesData.map(item => {
                fStore
                    .collection('member')
                    .where("family_id", "==", this.familyID)
                    .get()
                    .then(data => {
                        data.forEach(doc => {
                            if(doc.data().phone.id === item.id){
                                fStore.collection('member').doc(doc.id).delete()
                            }
                        });
                    });
            });

            this.deletePetsData.map(item => {
                fStore
                    .collection('pet')
                    .where("family_id", "==", this.familyID)
                    .where("id", "==", item.id)
                    .get()
                    .then(data => {
                        data.forEach(doc => {
                            fStore.collection('pet').doc(doc.id).delete()
                        });
                    });
            });

            // 更新備註
            fStore
                .collection("family")
                .doc(this.familyID)
                .update({comment: this.comment});

            this.loading = true;

            setTimeout(() => {
                alert('資料儲存成功');
                this.$emit('clearFamilyID')
            }, 500)
        },
        validatePhoneData(){
            let is_pass = true;
            this.phonesData.map(item => {
                if(item.phone === ''){
                    is_pass = false
                }
            })
            return is_pass
        },
        validatePetData(){
            let is_pass = true;
            this.petsData.map(item => {
                if(item.breed === '' || item.name === ''){
                    is_pass = false
                }
            });
            return is_pass
        }
    },
}

</script>

<style lang="sass" scoped>
// $main-color:
@import '../styles/basics/_common_var.scss'

.edit_family_data
    width: 85vw
    margin: auto
    border-radius: 5px
    color: $text-color-blue
    font-weight: 600

    input
        outline: none
        border: solid 1px rgba(0,0,0,.1)
        border-radius: 5px
        padding: 6px 12px
        width: 100%
        letter-spacing: 1px
        color: rgba(0,0,0,.5)
        font-weight: 500

.update_member_block
    background-color: $card-color
    margin: 10px 0

.header
    width: 100%
    background-color: $main-color
    color: $text-color-light
    padding: 7px 8px  
    border-radius: 5px 5px 0 0 
    letter-spacing: 1px 
    position: relative 
    font-size: 18px

.phone_data_header 
    display: flex
    text-align: left
    margin-bottom: 10px

.name  
    width: 30%
    margin-right: 10px

.phone 
    width: 60%
    font-size: 16px

.plus_icon
    width: 10%
    text-align: right
    font-size: 15px

.phone_data
    padding: 8px 12px

.phone_data_info
    display: flex
    margin-bottom: 2px
    text-align: left
        
    .name
        font-weight: 500

    .phone
        font-size: 16px
        font-weight: 500
        letter-spacing: 1px

.delete_icon
    width: 10%
    text-align: right
    font-size: 15px
    align-self: center
    color: $danger-color

.update_pet_block
    margin: 15px 0

    .plus_icon
        position: absolute
        right: 15px
        top: 5px
        font-size: 18px

.update_confirm_btn
    margin: 30px 0
    width: 125px

.no_data
    background-color: $card-color
    padding: 8px 12px

.comment
    padding: 8px 12px
    letter-spacing: 1px
    color: $text-color-blue
    font-size: 16px
    font-weight: 600
</style>