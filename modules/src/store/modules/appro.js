import actions from './appro/actions'
import mutations from './appro/mutations'
import { dataStore } from '../module';
import config from '../../config/config.json';
import createPersistedState from 'vuex-persistedstate';
const dataState = createPersistedState({
  paths: [],

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
    approval: config.approval,
    
  },
  getters: {
    GetApproval: (state) => {
      return state.approval.data;
    },
  }
}