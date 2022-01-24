
import Router from 'vue-router';
import Vue from 'vue';


import Common from '../View/Common.vue';

import Login from '../View/Login.vue';

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

import Main from '../View/Main.vue';
import my from '../components/main/my.vue';
import myicon from '../components/main/myicon.vue';
import mail from '../components/main/mail.vue';
import approval from '../components/main/approval.vue';
// import schedule from '../components/main/schedule.vue';
import board from '../components/main/board.vue';
import person from '../components/main/person.vue';
import reservation from '../components/main/reservation.vue';

import Preferences from '../View/Preferences.vue';
import Allim from '../components/preperence/allim.vue';
import Dark from '../components/preperence/dark.vue';
import Etiq from '../components/preperence/etiq.vue';
import Font from '../components/preperence/font.vue';
import Num from '../components/preperence/num.vue';
import Screen from '../components/preperence/screen.vue';
import Preference from '../components/preperence/Preference.vue';

import Search from '../View/Search.vue';
import AllSearch from '../components/search/allsearch.vue';
import Document from '../components/search/document.vue';
import Person from '../components/search/person.vue';

import MailList from '../View/MailList.vue';
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

import Board from '../View/Board.vue';
import BoardList from '../components/board/list.vue';
import BoardRead from '../components/board/read.vue';
import BoardWrite from '../components/board/write.vue';

import originalPage from '../View/originalPage.vue';

import Reservation from '../View/Reservation.vue';
import ReservationWrite from '../components/reservation/write.vue';
import ReservationList from '../components/reservation/list.vue';
import ReservationRead from '../components/reservation/read.vue';


