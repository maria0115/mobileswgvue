import Vue from 'vue';
import VueX from 'vuex';
import actions from './actions.js';
import mutations from './mutations.js';
import config from '../config/key.js';
import { dataStore } from './module';

import createPersistedState from 'vuex-persistedstate';
const dataState = createPersistedState({
    paths: ['store.maildetail','store.mailCustomFolderTitle','store.config','store.systemcolor','store.language','store.myinfo','store.signviewdata','store.greetviewdata','store.mailconfig'],
        
})
Vue.use(VueX)

export const store = new VueX.Store({
    modules: {
        store:dataStore
    },
    plugins: [dataState],
    state: {
        autoList: {}, // 자동완성 검색 결과,
        recent: {}, //최근검색 결과,
        sortdata: {},   //통합검색 데이터
        langa: { locale: "ko" },    //locale default 설정
        form: config.search.form,   // search tab menu 변수 설정
        children: [],
        main: config.main,  //main 변수 설정
        mail: config.mail,        
        mailFollowUpData:{
            use:true,
            unid:"",
            body:"",
            date:"", // "2021-07-22"
            time:"", // "12:30:00"
        },
        mailorg:{
            pointer:"SendTo",
            SendTo:[],
            CopyTo:[],
            BlindCopyTo:[]
        },
        mailorginit:true,
        mailconfig: {
            autosave: {
                config: {
                    use: true,
                    time: 10,
                    day: 60
                },
                dutytime: [
                    1, 2, 3, 5, 10, 15, 20, 30, 40, 60
                ],
                storageperiod: [
                    'N', 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60
                ]


            },
            delay: {
                config: {
                    use: false,
                    time: 10
                },
                dutytime: [
                    5, 10, 15, 20, 25, 30, 45,60
                ],
            }
        },
        signdefaultindex:0,
        data: {     //통합검색의 검색할 때 변수 설정
            from: 0,
            size: config.search.defaultSize, // 게시물 몇 개씩 보여줄건지
            fieldname: "all", //all 아니면
            // "subject",
            // "body",
            // "author",
            // "dept",
            // "attached",
            // "attachtext",
            // "phone",
            // "jobposition",
            // "companytel",
            // "email",
            // "job"
            searchword: "",
            searchwordarr: [], // AND 검색일 경우
            aOrd: "desc", //정확도순
            class: 'allsearch', // category (all은 전체검색) 변수
            //     "dept",
            //  "person",
            // "board",
            // "approval",
            // "mail"
            pagenum: 0, // 보낼 데이터의 page
            dateType: "all", // 날짜 필터 (all은 모든 날짜)
            gte: "default", // 날짜 필터의 값 (now-1d ...) 변수
            // 'now-1h/s
            //   'now-1d/d
            //   'now-7d/d
            //   'now-1M/d
            //   'now-1y/d
            utc: config.timezone,
            created: "", // 현재 시각 보낼때 마다 받아오기
        },
        moreList: false,
        searchInfiniteId:0
    },
    mutations,
    actions,
    getters: {
        GetConfig: (state) => {
            return state.store.config;
        },
        GetFont: (state) => {
            return state.store.config.font;
        },
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
        GetMain: (state) => {
            return state.main.data;
        },
        GetMail: (state) => {
            return state.mail.data;
        },
        GetMyInfo: (state) => {
            return state.store.myinfo;
        },
        GetSystemColor: (state) => {
            return state.store.systemcolor;
        },
        GetSignView:(state) =>{
            return state.store.signviewdata;

        },
        GetGreetView:(state) =>{
            return state.store.greetviewdata;
        },
        GetMailConfig:(state) =>{
            return state.store.mailconfig;
        },
        MailConfig: (state) => {
            return state.mailconfig;
        },
        GetmailCustomFolderTitle:(state) =>{
            return state.store.mailCustomFolderTitle;
        },
        GetMailDetail: (state) => {
            return state.store.maildetail;
        },

    },
    // }
})

