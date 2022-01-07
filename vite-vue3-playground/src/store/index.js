import {createStore} from 'vuex';//'./gvuex';
const store = createStore({
    state() {
        return {
            count: 100
        }
    },
    getters: {
        double(state) {
            return state.count * 2;
        }
    },
    mutations: {
        add(state) {
            state.count++;
        }
    },
    actions: {
        asyncAdd({commit}) {
            setTimeout(() => {
                commit('add');
            }, 1000);
        }
    }
});

export default store;