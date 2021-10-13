<template>
  <div>
    <Header desc="결재 양식함" :title="title" @OpenHam="OpenHam"></Header>
    <SubMenu :isOpen="isOpen" @CloseHam="CloseHam"></SubMenu>
    <div class="a_contents04">
      <ul class="a_list">
        <!-- <li>
          <h3 :class="{active:often}" @click="toggle('often')"><a>자주 사용하는 서식</a></h3>
          <ul :class="{active:often}">
            <li v-for="(value,index) in GetApproval.formList_favorite.data" :key="index"><router-link :to="{name:'appwrite'}">{{value.category}}</router-link></li>
          </ul>
        </li>
        <li>
          <h3 :class="{active:recent}" @click="toggle('recent')"><a>최근에 사용한 서식</a></h3>
          <ul :class="{active:recent}">
            <li v-for="(value,index) in GetApproval.formList_recent.data" :key="index"><router-link :to="{name:'appwrite'}">{{value.category}}</router-link></li>
          </ul>
        </li>
        <li>
          <h3 :class="{active:all}" @click="toggle('all')"><a>서식함</a></h3>
          <ul :class="{active:all}">
            <li  v-for="(value,index) in GetApproval.formList_all.data" :key="index"><router-link :to="{name:'appwrite'}">{{value.category}}</router-link></li>
          </ul>
        </li> -->
        <li>
          <h3 :class="{active:all}" @click="toggle('all')"><a>서식함</a></h3>
          <ul :class="{active:all}">
            <li v-for="(value,name) in formCode" :key="name"><router-link :to="{name:'appwrite',query:{form:name}}">{{value}}</router-link></li>
          </ul>
        </li>
      </ul>
    </div>
    <BtnPlus :menu="morePlus"></BtnPlus>
    <Search></Search>
  </div>
</template>

<script>
import Header from "./header.vue";
import SubMenu from "./menu.vue";
import Search from "./search.vue";
import BtnPlus from "./btnPlus.vue";
import { mapState, mapGetters } from "vuex";
export default {
    computed: {
    ...mapGetters("approjs",["GetApproval"]),
  },
  components: {
    Header,
    SubMenu,
    Search,
    BtnPlus,
  },
  data() {
    return {
      checkbox: [{ doc: "양식명" }],
      morePlus: { view: "결제문서 불러오기" },
      isOpen: false,
      often:false,
      recent:false,
      all:false,
      var:false,
      title:"결재 양식함",
      formCode:{"K-SIS_Form601m":"품의서-기본","K-SIS_Form661m":"신청서-기본"},
    };
  },
  methods: {
    OpenHam() {
      this.isOpen = true;
    },
    CloseHam() {
      this.isOpen = false;
    },
    toggle(value) {
        this[value] = !this[value];
    },
  },
};
</script>

<style>
</style>