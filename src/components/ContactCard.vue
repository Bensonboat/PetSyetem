<template>
    <div>
        <div v-for="(item, index) in contact" :key="index">
            <a :href="'tel:'+ item.phone" slot="extra">{{item.name}} -  {{item.phone}}</a>    
        </div>
        <div>
            <button @click="hideContactBlock">取消</button>
        </div>
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

<style lang='sass'>

</style>