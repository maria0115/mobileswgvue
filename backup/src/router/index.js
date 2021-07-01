
import Router from 'vue-router';
import Vue from 'vue';
import Preferences from '../View/Preferences.vue';
import Search from '../View/Search.vue';
import Main from '../View/Main.vue';
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

import { store } from '../store/index.js';

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
        store.dispatch("GetLanguage", { app: "main" });
        store.dispatch("setMode", {
          category: to.path.substring(to.path.lastIndexOf("/") + 1)
        })
          .then(() => {
            next();
          })
          .catch(() => new Error("failed to fetch boardlist"));
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
            console.log("여기왔니")
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
        store.dispatch("SearchWord", {
          word: store.state.data.searchword,
          category: store.state.data.class,
        })
          .then(() => {
          })
          .catch(() => new Error("failed to fetch boardlist"));
        store.dispatch("GetLanguage", { app: "search" });
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
  ]
})