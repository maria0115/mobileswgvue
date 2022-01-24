<template>
  <div class="all_organ_modal" @click="Close" :class="{ on: this.modalon }">
    <!--위치 수정됨-->
    <div class="organ_con">
      <form @submit.prevent>
        <div>
          <div>
            <strong>{{lang.title}}</strong>
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
    this.lang = this.GetCommonL.org;

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
    ...mapState(["autosearchorg", "org"]),

    ...mapGetters("mailjs", ["GetMail"]),
    // ...mapGetters("mainjs", ["GetMyInfo"]),
  },
  data: function () {
    return {
      modalAutoOrg: 0,
      createdOrg: false,
      keyword: "",
      search: false,
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
      this.createdOrg = false;
    },
    OpenCard(item) {
      this.$emit("CardOpen", item);
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
      console.log("hhi", this.autosearchorg[this.org.pointer].length);
      if (this.autosearchorg[this.org.pointer].length > 0) {
        this.search = true;
        console.log(this.search);
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
      this.$emit("CardOpen", value);

      this.search = false;
      // this.ModalOff();
    },
  },
};
</script>

<style>
</style>