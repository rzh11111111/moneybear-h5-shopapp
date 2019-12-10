import sessionStorage from "../sessionStorage";
let defaultCity = '北京'

try {
    if (localStorage.city) {
        defaultCity = localStorage.city
    }
} catch (e) {e}
const record = {
    state: {
        recordObj: {},
        instance:'',
        count: 1,
        city: defaultCity,
        shop:'',        //添加店铺店铺资料
        storeAccount: '',   //添加店铺店主资料
        contractApproval:'',    //添加店铺合同资料
        error:'',
        time: {},
        storelist:{}
    },

    mutations: {
        SET_RECORD: (state, recordObj) => {

            state.recordObj = recordObj
        },
        SET_TIME: (state, time) => {

            state.time = time
        },
        SET_INSTANCE: (state, instance) => {

            state.instance = instance
        },
        SET_SHOP: (state, shop) => {

            state.shop = shop
        },
        SET_STOREACCOUNT: (state, storeAccount) => {

            state.storeAccount = storeAccount
        },
        SET_CONTRACTAPPROVAL:(state, contractApproval) => {

            state.contractApproval = contractApproval
        },
        SET_ERROR: (state, error) => {

            state.error = error
        },
        SET_STORELIST: (state, storelist) => {

            state.storelist = storelist
        },
        
        increment (state, param) {
            state.count += param
        },
        decrement (state) {
            state.count --
        },
        changeCity (state, city) {
            state.city = city
            try {
                localStorage.city = city
            } catch (e) {e}
        }
    },

    actions: {
        increment: ({commit}, param) => {
            commit('increment', param)
        },
        decrement: ({commit}) => {
            commit('decrement')
        }
    },

}

export default record
