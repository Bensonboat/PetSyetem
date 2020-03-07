<template>
    <div :style="{overflow: 'hidden'}">
        <div
          v-if="loading"
          :style="[loadingBlock]"
        >
            <a-icon type="loading" />
        </div>
        <transition v-else name="topIn">
            <div class="login_block" v-show="showLoginBlock">
                <div class="account_block">
                    <div class="item_text">帳號</div>
                    <input class="input_block" type="text" placeholder="請輸入帳號" v-model="userData.account" @keyup.enter="loginConfirm">
                </div>
                <div class="password_block">
                    <div class="item_text">密碼</div>
                    <input class="input_block" type="text" placeholder="請輸入密碼" v-model="userData.password" @keyup.enter="loginConfirm">
                </div>
                <div class="login_btn" @click="loginConfirm">Login</div>
            </div>
        </transition>
        <img src="../assets/RHUA-side-smile-xss.png" alt="" class="img">
    </div>
</template>

<script>
import { db } from "../firebase";
const fStore = db.firestore();
const fAuth = db.auth();
import firebase from 'firebase/app'

export default {
    name: 'LoginPage',
    data(){
        return{
            loadingBlock: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "100px",
                color: "#ec5659"
            },
            userData: {
                account: '',
                password: '',
                loading: false
            },
            showLoginBlock: false,
            loading: false
        }
    },
    mounted(){
        let that = this;
        setTimeout(() => {
            that.showLoginBlock = true
        }, 800)
    },
    methods: {
        loginConfirm(){
            if(this.userData.password === '' || this.userData.account === ''){
                alert('請輸入帳號密碼');
                return
            }

            this.loading = true;
            let that = this;
            let isAuth = false;

            fStore
                .collection('user')
                .get()
                .then(data => {
                    data.forEach(doc => {
                        if(doc.data().account === this.userData.account && doc.data().password === this.userData.password){
                            firebase.auth().signInAnonymously().catch(function(error) {
                                // Handle Errors here.
                            });

                            firebase.auth().onAuthStateChanged(function(user) {
                                isAuth = true
                                sessionStorage.setItem('isAuth', true)
                            });
                        }
                    })
                })
                .then(() => {
                    if(isAuth === false){
                        alert('驗證錯誤，請重新輸入');
                        this.loading = false;
                    } else {
                        this.loading = false;
                        this.$router.push({path: '/Home'})
                    }
                })
        }
    }
}
</script>

<style lang="sass" scoped>
@import '../styles/basics/_common_var.scss'

.login_block
    background-color: white
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    border-radius: 10px
    width: 300px
    z-index: 1
    padding: 12px 15px
    box-shadow: -5px 5px 5px rgba(0, 0, 0, .2)

.topIn-enter
    top: -1000px

.topIn-enter-active
    transition: 2s

.topIn-enter-to
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)

.topIn-leave-active
    transition: 1.5s

.topIn-leave-to
    top: -1000px

.img
    width: 100%
    height: 100%
    position: absolute
    right: 0
    opacity: .5
    max-width: 800px
    left: 50%
    transform: translateX(-50%)

.item_text 
    text-align: left
    color: $main-color
    letter-spacing: 1px
    font-weight: 600
    font-size: 14px

.account_block, .password_block 
    width: 85%
    margin: auto
    padding: 12px

.input_block 
    width: 100%
    border: none
    border-bottom: solid 1px rgba(0,0,0,.1)
    margin-top: 10px
    font-size: 16px
    outline: none
    padding: 4px 12px
    letter-spacing: 1px
    color: $text-color-blue
    font-weight: 500

.login_btn
    background-color: $main-color
    color: white
    padding: 8px 12px
    margin-top: 20px
    border-radius: 5px
</style>