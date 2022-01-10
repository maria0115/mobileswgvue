<template>
  <div
    class="wrap m_wrap"
    :class="[
      { dark: this.color },
      { style2: this.GetConfig.display == 'menu' },
    ]"
    des="main2"
  >
    <div class="modal_wrap">
      <div class="se_header">
        <div class="main_header">
          <span class="ham" @click="clickHam"></span>
          >
          <h1 class="logo">
            <a @click="GoHome">
              <img :src="Logo()" alt="로고" />
            </a>
          </h1>
          <!-- <div class="allim_btn">
            <span class="allim_icon"></span>
            <span class="allim_num">2</span>
          </div> -->
        </div>
        <SearchHeader v-if="this.Option().searchbar"></SearchHeader>
      </div>
      <!-- 햄버거 -->
      <div class="main_sub">
        <div class="main_s_t">
          <div class="clfix">
            <span class="basic_img on">
              <img
                v-if="GetMyInfo.photo !== undefined"
                :src="GetMyInfo.photo"
                alt=""
                @error="$event.target.src = '/mobile/img/img03.png'"
              />
              <em class="no_img"
                ><b>{{ GetMyInfo.info.name.split("")[0] }}</b></em
              >
            </span>
            <dl>
              <dt>
                <span>{{ GetMyInfo.info.name }}</span>
                {{ GetMyInfo.info.position }}
              </dt>
              <dd>
                {{ GetMyInfo.info.dept }}
              </dd>
            </dl>
          </div>
          <router-link :to="{ name: 'setting' }"
            ><span class="main_sub_set"><a></a></span
          ></router-link>
          <span class="main_sub_close" @click="editmodeReset"></span>
          <!-- <h2 class="sub_logo">
          <a href="../mobile/mob_main.html"></a>
        </h2>
        <router-link to="/setting"
          ><span class="main_sub_set"><a></a></span
        ></router-link> -->
        </div>
        <!-- <div v-if="this.GetConfig.display == 'portal'" class="menu00">
        <strong>전체메뉴</strong>
        <ul class="allmenu_list clfix">
          <li v-for="(value, name) in mainmenu" :key="name">
            <router-link :to="`/${value.key}_more`">
              <span>
                <img
                  :src="`../mobile/img/menu_icon${value.key}.png`"
                  :alt="`${value.name}`"
                />
              </span>
              <em>{{ GetMainLanguage.header[value.key] }}</em>
            </router-link>
          </li>
        </ul>
      </div> -->
        <div class="menu01" des="main2">
          <!-- <strong desc="메뉴관리">{{
          GetMainLanguage.hamburger.menu.menuset
        }}</strong> -->
          <div class="mymenu" v-if="!edit">
            <span class="btn_edit" @click="editmodeChange">{{
              GetMainLanguage.hamburger.button.edit
            }}</span>
            <ul class="clfix">
              <div v-for="(value, name) in this.menuposition" :key="name">
                <li @click="MenuGo(!edit, value)" v-if="value.service">
                  <a>
                    <span>
                      <img
                        :src="`/mobile/img/menu_icon${value.category}.png`"
                        :alt="`${value.title}`"
                      />
                    </span>
                    <em>{{ value.title }}</em>
                  </a>
                </li>
              </div>
            </ul>
          </div>
          <div class="editmenu" v-else>
            <div class="edit">
              <span @click="resetItem">{{
                GetMainLanguage.hamburger.button.reset
              }}</span>
              <span class="btn_save" @click="complete">{{
                GetMainLanguage.hamburger.button.success
              }}</span>
            </div>
            <ul class="clfix">
              <li v-for="(value, name) in menuposition" :key="name">
                <span>
                  <img
                    :src="`/mobile/img/menu_icon${value.category}.png`"
                    :alt="`${value.title}`"
                  />
                  <b
                    @click="deleteItem(value, name)"
                    :class="{ on: value.service }"
                  ></b>
                </span>
                <em>{{ value.title }}</em>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="menu02"
          des="main2"
          v-if="
            this.GetConfig.display == 'portal' ||
            this.GetConfig.display == 'potal'
          "
        >
          <strong desc="포틀릿 서비스">{{
            GetMainLanguage.hamburger.menu.portlet
          }}</strong>
          <ul class="my_list clfix">
            <li v-for="(value, name) in GetConfig.main.portlet" :key="name">
              <span
                :class="{ on: value.service }"
                @click="checkService(value, name)"
              ></span
              >{{ value.title }}
            </li>
          </ul>
        </div>
        <div
          class="menu03"
          des="main2"
          v-if="
            this.GetConfig.display == 'portal' ||
            this.GetConfig.display == 'potal'
          "
        >
          <strong desc="포틀릿 순서변경">{{
            GetMainLanguage.hamburger.menu.portletposition
          }}</strong>
          <ul class="change clfix">
            <draggable
              @change="RealTimeData()"
              class="list-group"
              tag="ul"
              v-model="GetConfig.main.portlet"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <transition-group
                type="transition"
                :name="!drag ? 'flip-list' : null"
              >
                <template v-for="(value, name) in GetConfig.main.portlet">
                  <li v-if="value.service" :key="name">
                    <em>{{ numSort(value, name) + 1 }}.</em>
                    <span>{{ value.title }}</span>
                  </li>
                </template>
              </transition-group>
            </draggable>
          </ul>
        </div>
      </div>
      <!-- 햄버거 -->

      <div class="main_tabmenu">
        <ul class="main_menu clfix">
          <li
            :class="[{ active: Category === 'My' || Category === 'MyIcon' }]"
            class="tab"
          >
            <router-link
              :to="{ name: 'MyIcon' }"
              v-if="this.GetConfig.display == 'menu'"
              >MY</router-link
            >
            <router-link
              :to="{ name: 'My' }"
              v-else-if="
                this.GetConfig.display == 'portal' ||
                this.GetConfig.display == 'potal'
              "
              des="main2"
              >MY</router-link
            >
          </li>
          <span v-for="(value, name) in GetConfig.main.menuportlet" :key="name">
            <li
              :class="[
                {
                  active:
                    Category === `main${value.category}` && value.type == Type,
                },
              ]"
              class="tab"
              v-if="value.service"
            >
              <!-- <router-link :to="`${MenuRouter(value.key)}`">{{
            GetMainLanguage.header[value.key]
          }}</router-link> -->
              <a @click="MainGo(value)">{{ value.title }}</a>
            </li>
          </span>
        </ul>
      </div>
      <!-- <ul class="list-group drag p20">
        <draggable :list="items" class="dragArea"
                    :options="{animation:300, handle:'.handle'}">
            <li class="list-group-item"
                v-for="(item, index) in items"
                :key="item.no">
                <span class="handle" >
                    <i class="glyphicon glyphicon-menu-hamburger"></i>
                </span>
                <label>
                    {{item.name}}-(No.{{item.no}}{{index}})
                </label>
            </li>
        </draggable>
    </ul> -->
      <router-view :key="$route.fullPath"></router-view>
      <!-- <ul class="quick" v-if="this.GetConfig.display == 'menu'">
      <li>
        <a>{{ GetMainLanguage.footer.home }}</a>
      </li>
      <li>
        <a>{{ GetMainLanguage.footer.messinger }}</a>
      </li>
      <li @click="orgClick()">
        <a>{{ GetMainLanguage.footer.org }}</a>
      </li>
      <li @click="logout">
        <a>{{ GetMainLanguage.footer.logout }}</a>
      </li>
    </ul> -->
      <!-- <div
      class="quickmenu2"
      v-else-if="this.GetConfig.display == 'portal'"
      des="main2"
    >
      <strong>바로가기</strong>
      <ul class="quick2 clfix">
        <li>
          <a><span class="q_ic01"></span>홈페이지</a>
        </li>
        <li>
          <a><span class="q_ic02"></span>근태관리</a>
        </li>
        <li>
          <a><span class="q_ic03"></span>메신저</a>
        </li>
        <li @click="orgClick()">
          <a><span class="q_ic04"></span>조직도</a>
        </li>
      </ul>
    </div> -->
      <!-- v-if="
          this.GetConfig.display == 'menu' ||
          this.GetConfig.display == 'menu'
        " -->
      <div class="logout" des="main2">
        <span @click="logout"><a>{{GetCommonL.footer.logout}}</a></span>
      </div>
      <btm-btn
        v-if="
          (Category == 'mainmail' || Category == 'mainapproval') && Option().appWrite
        "
      ></btm-btn>
      <btm-btn v-else-if="Category == 'mainmail'"></btm-btn>
      <div v-else class="top_btn" @click="scrollToTop()"></div>

      <Org :modalon="modalon" @ModalOff="ModalOff"></Org>
    </div>
  </div>
