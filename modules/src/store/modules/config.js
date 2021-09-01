import actions from './config/actions'
import mutations from './config/mutations';
import { dataStore } from '../module';
// import config from '../../config/config.json';
import createPersistedState from 'vuex-persistedstate';
const dataState = createPersistedState({
  paths: ['store.config', 'store.systemcolor',],

})
export default {
  modules: {
    store: dataStore,
  },
  plugins: [dataState],
  namespaced: true,
  actions,
  mutations,
  state: {
  },
  getters: {
    GetFont: (state) => {
      return state.store.config.font;
  },
    GetConfig: (state) => {
      return state.store.config;
    },
    GetSystemColor: (state) => {
      return state.store.systemcolor;
    },
  }
}