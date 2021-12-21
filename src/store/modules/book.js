import actions from './book/actions'
import mutations from './book/mutations'
import { dataStore } from './book/modules';
import config from '../../config/book.json';
import createPersistedState from 'vuex-persistedstate';
const dataState = createPersistedState({
  paths: ['store.unid', 'store.nowroom', 'store.edit']

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
    companyList: [],
    roomList: [],
    classList: [],
    floorList: [],
    reservationList: [],
    step: ["companyList", "classList", "floorList"],
    detail: {},
    edit: false,
    MyreservationList: [],
  },
  getters: {
    GetMyList: (state) => {
      return state.MyreservationList;
    },
    GetNowRoom: (state) => {
      return state.store.nowroom;
    },
    isEdit: (state) => {
      return state.store.edit;
    },
    SaveUnid: (state) => {
      return state.store.unid;
    },
  }
}