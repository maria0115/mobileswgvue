
import Router from 'vue-router';
import Vue from 'vue';
import Preferences from '../View/Preferences.vue';
import Search from '../View/Search.vue';
import Main from '../View/Main.vue';
import MailList from '../View/MailList.vue';
import MailConfig from '../View/MailConfig.vue';
import addgreet from '../components/mailconfig/addgreet.vue';
import addsign from '../components/mailconfig/addsign.vue';
import autosave from '../components/mailconfig/autosave.vue';
import delay from '../components/mailconfig/delay.vue';
import greet from '../components/mailconfig/greet.vue';
import modifygreet from '../components/mailconfig/modifygreet.vue';
import modifysign from '../components/mailconfig/modifysign.vue';
import seegreet from '../components/mailconfig/seegreet.vue';
import seesign from '../components/mailconfig/seesign.vue';
import set_config from '../components/mailconfig/set_config.vue';
import sign from '../components/mailconfig/sign.vue';
import my from '../components/main/my.vue';
import myicon from '../components/main/myicon.vue';
import mail from '../components/main/mail.vue';
import approval from '../components/main/approval.vue';
// import schedule from '../components/main/schedule.vue';
import board from '../components/main/board.vue';
import person from '../components/main/person.vue';
import reservation from '../components/main/reservation.vue';
import Allim from '../components/preperence/allim.vue';
import Dark from '../components/preperence/dark.vue';
import Etiq from '../components/preperence/etiq.vue';
import Font from '../components/preperence/font.vue';
import Num from '../components/preperence/num.vue';
import Screen from '../components/preperence/screen.vue';
import Preference from '../components/preperence/Preference.vue';
import AllSearch from '../components/search/allsearch.vue';
import Document from '../components/search/document.vue';
import Person from '../components/search/person.vue';
import InboxDetail from '../components/mail/inbox_detail.vue';
import ReadMail from '../components/mail/readmail.vue';
import WriteMail from '../components/mail/writemail.vue';
import Calendar from '../View/Calendar.vue';
import Cal from '../components/calendar/cal.vue';
import CalDay from '../components/calendar/calDay.vue';
import CalEdit from '../components/calendar/calEdit.vue';
import CalList from '../components/calendar/calList.vue';
import CalRead from '../components/calendar/calRead.vue';
import CalWeek from '../components/calendar/calWeek.vue';
import CalWrite from '../components/calendar/calWrite.vue';
import Approve from '../View/Approve.vue';
import appDocForm from '../components/appro/appDocForm.vue';
import appIngList from '../components/appro/appIngList.vue';
import appIngView from '../components/appro/appIngView.vue';
import appTodoList from '../components/appro/appTodoList.vue';
import appTodoView from '../components/appro/appTodoView.vue';
import appWrite from '../components/appro/appWrite.vue';

