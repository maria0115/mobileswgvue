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
import bookjs from './modules/book';


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
        'mailjs.store.folderName',
        'configjs.store.config',
        'configjs.store.systemcolor',
        'store.language',
        'store.category',
        'store.header',
        'mainjs.store.myinfo',
        'searchjs.store.data',
        'bookjs.store.unid',
        'bookjs.store.nowroom',
        'bookjs.store.edit',
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
        approjs,
        bookjs,
    },
    plugins: [dataState],
    state: {
        tf: false, // 로딩화면 온오프
        back: { isBacked: false, page: 0, top: 0 }, // 뒤로가기

        langa: { locale: "ko" },    //locale default 설정

        children: [],
        autosearchorg: {
            SendTo: [],
            CopyTo: [],
            BlindCopyTo: []

        },
        org: {
            pointer: "SendTo",
            SendTo: [],
            CopyTo: [],
            BlindCopyTo: []
        },
        orgdata: [],
        listOfCategory: {},

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
        GetAppL: (state) => {
            return state.store.language.approval;
        },
        GetMConfigL: (state) => {
            return state.store.language.mailconfig;
        },
        GetBoardL: (state) => {
            return state.store.language.board;
        },
        GetBookL: (state) => {
            return state.store.language.reservation;
        },
        GetScheduleL: (state) => {
            return state.store.language.schedule;
        },
        GetCommonL: (state) => {
            return state.store.language.common;
        },
        GetCategory: (state) => {
            return state.store.category;
        },
        GetHeader: (state) => {
            return state.store.header;
        }
    },
    // }
})

