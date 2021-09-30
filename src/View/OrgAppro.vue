<template>
  <div class="a_organ_modal" :class="{ on: this.modalon }">
      <div class="a_organ_con">
        <form>
          <div>
            <strong>{{this.title[appDept]}}</strong>
            <div>
            <input
              type="text"
              class="search"
              placeholder="검색어를 입력하세요"
              autocomplete="on"
              v-model="keyword"
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
        <ul class="a_organlist">
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
              @PickItem="PickItem"
              :appDept="appDept"
            ></org-item>
          </span>
        </ul>
        <div class="a_organ_ft" >
            <div v-if="appDept=='sAppList1'">
              <span><em class="sv_radio1 active" @click="Add('AP')"></em>결재</span>
              <span><em class="sv_radio1" @click="Add('AG_S!@AG_M')"></em>합의</span>
            </div>
            <span class="ps_add" @click="AddItem">추가</span>
          </div>
      </form>
      <span class="modal_close" @click="ModalOff"></span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import OrgItem from "./orgitemviewApp.vue";
export default {
  created() {
    var data = {};
    data.menu = "mail";
    this.$store.dispatch("mailjs/InitOrg", data);
  },
  props: {
    modalon: Boolean,
    appDept:String
  },
  components: {
    OrgItem,
  },
  computed: {
    ...mapState(["org"]),
    ...mapGetters("mailjs", ["GetMail"]),
  },
  data: function () {
    return {
      modalAutoOrg: 0,
      createdOrg: false,
      keyword: "",
      title:{sAppList1:"결재선 지정",sAppList2:"주관부서"},
      pickItem:{},
      appadd:"AP"
    };
  },
  beforeDestroy() {
  },
  methods: {
    AddItem(){
      var data = {};
      data.approvalInfo = this.pickItem;
      data.appadd = this.appadd;
      data.appDept = this.appDept;
console.log(data)
      this.$emit("AddItem",data);
      // this.appadd = "AP";
      this.$emit("ModalOff");

    },
    Add(value) {
      this.appadd = value;
    },
    delBtn() {
      this.keyword = "";
    },
    ModalOff() {
      this.$emit("ModalOff");
      this.$store.commit("SearchOrgInit");
      this.createdOrg=false;
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
    PickItem(item) {
      this.pickItem = item;
      

    },
  },
};
</script>

<style>
</style>