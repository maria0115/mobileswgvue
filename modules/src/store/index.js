import Vue from 'vue';
import VueX from 'vuex';
import actions from './actions.js';
import mutations from './mutations.js';
import config from '../config/key.js';
import { dataStore } from './module';
import mainjs from './modules/main';
import searchjs from './modules/search';
import mailjs from './modules/mail';
import configjs from './modules/config';
import calendar from './modules/calendar';
import appro from './modules/appro';

import createPersistedState from 'vuex-persistedstate';
const dataState = createPersistedState({
    paths: ['store.language',   ],

})
Vue.use(VueX)

export const store = new VueX.Store({
    modules: {
        store: dataStore,
        mainjs,
        searchjs,
        mailjs, 
        configjs,
        calendar,
        appro
    },
    plugins: [dataState],
    state: {
        langa: { locale: "ko" },    //locale default 설정
        
        children: [],
        autosearchorg: {
            mail: {
                SendTo: [],
                CopyTo: [],
                BlindCopyTo: []
            }, 
            schedule: {
                SendTo: [],
                CopyTo: [],
                BlindCopyTo: []
            }
        },        
        
    },
    mutations,
    actions,
    getters: {
        GetLanguageConfig: (state) => {
            return state.store.language.config;
        },
        GetAllim: (state) => {
            return state.store.language.config.allim;
        },
        GetDisplay: (state) => {
            return state.store.language.config.display;
        },
        GetStyle: (state) => {
            return state.store.language.config.style;
        },
        GetMainLanguage: (state) => {
            return state.store.language.main;
        },
        GetSearchLanguage: (state) => {
            return state.store.language.search;
        },
        GetMailLanguage: (state) => {
            return state.store.language.mail;
        },
    },
    // }
})

