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
          <span class="sub_set"><a></a></span>
          <span class="sub_close" @click="CloseHam"></span>
        </div>
      </div>
      <ul @click="CloseHam">
        <li>
          <h3><router-link :to="{name:'appform'}">결재 양식함</router-link></h3>
        </li>
        <li>
          <h3>
            <router-link :to="{name:'appdraft'}"
              >작성중 문서
              <span>{{ this.GetApproval.draft.data.cnt }}</span></router-link
            >
          </h3>
        </li>
        <li>
          <h3>
            <router-link :to="{name:'apptodolist'}"
              >결재할 문서
              <span>{{ this.GetApproval.approve.data.cnt }}</span></router-link
            >
          </h3>
        </li>
        <li>
          <h3>
            <router-link :to="{name:'apping'}"
              >결재중 문서
              <span>{{
                this.GetApproval.approving.data.cnt
              }}</span></router-link
            >
          </h3>
        </li>
        <li>
          <h3>
            <router-link :to="{name:'appreject'}"
              >반려된 문서
              <span>{{ this.GetApproval.reject.data.cnt }}</span></router-link
            >
          </h3>
        </li>
        <li>
          <h3>
            <router-link :to="{name:'successdate'}"
              >완료된 문서
              <span>{{
                this.GetApproval.success_date.data.cnt
              }}</span></router-link
            >
          </h3>
          <ul>
            <li>
              <router-link :to="{name:'successmy'}"
                >개인
                <em
                  >({{ this.GetApproval.success_my.data.cnt }})</em
                ></router-link
              >
            </li>
            <li>
              <router-link :to="{name:'successdept'}"
                >부서
                <em
                  >({{ this.GetApproval.success_dept.data.cnt }})</em
                ></router-link
              >
            </li>
            <li><router-link :to="{name:'successdate'}">일자별</router-link></li>
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
    ...mapGetters("mainjs",["GetMyInfo"]),
    ...mapGetters("approjs",["GetApproval"]),
  },
};
</script>

<style>
</style>