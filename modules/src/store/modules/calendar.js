import actions from './calendar/actions'
import mutations from './calendar/mutations'
import { dataStore } from '../module';
import config from '../../config/config.json';
import createPersistedState from 'vuex-persistedstate';
const dataState = createPersistedState({
  paths: ['store.schedulelist', 'store.schedule',],

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
    main: config.main,  //main 변수 설정
    scheduleorg: {
      pointer: "SendTo",
      SendTo: [],
      CopyTo: [],
      BlindCopyTo: []
    },
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
    }
  }
}