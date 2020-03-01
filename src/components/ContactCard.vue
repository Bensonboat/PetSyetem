<template>
    <div class="contact_block">
        <div class="contact_title">電話資訊</div>
        <div class="info_block">
            <div v-for="(item, index) in contact" :key="index" class="contact_info">
                <a :href="'tel:'+ item.phone">{{item.name}} -  {{item.phone}}</a>    
            </div>
        </div>
        <div class="btn_block" @click="hideContactBlock">關閉</div>
    </div>
</template>

<script>
    export default {
        name: "contactCard",
        props: ['contact'],
        data(){
            return{

            }
        },
        methods: {
            hideContactBlock(){
                this.$emit('hideContactBlock')
            }
        }
    }
</script>

<style lang='sass' scoped>
@import '../styles/basics/_common_var.scss'

.contact_block
    width: 300px
    background-color: $card-color
    
.contact_title
    color: $text-color-blue
    padding: 8px 12px
    border-bottom: solid 1px rgba(0,0,0,.1)

.btn_block
    bottom: 0
    text-align: center
    width: 100%
    background-color: $main-color
    padding: 8px 12px
    color: white
    font-weight: 600
    border: none

.info_block
    margin-top: 20px

.contact_info
    padding: 0 15px 20px 15px
</style>