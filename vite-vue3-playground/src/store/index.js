import {createStore} from './gvuex';
const store = createStore({
    state() {
        return {
            count: 100
        }
    },
    mutations: {
        add(state) {
            state.count++;
        }
    }
});

export default store;