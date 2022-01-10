import Vue from 'vue';
import VueX from 'vuex';
import actions from './board/actions.js';
import mutations from './board/mutations.js';
import config from '../../config/board.json';
import { dataStore } from './board/modules';
// import main from './modules/main';
// import search from './modules/search';
// import mail from './modules/mail';
// import configjs from './modules/config';
// import calendar from './modules/calendar';
// import appro from './modules/appro';


import createPersistedState from 'vuex-persistedstate';
const dataState = createPersistedState({
    // paths: ['store.board'],
    paths: ['store.board','store.options']

})
Vue.use(VueX)

export default {
    namespaced: true,
    modules: {
        store: dataStore,
    },
    plugins: [dataState],
    state: {
        board: config.board,
        

    },
    mutations,
    actions,
    getters: {
        GetStoreBoard: (state) => {
            return state.store.board;
        },
        GetBoard: (state) => {
            return state.board.data;
        },
        options: (state) => {
            return state.store.options;
        },

    },
    // }
}

