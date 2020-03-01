<template>
    <div>
        <div v-if="!showSelectTime">
            <div class="phone_search">
                <input
                type="number"
                pattern="\d*"
                v-model="phone"
                placeholder="請輸入電話"
            />
                <div
                    v-if="this.phone !== ''"
                    @click="clearPhone"
                    class="clear_phone phone_blcok_icon"
                >
                x
                </div>
            </div>
            <div @click="showStartClick" class="time_text_block">
                <a-alert :message="`開始日期 ${startDate && startDate.format('YYYY-MM-DD')}`"/>        
            </div>
            <div @click="showEndClick" class="time_text_block">
                <a-alert :message="`結束日期 ${endDate && endDate.format('YYYY-MM-DD')}`"/>        
            </div>
            <button @click="searchHistoryOrders" class="search_btn">查詢</button>
        </div>
        <div v-else class="calendar_block">
            <div class="calendar_select">
                <div v-if="timeScope === 'start'" class="calendar_header">開始時間</div>
                <div v-else class="calendar_header">結束時間</div>
                <a-calendar @select="onSelect" @panelChange="onPanelChange" />
                <div class="hide_select_time" @click="hideSelectTime">關閉</div>
            </div>
        </div>
        <div v-if="loading" :style="[loadingBlock]">
            <a-icon type="loading"/>
        </div>
        <div class="order_list" v-if="historyOrders.length !== 0 && !showSelectTime && !loading">
            <div
                v-for="item in historyOrders"
                :key="item.time"
                class="each_order_card"
            >
                <a-card size="small" :style="[cardStyle]">
                    <div class="time_text">時間: {{item.time | getDate}}</div>
                    <div v-for="(pet, num) in item.data" :key="num" class="per_dog_status">
                        <div class="name_block">
                            <div>
                                <span class="name">{{ pet.name }}</span>
                                <span class="breed">- {{ pet.breed }}</span>
                            </div>
                            <div class="price">金額: ${{pet.price}}</div>
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
                        </div>
                    </div>
                </a-card>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from "../firebase";

import PetCard from '../components/PetCard'
import moment from 'moment';

const fStore = db.firestore();
const orderRef = fStore.collection("order");
const memberRef = fStore.collection("member");

moment.locale('zh-cn')


export default {
    name: 'HistoryOrder',
    components: {
        PetCard
    },
    filters: {
        getDate(val){
            val = parseInt(val)
            let date = moment(val).format('YYYY-MM-DD');
            return date
        }
    },
    data(){
        return{
            loading: false,
            cardStyle: {
                width: "100%",
                borderRadius: "6px",
                border: "none",
                borderTop: "solid 20px #ec5659"
            },
            priceInput: {
                width: "80px",
                fontSize: "12px"
            },
            loadingBlock: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "70px",
                color: "#ec5659"
            },
            phone: '',
            showSelectTime: false,
            timeScope: '',
            // showStart: false,
            // value: moment('2017-01-25'),
            startDate: '',
            endDate: '',
            historyOrders: [
                // {
                //     family_id: '',
                //     process: '',
                //     time: '',
                //     data: [
                //         {
                //             family_id: this.familyID,
                //             id: '',
                //             name: '11',
                //             breed: '22',
                //             wash: true,
                //             cut: false,
                //             head: false,
                //             feet: false,
                //             mouth: true,
                //             bug: false,
                //             herbWash: false,
                //             messyHair: false,
                //             spa: false,
                //             price: '500',
                //             status: false,
                //             reject: 'normal'
                //         }
                //     ]
                // }
            ]
        }
    },
    methods: {
        onSelect(value) {
            if(this.timeScope === 'start'){
                this.startDate = value
            } else {
                this.endDate = value
            }
        },
        onPanelChange(value) {
            this.value = value;
        },
        showStartClick(){
            // this.showStart = true;
            this.showSelectTime = true;
            this.timeScope = 'start'
        },
        hideSelectTime(){
            this.showSelectTime = false
        },
        showEndClick(){
            this.timeScope = 'end',
            this.showSelectTime = true
        },
        searchHistoryOrders(){
            if(this.phone === ''){
                alert('請輸入電話');
                return
            }

            if(this.startDate === '' || this.endDate === ''){
                alert('請選擇時間');
                return
            }

            let startDate = this.startDate.valueOf();
            let endDate = this.endDate.valueOf();

            if(startDate > endDate){
                alert('結束時間不可大於開始時間');
                return
            }

            this.loading = true;


            let family_id = ''
            memberRef
                .get()
                .then(data => {
                    data.forEach(doc => {
                        if(doc.data().phone.phone === this.phone){
                            family_id = doc.data().family_id
                        }
                    })
                })
                .then(() => {
                    orderRef
                        .where('family_id', '==', family_id)
                        .where('time', '>', startDate)
                        .where('time', '<', endDate)
                        .orderBy("time", "asc")
                        .get()
                        .then(data => {
                            data.forEach(doc => {
                                this.historyOrders.push(doc.data())
                        });
                        this.loading = false
                    });           
                })
        },
        clearPhone() {
            this.phone = "";
        },
    }
}

</script>

<style lang="sass" scoped>
@import '../styles/basics/_common_var.scss'

.hide_select_time
    width: 100vw
    background-color: $main-color
    color: white
    padding: 8px 12px
    font-size: 12px
    position: fixed
    bottom: 0

.time_text_block
    width: 200px
    margin: 20px auto
    box-shadow: -3px 5px 5px rgba(0,0,0,.1)

.ant-alert-info
    border: none
    background-color: white
    font-size: 12px
    color: $text-color-blue
    font-weight: 600

.calendar_select
    display: inline-block
    width: 100vw
    border: 1px solid rgb(217, 217, 217)
    border-radius: 4px
    height: 500px
    overflow: auto
    background-color: white

.calendar_block
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)

.calendar_header
    padding: 8px 12px
    color: $text-color-blue
    border-bottom: solid 1px rgba(0,0,0,.1)
    font-weight: 600
    font-size: 12px

.phone_search
  padding: 8px 12px
  height: 50px
  border-radius: 5px 0 0 5px
  background-color: #fff
  display: flex
  align-items: center
  width: 100%

.clear_phone
  font-weight: 700
  font-family: 'Papyrus'
  margin-right: 12px

.phone_blcok_icon
  font-size: 20px
  color: rgba(0,0,0,.2)

.time_text
    color: $text-color-blue
    font-size: 12px
    font-weight: 600

.price
    font-size: 12px

.per_dog_status
    margin: 0

.name_block
    align-items: center
    .name 
        font-size: 14px
        border: none

.item_price_block
    margin: 0
</style>