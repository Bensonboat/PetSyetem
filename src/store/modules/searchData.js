import router from '../../router'

const state = {
    family_id: '',
    new_client: false,
    phone: '',
    authStatus: false // 登入權限
}

const actions = {
    validateAuth(){
        let isAuth = sessionStorage.getItem('isAuth')
        if(isAuth === 'false' || isAuth === null){
            alert('請重新登入');
            router.push({path: '/login'})
        }
    }
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
    // setAuthStatus(state, data){
    //     alert(data)
    //     state.authStatus = data
    // }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}