const state = {
    family_id: '',
    new_client: false,
    phone: '',
}

const actions = {
}

const getters = {

}

const mutations = {
    saveCurrentFamilyID(state, data){
        state.family_id = data
    },
    checkClientStatus(state, data){
        state.new_client = data
    },
    setPhone(state, data){
        state.phone = data
    },
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}