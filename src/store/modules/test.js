const state = {
    phone: [],
    pet_name: []
}

const actions = {
    test(context, data){
        console.log('message from component:', data)
    }
}

const getters = {

}

const mutations = {
    addPetName(state, data){
        state.pet_name.push(data)
    },
    addPhone(state, data){
        state.phone.push(data)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}