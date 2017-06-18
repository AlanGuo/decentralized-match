import Vuex from "vuex"
import lang from "./lang"
//import price from "./price"
const cookie = require("cookie")

const createStore = ()=>{
    
    return new Vuex.Store({
        state: {
            errorText: null,
            successText: null,
            axios:null
        },
        mutations: {
            SET_ERROR_TEXT (state, data) {
                state.errorText = data
            },
            SET_SUCCESS_TEXT(state, data){
                state.successText = data
            },
            SET_AXIOS(state, data){
                state.axios = data
            }
        },
        actions:{
            setAxios({commit},axios){
                commit("SET_AXIOS",axios)
            }
        },
        modules: {
            lang
        }
    })
}

export default createStore
