<template>
  <div id="app_tab">
    <div class="in_box01">
      <strong desc="결재할 문서">{{ language.main.portlet.approval.approve }}<em>{{main.data.approvaltype.approve.more.cnt}}</em></strong>
      <div class="app_list01 clfix">
        <p v-show="main.data.approvaltype.approve.more.data.length === 0">
          결재할 문서가 없습니다.
        </p>
        <div
          v-show="main.data.approvaltype.approve.more.data.length > 0"
          v-for="(value, name) in main.data.approvaltype.approve.more.data"
          :key="name"
        >
          <div class="icons">
            <em></em>
            <em></em>
          </div>
          <em>{{ value.category }}</em>
          <strong>{{ value.subject }}</strong>
          <p>{{ transTime(value.created) }}</p>
          <div>
            <span><img :src="url(value.photo)" @error="$event.target.src='../../mobile/img/img03.png'" alt="" /></span>
            <dl>
              <dt>
                <em>{{ value.author }}</em> {{ value.authorposition }}
              </dt>
              <dd>{{ value.authordept }}</dd>
            </dl>
          </div>
        </div>
      </div>
      <span class="load" @click="addApprove" v-if="moreList"
        ><img src="../../mobile/img/down_arrow.png" alt="더보기"
      /></span>
    </div>
    <div class="in_box02">
      <strong desc="결재 중 문서"
        >{{ language.main.portlet.approval.approving }} <em>{{main.data.approvaltype.approving.more.cnt}}</em></strong
      >
      <div>
        <div
          v-for="(value, name) in main.data.approvaltype.approving.more.data"
          :key="name"
        >
          <div class="s_text">
            <em>{{ value.category }}</em>
            <strong>{{ value.subject }}</strong>
            <p>
              {{ value.approvalinfo[0].author }} {{ value.approvalinfo[0].authorposition }}/{{ value.approvalinfo[0].authordept
              }}
              <span>{{ transTime(value.created) }}</span>
            </p>
            <div class="icons">
              <span class="opin"><a href=""></a></span>
              <span class="clip"><a href=""></a></span>
            </div>
          </div>
          <div class="paying">
            <div class="pro_bar">
              <span class="in_bar" :style="{ width: progressBar(value)+'%' }"></span>
            </div>
            <div class="ing">
              <em :class="{ active: v.approval }" v-for="(v, n) in value.approvalinfo"
          :key="n">{{v.approvalKind}}</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Approval } from "../../api/index.js";
import config from "../../config/config.json";
export default {
  computed: {
    ...mapState(["language", "main", "moreList"]),
  },
  created() {
    // this.$store.dispatch("GetApproval", {
    //   approvaltype: "approve",
    //   category: "more",
    // });
    // this.$store.dispatch("GetApproval", {
    //   approvaltype: "approving",
    //   category: "more",
    // });
  },
  mounted() {},
  methods: {
    url(sabun) {
      return config.main.photo.replace(/@/g,sabun);
    },
    // 결재 중 문서 진행률
    progressBar(value){
      var percent = ((value.approved-1)/(value.totalApprover-1))*100;
      if(percent === 0){
        percent = 1;
      }
      
      return percent
    },
    // utc time to local time and transformat
    transTime(time) {
      var moment = require("moment");
      var localTime = moment.utc(time).toDate();
      localTime = moment(localTime).format("YYYY.MM.DD HH:mm");
      return localTime;
    },
    // 결재 할 문서 더보기 누를 때의 현재 데이터와 다음페이지 데이터 concat
    addApprove() {
      var data = {};
      var statedata = this.main.data.approvaltype.approve.more;

      data.approvaltype = "approve";
      data.size = statedata.size;
      data.page = String(parseInt(statedata.page) + 1);
      Approval(data)
        .then((response) => {
          return response.data.data;
        })
        .then((res) => {
          this.main.data.approvaltype.approve.more.data = this.main.data.approvaltype.approve.more.data.concat(
            res
          );
        });
      this.$store.dispatch("GetMoreList", { data });
    },
  },
};
</script>

<style>
</style>