<template>
  <div class="wrap m_wrap" :class="{ dark: this.color }">
    <div class="se_header">
      <div class="main_header">
        <span class="ham" @click="clickHam"></span>
        <router-link to="/"><h1 class="logo">
          <a></a>
        </h1></router-link>
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
        <h2 class="sub_logo">
          <a href="../mobile/mob_main.html"></a>
        </h2>
        <span class="main_sub_close" @click="editmodeReset"></span>
        <router-link to="/setting"
          ><span class="main_sub_set"><a></a></span
        ></router-link>
      </div>
      <div class="menu01">
        <strong desc="메뉴관리">{{ language.main.hamburger.menu.menuset }}</strong>
        <div class="mymenu" v-if="!edit">
          <span class="btn_edit" @click="editmodeChange">{{
            language.main.hamburger.button.edit
          }}</span>
          <ul class="clfix">
            <li v-for="(value, name) in menuposition" :key="name">
              <a href="">
                <span>
                  <img
                    :src="`../mobile/img/menu_icon${value.key}.png`"
                    :alt="`${value.name}`"
                  />
                </span>
                <em>{{ language.main.header[value.key] }}</em>
              </a>
            </li>
          </ul>
        </div>
        <div class="editmenu" v-else>
          <div class="edit">
            <span @click="resetItem">{{
              language.main.hamburger.button.reset
            }}</span>
            <span class="btn_save" @click="complete">{{
              language.main.hamburger.button.success
            }}</span>
          </div>
          <ul class="clfix">
                <li v-for="(value, name) in menuposition" :key="name">
                  <span>
                    <img
                      :src="`../mobile/img/menu_icon${value.key}.png`"
                      :alt="`${value.name}`"
                    />
                    <b class="close" @click="deleteItem(value, name)"
                      ><img src="../mobile/img/menu_close.png" alt=""
                    /></b>
                  </span>
                  <em>{{ language.main.header[value.key] }}</em>
                </li>
            <li>
              <span class="add_btn">
                <img src="../mobile/img/add_btn.png" alt="추가" />
              </span>
              <em>{{ language.main.hamburger.menu.add }}</em>
            </li>
          </ul>
        </div>
      </div>
      <div class="menu02">
        <strong desc="포틀릿 서비스">{{ language.main.hamburger.menu.portlet }}</strong>
        <ul class="my_list clfix">
          <li v-for="(value, name) in config.main.portlet" :key="name">
            <span
              :class="{ on: value.service }"
              @click="checkService(value, name)"
            ></span
            >{{ language.main.portlet.portletposition[value.key] }}
          </li>
        </ul>
      </div>
      <div class="menu03">
        <strong desc="포틀릿 순서변경">{{ language.main.hamburger.menu.portletposition }}</strong>
        <ul class="change clfix">
          <draggable
            @change="RealTimeData()"
            class="list-group"
            tag="ul"
            v-model="config.main.portlet"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
          >
            <transition-group
              type="transition"
              :name="!drag ? 'flip-list' : null"
            >
              <template v-for="(value, name) in config.main.portlet">
                <li v-if="value.service" :key="value.key">
                  <em>{{ numSort(value, name) + 1 }}.</em>
                  <span>{{
                    language.main.portlet.portletposition[value.key]
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
        <li :class="[{ active: Category === 'my' }]">
          <router-link to="my">MY</router-link>
        </li>
        <li
          :class="[{ active: Category === value.key }]"
          v-for="(value, name) in config.main.menuportlet"
          :key="name"
        >
          <router-link :to="`/${value.key}`">{{
            language.main.header[value.key]
          }}</router-link>
        </li>
      </ul>
    </div>
    <div class="m_contents01">
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
    </div>
    <ul class="quick">
      <li>
        <a href="../mobile/mob_main.html">{{
          language.main.footer.ktop_home
        }}</a>
      </li>
      <li>
        <a href="">{{ language.main.footer.saerom_home }}</a>
      </li>
      <li>
        <a href="">{{ language.main.footer.talk_install }}</a>
      </li>
      <li>
        <a href="">{{ language.main.footer.logout }}</a>
      </li>
    </ul>
    <div class="top_btn"></div>
  </div>
</template>
<script src="//cdnjs.cloudflare.com/ajax/libs/vue/2.5.2/vue.min.js"></script>
<!-- CDNJS :: Sortable (https://cdnjs.com/) -->
<script src="//cdn.jsdelivr.net/npm/sortablejs@1.8.4/Sortable.min.js"></script>
<!-- CDNJS :: Vue.Draggable (https://cdnjs.com/) -->
<script src="//cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.20.0/vuedraggable.umd.min.js"></script>
<script>
import { mapState } from "vuex";
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
    ...mapState(["systemcolor", "config", "language"]),
    // 사용자가 설정한 display color
    color() {
      if (this.systemcolor === "dark") {
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
        var portlet = this.config.main.portlet;
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
      return this.$route.path.split("/")[1];
    },
  },
  created() {
    // font size setting
    if (this.config.font.size == "small") {
      $("html").addClass("small");
      $("html").removeClass("normal");
      $("html").removeClass("large");
      $("html").removeClass("mar15");
    } else if (this.config.font.size == "normal") {
      $("html").addClass("normal");
      $("html").removeClass("small");
      $("html").removeClass("large");
      $("html").removeClass("mar15");
    } else if (this.config.font.size == "large") {
      $("html").addClass("large");
      $("html").removeClass("small");
      $("html").removeClass("normal");
      $("html").addClass("mar15");
      
    }
  },
  mounted() {
    // dom이 생성된 후 font setting
    $(".wrap").css("font-family", this.config.font.font);
  },
  methods: {
    // 메뉴 관리 편집 후 완료 버튼 누르지 않아도 data vind 으로 변경이 되어 있어 hamberger button click 시 다시 사용자 설정값 가져옴
    clickHam() {
      this.menuposition = this.config.main.menuportlet;
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
      this.menuposition.splice(index, 1);
    },
    // 메뉴관리 초기화
    resetItem() {
      let menuportlet = [];
      for(let key in this.mainmenu){
        menuportlet[key] = this.mainmenu[key];
      }
      this.menuposition = menuportlet;

    },
    // 메뉴관리 변경 완료
    complete() {
      this.$store.dispatch("setConfig", {
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
      this.menuposition = this.config.main.menuportlet;
    },
    // 포틀릿 순서변경 할 때마다 db입력
    RealTimeData() {
      this.$store.dispatch("setConfig", {
        menu: "main",
        value: this.config.main.portlet,
        setting: "portlet",
      });
    },
    // 포틀릿 서비스 check
    checkService(value, index) {
      this.config.main.portlet[index].service = !this.config.main.portlet[index]
        .service;
      this.$store.dispatch("setConfig", {
        menu: "main",
        value: this.config.main.portlet,
        setting: "portlet",
      });
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