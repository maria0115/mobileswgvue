<template>
  <div class="all_organ_modal" @click="Close" :class="{ on: this.modalon }">
    <!--위치 수정됨-->
    <div class="organ_con">
      <form @submit.prevent>
        <div>
          <div>
            <strong>{{ lang.title }}</strong>
            <div>
              <input
                type="text"
                class="search"
                :placeholder="this.GetCommonL.search"
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
          v-if="orgdata.length > 0"
        >
          <div>
            <div>
              <div v-for="(value, index) in orgdata" :key="index">
                <div v-if="org.pointer==value.point">
                <select v-if="ismail" v-model="value.point" @change="dupRemove">
                  <option value="SendTo">{{ lang.receive }}</option>
                  <option value="CopyTo">{{ lang.cc }}</option>
                  <option value="BlindCopyTo">{{ lang.bcc }}</option>
                </select>
                <span
                  >{{ value.item.name
                  }}<em v-if="value.item.email"
                    >&lt;{{ value.item.email }}&gt;</em
                  ></span
                >
                </div>
                <em class="list_close" @click="OrgDataDel(value, index)"></em>
              </div>
            </div>
          </div>
          <span class="hidden_btn" @click="listToggle"></span>
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
              :modalon="modalon"
              @OpenFolder="OpenFolder"
              :createdOrg="createdOrg"
              @SetcreatedOrg="SetcreatedOrg"
              @setModalOff="ModalOff"
              @OrgDataAdd="OrgDataAdd"
            ></org-item>
          </span>
        </ul>
        <div class="o_organ_ft">
          <span class="ps_add" @click="SetDataOrg">{{ lang.ok }}</span>
        </div>
      </form>
      <span class="modal_close" @click="ModalOff"></span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import OrgItem from "./orgitemview.vue";
export default {
  created() {
    if (this.send.length > 0) {
      for (var item of this.send) {
        this.$store.commit("OrgDataAdd", item);
      }
    }
    this.lang = this.GetCommonL.org;

    var data = {};
    this.$store.dispatch("mailjs/InitOrg", data);
  },
  mounted() {},
  props: {
    modalon: Boolean,
    send: {
      type: Array,
      default: function () {
        return [];
      },
    },
    ismail: Boolean,
    isapp: Boolean,
  },
  components: {
    OrgItem,
  },
  watch: {
    send(newval) {
      for (var item of newval) {
        this.$store.commit("OrgDataAdd", item);
      }
    },
    modalon(newval) {
      if (newval) {
        this.SetcreatedOrg();
      }
    },
  },
  computed: {
    ...mapState(["autosearchorg", "org", "orgdata"]),

    ...mapGetters("mailjs", ["GetMail"]),
  },
  data: function () {
    return {
      modalAutoOrg: 0,
      createdOrg: false,
      keyword: "",
      search: false,
      listtoggle: true,
    };
  },
  beforeDestroy() {
    this.$store.commit("mailjs/From", "");
    this.$store.commit("OrgDataInit");
    this.$store.commit("InitOrgData");

    // this.$store.commit("OrgDataInit");
  },
  methods: {
    // 기본이미지 랜덤 색
    randomColor() {
      const color = ["#bcbbdd", "#bbcbdd", "#bbddd7", "#d0d0d0"];
      return `background: ${color[Math.floor(Math.random() * 4)]}`;
    },
    delBtn() {
      this.keyword = "";
    },
    ModalOff() {
      this.$emit("ModalOff");
      // this.$store.commit("InitOrgData");
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
      this.modalAutoOrg++;
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
      this.OrgDataAdd(value);
      this.search = false;
      // this.$emit("ModalOff");
    },
    OrgDataDel(val, index) {
      this.$store.commit("DeleteOrgData", { val, index });
    },
    OrgDataAdd(item) {
      var result = -1;
      if (item.notesId) {
        result = this.orgdata.findIndex((item1, idx) => {
          return (
            item1.item.notesId == item.notesId &&
            item1.point == this.org.pointer
          );
        });
      } else if (item.id) {
        result = this.orgdata.findIndex((item1, idx) => {
          return item1.item.id == item.id && item1.point == this.org.pointer;
        });
      } else if (item.mycode) {
        result = this.orgdata.findIndex((item1, idx) => {
          return (
            item1.item.mycode == item.mycode && item1.point == this.org.pointer
          );
        });
      }
      if (result == -1) {
        this.orgdata.push({ point: this.org.pointer, item });
      }
    },
    SetDataOrg() {
      if (this.orgdata.length > 0) {
        this.$store.commit("OrgDataInit");
        this.$store.commit("SetOrgData", this.orgdata);
        this.ModalOff();
      }
    },
    dupRemove() {
      console.log(this.orgdata);
      this.$store.commit("duplicateRemove");
    },
    listToggle() {
      this.listtoggle = !this.listtoggle;
    },
  },
};
</script>

<style>
</style>