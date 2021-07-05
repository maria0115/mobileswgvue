
import Router from 'vue-router';
import Vue from 'vue';
import Preferences from '../View/Preferences.vue';
import Search from '../View/Search.vue';
import Main from '../View/Main.vue';
import Mail from '../View/Mail.vue';
import my from '../components/main/my.vue';
import mail from '../components/main/mail.vue';
import approval from '../components/main/approval.vue';
import schedule from '../components/main/schedule.vue';
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


import { store } from '../store/index.js';

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(() => {
        return window.location.reload()
    })
}

// import nheader from '../View/nheader.vue';
Vue.use(Router);

// async function getchildren(form, store) {
//   var child = [];
//   var f = {};
//   for (var i = 0; i < form.length; i++) {
//     var sto = await import(`../store/index.js`);
//     var store = await sto.getstore();
//     // const store = await getstore();
//     // console.log(store);
//     // const copystore = store;
//     var document = form[i].datatype;
//     var component = await import(`../components/search/${document}.vue`);
//     // console.log(component);
//     var name = form[i].name;
//     f = {
//       path: name,
//       component: component.default,
//       beforeEnter: (to, from, next) => {
//         store.dispatch("SearchWord", {
//           category: to.path.substring(to.path.lastIndexOf("/") + 1)
//         })
//           .then(() => {
//             next();
//           })
//           .catch(() => new Error("failed to fetch boardlist"));
//       },
//     };
//     child.push(f);


//   }
//   return child;
// }

// const ch = {
//   async get(store) {
//     // var data = config.form;
//     var config = await import(`../../public/config.json`);
//     var data = config.form;
//     // var data = [
//     //   {
//     //     "datatype": "allsearch",
//     //     "name": "allsearch"
//     //   },
//     //   {
//     //     "datatype": "person",
//     //     "name": "person"
//     //   },
//     //   {
//     //     "datatype": "document",
//     //     "name": "approval"
//     //   },
//     //   {
//     //     "datatype": "document",
//     //     "name": "board"
//     //   },
//     //   {
//     //     "datatype": "document",
//     //     "name": "mail"
//     //   }
//     // ]
//     var result = await getchildren(data, store).then((result) => {
//       return result;
//     })
//     return result;

//   }

// }


// export async function router() {
//   var sto = await import(`../store/index.js`);
//   var store = await sto.getstore();
//   // console.log(store.state,"children");
//   // const child = await ch.get(store);
//   var data = new Router()
//   return data;
// }

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Main,
      beforeEnter: (to, from, next) => {
        // store.dispatch("GetLanguage", { app: "search" })
        store.dispatch("GetLanguage", { app: "main" })
        .then(() => {
            // console.log("GetLanguage끝낫니")
        store.dispatch("setMode", {
          category: to.path.substring(to.path.lastIndexOf("/") + 1)
        })

          .then(() => {
            // console.log("setmode끝낫니")
             next();
          })
          })
        //   .catch(() => new Error("failed to fetch boardlist"));
      },
      redirect: '/my',
      children: [
        {
          path: 'my',
          component: my,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetSchedule",{ scheduletype: "recent", category: "my" });
            store.dispatch("GetBoard", { boardtype: "notice", category: "my" });
            store.dispatch("GetBoard", { boardtype: "recent", category: "my" });
            store.dispatch("GetApproval", { approvaltype: "approving", category: "my" });
            store.dispatch("GetMail", { mailtype: "inbox_main", category: "my" });
            store.dispatch("GetMyInfo");
            next();
          },

        },
        {
          path: 'mail',
          component: mail,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetMail", { mailtype: "inbox_main", category: "more" });
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
          path: 'schedule',
          component: schedule
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
        store.dispatch("GetLanguage", { app: "search" });
        store.dispatch("SearchWord", {
          word: store.state.data.searchword,
          category: store.state.data.class,
        })
          .then(() => {
          })
          .catch(() => new Error("failed to fetch boardlist"));
        next();
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
        store.dispatch("GetLanguage", { app: "config" });
        next();
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
      component: Mail,
      redirect: '/maillist/inbox_detail',
      children: [
        {
          path: 'inbox_detail',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetMailDetail", { mailtype: "inbox_detail" });
            next();
          },
        },
        {
          path: 'mail_inner',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetMailDetail", { mailtype: "mail_inner" });
            next();
          },
        },
        {
          path: 'mail_attach',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetMailDetail", { mailtype: "mail_attach" });
            next();
          },
        },
        {
          path: 'mail_outer',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetMailDetail", { mailtype: "mail_outer" });
            next();
          },
        },
        {
          path: 'sent_detail',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetMailDetail", { mailtype: "sent_detail" });
            next();
          },
        },
        {
          path: 'mail_draft',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetMailDetail", { mailtype: "mail_draft" });
            next();
          },
        },
        {
          path: 'mail_autoSave',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetMailDetail", { mailtype: "mail_autoSave" });
            next();
          },
        },
        {
          path: 'mail_trash',
          component: InboxDetail,
          beforeEnter: (to, from, next) => {
            store.dispatch("GetMailDetail", { mailtype: "mail_trash" });
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
            store.dispatch("GetMailDetail", { mailtype: "mail_my" });
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
      ],
    },
  ]
})