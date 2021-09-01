
export default {
    // 검색어 초기화
    WordReset(state) {
        state.data.searchword = "";
        state.data.searchwordarr = [];

    },
    // 모든 최근검색어 삭제
    AllDelKeyword(state) {
        state.recent = [];

    },
    // 선택된 최근검색어 삭제
    DelKeyword(state, { word, index }) {
        state.recent.splice(index, 1)

    },
    // 최근검색어 데이터
    Recent(state, { recent }) {
        state.recent = recent;

    },
    // 입력된 검색어
    setWord(state, { word }) {
        if (word !== undefined) {

            if (word === "") {
                state.data.searchword = "";
                state.data.searchwordarr = [];
            } else {
                state.data.searchword = word;
                state.data.searchwordarr[0] = word;

            }
        }

    },
    // 검색 데이터
    SearchData(state, { res, word, page, what, value, paging }) {

        var result = {};

        if (res !== undefined) {

            state.sortdata = res;

        }

        if (word !== undefined && page !== undefined) {

            if (word === "") {
                state.data.searchword = "";
                state.data.searchwordarr = [];
            } else {
                state.data.searchword = word;
                state.data.searchwordarr[0] = word;

            }
            state.data.pagenum = page;
        }

        if ((typeof what !== "undefined" ||
            what !== undefined ||
            what !== null ||
            what !== "") && (typeof value !== "undefined" ||
                value !== undefined ||
                value !== null ||
                value !== "")) {
            state.data[what] = value;
        }

    },
    // 자동완성 검색 결과
    autoList(state, { relation }) {
        var result = [];
        for (var i = 0; i < relation.length; i++) {
            relation[i].key = relation[i].key.trim();
            result.push(relation[i].key.trim());
        }
        state.autoList = Array.from(new Set(result));
    },
    // 스크롤페이징 업데이트
    changeInfiniteId(state, value) {
        state[`${value}InfiniteId`] += 1;

    },
    // local 시간
    setTime(state) {
        // 지금 이 순간
        var moment = require("moment");
        state.data.created = moment().utc().format("YYYYMMDDTHHmmss");
    },
}