import { store } from '../store/index.js';

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(() => {
    return window.location.reload()
  })
}

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Main,
      beforeEnter: (to, from, next) => {
        if (Object.keys(store.state.store.language).length < 4) {

          store.dispatch("GetLanguage", { app: "search" });
          store.dispatch("GetLanguage", { app: "mail" });
          store.dispatch("GetLanguage", { app: "config" });
        }

        store.dispatch("GetLanguage", { app: "main" })
          .then(() => {
            store.dispatch("setMode", {
              category: to.path.substring(to.path.lastIndexOf("/") + 1)
            })

              .then((res) => {
                next();
              })
          })
      },
      // redirect: '/myicon',
      children: [
        {
          path: 'myicon',
          component: myicon,
          name: "MyIcon",
          beforeEnter: (to, from, next) => {
            store.dispatch("GetSchedule", { scheduletype: "recent", category: "my" });
            store.dispatch("GetBoard", { boardtype: "notice", category: "my" });
            store.dispatch("GetBoard", { boardtype: "recent", category: "my" });
            store.dispatch("GetApproval", { approvaltype: "approving", category: "my" });
            store.dispatch("GetMail", { mailtype: "inbox_detail", category: "my" });
            store.dispatch("GetMyInfo")
              .then(() => {
                next();
              })
          },

        },
        {
          path: 'my',
          component: my,
          name: "My",
          beforeEnter: (to, from, next) => {
            store.dispatch("GetSchedule", { scheduletype: "recent", category: "my" });
            store.dispatch("GetBoard", { boardtype: "notice", category: "my" });
            store.dispatch("GetBoard", { boardtype: "recent", category: "my" });
            store.dispatch("GetApproval", { approvaltype: "approving", category: "my" });
            store.dispatch("GetMail", { mailtype: "inbox_detail", category: "my" });
            store.dispatch("GetMyInfo")
              .then(() => {
                next();
              })
          },

        },
        {
          path: 'mail',
          component: mail,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetMail", { mailtype: "inbox_detail", category: "more" });
            store.dispatch("GetMail", { mailtype: "sent_main", category: "more" });
            next();
          },
        }, {
          path: 'approval',
          component: approval,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetApproval", {
              approvaltype: "approve",
              category: "more",
            });
            store.dispatch("GetApproval", {
              approvaltype: "approving",
              category: "more",
            });
            next();
          },
        }, {
          path: 'board',
          component: board
        }, {
          path: 'reservation',
          component: reservation
        }, {
          path: 'person',
          component: person
        }
      ]

    },
    {
      path: '/search',
      component: Search,
      beforeEnter: (to, from, next) => {
        // store.dispatch("GetLanguage", { app: "search" })
        // .then(() => {
        next();
        // })
      },
      children: [
        {
          path: 'allsearch',
          component: AllSearch,
          beforeEnter: (to, from, next) => {

            store.dispatch("SearchWord", {
              category: to.path.substring(to.path.lastIndexOf("/") + 1)
            })
              .then(() => {
                next();
              })
              .catch(() => new Error("failed to fetch boardlist"));
          },
        },
        {
          path: 'approval',
          component: Document,
          beforeEnter: (to, from, next) => {
            store.dispatch("SearchWord", {
              category: to.path.substring(to.path.lastIndexOf("/") + 1)
            })
              .then(() => {
                next();
              })
              .catch(() => new Error("failed to fetch boardlist"));
          },
        },
        {
          path: 'person',
          component: Person,
          beforeEnter: (to, from, next) => {
            store.dispatch("SearchWord", {
              category: to.path.substring(to.path.lastIndexOf("/") + 1)
            })
              .then(() => {
                next();
              })
              .catch(() => new Error("failed to fetch boardlist"));
          },
        },
        {
          path: 'board',
          component: Document,
          beforeEnter: (to, from, next) => {
            store.dispatch("SearchWord", {
              category: to.path.substring(to.path.lastIndexOf("/") + 1)
            })
              .then(() => {
                next();
              })
              .catch(() => new Error("failed to fetch boardlist"));
          },
        },
        {
          path: 'mail',
          component: Document,
          beforeEnter: (to, from, next) => {
            store.dispatch("SearchWord", {
              category: to.path.substring(to.path.lastIndexOf("/") + 1)
            })
              .then(() => {
                next();
              })
              .catch(() => new Error("failed to fetch boardlist"));
          },
        }

      ],
    },

    {
      path: '/setting',
      component: Preferences,
      redirect: '/setting/config',
      beforeEnter: (to, from, next) => {
        // store.dispatch("GetLanguage", { app: "config" })
        // .then(() => {
        next();
        // })
      },
      children: [
        {
          path: 'config',
          component: Preference
        },
        {
          path: 'alarm',
          component: Allim
        }, {
          path: 'dark',
          component: Dark
        }, {
          path: 'etiq',
          component: Etiq
        }, {
          path: 'font',
          component: Font
        }, {
          path: 'num',
          component: Num
        }, {
          path: 'screen',
          component: Screen
        }
      ]
    },
    {
      path: '/maillist',
      component: MailList,
      beforeEnter: (to, from, next) => {


        store.dispatch("GetMailDetail", { mailtype: "folderList" });
        // store.dispatch("GetLanguage", { app: "mail" })
        // .then(() => {
        next();
        // })
      },
      redirect: '/maillist/inbox_detail',
      children: [
        {
          path: 'inbox_detail',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("MailSearch", { mailtype: "inbox_detail" });
            next();
          },
        },
        {
          path: 'mail_inner',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("MailSearch", { mailtype: "mail_inner" });
            next();
          },
        },
        {
          path: 'mail_attach',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("MailSearch", { mailtype: "mail_attach" });
            next();
          },
        },
        {
          path: 'mail_outer',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("MailSearch", { mailtype: "mail_outer" });
            next();
          },
        },
        {
          path: 'sent_detail',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("MailSearch", { mailtype: "sent_detail" });
            next();
          },
        },
        {
          path: 'mail_draft',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("MailSearch", { mailtype: "mail_draft" });
            next();
          },
        },
        {
          path: 'mail_autoSave',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("MailSearch", { mailtype: "mail_autoSave" });
            next();
          },
        },
        {
          path: 'mail_trash',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("MailSearch", { mailtype: "mail_trash" });
            next();
          },
        },
        {
          path: 'mail_unread',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetMailDetail", { mailtype: "mail_unread" });
            next();
          },
        },
        {
          path: 'mail_reservation',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetMailDetail", { mailtype: "mail_reservation" });
            next();
          },
        },
        {
          path: 'mail_my',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("MailSearch", { mailtype: "mail_my" });
            next();
          },
        },
        {
          path: 'mail_importance',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetMailDetail", { mailtype: "mail_importance" });
            next();
          },
        },
        {
          path: 'mail_followup',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("MailSearch", { mailtype: "mail_followup" });
            next();
          },
        },
        {
          path: 'custom/:folderId',
          name: 'Custom',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            // 
            store.dispatch("GetMailDetail", { mailtype: "custom", folderId: to.params.folderId });
            // store.dispatch("GetMailDetail", { mailtype: "custom",folderId:this.customFolder });
            next();
          },
        },
        {
          path: 'read_mail',
          name: 'ReadMail',
          component: ReadMail,
          beforeEnter: (to, from, next) => {
            if (to.params.unid) {
              console.log(to.params.unid);
              store.dispatch("MailDetail", to.params.unid)
                .then(() => {
                  store.commit("MailDetailUnid", to.params.unid);
                  next();
                })
            } else {
              console.log(store.state.store.maildetail.unid)
              store.dispatch("MailDetail", store.state.store.maildetail.unid);
              next();
            }
            // 
          },
        },
        {
          path: 'write_mail',
          component: WriteMail,
          beforeEnter: (to, from, next) => {
            store.commit("MailOrgDataInit")
            // .then((r) =>{
            if (store.state.from == "Reply") {
              store.commit("MailOrgData", store.state.store.maildetail.author);
            } else if (store.state.from == "AllReply") {
              store.dispatch("ToMeInfo")
                .then(() => {
                  store.commit("AllReply");
                })
            }

            // })

            var data = {};
            data.menu = "mail";
            store.dispatch("InitOrg", data);
            store.dispatch("writeForm")
              .then((res) => {
                if (res) {
                  next();

                }
              })
          },
        },
      ],
    },
    {
      path: '/mailconfig',
      component: MailConfig,
      beforeEnter: (to, from, next) => {
        // store.dispatch("GetLanguage", { app: "mail" });
        // store.dispatch("GetMailDetail", { mailtype: "folderList" });
        next();
      },
      redirect: '/mailconfig/set_config',
      children: [
        {
          path: 'set_config',
          component: set_config,
          beforeEnter: (to, from, next) => {
            // store.dispatch("GetMailDetail", { mailtype: "set_config" });
            store.dispatch("GreetList");
            store.dispatch("SignList");
            store.dispatch("GETMailAutoSave");
            store.dispatch("GETMailDelay");


            next();
          },
        },
        {
          path: 'addgreet',
          component: addgreet,
          beforeEnter: (to, from, next) => {
            // store.dispatch("GetMailDetail", { mailtype: "set_config" });
            next();
          },
        },
        {
          path: 'addsign',
          component: addsign,
          beforeEnter: (to, from, next) => {
            // store.dispatch("GetMailDetail", { mailtype: "set_config" });
            next();
          },
        },
        {
          path: 'autosave',
          component: autosave,
          beforeEnter: (to, from, next) => {
            store.dispatch("GETMailAutoSave");
            // store.dispatch("GetMailDetail", { mailtype: "set_config" });
            next();
          },
        },
        {
          path: 'delay',
          component: delay,
          beforeEnter: (to, from, next) => {
            store.dispatch("GETMailDelay");
            // store.dispatch("GetMailDetail", { mailtype: "set_config" });
            next();
          },
        },
        {
          path: 'greet',
          component: greet,
          beforeEnter: (to, from, next) => {
            store.dispatch("GreetList");
            // store.dispatch("GetMailDetail", { mailtype: "set_config" });
            next();
          },
        },
        {
          path: 'modifygreet',
          component: modifygreet,
          beforeEnter: (to, from, next) => {
            store.commit("DisBeforeSave");
            // store.dispatch("GetMailDetail", { mailtype: "set_config" });
            next();
          },
        },
        {
          path: 'modifysign',
          component: modifysign,
          beforeEnter: (to, from, next) => {
            store.commit("DisBeforeSave");
            // store.dispatch("GetMailDetail", { mailtype: "set_config" });
            next();
          },
        },
        {
          path: 'seegreet',
          name: "SeeGreet",
          component: seegreet,
          beforeEnter: (to, from, next) => {

            if (to.params.unid) {

              // store.commit("DisBeforeSave");
              store.dispatch("GreetDetail", { unid: to.params.unid })
                .then(() => {
                  store.commit("MailConfigUnid", { unid: to.params.unid, what: "greetDetailUnid" });
                  next();
                })
            } else if (to.params.before || store.state.store.mailconfig.beforesave) {
              next();

            } else {

              // store.commit("DisBeforeSave");
              store.dispatch("GreetDetail", { unid: store.state.store.mailconfig.view.greetDetailUnid });
              next();
            }
          },
        },
        {
          path: 'seesign',
          name: 'SeeSign',
          component: seesign,
          beforeEnter: (to, from, next) => {
            if (to.params.unid) {

              store.dispatch("SignDetail", { unid: to.params.unid })
                .then(() => {
                  store.commit("MailConfigUnid", { unid: to.params.unid, what: "signDetailUnid" });
                  // store.commit("DisBeforeSave");
                  next();
                })
            } else if (to.params.before || store.state.store.mailconfig.beforesave) {
              next();

            } else {
              store.dispatch("SignDetail", { unid: store.state.store.mailconfig.view.signDetailUnid });
              // store.commit("DisBeforeSave");
              next();
            }
          },
        },
        {
          path: 'sign',
          component: sign,
          beforeEnter: (to, from, next) => {
            store.dispatch("SignList");
            next();
          },
        },

      ],
    },
    {
      path: '/schedule',
      component: Calendar,
      redirect: '/schedule/month',
      beforeEnter: (to, from, next) => {
        // store.dispatch("CalList", { app: "config" })
        // .then(() => {
        next();
        // })
      },
      children: [
        {
          path: 'month',
          component: Cal
        },
        {
          path: 'day',
          component: CalDay
        }, {
          path: 'edit',
          component: CalEdit
        }, {
          path: 'list',
          component: CalList
        }, {
          path: 'read',
          component: CalRead,
          beforeEnter: (to, from, next) => {
            var data = {};
            data.unid = store.state.store.schedule.detail.unid;
            var which = store.state.store.schedule.detail.where;


            store.dispatch("CalDetail",{data,path:"",which})
              .then(() => {
                next();
              })
          },
        }, {
          path: 'week',
          component: CalWeek
        }, {
          path: 'write',
          component: CalWrite,
          beforeEnter: (to, from, next) => {
            var data = {};
          data.menu = "mail";
          store.dispatch("InitOrg", data);
            // store.dispatch("DocApproval", { type: "formList_all" })
            // store.dispatch("DocApproval", { type: "formList_recent" })
            // store.dispatch("DocApproval", { type: "formList_favorite" })
            // .then(() => {
            next();
            // })
          },
        }
      ]
    },
    {
      path: '/app',
      component: Approve,
      redirect: '/app/approve',
      beforeEnter: (to, from, next) => {
        store.dispatch("GetApprovalList", { type: "draft" });
        store.dispatch("GetApprovalList", { type: "approve" });
        store.dispatch("GetApprovalList", { type: "approving" });
        store.dispatch("GetApprovalList", { type: "reject" });
        store.dispatch("GetApprovalList", { type: "success_date" });
        store.dispatch("GetApprovalList", { type: "success_my" });
        store.dispatch("GetApprovalList", { type: "success_dept" });
        
        
        // .then(() => {
        next();
        // })
      },
      children: [
        {
          path: 'draft',
          component: appTodoList,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetApprovalList", { type: "draft" })
            // .then(() => {
            next();
            // })
          },

        },
        {
          path: 'approve',
          component: appTodoList,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetApprovalList", { type: "approve" })
            // .then(() => {
            next();
            // })
          },
        },
        {
          path: 'reject',
          component: appTodoList,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetApprovalList", { type: "reject" })
            // .then(() => {
            next();
            // })
          },
        },
        {
          path: 'success_date',
          component: appTodoList,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetApprovalList", { type: "success_date" })
            // .then(() => {
            next();
            // })
          },
        },
        {
          path: 'success_my',
          component: appTodoList,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetApprovalList", { type: "success_my" })
            // .then(() => {
            next();
            // })
          },
        },
        {
          path: 'success_dept',
          component: appTodoList,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetApprovalList", { type: "success_dept" })
            // .then(() => {
            next();
            // })
          },
        },
        {
          path: 'todoview',
          component: appTodoView
        }, {
          path: 'ing',
          component: appIngList,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetApprovalList", { type: "approving" })
            // .then(() => {
            next();
            // })
          },
        }, {
          path: 'ingview',
          component: appIngView
        }, {
          path: 'docform',
          component: appDocForm,
          beforeEnter: (to, from, next) => {
            store.dispatch("DocApproval", { type: "formList_all" })
            store.dispatch("DocApproval", { type: "formList_recent" })
            store.dispatch("DocApproval", { type: "formList_favorite" })
            // .then(() => {
            next();
            // })
          },
        }, {
          path: 'write',
          component: appWrite,
          
        },
      ]
    },
  ]
})