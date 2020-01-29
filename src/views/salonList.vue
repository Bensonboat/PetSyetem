<template>
    <div :style="[salonItem]">         
        <div>
            <table border="1" :style="{borderCollapse: 'collapse'}" cellpadding='8'>
                <thead>
                    <th>名稱</th>
                    <th>品種</th>
                    <th>電話</th>
                    <th>項目</th>
                    <th>備註</th>
                    <th>狀態</th>
                    <th>金額</th>
                </thead>
                <tbody v-for="(item, index) in list" :key=index>
                    <tr>
                        <td>{{item.name}}</td>
                        <td>{{item.feed}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
    
<script>
export default {
    data(){
        return{
            pet_list: '',
            list: [{name: '胖子', feed: '臘腸'}],
            salonItem: {
                width: '100%',
                display: "flex",
                top: "25%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                position: 'absolute',
                flexWrap: 'wrap',
                justifyContent: 'center'
            },
        }
    },
    mounted(){
        this.getList()
    },
    methods: {
        getList(){
            this.pet_list = this.$store.state.test.pet_name
        
            this.pet_list.map(item => {
                this.list.push(item)
            })
        }
    }
    
}
</script>