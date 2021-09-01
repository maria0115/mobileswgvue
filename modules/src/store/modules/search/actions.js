import {Search, Auto, Recent, AllDelKeyword, DelKeyword, getForm, 
} from '../../../api/index';
import config from '../../../config/key.js';
export default {
    // 통합검색 최근검색어 선택 삭제
    DelKeyword({ state, commit }, { word, index }) {
        var data = {};
        data.searchword = word;
        console.log(data)
        DelKeyword(data)
            .then(response => {
                console.log(response)

                commit('DelKeyword', { word, index })
            });

    },
    // 통합검색 최근검색어 전체 삭제
    AllDelKeyword({ commit }) {
        AllDelKeyword()
            .then(response => {

                commit('AllDelKeyword');
            });

    },
    // 통합검색 최근검색어 data
    GetRecent({ commit }) {
        Recent()
            .then(response => {
                commit('Recent', { recent: response.data });
            });

    },
    // 자동완성
    autoComplete({ commit, state }, { word, category, timeStamp }) {
        state.timeStamp = timeStamp;
        if (typeof category == "undefined" ||
            typeof category == undefined ||
            category == null ||
            category == "") {
            // empty
        } else {
            state.data.class = category;
        }
        state.tf = true;
        var data = state.data;
        if (word !== undefined) {
            data.searchword = word;
            data.searchwordarr[0] = word;
        }

        var pagenum = config.search.defaultPageNum - 1;
        data.pagenum = pagenum;
        data.term = state.term;

        if (data.class === "allsearch") {
            data.size = config.defaultHomeSize;
            state.data.size = data.size;
        } else {
            data.size = config.search.defaultSize;
            state.data.size = data.size;
        }

        commit('setTime');


        Auto(data)
            .then(response => {
                if (response.data.Success === false) {
                    // empty
                    state.autoList = {};
                } else {
                    commit('autoList', { relation: response.data });

                }
                state.tf = false;
            });
    },
    //검색
    SearchWord({ state, commit, dispatch }, { word, category, what, value, kind, paging }) {
        //created :  word: " ",
        // category: "allsearch",
        if (typeof category == "undefined" ||
            typeof category == undefined ||
            category == undefined ||
            category == null ||
            category == "") {
            // empty
        } else {
            state.data.class = category;
        }
        state.data.from = 0;
        var data = state.data;
        if (word !== undefined) {
            if (word === "") {
                data.searchword = "";
                data.searchwordarr = [];
            } else {
                data.searchword = word;
                data.searchwordarr[0] = word;

            }

        }



        if (data.class === "allsearch") {
            data.size = config.search.defaultHomeSize;
        } else {
            data.size = config.search.defaultSize;
        }

        if (typeof kind !== "undefined" &&
            typeof kind !== undefined &&
            kind !== undefined &&
            kind !== null &&
            kind !== "") {
            // if (kind === "custom") {
            data.dateType = kind;
            // }
            // else{
            //     data.dateType = "default";
            // }
        }

        if ((typeof what !== "undefined" ||
            typeof what !== undefined ||
            what !== undefined ||
            what !== null ||
            what !== "") && (typeof value !== "undefined" ||
                typeof value !== undefined ||
                value !== undefined ||
                value !== null ||
                value !== "")) {

            data[what] = value;

        }

        commit('changeInfiniteId', "searchInfiniteId");

        // if(typeof paging !== "undefined" ||
        // typeof paging !== undefined ||
        // paging !== undefined ||
        // paging !== null ||
        // paging !== ""){
        //      Search(data)
        //     .then(response => {


        //         commit('SearchData', { res: response.data.data, word: word, page: pagenum, what, value,paging:paging });
        //         dispatch("GetRecent");
        //     });
        // }else{
        // config.search.defaultPageNum = 1;

        var pagenum = 0;
        data.pagenum = pagenum;
        // 
        // }
        commit('setTime');
        // 통합검색 custom 필터에서 lt를 아직 설정하지 않으면 node에 데이터 요청하지 않음
        if (kind === "custom" && (data.lt === undefined)) {
            commit('SearchData', { word: word, page: pagenum, what, value });
            dispatch("GetRecent");
            return;
        }

        // 

        return Search(data)
            .then(response => {
                // 

                commit('SearchData', { res: response.data.data, word: word, page: pagenum, what, value });
                dispatch("GetRecent");
            });

    },

}