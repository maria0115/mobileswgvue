
import Router from 'vue-router';
import Vue from 'vue';
import Preferences from '../View/Preferences.vue';
import Common from '../View/Common.vue';
import Search from '../View/Search.vue';
import Main from '../View/Main.vue';
import Login from '../View/Login.vue';
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
import Board from '../View/Board.vue';
import BoardList from '../components/board/list.vue';
import BoardRead from '../components/board/read.vue';
import BoardWrite from '../components/board/write.vue';

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
      path: '/',
      redirect: 'mobile_index',

    },
    {
      path: '/mobile_index',
      name: 'root',
      beforeEnter: (to, from, next) => {
        next();
      },
      component: Common,
      redirect: '/mobile_index/main',
      children: [
        {
          path: 'main',
          component: Main,
          name: 'main',
          beforeEnter: (to, from, next) => {
            store.dispatch("CategoryList", "");
            if (Object.keys(store.state.store.language).length < 4) {

              store.dispatch("GetLanguage", { app: "search" });
              store.dispatch("GetLanguage", { app: "mail" });
              store.dispatch("GetLanguage", { app: "config" });
            }

            store.dispatch("GetLanguage", { app: "main" })
              .then(() => {
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
                store.dispatch("mainjs/GetBoard", { boardtype: "recent", category: "my" });
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
                store.dispatch("mainjs/GetSchedule", { scheduletype: "recent", category: "my" });
                store.dispatch("mainjs/GetBoard", { boardtype: "notice", category: "my" });
                store.dispatch("mainjs/GetBoard", { boardtype: "recent", category: "my" });
                store.dispatch("mainjs/GetApproval", { approvaltype: "approving", category: "my" });
                store.dispatch("mainjs/GetMail", { mailtype: "inbox_detail", category: "my" });
                store.dispatch("mainjs/GetMyInfo")
                  .then(() => {
                    next();
                  })
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
                console.log("beforeenter안오냐 근데 여기선 아무짝에도 쓸모 없음 created로 가셔 해야함")
                // store.dispatch("CategoryList",to.params.type)
                // .then((res) => {
                //   console.log(res,"CategoryList");
                // });
                // store.dispatch("mainjs/GetBoard", {
                //   boardtype: "notice",
                //   category: "more",
                // });
                // store.dispatch("mainjs/GetBoard", {
                //   boardtype: "education",
                //   category: "more",
                // });
                // store.dispatch("mainjs/GetBoard", {
                //   boardtype: "congratulate",
                //   category: "more",
                // });
                next();
              },
            }, {
              path: 'reservation',
              name: 'mainbook',
              component: reservation
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
          beforeEnter: (to, from, next) => {
            // store.dispatch("GetLanguage", { app: "search" })
            // .then(() => {
            next();
            // })
          },
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
          beforeEnter: (to, from, next) => {
            // store.dispatch("GetLanguage", { app: "config" })
            // .then(() => {
            next();
            // })
          },
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


            store.dispatch("mailjs/GetMailDetail", { mailtype: "folderList" });
            // store.dispatch("GetLanguage", { app: "mail" })
            // .then(() => {
            next();
            // })
          },
          redirect: 'mail_more/inbox_detail',
          children: [
            {
              path: 'inbox_detail',
              name: 'mailfirst',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "inbox_detail" });
                next();
              },
            },
            {
              path: 'inbox_detail',
              name: 'inbox_detail',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "inbox_detail" });
                next();
              },
            },
            {
              path: 'mail_inner',
              component: InboxDetail,
              name: 'mail_inner',
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "mail_inner" });
                next();
              },
            },
            {
              path: 'mail_attach',
              component: InboxDetail,
              name: 'mail_attach',
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "mail_attach" });
                next();
              },
            },
            {
              path: 'mail_outer',
              component: InboxDetail,
              name: 'mail_outer',
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "mail_outer" });
                next();
              },
            },
            {
              path: 'sent_detail',
              component: InboxDetail,
              name: 'sent_detail',
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "sent_detail" });
                next();
              },
            },
            {
              path: 'mail_draft',
              name: 'mail_draft',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "mail_draft" });
                next();
              },
            },
            {
              path: 'mail_autoSave',
              name: 'mail_autoSave',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "mail_autoSave" });
                next();
              },
            },
            {
              path: 'mail_trash',
              name: 'mail_trash',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "mail_trash" });
                next();
              },
            },
            {
              path: 'mail_unread',
              name: 'mail_unread',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/GetMailDetail", { mailtype: "mail_unread" });
                next();
              },
            },
            {
              path: 'mail_reservation',
              name: 'mail_reservation',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/GetMailDetail", { mailtype: "mail_reservation" });
                next();
              },
            },
            {
              path: 'mail_my',
              name: 'mail_my',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "mail_my" });
                next();
              },
            },
            {
              path: 'mail_importance',
              name: 'mail_importance',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/GetMailDetail", { mailtype: "mail_importance" });
                next();
              },
            },
            {
              path: 'mail_followup',
              name: 'mail_followup',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/MailSearch", { mailtype: "mail_followup" });
                next();
              },
            },
            {
              path: 'custom/:folderId',
              name: 'custom',
              component: InboxDetail,
              beforeEnter: (to, from, next) => {
                store.dispatch("mailjs/GetMailDetail", { mailtype: "custom", folderId: to.params.folderId });
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
                  store.dispatch("mailjs/MailDetail", to.params.unid)
                    .then(() => {
                      store.commit("mailjs/MailDetailUnid", to.params.unid);
                      next();
                    })
                } else {
                  console.log(store.state, "readmail")
                  store.dispatch("mailjs/MailDetail", store.state.mailjs.store.maildetail.unid);
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
                } else if (store.state.mailjs.from == "AllReply") {
                  store.dispatch("mailjs/ToMeInfo")
                    .then(() => {
                      store.commit("mailjs/AllReply");
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
          beforeEnter: (to, from, next) => {
            // store.dispatch("GetLanguage", { app: "mail" });
            // store.dispatch("GetMailDetail", { mailtype: "folderList" });
            next();
          },
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
          beforeEnter: (to, from, next) => {
            // store.dispatch("CalList", { app: "config" })
            // .then(() => {
            next();
            // })
          },
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
                  // console.log(which,"여기드루왔다")
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
              var params = JSON.parse(to.query.data)
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
                store.dispatch("approjs/GetApprovalList", { type: "draft" });
                store.commit("approjs/AppSaveFrom", "")

                // .then(() => {
                next();
                // })
              },

            },
            {
              path: 'approve',
              name: 'approvalfirst',
              component: appTodoList,
              beforeEnter: (to, from, next) => {
                store.dispatch("approjs/GetApprovalList", { type: "approve" });
                store.commit("approjs/AppSaveFrom", "");

                // .then(() => {
                next();
                // })
              },
            },
            {
              path: 'approve',
              name: 'appapprove',
              component: appTodoList,
              beforeEnter: (to, from, next) => {
                store.dispatch("approjs/GetApprovalList", { type: "approve" });
                store.commit("approjs/AppSaveFrom", "");

                // .then(() => {
                next();
                // })
              },
            },
            {
              path: 'reject',
              name: 'appreject',
              component: appTodoList,
              beforeEnter: (to, from, next) => {
                store.dispatch("approjs/GetApprovalList", { type: "reject" });
                store.commit("approjs/AppSaveFrom", "");

                // .then(() => {
                next();
                // })
              },
            },
            {
              path: 'success_date',
              name: 'appsuccess_date',
              component: appTodoList,
              beforeEnter: (to, from, next) => {
                store.dispatch("approjs/GetApprovalList", { type: "success_date" })
                // .then(() => {
                store.commit("approjs/AppSaveFrom", "complete");
                next();
                // })
              },
            },
            {
              path: 'success_my',
              name: 'appsuccess_my',
              component: appTodoList,
              beforeEnter: (to, from, next) => {
                store.dispatch("approjs/GetApprovalList", { type: "success_my" });
                store.commit("approjs/AppSaveFrom", "complete");

                // .then(() => {
                next();
                // })
              },
            },
            {
              path: 'success_dept',
              name: 'appsuccess_dept',
              component: appTodoList,
              beforeEnter: (to, from, next) => {
                store.dispatch("approjs/GetApprovalList", { type: "success_dept" });
                store.commit("approjs/AppSaveFrom", "complete");

                // .then(() => {
                next();
                // })
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
                store.dispatch("approjs/GetApprovalList", { type: "approving" });
                store.commit("approjs/AppSaveFrom", "");

                // .then(() => {
                next();
                // })
              },
            }, {
              name: 'approvingview',
              path: 'ingview',
              component: appIngView,
              beforeEnter: (to, from, next) => {
                console.log("여기오니")
                store.dispatch("approjs/AppDetail")
                  .then(res => {
                    next();

                  })
              }
            }, {
              name: 'appformList_all',
              path: 'docform',
              component: appDocForm,
              beforeEnter: (to, from, next) => {
                // store.dispatch("approjs/DocApproval", { type: "formList_all" })
                // store.dispatch("approjs/DocApproval", { type: "formList_recent" })
                // store.dispatch("approjs/DocApproval", { type: "formList_favorite" })
                // .then(() => {
                next();
                // })
              },
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
              path: 'list',
              name: 'boardlist',
              component: BoardList,
              beforeEnter: (to, from, next) => {
                console.log("여기들어오나")
                // store.dispatch("boardjs/BoardSearch", { boardType: to.params.type,lnbid:to.params.lnbid});
                // console.log("boardlist","hey")

                // var data = {};
                // data.page = 0;
                // // data.size = 10;
                // data.category = 'board';
                // data.size = store.state.configjs.store.config.listcount;
                // data.type = to.params.type;
                // data.lnbid = to.params.lnbid;

                // store.dispatch("ListOfCategory", data)
                //   .then(() => {
                next();
                // })
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
              beforeEnter: (to, from, next) => {
                // store.dispatch("GetApprovalList", { type: "draft" })
                // .then(() => {
                next();
                // })
              },

            },
            {
              path: 'write',
              name: 'boardwrite',
              component: BoardWrite,
              beforeEnter: (to, from, next) => {
                // store.dispatch("GetApprovalList", { type: "draft" })
                // .then(() => {
                next();
                // })
              },

            },
          ]
        },
        {
          path: 'login',
          name: 'login',
          component: Login,
          beforeEnter: (to, from, next) => {
            next();
          },
        },
      ],

    },


  ]
})
import axios from 'axios';
router.beforeEach((to, from, next) => {
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
        console.log(res.data);
        // if (!res.data) {
        if (res.data.UserName === "Anonymous") {
          next({ name: 'login', query: { uuid: "0", locale: "ko" } });

        } else {
          next();
        }

        // }
      })

  }
  // next();
})


export default router