import { store } from '../store/index.js';

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(() => {
    return window.location.reload()
  })
}

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/mobile_index/viewer',
      component: () => import('@/components/common/downloadPage.vue'),
    },
    {
      path: '/synapbody',
      component: () => import('@/components/editor/synapb.vue'),
    },
    {
      path: '/',
      name: "home",
      redirect: "/mobile_index",
    },
    {
      path: '/mobile_index',
      name: 'root',
      component: Common,
      children: [
        {
          path: 'main',
          component: Main,
          name: 'main',
          beforeEnter: (to, from, next) => {

            store.dispatch("CategoryList", "");
            store.dispatch("mainjs/GetMyInfo");
            store.dispatch("GetLanguage", { app: "main" })
              .then((res) => {
                store.dispatch("configjs/setMode")
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
                store.dispatch("mainjs/GetSchedule", { scheduletype: "recent", category: "my" });
                store.dispatch("mainjs/GetBoard", { boardtype: "notice", category: "my" });
                // store.dispatch("mainjs/GetBoard", { boardtype: "recent", category: "my" });
                store.dispatch("mainjs/GetApproval", { approvaltype: "approving", category: "my" });
                store.dispatch("mainjs/GetMail", { mailtype: "inbox_detail", category: "my" });
                store.dispatch("mainjs/GetMyInfo")
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
                var moment = require("moment");
                var today = moment().format("YYYY-MM-DD");
                store.dispatch("mainjs/GetSchedule", { scheduletype: "recent", category: "my" });
                store.dispatch("bookjs/MyreservationList", today);
                store.dispatch("mainjs/GetBoard", { boardtype: "notice", category: "my" });
                // store.dispatch("mainjs/GetBoard", { boardtype: "recent", category: "my" });
                store.dispatch("mainjs/GetApproval", { approvaltype: "approving", category: "my" });
                store.dispatch("mainjs/GetMail", { mailtype: "inbox_detail", category: "my" });
                next();

              },

            },
            {
              path: 'mail',
              component: mail,
              name: 'mainmail',
              beforeEnter: (to, from, next) => {
                store.dispatch("mainjs/GetMail", { mailtype: "inbox_detail", category: "more" });
                store.dispatch("mainjs/GetMail", { mailtype: "sent_main", category: "more" });
                next();
              },
            }, {
              path: 'approval',
              name: 'mainapproval',
              component: approval,
              beforeEnter: (to, from, next) => {
                store.dispatch("mainjs/GetApproval", {
                  approvaltype: "approve",
                  category: "more",
                });
                store.dispatch("mainjs/GetApproval", {
                  approvaltype: "approving",
                  category: "more",
                });
                next();
              },
            }, {
              path: 'board',
              component: board,
              name: 'mainboard',
              beforeEnter: (to, from, next) => {
                next();
              },
            }, {
              path: 'log',
              component: () => import('@/components/main/log.vue'),
              name: 'mainloglist',
              beforeEnter: (to, from, next) => {
                next();
              },
            }, {
              path: 'reservation',
              name: 'mainreservation',
              redirect: '../reservation_more'
            }, {
              path: 'person',
              component: person
            },
            {
              path: 'schedule',
              name: 'mainschedule',
              redirect: '../schedule_more'
            }
          ]

        },
        {
          path: 'search',
          component: Search,
          name: 'search',
          children: [
            {
              path: 'allsearch',
              name: 'allsearchsearch',
              component: AllSearch,
              beforeEnter: (to, from, next) => {

                store.dispatch("searchjs/SearchWord", {
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
              name: 'approvalsearch',
              component: Document,
              beforeEnter: (to, from, next) => {
                store.dispatch("searchjs/SearchWord", {
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
              name: 'personsearch',
              beforeEnter: (to, from, next) => {
                store.dispatch("searchjs/SearchWord", {
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
              name: 'boardsearch',
              component: Document,
              beforeEnter: (to, from, next) => {
                store.dispatch("searchjs/SearchWord", {
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
              name: 'mailsearch',
              component: Document,
              beforeEnter: (to, from, next) => {
                store.dispatch("searchjs/SearchWord", {
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
          path: 'setting',
          component: Preferences,
          name: 'setting',
          redirect: 'setting/config',
          children: [
            {
              name: 'setconfig',
              path: 'config',
              component: Preference
            },
            {
              path: 'alarm',
              name: 'setalarm',
              component: Allim
            }, {
              path: 'dark',
              name: 'setdark',
              component: Dark
            }, {
              path: 'etiq',
              name: 'setetiq',
              component: Etiq
            }, {
              path: 'font',
              name: 'setfont',
              component: Font
            }, {
              path: 'num',
              name: 'setnum',
              component: Num
            }, {
              path: 'screen',
              name: 'setscreen',
              component: Screen
            }
          ]
        },
        {
          path: 'mail_more',
          name: 'mail',
          component: MailList,
          beforeEnter: (to, from, next) => {


            store.dispatch("mailjs/GetMailDetail", { mailtype: "folderList" })
              // store.dispatch("GetLanguage", { app: "mail" })
              .then(() => {
                next();
              })
          },
          redirect: 'mail_more/inbox_detail',
          children: [
            {
              path: 'inbox_detail',
              name: 'mailfirst',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "inbox_detail" }).then(() => {
                  next();
                })
              },
            },
            {
              path: 'inbox_detail',
              name: 'inbox_detail',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "inbox_detail" }).then(() => {
                  next();
                })
              },
            },
            {
              path: 'mail_inner',
              component: InboxDetail,
              name: 'mail_inner',
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "mail_inner" }).then(() => {
                  next();
                })
              },
            },
            {
              path: 'mail_attach',
              component: InboxDetail,
              name: 'mail_attach',
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "mail_attach" }).then(() => {
                  next();
                })
              },
            },
            {
              path: 'mail_outer',
              component: InboxDetail,
              name: 'mail_outer',
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "mail_outer" }).then(() => {
                  next();
                })
              },
            },
            {
              path: 'sent_detail',
              component: InboxDetail,
              name: 'sent_detail',
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "sent_detail" }).then(() => {
                  next();
                })
              },
            },
            {
              path: 'mail_draft',
              name: 'mail_draft',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "mail_draft" }).then(() => {
                  next();
                })
              },
            },
            {
              path: 'mail_autoSave',
              name: 'mail_autoSave',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "mail_autoSave" }).then(() => {
                  next();
                })
              },
            },
            {
              path: 'mail_trash',
              name: 'mail_trash',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "mail_trash" }).then(() => {
                  next();
                })
              },
            },
            {
              path: 'mail_unread',
              name: 'mail_unread',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/GetMailDetail", { mailtype: "mail_unread" }).then(() => {
                  next();
                })
              },
            },
            {
              path: 'mail_reservation',
              name: 'mail_reservation',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/GetMailDetail", { mailtype: "mail_reservation" }).then(() => {
                  next();
                })
              },
            },
            {
              path: 'mail_my',
              name: 'mail_my',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "mail_my" }).then(() => {
                  next();
                })
              },
            },
            {
              path: 'mail_importance',
              name: 'mail_importance',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/GetMailDetail", { mailtype: "mail_importance" }).then(() => {
                  next();
                })
              },
            },
            {
              path: 'mail_followup',
              name: 'mail_followup',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "mail_followup" }).then(() => {
                  next();
                })
              },
            },
            {
              path: 'custom/:folderId',
              name: 'custom',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/GetMailDetail", { mailtype: "custom", folderId: to.params.folderId }).then(() => {
                  next();
                })
              },
            },
            {
              path: 'read_mail',
              name: 'ReadMail',
              component: ReadMail,
              beforeEnter: (to, from, next) => {
                console.log(from)
                if (to.params.unid) {
                  store.dispatch("mailjs/MailDetail", { unid: to.params.unid, type: from.name })
                    .then(() => {
                      store.commit("mailjs/MailDetailUnid", { unid: to.params.unid, type: from.name });
                      next();
                    })
                } else {
                  store.dispatch("mailjs/MailDetail", { unid: store.state.mailjs.store.maildetail.unid, type: store.state.mailjs.store.maildetail.type });
                  next();
                }
                // 
              },
            },
            {
              path: 'write_mail',
              component: WriteMail,
              name: 'WriteMail',
              beforeEnter: (to, from, next) => {
                // store.commit("MailOrgDataInit")

                // .then((r) =>{
                if (store.state.mailjs.from == "Reply") {
                  store.commit("OrgData", store.state.mailjs.store.maildetail.author);
                } else if (store.state.mailjs.from == "AllReply"
                  || (to.query.isEdit
                    && store.state.mailjs.store.folderName.indexOf("draft") !== -1)) {
                  store.dispatch("mailjs/ToMeInfo")
                    .then(() => {
                      store.commit("AllReply");
                    })
                }

                // })

                var data = {};
                data.menu = "mail";
                store.dispatch("mailjs/InitOrg", data);
                store.dispatch("mailjs/writeForm")
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
          path: 'mailconfig',
          name: 'mailconfig',
          component: MailConfig,
          redirect: 'mailconfig/set_config',
          children: [
            {
              name: 'mailsetconfig',
              path: 'set_config',
              component: set_config,
              beforeEnter: (to, from, next) => {
                // store.dispatch("GetMailDetail", { mailtype: "set_config" });
                store.dispatch("mailjs/GreetList");
                store.dispatch("mailjs/SignList");
                store.dispatch("mailjs/GETMailAutoSave");
                store.dispatch("mailjs/GETMailDelay");


                next();
              },
            },
            {
              path: 'addgreet',
              name: 'addgreet',
              component: addgreet,
              beforeEnter: (to, from, next) => {
                // store.dispatch("GetMailDetail", { mailtype: "set_config" });
                next();
              },
            },
            {
              path: 'addsign',
              name: 'addsign',
              component: addsign,
              beforeEnter: (to, from, next) => {
                // store.dispatch("GetMailDetail", { mailtype: "set_config" });
                next();
              },
            },
            {
              path: 'autosave',
              component: autosave,
              name: 'autosaveconfig',
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/GETMailAutoSave");
                // store.dispatch("GetMailDetail", { mailtype: "set_config" });
                next();
              },
            },
            {
              path: 'delay',
              component: delay,
              name: 'delay',
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/GETMailDelay");
                // store.dispatch("GetMailDetail", { mailtype: "set_config" });
                next();
              },
            },
            {
              path: 'greet',
              component: greet,
              name: 'greet',
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/GreetList");
                // store.dispatch("GetMailDetail", { mailtype: "set_config" });
                next();
              },
            },
            {
              path: 'modifygreet',
              component: modifygreet,
              name: 'modifygreet',
              beforeEnter: (to, from, next) => {
                store.commit("mailjs/DisBeforeSave");
                // store.dispatch("GetMailDetail", { mailtype: "set_config" });
                next();
              },
            },
            {
              path: 'modifysign',
              name: 'modifysign',
              component: modifysign,
              beforeEnter: (to, from, next) => {
                store.commit("mailjs/DisBeforeSave");
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
                  store.dispatch("mailjs/GreetDetail", { unid: to.params.unid })
                    .then(() => {
                      store.commit("mailjs/MailConfigUnid", { unid: to.params.unid, what: "greetDetailUnid" });
                      next();
                    })
                } else if (to.params.before || store.state.mailjs.store.mailconfig.beforesave) {
                  next();

                } else {

                  // store.commit("DisBeforeSave");
                  store.dispatch("mailjs/GreetDetail", { unid: store.state.mailjs.store.mailconfig.view.greetDetailUnid });
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

                  store.dispatch("mailjs/SignDetail", { unid: to.params.unid })
                    .then(() => {
                      store.commit("mailjs/MailConfigUnid", { unid: to.params.unid, what: "signDetailUnid" });
                      // store.commit("DisBeforeSave");
                      next();
                    })
                } else if (to.params.before || store.state.mailjs.store.mailconfig.beforesave) {
                  next();

                } else {
                  store.dispatch("mailjs/SignDetail", { unid: store.state.mailjs.store.mailconfig.view.signDetailUnid });
                  // store.commit("DisBeforeSave");
                  next();
                }
              },
            },
            {
              path: 'sign',
              component: sign,
              name: 'sign',
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/SignList");
                next();
              },
            },

          ],
        },
        {
          path: 'schedule_more',
          name: 'schedule',
          component: Calendar,
          redirect: 'schedule_more/month',
          children: [
            {
              name: 'schedulefirst',
              path: 'month',
              component: Cal
            },
            {
              name: 'calmonth',
              path: 'month',
              component: Cal
            },
            {
              path: 'day',
              name: 'calday',
              component: CalDay
            }, {
              path: 'edit',
              name: 'caledit',
              component: CalEdit
            }, {
              path: 'list',
              name: 'callist',
              component: CalList
            }, {
              path: 'read',
              name: 'calread',
              component: CalRead,
              beforeEnter: (to, from, next) => {
                var data = {};
                data.unid = store.state.calendarjs.store.schedule.detail.unid;
                var which = store.state.calendarjs.store.schedule.detail.where;


                store.dispatch("calendarjs/CalDetail", { data, path: "", which })
                  .then(() => {
                    next();
                  })
              },
            }, {
              path: 'week',
              name: 'calweek',
              component: CalWeek
            }, {
              path: 'write',
              name: 'calwrite',
              component: CalWrite,
              beforeEnter: (to, from, next) => {
                var data = {};
                data.menu = "mail";
                store.dispatch("mailjs/InitOrg", data);

                if (store.state.calendarjs.store.edit) {
                  var which = store.state.calendarjs.store.schedule.detail.where;
                  var unid = {};
                  unid.unid = store.state.calendarjs.store.schedule.detail.unid;


                  store.dispatch("calendarjs/CalDetail", { data: unid, path: "", which })
                    .then(() => {
                      next();
                    })
                } else {
                  next();
                }
              },
            }
          ]
        },
        {
          path: 'approval_more',
          name: 'approval',
          component: Approve,
          redirect: 'approval_more/approve',
          beforeEnter: (to, from, next) => {
            if (to.query.data) {
              var params = JSON.parse(to.query.data);
              store.dispatch("CategoryList", params.lnbid);

            }
            next();
            // })
          },
          children: [
            {
              path: 'draft',
              name: 'appdraft',
              component: appTodoList,
              beforeEnter: (to, from, next) => {
                store.commit("approjs/AppSaveFrom", "")
                store.dispatch("approjs/GetApprovalList", { type: "draft" })

                  .then(() => {
                    next();
                  })
              },

            },
            {
              path: 'approve',
              name: 'approvalfirst',
              component: appTodoList,
              beforeEnter: (to, from, next) => {
                store.commit("approjs/AppSaveFrom", "");
                store.dispatch("approjs/GetApprovalList", { type: "approve" })

                  .then(() => {
                    next();
                  })
              },
            },
            {
              path: 'approve',
              name: 'appapprove',
              component: appTodoList,
              beforeEnter: (to, from, next) => {
                store.commit("approjs/AppSaveFrom", "");
                store.dispatch("approjs/GetApprovalList", { type: "approve" })

                  .then(() => {
                    next();
                  })
              },
            },
            {
              path: 'reject',
              name: 'appreject',
              component: appTodoList,
              beforeEnter: (to, from, next) => {
                store.commit("approjs/AppSaveFrom", "");
                store.dispatch("approjs/GetApprovalList", { type: "reject" })

                  .then(() => {
                    next();
                  })
              },
            },
            {
              path: 'success_date',
              name: 'appsuccess_date',
              component: appTodoList,
              beforeEnter: (to, from, next) => {
                store.commit("approjs/AppSaveFrom", "complete");
                store.dispatch("approjs/GetApprovalList", { type: "success_date" })
                  .then(() => {
                    next();
                  })
              },
            },
            {
              path: 'success_my',
              name: 'appsuccess_my',
              component: appTodoList,
              beforeEnter: (to, from, next) => {
                store.commit("approjs/AppSaveFrom", "complete");
                store.dispatch("approjs/GetApprovalList", { type: "success_my" })

                  .then(() => {
                    next();
                  })
              },
            },
            {
              path: 'success_dept',
              name: 'appsuccess_dept',
              component: appTodoList,
              beforeEnter: (to, from, next) => {
                store.commit("approjs/AppSaveFrom", "complete");
                store.dispatch("approjs/GetApprovalList", { type: "success_dept" })

                  .then(() => {
                    next();
                  })
              },
            },
            {
              path: 'todoview',
              name: 'approveview',
              component: appTodoView,
              beforeEnter: (to, from, next) => {
                store.dispatch("approjs/AppDetail")
                  .then(res => {
                    next();

                  })
              }
            }, {
              path: 'ing',
              name: 'appapproving',
              component: appIngList,
              beforeEnter: (to, from, next) => {
                store.commit("approjs/AppSaveFrom", "");
                store.dispatch("approjs/GetApprovalList", { type: "approving" })

                  .then(() => {
                    next();
                  })
              },
            }, {
              name: 'approvingview',
              path: 'ingview',
              component: appIngView,
              beforeEnter: (to, from, next) => {
                store.dispatch("approjs/AppDetail")
                  .then(res => {
                    next();

                  })
              }
            }, {
              name: 'appformList_all',
              path: 'docform',
              component: appDocForm,
            }, {
              name: 'appwrite',
              path: 'write',
              component: appWrite,
              beforeEnter: (to, from, next) => {
                var data = {};
                data.menu = "mail";
                store.dispatch("mailjs/InitOrg", data);
                // store.dispatch("DocApproval", { type: "formList_all" })
                // store.dispatch("DocApproval", { type: "formList_recent" })
                // store.dispatch("DocApproval", { type: "formList_favorite" })
                // .then(() => {
                next();
                // })
              },

            },
          ]
        },
        {

          path: 'board_more',
          name: 'board',
          component: Board,
          children: [
            {
              path: 'loglist',
              name: 'loglist',
              component: () => import('@/components/log/list.vue'),
            },
            {
              path: 'loglist',
              component: () => import('@/components/log/list.vue'),
              name: 'loglistfirst',
            },
            {
              path: 'list',
              name: 'boardlist',
              component: BoardList,
              beforeEnter: (to, from, next) => {
                var params = JSON.parse(to.query.data);
                store.dispatch("boardjs/GetBoardSet", { lnbid: params.lnbid, type: params.type })
                  .then(() => {
                    next();

                  })
                // next();
              },
            },
            {
              path: 'education',
              name: 'education',
              component: BoardList,
              beforeEnter: (to, from, next) => {
                store.commit("boardjs/BoardWritePath", "education");

                store.dispatch("boardjs/GetBoardList", { type: "education" });
                // .then(() => {
                next();
                // })
              },

            },
            {
              name: 'cong',
              path: 'congratulate',
              component: BoardList,
              beforeEnter: (to, from, next) => {
                store.commit("boardjs/BoardWritePath", "congratulate");

                store.dispatch("boardjs/GetBoardList", { type: "congratulate" });
                // .then(() => {
                next();
                // })
              },

            },
            {
              path: 'read',
              name: 'boardread',
              component: BoardRead,
            },
            {
              path: 'write',
              name: 'boardwrite',
              component: BoardWrite,
            },
          ]
        },
        {
          path: 'login',
          name: 'login',
          component: Login,
        },
        {
          path: 'originalPage',
          name: 'originalPage',
          component: originalPage,
        },
        {
          path: 'reservation_more',
          name: 'reservation',
          component: Reservation,
          redirect: 'reservation_more/list',
          children: [
            {
              path: 'list',
              name: 'reservationfirst',
              component: ReservationList,
              beforeEnter: (to, from, next) => {
                var data = {};
                data.type = "companyList";
                store.dispatch("bookjs/stepList", data)
                  .then((res) => {
                    data.type = "roomList";
                    data.category = res;
                    store.dispatch("bookjs/roomList", data)
                      .then((rres) => {
                        next();
                      })
                  })
              },
            },
            {
              path: 'list',
              name: 'reservationlist',
              component: ReservationList,
              beforeEnter: (to, from, next) => {
                var data = {};
                data.type = "companyList";
                store.dispatch("bookjs/stepList", data)
                  .then((res) => {
                    data.type = "roomList";
                    data.category = res;
                    store.dispatch("bookjs/roomList", data)
                      .then((rres) => {
                        next();
                      })
                  })
              },
            },
            {
              path: 'write',
              name: 'reservationWrite',
              component: ReservationWrite,
            },
            {
              path: 'read',
              name: 'reservationRead',
              component: ReservationRead,
              beforeEnter: (to, from, next) => {
                store.dispatch("bookjs/BookDetail", { unid: store.state.bookjs.store.unid })
                  .then(res => {
                    if (res) {
                      next();
                    }
                  })
              },

            },
          ]
        },
      ],

    },


  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
import axios from 'axios';
import config from "@/config/config.json";
import option from "@/config/option.json";
import { setRawCookie, removeCookie } from "tiny-cookie";
var firstDot = window.location.hostname.indexOf(".");
var domain = window.location.hostname.substring(
  firstDot == -1 ? 0 : firstDot + 1
);
router.beforeEach((to, from, next) => {
  if(to.query.token){
    setRawCookie("LtpaToken", to.query.token, { domain });
    next();
    return;
  }

  store.commit("OrgDataInit");

  if (option[config.company].sso && config.env == "dev") {
    to.name !== 'login' ? next({ name: 'login' }) : next();
    return;
  }
  // let isLogged = ... 
  // /login URL은 로그인 페이지 
  // to.meta.isLogged && !isLogged ? next({ path: '/login', replace: true }) : next() 

  if (to.name === 'login') {
    next();
    return;
  } else {
    axios({
      method: 'get',
      url: `/api/login?type=Authority`,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        // if (!res.data) {
        if (res.data.UserName === "Anonymous") {
          next({ name: 'login' });

        } else {
          next();
        }

        // }
      })

  }
  // next();
})


export default router