<template>
    <div class="family_card_block">
        <div v-for="(item, index) in petSearchData" :key="index" class="each_family_card" v-show="petSearchFamilyID === ''">
            <div class="search_pet">
                <div :style="{textAlign:'left'}">
                    <div>名稱: </div>
                    <div class="name_title_text">{{item.name}} ( {{item.breed}} )</div>
                </div>
                <!-- <div class="get_more_info" @click="editFamilyData(item.family_id)"> -->
                <div class="get_more_info" @click="getDataFromFamilyCard(item.family_id)">
                    <a-icon type="search" />
                </div>
            </div>
            <div v-if="item.data.length !==0" class="other_pet">
                <div>另有: </div>
                <div v-for="(pet, pet_index) in item.data" :key="pet_index" class="pet_result"> {{pet.name}}( {{pet.breed}} )</div>
            </div>
        </div>
        <edit-family-data v-if="petSearchFamilyID !== ''" v-show="petSearchFamilyID !== ''" :petSearchFamilyID="petSearchFamilyID" @clearFamilyID="backToPetSearch">
            <div slot="backToPetSearch" class="previous_page" @click="backToPetSearch">
                <a-icon type="swap-left" />
            </div>
        </edit-family-data>
    </div>
</template>

<script>
import editFamilyData from '../views/EditFamilyData'
import { db } from "../firebase";
const fStore = db.firestore();

export default {
    name: 'FamilyCard',
    props: ['petSearchData'],
    components: {
        editFamilyData,
    },
    data(){
        return{
            petSearchFamilyID: ''
        }
    },
    methods: {
        editFamilyData(id){
            this.petSearchFamilyID = id;
            this.$store.commit('searchData/saveCurrentFamilyID', id)
        },
        backToPetSearch(){
            this.petSearchFamilyID = ''
        },
        getDataFromFamilyCard(id){
            this.getPhonesData(id).then(res => {
                let data = {
                    family_id: id,
                    phone: res[0].phone
                }
                this.$emit('getDataFromFamilyCard', data)
            })
            // this.$emit('getDataFromFamilyCard', phones[0])
        },
        getPhonesData(id){
            return new Promise(resolve => {           
                let phones = [];
                fStore
                    .collection("member")
                    .where("family_id", "==", id)
                    .get()
                    .then(data => {
                        data.forEach(doc => {
                            phones.push(doc.data().phone)
                            console.log(phones)
                        });
                    })
                    .then(() => {
                        resolve(phones)
                    })
            })
            
        },
    }
}
</script>

<style lang="sass" scoped>
@import '../styles/basics/_common_var.scss'

.family_card_block
    width: 85vw
    margin: auto
    color: $text-color-blue
    font-weight: 600

.each_family_card 
    background-color: $card-color
    margin-top: 20px
    padding: 8px 12px
    border-radius: 10px
    box-shadow: 1px 3px 5px rgba(0,0,0,.1)

.search_pet
    display: flex
    justify-content: space-between
    padding: 4px 8px
    align-items: center

.name_title_text
    text-align: left
    color: $main-color

.other_pet
    display: flex
    padding: 4px 8px
    flex-wrap: wrap

.pet_result
    margin-left: 5px

.get_more_info
    font-size: 25px

.previous_page 
    text-align: left
    color: $danger-color
    font-size: 35px
    margin-top: 10px
</style>