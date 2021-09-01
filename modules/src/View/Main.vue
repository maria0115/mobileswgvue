<template>
  <div
    class="wrap m_wrap"
    :class="[
      { dark: this.color },
      { style2: this.GetConfig.display == 'portal' },
    ]"
    des="main2"
  >
    <div class="se_header">
      <div class="main_header">
        <span class="ham" @click="clickHam"></span>
        <router-link to="/"
          ><h1 class="logo">
            <a></a></h1
        ></router-link>
        <div class="allim_btn">
          <span class="allim_icon"></span>
          <span class="allim_num">2</span>
        </div>
      </div>
      <SearchHeader></SearchHeader>
    </div>
    <!-- 햄버거 -->
    <div class="main_sub">
      <div class="main_s_t">
        <div class="clfix">
          <span class="basic_img on">
            <img
              v-if="GetMyInfo.photo !== undefined"
              :src="url(GetMyInfo.photo)"
              alt=""
              @error="$event.target.src = '../../mobile/img/img03.png'"
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
        <router-link to="/setting"
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
      <div class="menu00">
        <strong>전체메뉴</strong>
        <ul class="allmenu_list clfix">
          <li v-for="(value, name) in mainmenu" :key="name">
            <router-link :to="`/${value.key}`">
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
      </div>
      <div class="menu01" des="main2" v-if="this.GetConfig.display == 'menu'">
        <strong desc="메뉴관리">{{
          GetMainLanguage.hamburger.menu.menuset
        }}</strong>
        <div class="mymenu" v-if="!edit">
          <span class="btn_edit" @click="editmodeChange">{{
            GetMainLanguage.hamburger.button.edit
          }}</span>
          <ul class="clfix">
            <li v-for="(value, name) in this.menuposition" :key="name">
              <a>
                <span>
                  <img
                    :src="`../mobile/img/menu_icon${value.key}.png`"
                    :alt="`${value.name}`"
                  />
                </span>
                <em>{{ GetMainLanguage.header[value.key] }}</em>
              </a>
            </li>
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
            <li v-for="(value, name) in mainmenu" :key="name">
              <span>
                <img
                  :src="`../mobile/img/menu_icon${value.key}.png`"
                  :alt="`${value.name}`"
                />
                <b
                  @click="deleteItem(value, name)"
                  :class="{ on: isOn(value, name) }"
                ></b>
              </span>
              <em>{{ GetMainLanguage.header[value.key] }}</em>
            </li>
          </ul>
        </div>
      </div>
      <div class="menu02" des="main2" v-if="this.GetConfig.display == 'menu'">
        <strong desc="포틀릿 서비스">{{
          GetMainLanguage.hamburger.menu.portlet
        }}</strong>
        <ul class="my_list clfix">
          <li v-for="(value, name) in GetConfig.main.portlet" :key="name">
            <span
              :class="{ on: value.service }"
              @click="checkService(value, name)"
            ></span
            >{{ GetMainLanguage.portlet.portletposition[value.key] }}
          </li>
        </ul>
      </div>
      <div class="menu03" des="main2" v-if="this.GetConfig.display == 'menu'">
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
                <li v-if="value.service" :key="value.key">
                  <em>{{ numSort(value, name) + 1 }}.</em>
                  <span>{{
                    GetMainLanguage.portlet.portletposition[value.key]
                  }}</span>
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
        {{
          this.Category
        }}
        <li
          :class="[
            { active: Category === 'my' || Category === 'myicon' },
            { tab: Category === 'my' || Category === 'myicon' },
          ]"
        >
          <router-link to="my" v-if="this.GetConfig.display == 'menu'"
            >MY</router-link
          >
          <router-link
            to="myicon"
            v-else-if="this.GetConfig.display == 'portal'"
            des="main2"
            >MY</router-link
          >
        </li>
        <li
          :class="[
            { active: Category === value.key },
            { tab: Category === value.key },
          ]"
          v-for="(value, name) in GetConfig.main.menuportlet"
          :key="name"
        >
          <router-link :to="`/${value.key}`">{{
            GetMainLanguage.header[value.key]
          }}</router-link>
        </li>
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
    <router-view></router-view>
    <ul class="quick" v-if="this.GetConfig.display == 'menu'">
      <li>
        <a>{{ GetMainLanguage.footer.ktop_home }}</a>
      </li>
      <li>
        <a>{{ GetMainLanguage.footer.saerom_home }}</a>
      </li>
      <li>
        <a>{{ GetMainLanguage.footer.talk_install }}</a>
      </li>
      <li>
        <a>{{ GetMainLanguage.footer.logout }}</a>
      </li>
    </ul>
    <div
      class="quickmenu2"
      v-else-if="this.GetConfig.display == 'portal'"
      des="main2"
    >
      <strong>바로가기</strong>
      <ul class="quick2 clfix">
        <li>
          <a><span class="q_ic01"></span>새롬홈페이지</a>
        </li>
        <li>
          <a href="./mob_main.html"><span class="q_ic02"></span>Ktop홈</a>
        </li>
        <li>
          <a><span class="q_ic03"></span>Talk4설치</a>
        </li>
        <li>
          <a><span class="q_ic04"></span>경조사</a>
        </li>
      </ul>
    </div>
    <div class="logout" v-if="this.GetConfig.display == 'portal'" des="main2">
      <span><a>로그아웃</a></span>
    </div>
    <div class="top_btn"></div>
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

