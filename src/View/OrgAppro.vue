<template>
  <div class="a_organ_modal" @click="Close" :class="{ on: this.modalon }">
    <div class="a_organ_con">
      <form @submit.prevent>
        <div>
          <div>
            <strong>{{this.lang.title}}</strong>
            <div>
              <input
                type="text"
                class="search"
                :placeholder="GetCommonL.search"
                autocomplete="on"
                v-model="keyword"
                @keypress.enter="SetAutoOrg"
                @keyup="OrgSearch($event.target.value)"
              />
              <div class="btns">
                <span class="del_btn" @click="delBtn"><em></em></span>
                <span class="search_icon" @click="SetAutoOrg"
                  ><img src="../mobile/img/search_icon.svg" alt="검색하기"
                /></span>
              </div>
            </div>
          </div>
          <div
            class="add_search"
            :class="{
              active:
                this.search && this.autosearchorg[this.org.pointer].length > 0,
            }"
          >
            <ul>
              <li
                v-for="(value, index) in this.autosearchorg[this.org.pointer]"
                :key="index"
                @click="SetOrg(value)"
              >
                <span class="per_img">
                  <img :src="`../../mobile/img/img03.png`" />
                  <!-- @error="$event.target.src = '../../mobile/img/img03.png'" -->
                  <!-- <em class="no_img" :style="randomColor()"
                    ><b>{{ value.name.split("")[0] }}</b></em
                  > -->
                </span>
                <dl>
                  <dt>{{ value.name }} / {{ value.department }}</dt>
                  <dd>{{ value.email }}</dd>
                </dl>
                <em></em>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="ch_list"
          :class="{ active: this.listtoggle }"
          v-if="this.items[this.appDept].length > 0"
        >
          <div>
            <div>
            <div
              v-for="(value, index) in this.items[this.appDept]"
              :key="index"
            >
              <select v-if="appDept == 'sAppList1'" v-model="value.appadd" @change="dupRemove">
                <option value="AP">{{lang.approval}}</option>
                <option value="AG_S!@AG_M">{{lang.agreement}}</option></select
              >
              <span
                >{{ value.approvalInfo.name
                }}<em v-if="value.approvalInfo.email"
                  >&lt;{{ value.approvalInfo.email }}&gt;</em
                ></span
              >
              <em class="list_close" @click="OrgDataDel(value, index)"></em>
            </div>
          </div>
          </div>
          <span class="hidden_btn" @click="listToggle"></span>
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
              :appPath="appPath"
              :appDept="appDept"
              @DelPickItem="DelItem"
            ></org-item>
          </span>
        </ul>
        <div class="a_organ_ft">
          <div v-if="appDept == 'sAppList1'">
            <span
              ><em
                class="sv_radio1"
                :class="{ active: appadd == 'AP' }"
                @click="Add('AP')"
              ></em
              >{{lang.approval}}</span
            >
            <span
              ><em
                class="sv_radio1"
                :class="{ active: appadd == 'AG_S!@AG_M' }"
                @click="Add('AG_S!@AG_M')"
              ></em
              >{{lang.agreement}}</span
            >
          </div>
          <span class="ps_add" @click="AddItem">{{lang.add}}</span>
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
    this.lang = this.GetCommonL.org;
    this.title = this.lang.title;

    var data = {};
    data.menu = "mail";
    this.$store.dispatch("mailjs/InitOrg", data);
  },
  props: {
    modalon: Boolean,
    appDept: String,
    appPath: Array,
  },
  components: {
    OrgItem,
  },
  computed: {
    ...mapState(["autosearchorg", "org"]),

    ...mapGetters("mailjs", ["GetMail"]),
  },
  data: function () {
    return {
      modalAutoOrg: 0,
      createdOrg: false,
      keyword: "",
      title: { sAppList1: "결재선 지정", sAppList2: "주관부서" },
      pickItem: {},
      delItem: [],
      items: { sAppList1: [], sAppList2: [] },
      appadd: "AP",
      search: false,
      listtoggle: true,
    };
  },
  watch: {
    appPath: function (newValue) {
      this.items[this.appDept] = [];
      for(var i=0;i<newValue.length;i++){
        this.items[this.appDept][i] = newValue[i];
      }
    },
  },
  beforeDestroy() {},
  methods: {
    test() {
      var answer = "";
      var lnum = [1, 4, 7];
      var rnum = [3, 6, 9];
      var cnum = [2, 5, 8, 0];
      var cc = "L";
      if (hand == "right") {
        cc = "R";
      }

      var lpre = { kind: "l", idx: 3 };
      var rpre = { kind: "r", idx: 3 };
      for (var i = 0; i < numbers.length; i++) {
        if (lnum.includes(numbers[i])) {
          answer += "L";
          lpre.idx = lnum.findIndex((item, idx) => {
            return item == numbers[i];
          });
          lpre.kind = "l";
        } else if (rnum.includes(numbers[i])) {
          answer += "R";
          rpre.idx = rnum.findIndex((item, idx) => {
            return item == numbers[i];
          });
          rpre.kind = "r";
        } else {
          var cidx = cnum.findIndex((item, idx) => {
            return item == numbers[i];
          });
          var lcha = -1;
          var rcha = -1;
          if (cidx > lpre.idx) {
            lcha = cidx - lpre.idx;
          } else {
            lcha = lpre.idx - cidx;
          }
          if (cidx > rpre.idx) {
            rcha = cidx - rpre.idx;
          } else {
            rcha = rpre.idx - cidx;
          }

          if (rpre.kind == "c") {
            rcha--;
          } else if (lpre.kind == "c") {
            lcha--;
          }

          if (lcha > rcha) {
            answer += "R";
            rpre.idx = cidx;
            rpre.kind = "c";
          } else if (lcha < rcha) {
            answer += "L";
            lpre.idx = cidx;
            lpre.kind = "c";
          } else if (lcha == rcha) {
            if (cc == "R") {
              rpre.idx = cidx;
              rpre.kind = "c";
            } else {
              lpre.idx = cidx;
              lpre.kind = "c";
            }
            answer += cc;
          }
        }
      }
    },
    // AddItem() {
    //   if (this.pickItem.length > 0) {
    //     var result = [];
    //     for (var i = 0; i < this.pickItem.length; i++) {
    //       var data = {};
    //       data.approvalInfo = this.pickItem[i];
    //       data.appadd = this.appadd;
    //       data.appDept = this.appDept;
    //       result.push(data);
    //     }
    //     this.$emit("AddItem", result);
    //     // this.appadd = "AP";
    //     this.$emit("ModalOff");
    //     this.pickItem = [];
    //   }
    //   if (this.delItem.length > 0) {
    //     var result = [];
    //     for (var i = 0; i < this.delItem.length; i++) {
    //       var data = {};
    //       data.approvalInfo = this.delItem[i];
    //       data.appadd = this.appadd;
    //       data.appDept = this.appDept;
    //       result.push(data);
    //     }
    //     this.$emit("DelPickItem", result);
    //     // this.appadd = "AP";
    //     this.delItem = [];
    //   }
    //   this.$emit("ModalOff");
    // },
    AddItem() {
      this.$emit("AddItem", this.items[this.appDept]);
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
      this.createdOrg = false;
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
      if (this.autosearchorg[this.org.pointer].length > 0) {
        this.search = true;
      }
      // this.modalAutoOrg += 1;
    },
    SetcreatedOrg() {
      // this.createdOrg = true;
    },
    Close(e) {
      var LayerPopup = $(".add_search");
      var LayerPopup2 = $(".search_icon");
      if (LayerPopup.has(e.target).length === 0) {
        if (LayerPopup2.has(e.target).length === 0) {
          this.search = false;
        }
      }
    },
    SetOrg(value) {
      // this.$store.commit("OrgData", value);
      this.PickItem(value);
      this.search = false;
      // this.ModalOff();
    },
    PickItem(pick) {
      if (Object.keys(pick).length > 0) {
        var data = {};
        data.approvalInfo = pick;
        data.appadd = this.appadd;
        data.appDept = this.appDept;
        // this.$emit("AddItem", result);
        // // this.appadd = "AP";
        // this.$emit("ModalOff");
        this.items[this.appDept].push(data);
        var here = this;
        this.items[this.appDept] = this.items[this.appDept].filter(function (
          item1,
          idx1
        ) {
          return (
            here.items[here.appDept].findIndex(function (item2, idx) {
              return (
                item1.approvalInfo.email == item2.approvalInfo.email &&
                item1.appadd == item2.appadd
              );
            }) == idx1
          );
        });
      }
      // this.pickItem.push(item);
      // var here = this;
      // this.pickItem.filter(function (item1, idx1) {
      //   return (
      //     here.pickItem.findIndex(function (item2, idx) {
      //       if (item1.email) {
      //         return item1.email == item2.email;
      //       } else {
      //         return item1.name == item2.name || item1.id == item2.id;
      //       }
      //     }) == idx1
      //   );
      // });
    },
    DelItem(item) {
      this.delItem.push(item);
    },
    dupRemove() {
      var here = this;
      this.items[this.appDept] = this.items[this.appDept].filter(function (
        item1,
        idx1
      ) {
        return (
          here.items[here.appDept].findIndex(function (item2, idx) {
            return (
              item1.appadd == item2.appadd &&
              item1.approvalInfo.notesId == item2.approvalInfo.notesId
            );
          }) == idx1
        );
      });
    },
    OrgDataDel(val, index) {
      this.items[this.appDept] = this.items[this.appDept].filter(
        (item, idx) => {
          return (
            index !== idx ||
            item.approvalInfo.notesId !== val.approvalInfo.notesId ||
            item.appadd !== val.appadd
          );
        }
      );
    },
    listToggle() {
      this.listtoggle = !this.listtoggle;
    },
  },
};
</script>

<style>
</style>