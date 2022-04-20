import actions from './appro/actions'
import mutations from './appro/mutations'
import { dataStore } from './appro/module';
import config from '../../config/app.json';
import createPersistedState from 'vuex-persistedstate';
const dataState = createPersistedState({
  paths: ['store.app']

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
    detail:{},
    category:[],
    searchoption:{},
    
  },
  getters: {
    GetApproval: (state) => {
      return state.approval.data;
    },
    GetSaveApproval: (state) => {
      return state.store.app;
    },
  }
}