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
import calendarjs from './modules/calendar';
import approjs from './modules/appro';
import boardjs from './modules/board';


import createPersistedState from 'vuex-persistedstate';
const dataState = createPersistedState({
    paths: [
        'approjs.store.app',
        'boardjs.store.board',
        'calendarjs.store.schedulelist',
        'calendarjs.store.schedule',
        'calendarjs.store.edit',
        'mailjs.store.maildetail',
        'mailjs.store.mailCustomFolderTitle',
        'mailjs.store.signviewdata',
        'mailjs.store.greetviewdata',
        'mailjs.store.mailconfig',
        'configjs.store.config',
        'configjs.store.systemcolor',
        'store.language',
        'mainjs.store.myinfo',
    ]
})
Vue.use(VueX)

export const store = new VueX.Store({
    modules: {
        store: dataStore,
        boardjs,
        mainjs,
        searchjs,
        mailjs,
        configjs,
        calendarjs,
        approjs
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

