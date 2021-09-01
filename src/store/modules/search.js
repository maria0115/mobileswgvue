import actions from './search/actions'
import mutations from './search/mutations';
import config from '../../config/search.json';
// import { dataStore } from '../module';
import createPersistedState from 'vuex-persistedstate';
const dataState = createPersistedState({
  paths: [],

})
export default {
  namespaced: true,
  // modules: {
  //   store: dataStore,
  // },
  // plugins: [dataState],
  actions,
  mutations,
  state: {
    form: config.search.form,   // search tab menu 변수 설정
    autoList: {}, // 자동완성 검색 결과,
    recent: {}, //최근검색 결과,
    sortdata: {},   //통합검색 데이터
    searchInfiniteId: 0,
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
  },
}