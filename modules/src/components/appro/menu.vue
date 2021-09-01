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
          <span class="sub_set"><a href="./mob_setting.html"></a></span>
          <span class="sub_close" @click="CloseHam"></span>
        </div>
      </div>
      <ul>
        <li>
          <h3><router-link to="docform">결재 양식함</router-link></h3>
        </li>
        <li>
          <h3>
            <router-link to="draft"
              >작성중 문서
              <span>{{ this.GetApproval.draft.data.cnt }}</span></router-link
            >
          </h3>
        </li>
        <li>
          <h3>
            <router-link to="approve"
              >결재할 문서
              <span>{{ this.GetApproval.approve.data.cnt }}</span></router-link
            >
          </h3>
        </li>
        <li>
          <h3>
            <router-link to="ing"
              >결재중 문서
              <span>{{
                this.GetApproval.approving.data.cnt
              }}</span></router-link
            >
          </h3>
        </li>
        <li>
          <h3>
            <router-link to="reject"
              >반려된 문서
              <span>{{ this.GetApproval.reject.data.cnt }}</span></router-link
            >
          </h3>
        </li>
        <li>
          <h3>
            <router-link to="success_date"
              >완료된 문서
              <span>{{
                this.GetApproval.success_date.data.cnt
              }}</span></router-link
            >
          </h3>
          <ul>
            <li>
              <router-link to="success_my"
                >개인
                <em
                  >({{ this.GetApproval.success_my.data.cnt }})</em
                ></router-link
              >
            </li>
            <li>
              <router-link to="success_dept"
                >부서
                <em
                  >({{ this.GetApproval.success_dept.data.cnt }})</em
                ></router-link
              >
            </li>
            <li><router-link to="success_date">일자별</router-link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  created(){
    this.$store.dispatch("appro/GetApprovalList", { type: "draft" });
        this.$store.dispatch("appro/GetApprovalList", { type: "approve" });
        this.$store.dispatch("appro/GetApprovalList", { type: "approving" });
        this.$store.dispatch("appro/GetApprovalList", { type: "reject" });
        this.$store.dispatch("appro/GetApprovalList", { type: "success_date" });
        this.$store.dispatch("appro/GetApprovalList", { type: "success_my" });
        this.$store.dispatch("appro/GetApprovalList", { type: "success_dept" });
  },
  props: {
    isOpen: Boolean,
  },
  methods: {
    CloseHam() {
      this.$emit("CloseHam");
    },
    // 기본이미지 랜덤 색
    randomColor() {
      const color = ["#bcbbdd", "#bbcbdd", "#bbddd7", "#d0d0d0"];
      return `background: ${color[Math.floor(Math.random() * 4)]}`;
    },
  },
  computed: {
    ...mapGetters("mainjs",["GetMyInfo", ]),
    ...mapGetters("appro",[ "GetApproval"]),
  },
};
</script>

<style>
</style>