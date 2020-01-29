<template>
  <div>
    <div>
      <span>Name:</span>
      <input type="text" placeholder="please enter your name" v-model='pet_name'/>
    </div>
    <div :style="{top: '50px', position: 'relative'}">
      <span :style="{marginRight: '20px', position: 'relative'}">Feed:</span>
      <select :style="{width: '100px'}" v-model="feed">
        <option value="貴賓">貴賓</option>
        <option value="臘腸">臘腸</option>
        <option value="柴犬">柴犬</option>
        <option value="科基">科基</option>
      </select>
    </div>
    <div>
        <button @click="createConfirm">ADD</button>
        <button @click='back'>Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'create_name',
    data(){
        return{
            feed: '',
            pet_name: ''
        }
    },
    methods: {
        back(){
            this.$router.push('/')
        },
        createConfirm(){
            let data = {
                name: this.pet_name,
                feed: this.feed
            }

            console.log(data, 'hhh')
            this.$store.commit('test/addPetName', data)

            this.$router.push('/')
        }
    }
    
}
</script>