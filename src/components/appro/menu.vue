<template>
  <div class="sub_menu01" :class="{ on: isOpen }">
    <div class="inner01">
      <div class="in_top">
        <div class="clfix">
          <span class="basic_img on">
            <em class="no_img" :style="randomColor()"
              ><b>{{ this.GetMyInfo.info.name.split("")[0] }}</b></em
            >
          </span>
          <dl>
            <dt>
              <em>{{ this.GetMyInfo.info.name }}</em>
              {{ this.GetMyInfo.info.position }}
            </dt>
            <dd>{{ this.GetMyInfo.info.dept }}</dd>
          </dl>
        </div>
        <div class="icons">
          <!-- <span class="sub_set"><a></a></span> -->
          <span class="sub_close" @click="CloseHam"></span>
        </div>
      </div>
      <ul @click="CloseHam">
        <li
          v-for="(value, index) in category"
          :key="index"
          :class="value.category"
        >
          <h3>
            <a @click="SetHeader(value, `app${value.category}`)"
              >{{ value.title }}
              <span v-if="GetApproval[value.category]">{{
                GetApproval[value.category].data.cnt
              }}</span></a
            >
          </h3>
          <ul v-if="value.category == 'success_date'">
            <li>
              <a @click="SetHeader(value, 'appsuccess_my')"
                >개인 <em>({{ GetApproval.success_my.data.cnt }})</em></a
              >
            </li>
            <li>
              <a @click="SetHeader(value, 'appsuccess_dept')"
                >부서 <em>({{ GetApproval.success_dept.data.cnt }})</em></a
              >
            </li>
            <li>
              <a @click="SetHeader(value, 'appsuccess_date')">일자별</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  created() {
    this.params = JSON.parse(this.$route.query.data);
    // this.params = this.GetHeader.menu;
    this.category = this.GetCategory[this.params.top];
    this.$store.dispatch("approjs/GetApprovalList", { type: "draft" });
    this.$store.dispatch("approjs/GetApprovalList", { type: "approve" });
    this.$store.dispatch("approjs/GetApprovalList", { type: "approving" });
    this.$store.dispatch("approjs/GetApprovalList", { type: "reject" });
    this.$store.dispatch("approjs/GetApprovalList", { type: "success_date" });
    this.$store.dispatch("approjs/GetApprovalList", { type: "success_my" });
    this.$store.dispatch("approjs/GetApprovalList", { type: "success_dept" });
  },
  props: {
    isOpen: Boolean,
  },
  methods: {
    isMenu(menu) {
      var result = this.category.findIndex(function (item, idx) {
        return item.category == menu;
      });
      if (result !== -1) {
        return true;
      }
      return false;
    },
    CloseHam() {
      this.$emit("CloseHam");
    },
    // 기본이미지 랜덤 색
    randomColor() {
      const color = ["#bcbbdd", "#bbcbdd", "#bbddd7", "#d0d0d0"];
      return `background: ${color[Math.floor(Math.random() * 4)]}`;
    },
    SetHeader(value, name) {
      this.$router.push({
        name,
        query: {
          data: JSON.stringify({
            type: value.category,
            lnbid: value.lnbid,
            top: this.params.top,
            title: value.title,
          }),
        },
      });
      // this.$store.dispatch("SetHeader", {
      //   type: value.category,
      //   lnbid: value.lnbid,
      //   top: this.params.top,
      //   title: value.title,
      // });
    },
  },
  computed: {
    ...mapGetters(["GetCategory", "GetHeader"]),
    ...mapGetters("mainjs", ["GetMyInfo"]),
    ...mapGetters("approjs", ["GetApproval"]),
  },
};
</script>

<style>
</style>