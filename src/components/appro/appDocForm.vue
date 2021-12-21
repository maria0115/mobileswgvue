<template>
  <div>
    <Header desc="결재 양식함" :title="title" @OpenHam="OpenHam"></Header>
    <SubMenu :isOpen="isOpen" @CloseHam="CloseHam"></SubMenu>
    <div class="a_contents04">
      <ul class="a_list">
        <li>
          <h3 :class="{ active: all }" @click="toggle('all')"><a>{{GetAppL.docForm.form}}</a></h3>
          <ul :class="{ active: all }">
            <li v-for="(value, name) in formCode" :key="name">
              <a @click="SetHeader(value, name)">{{ value }}</a>
            </li>
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
  created() {
    const language = this.GetAppL.docForm;
    this.formCode = language.formCode;
    this.checkbox = [language.checkbox];
    this.morePlus = language.morePlus;
    this.title = language.title;
    this.params = JSON.parse(this.$route.query.data);

    // this.params = this.GetHeader.menu;
  },
  computed: {
    ...mapGetters("approjs", ["GetApproval"]),
    ...mapGetters(["GetHeader"]),
  },
  components: {
    Header,
    SubMenu,
    Search,
    BtnPlus,
  },
  data() {
    return {
      isOpen: false,
      often: false,
      recent: false,
      all: true,
      var: false,
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
    SetHeader(value, name) {
      this.params.form = name;
      this.params.formtitle = value;
      this.$router.push({
        name: "appwrite",
        query: { data: JSON.stringify(this.params) },
      });
    },
  },
};
</script>

<style>
</style>