<template>
  <div class="all_organ_modal" :class="{ on: this.modalon }">
    <!--위치 수정됨-->
    <div class="organ_con">
      <form @submit.prevent>
        <div>
          <strong>조직도</strong>
          <div>
            <input
              type="text"
              class="search"
              placeholder="검색어를 입력하세요"
              autocomplete="on"
              v-model="keyword"
              @keypress.enter="SetAutoOrg"
              @keyup="OrgSearch($event.target.value)"
            />
            <div class="btns">
              <span class="del_btn" @click="delBtn"><em></em></span>
              <span class="search_icon" @click="SetAutoOrg"
                ><img src="../mobile/img/search_icon.png" alt="검색하기"
              /></span>
            </div>
          </div>
        </div>
        <ul class="organlist">
          <span
            class=""
            v-for="(value, name) in this.GetMail.org.trans"
            :key="name"
          >
            <org-item
              :item="value"
              :modalAutoOrg="modalAutoOrg"
              @OpenFolder="OpenFolder"
              :createdOrg="createdOrg"
              @SetcreatedOrg="SetcreatedOrg"
              @OpenCard="OpenCard"
            ></org-item>
          </span>
        </ul>
      </form>
      <span class="modal_close" @click="ModalOff"></span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import OrgItem from "./orgitemviewFooter.vue";
export default {
  created() {
    var data = {};
    // console.log(this.GetMyInfo,this.GetMail.org.trans)
    this.$store.dispatch("mailjs/InitOrg", data);
  },
  props: {
    modalon: Boolean,
  },
  components: {
    OrgItem,
  },
  computed: {
    ...mapState(["org"]),
    ...mapGetters("mailjs", ["GetMail"]),
    // ...mapGetters("mainjs", ["GetMyInfo"]),
  },
  data: function () {
    return {
      modalAutoOrg: 0,
      createdOrg: false,
      keyword: "",
    };
  },
  beforeDestroy() {
    // this.$store.commit("mailjs/From", "");
    // this.$store.commit("OrgDataInit");
  },
  methods: {
    delBtn() {
      this.keyword = "";
    },
    ModalOff() {
      this.$emit("ModalOff");
      this.$store.commit("SearchOrgInit");
      this.createdOrg=false;
    },
    OpenCard(item){
      this.$emit("CardOpen",item);

    },
    OpenFolder() {},
    OrgSearch(value) {
      if (value.length >= 2) {
        var data = {};
        data.keyword = value;
        data.who = this.org.pointer;
        this.$store.dispatch("OrgAutoSearch", data);
      }
    },
    SetAutoOrg() {
      this.modalAutoOrg += 1;
    },
    SetcreatedOrg() {
      this.createdOrg = true;
    },
  },
};
</script>

<style>
</style>