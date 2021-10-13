import actions from './calendar/actions'
import mutations from './calendar/mutations'
import { dataStore } from './calendar/modules';
import config from '../../config/cal.json';
import createPersistedState from 'vuex-persistedstate';
const dataState = createPersistedState({
  paths: ['store.schedulelist', 'store.schedule','store.edit'],
  // paths: ['store']

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
    schedule: config.schedule,
    calListOpen:{status:false,date:"",day:""},
  },
  getters: {
    GetSchedule: (state) => {
      return state.schedule.data;
    },
    GetSaveSchedule: (state) => {
      return state.store.schedule;
    },
    GetSaveScheduleList: (state) => {
      return state.store.schedulelist;
    },
    GetEdit: (state) => {
      return state.store.edit;
    },
  }
}