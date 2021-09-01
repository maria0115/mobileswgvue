import actions from './mail/actions'
import mutations from './mail/mutations';
import { dataStore } from './mail/modules';
import config from '../../config/mail.json';
import createPersistedState from 'vuex-persistedstate';
const dataState = createPersistedState({
  paths: [
    'store.signviewdata',
    'store.greetviewdata',
    'store.maildetail',
    'store.mailCustomFolderTitle',
    'store.mailconfig'],
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
    mailorginit: true,
    signdefaultindex: 0,
    from: "",
    mailFollowUpData: {
      use: true,
      unid: "",
      body: "",
      date: "", // "2021-07-22"
      time: "", // "12:30:00"
    },
    mailorg: {
      pointer: "SendTo",
      SendTo: [],
      CopyTo: [],
      BlindCopyTo: []
    },
    TimeOption: {
      mail: {
        hour: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23"
        ],
        min: [
          "00",
          "05",
          "10",
          "15",
          "20",
          "25",
          "30",
          "35",
          "40",
          "45",
          "50",
          "55"
        ]
      },
    },

    mailSearchPath: ["inbox_detail", "mail_inner", "mail_outer", "mail_attach", "sent_detail", "mail_draft", "mail_autoSave", "mail_my", "mail_followup", "mail_trash"],
    autosearchorg: {
      mail: {
        SendTo: [],
        CopyTo: [],
        BlindCopyTo: []
      },
      schedule: {
        SendTo: [],
        CopyTo: [],
        BlindCopyTo: []
      }
    },
    mail: config.mail,
  },
  getters: {
    GetMail: (state) => {
      return state.mail.data;
    },
    GetMailDetail: (state) => {
      return state.store.maildetail;
    },
    GetMailConfig: (state) => {
      return state.store.mailconfig;
    },
    GetSignView: (state) => {
      return state.store.signviewdata;

    },
    GetGreetView: (state) => {
      return state.store.greetviewdata;
    },
    GetmailCustomFolderTitle: (state) => {
      return state.store.mailCustomFolderTitle;
    },
  }
}