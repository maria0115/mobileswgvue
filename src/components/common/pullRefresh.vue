<template>
  <pull-to
    :top-load-method="refresh"
    @top-state-change="Change"
    :top-config="TOP_DEFAULT_CONFIG"
  >
    <template slot="top-block" slot-scope="props">
      <div class="top-load-wrapper">
        <div class="loading-container" :style="settranslateY" v-if="isLoading">
          <div :class="{ loading: isLoading }"></div>
        </div>

        <!-- <div
          class="loading-container loading"
          :style="settranslateY"
        ></div> -->
        {{ props.stateText }}
      </div>
    </template>
    dsfsdf sdgsd ffgdfsg gfdgdfg fdgdf
  </pull-to>
</template>

<script>
// import PullTo from "vue-pull-to";
// const pStart = { x: 0, y: 0 };
// const pCurrent = { x: 0, y: 0 };
// const cards = document.querySelectorAll(".card");
// const main = document.querySelector("body > div");
// let isLoading = false;
export default {
  components: {
    // PullTo,
  },
  mounted() {},
  data() {
    return {
      load: null,
      isLoading: false,
      settranslateY: "transform: translateY(-100px)",
      TOP_DEFAULT_CONFIG: {
        pullText: "당겨서 새로고침..", // The text is displayed when you pull down
        triggerText: "놓아서 새로고침", // The text that appears when the trigger distance is pulled down
        loadingText: "로드중...", // The text in the load
        doneText: "끝", // Load the finished text
        failText: "실패", // Load failed text
        loadedStayTime: 400, // Time to stay after loading ms
        stayDistance: 50, // Trigger the distance after the refresh
        triggerDistance: 70, // Pull down the trigger to trigger the distance
      },
    };
  },
  methods: {
    refresh(loaded) {
      this.timeout = setTimeout(() => {
        console.log("hi");

        loaded("done");
      }, 1000);
      //   loaded("done");
      // setTimeout(() => {loaded("done")}, 2.0*1000);
      //   fetchDataList().then((res) => {
      //     this.dataList = res.data.dataList;
      //   });
    },
    Change(state) {
      if (state == "pull") {
        this.settranslateY = `transform: translateY(0px)`;
        this.isLoading = true;
      } else if (state == "loaded-done") {
        this.settranslateY = `transform: translateY(-100px)`;

        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.top-load-wrapper {
  line-height: 50px;
  text-align: center;
}
.loading-container {
  height: 100px;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.loading-container .loading {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 4px solid transparent;
  border-top-color: #595959;
  border-right-color: #595959;
  animation: loading 0.5s infinite forwards;
}

@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>