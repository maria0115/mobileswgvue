import actions from './main/actions'
import mutations from './main/mutations'
import { dataStore } from './main/modules';
import config from '../../config/main.json';
import createPersistedState from 'vuex-persistedstate';
const dataState = createPersistedState({
  // paths: ['store.myinfo',],
  paths: ['store.myinfo']

})
export default {
  modules: {
    store: dataStore,
  },
  plugins: [dataState],
  namespaced: true,
  actions,
  mutations,
  getters: {
    GetMyInfo: (state) => {
      return state.store.myinfo;
    },
    GetMain: (state) => {
      return state.main.data;
    },
  },
  state: {
    main: config.main,  //main 변수 설정
    moreList: {
      approve:true,
      approving:true,

    },
  }
}