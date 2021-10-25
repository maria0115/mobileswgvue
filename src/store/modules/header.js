// import actions from './header/actions'
import mutations from './header/mutations';
import { dataStore } from './header/module';
// import config from '../../config/config.json';
import createPersistedState from 'vuex-persistedstate';
const dataState = createPersistedState({
  paths: ['store.header'],
  // paths: ['store']

})
export default {
  modules: {
    store: dataStore,
  },
  plugins: [dataState],
  namespaced: true,
  mutations,
  state: {
  },
  getters: {
    GetHeader: (state) => {
        return state.store.header;
    }
  }
}