</template>
<script src="//cdnjs.cloudflare.com/ajax/libs/vue/2.5.2/vue.min.js"></script>
<!-- CDNJS :: Sortable (https://cdnjs.com/) -->
<script src="//cdn.jsdelivr.net/npm/sortablejs@1.8.4/Sortable.min.js"></script>
<!-- CDNJS :: Vue.Draggable (https://cdnjs.com/) -->
<script src="//cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.20.0/vuedraggable.umd.min.js"></script>
<script>
import { mapState, mapGetters } from "vuex";
import SearchHeader from "./SearchHeader.vue";
import $ from "jquery";
import draggable from "vuedraggable";
import Org from "./Org.vue";
import BtmBtn from "./BtmBtn.vue";
import { CategoryList } from "../api/index.js";
import config from "@/config/config.json";
export default {
  components: {
    SearchHeader,
    draggable,
    Org,
    BtmBtn,
  },
  data() {
    return {
      drag: false,
      edit: false,
      menuposition: [],
      portletposition: [],
      oncategory: "my",
      modalAutoOrg: 0,
      modalon: false,
      mainmenu: [],
    };
  },
  computed: {
    ...mapState("mainjs", ["main"]),
    ...mapGetters(["GetMainLanguage", "GetCategory"]),
    ...mapGetters("mainjs", ["GetMyInfo"]),
    ...mapGetters("configjs", ["GetConfig", "GetSystemColor"]),
    // 사용자가 설정한 display color
    color() {
      if (this.GetSystemColor === "dark") {
        return true;
      }
    },
    // 포틀릿 순서변경 시 drag animation
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
    editmode() {
      return this.edit;
    },
    // 포틀릿 순서 변경시 순서를 표시해 줄 숫자 정렬
    numSort() {
      return (value, index) => {
        var portlet = this.GetConfig.main.portlet;
        var num = 0;
        for (var i = 0; i < portlet.length; i++) {
          if (portlet[i].service == true) {
            portlet[i].index = num;
            num++;
          }
        }
        return portlet[index].index;
      };
    },
    // 현재 url에 따른 카테고리 값
    Category() {
      return this.$route.name;
    },
    Type() {
      var params = JSON.parse(this.$route.query.data);
      return params["type"];
    },
  },
  created() {
    // font size setting
    if (this.GetConfig.font.size == "small") {
      $("html").addClass("small");
      $("html").removeClass("normal");
      $("html").removeClass("large");
      $("html").removeClass("mar15");
    } else if (this.GetConfig.font.size == "normal") {
      $("html").addClass("normal");
      $("html").removeClass("small");
      $("html").removeClass("large");
      $("html").removeClass("mar15");
    } else if (this.GetConfig.font.size == "large") {
      $("html").addClass("large");
      $("html").removeClass("small");
      $("html").removeClass("normal");
      $("html").addClass("mar15");
    }
    this.menu = this.GetConfig.menuportlet;
    this.InitMenu();

    if (
      this.$route.name == "main" ||
      this.$route.name == "root" ||
      this.$route.name == "My" ||
      this.$route.name == "MyIcon"
    ) {
      if (
        (this.GetConfig.display == "portal" ||
          this.GetConfig.display == "potal") &&
        this.$route.name !== "My"
      ) {
        this.$router.replace({ name: "My" });
      } else if (
        this.GetConfig.display == "menu" &&
        this.$route.name !== "MyIcon"
      ) {
        this.$router.replace({ name: "MyIcon" });
      }
    }
  },
  mounted() {
    // dom이 생성된 후 font setting
    $(".wrap").css("font-family", this.GetConfig.font.font);
    this.params = {};
    if (this.$route.query.data) {
      this.params = JSON.parse(this.$route.query.data);
    }
  },
  methods: {
    Logo(){
      return require(`../mobile/img/main_logo_${this.Config().company}.png`)
    },
    scrollToTop() {
      //
      // if(this.$root.$el.scrollHeight>200){
      //
      //   window.scrollTo(0,0)
      // }
      // var timeOut;
      //
      //   if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
      //
      //       window.scrollBy(0,-50);
      //       timeOut=setTimeout('scrollToTop()',10);
      //   }
      //   else clearTimeout(timeOut);
    },
    MainGo(value) {
      if (value.category == "schedule" || value.category == "reservation") {
        this.$router.push({ name: `${value.category}first` });
      } else {
        this.$router
          .push({
            name: `main${value.category}`,
            query: {
              data: JSON.stringify(value),
            },
          })
          .catch((error) => {
            if (error.name != "NavigationDuplicated") {
              throw error;
            }
          });
      }
    },
    MoreGo(value) {},
    InitMenu() {
      //
      // for (let key in this.GetConfig.main.menuportlet) {
      //   this.mainmenu[key] = this.GetConfig.main.menuportlet[key];
      // }

      // var newmenu = [];

      // var data = this.GetConfig.main.menuportlet;
      // for (var i = 0; i < data.length; i++) {
      //   newmenu.push(data[i]);
      // }

      this.mainmenu = JSON.parse(
        JSON.stringify(this.GetConfig.main)
      ).menuportlet;
      // this.mainmenu = newmenu;
      // this.mainmenu = this.GetConfig.main.menuportlet;
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "login" });
    },
    ModalOff() {
      this.modalon = false;
    },
    orgClick(to) {
      this.modalon = true;
    },
    menuOfCategoryIdx(menu) {
      if (this.categorys) {
        return this.categorys.findIndex(function (item, idx) {
          return item.category == menu;
        });
      }
      return -1;
    },
    ThisCategory(menu) {
      if (this.categorys) {
        return this.categorys[this.menuOfCategoryIdx(menu)];
      }
      return [];
    },
    async MenuGo(isNotEdit, value) {
      if (isNotEdit) {
        this.categorys = this.GetCategory[value.lnbid];
        var name = "";
        value.top = value.lnbid;
        name = `${value.category}first`;
        if (value.category == "board") {
          name = `${value.category}list`;
          if (value.type == "board") {
          this.$router.push({
            name: name,
            query: {
              type: value.type,
              data: JSON.stringify({
                lnbid: this.categorys[0].lnbid,
                type: value.type,
                top:value.top,
                title: this.categorys[0].title,
              }),
            },
          });
          return;
        }
        } else if (value.category === "approval") {
          var approve = this.ThisCategory("approve");
          this.$router.push({
            name: name,
            query: {
              data: JSON.stringify({
                title: approve.title,
                type: approve.category,
                top: value.top,
                lnbid: approve.lnbid,
              }),
            },
          });
          return;
        }
        this.$router.push({
          name: name,
          query: {
            data: JSON.stringify(value),
          },
        });
      }
    },
    MenuRouter(key) {
      if (key === "schedule" || key === "reservation") {
        return `${key}_more`;
      }
      return key;
    },
    // 메뉴 관리 편집 후 완료 버튼 누르지 않아도 data vind 으로 변경이 되어 있어 hamberger button click 시 다시 사용자 설정값 가져옴
    clickHam() {
      // var newmenu = [];

      // var data = this.GetConfig.main.menuportlet;
      // for (var i = 0; i < data.length; i++) {
      //   newmenu.push(data[i]);
      // }
      // this.menuposition = newmenu;

      this.menuposition = JSON.parse(
        JSON.stringify(this.GetConfig.main)
      ).menuportlet;
    },
    // 포틀릿 순서변경
    sort() {
      this.list = this.list.sort((a, b) => a.order - b.order);
    },
    onEnd: function (evt) {},
    checkMove: function (evt, originalEvent) {
      // return evt.draggedContext.element.name !== "リンゴ";
    },

    // insertItem: function () {
    //   var self = this;
    //   var newNo = 1;

    //   if (self.items.concat().length > 0)
    //     newNo =
    //       Math.max.apply(
    //         null,
    //         self.items.concat().map(function (item) {
    //           return item.no;
    //         })
    //       ) + 1;

    //   this.items.push({
    //     no: newNo,
    //     name: "a" + newNo,
    //     categoryNo: "3",
    //   });
    //   self.count = self.count + 1;
    // },
    // 메뉴관리 메뉴 삭제
    deleteItem: function (item, index) {
      for (var i = 0; i < this.menuposition.length; i++) {
        if (
          this.menuposition[i].lnbid == item.lnbid &&
          this.menuposition[i].category == item.category
        ) {
          this.menuposition[i].service = !this.menuposition[i].service;
        }
      }
      // var result = this.isOn(item, index);
      // if (result) {
      //   this.menuposition = this.menuposition.filter(
      //     (element) =>
      //       element.lnbid !== item.lnbid || element.category !== item.category
      //   );
      // } else {
      //   this.menuposition.push(item);
      //   this.menuposition.sort(function (a, b) {
      //     return a.order - b.order;
      //   });
      // }
    },
    // 메뉴관리 초기화
    resetItem() {
      // let menuportlet = [];

      // for (let key in this.mainmenu) {
      //   menuportlet[key] = this.mainmenu[key];
      // }
      // this.menuposition = menuportlet;
      for (var i = 0; i < this.menuposition.length; i++) {
        this.menuposition[i].service = true;
      }
      // this.menuposition = JSON.parse(JSON.stringify(this.mainmenu));
      // return menuportlet;
    },
    // 메뉴관리 변경 완료
    complete() {
      this.$store.dispatch("configjs/setConfig", {
        menu: "main",
        value: this.menuposition,
        setting: "menuportlet",
      });
      this.edit = false;
    },
    // 편집모드
    editmodeChange() {
      this.edit = true;
    },
    // 편집 완료
    editmodeReset() {
      this.edit = false;

      this.menuposition = JSON.parse(JSON.stringify(this.mainmenu));
    },
    // 포틀릿 순서변경 할 때마다 db입력
    RealTimeData() {
      this.$store.dispatch("configjs/setConfig", {
        menu: "main",
        value: this.GetConfig.main.portlet,
        setting: "portlet",
      });
    },
    // 포틀릿 서비스 check
    checkService(value, index) {
      this.GetConfig.main.portlet[index].service =
        !this.GetConfig.main.portlet[index].service;
      this.$store.dispatch("configjs/setConfig", {
        menu: "main",
        value: this.GetConfig.main.portlet,
        setting: "portlet",
      });
    },
    setCategory(value) {
      this.Category = value.category;
    },
    url(sabun) {
      return this.main.photo.replace(/@/g, sabun);
    },
    isOn(value, name) {
      if (
        this.menuposition.findIndex(
          (element) => element.lnbid === value.lnbid
        ) !== -1 &&
        this.menuposition.findIndex(
          (element) => element.category === value.category
        ) !== -1
      ) {
        return true;
      }
      return false;
    },
    GoHome() {
      this.$router.push({ name: "main" });
    },
  },
};
</script>

<style>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>