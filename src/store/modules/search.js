import actions from './search/actions'
import mutations from './search/mutations';
import config from '../../config/search.json';
import { dataStore } from './search/modules';

import createPersistedState from 'vuex-persistedstate';
const dataState = createPersistedState({
  paths: ['store.data'],

})
export default {
  namespaced: true,
  modules: {
    store: dataStore,
  },
  plugins: [dataState],
  actions,
  mutations,
  state: {
    form: config.search.form,   // search tab menu 변수 설정
    autoList: {}, // 자동완성 검색 결과,
    recent: {}, //최근검색 결과,
    sortdata: {},   //통합검색 데이터
    searchInfiniteId: 0,

  },
  getters: {
    data: (state) => {
      return state.store.data;
    },
  },
}