export default {
  components: {
    SearchHeader,
    draggable,
  },
  data() {
    return {
      drag: false,
      edit: false,
      menuposition: [],
      portletposition: [],
      oncategory: "my",
    };
  },
  computed: {
    ...mapState("mainjs",["main"]),
    ...mapGetters([
      "GetMainLanguage",
    ]),
    ...mapGetters("mainjs",[
      "GetMyInfo",
    ]),
    ...mapGetters("configjs",[
      "GetConfig",
      "GetSystemColor",
    ]),
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
      // console.log(this.$route.path.split("/")[1])
      return this.$route.path.split("/")[1];
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
    if (this.GetConfig.display == "portal" && this.$route.path !== "/myicon") {
      this.$router.replace("myicon");
    } else if (this.GetConfig.display == "menu" && this.$route.path !== "/my") {
      this.$router.replace("my");
    }
  },
  mounted() {
    // dom이 생성된 후 font setting
    $(".wrap").css("font-family", this.GetConfig.font.font);
  },
  methods: {
    // 메뉴 관리 편집 후 완료 버튼 누르지 않아도 data vind 으로 변경이 되어 있어 hamberger button click 시 다시 사용자 설정값 가져옴
    clickHam() {
      var newmenu = [];

      var data = this.GetConfig.main.menuportlet;
      for (var i = 0; i < data.length; i++) {
        newmenu.push(data[i]);
      }
      this.menuposition = newmenu;
    },
    // 포틀릿 순서변경
    sort() {
      this.list = this.list.sort((a, b) => a.order - b.order);
    },
    onEnd: function (evt) {},
    checkMove: function (evt, originalEvent) {
      console.log(
        evt.draggedContext.element.name,
        "evt.draggedContext.element.name"
      );
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
      var result = this.isOn(item, index);
      if (result) {
        this.menuposition = this.menuposition.filter(
          (element) => element.key !== item.key
        );
      } else {
        this.menuposition.push(item);
        this.menuposition.sort(function (a, b) {
          return a.order - b.order;
        });
      }
    },
    // 메뉴관리 초기화
    resetItem() {
      let menuportlet = [];
      // console.log("누름",this.mainmenu)
      for (let key in this.mainmenu) {
        menuportlet[key] = this.mainmenu[key];
      }
      this.menuposition = menuportlet;
      return menuportlet;
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
      this.menuposition = this.GetConfig.main.menuportlet;
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
    url(sabun) {
      return this.main.photo.replace(/@/g, sabun);
    },
    isOn(value, name) {
      // console.log(this.menuposition,value,name)
      if (
        this.menuposition.findIndex((element) => element.key === value.key) !==
        -1
      ) {
        return true;
      }
      return false;
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