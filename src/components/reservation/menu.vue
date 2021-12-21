<template>
  <div class="cal_menu" :class="{ on: this.calmenu }" @click="Close">
    <div class="cal_inner">
      <div class="info_tit">
        <span class="cal_img01"></span>
        <dl>
          <dt>{{ GetMyInfo.info.name }} {{ GetMyInfo.info.position }}</dt>
          <dd>{{ GetMyInfo.info.dept }}</dd>
        </dl>
        <div>
          <span class="cal_sub_close" @click="$emit('calMenuOff')"></span>
        </div>
      </div>
      <div class="cf_search">
        <div>
          <select v-model="companyL" @change="Pick('companyList', companyL)">
            <option
              v-for="(value, index) in this.companyList"
              :value="value.unid"
              :key="index"
            >
              {{ value.name }}
            </option>
          </select>
          <select v-model="classL" @change="Pick('classList', classL)">
            <option
              v-for="(value, index) in this.classList"
              :value="value.unid"
              :key="index"
            >
              {{ value.className }}
            </option>
          </select>
        </div>
        <strong>{{ lang.choice }}</strong>
        <ul class="cf_check01 clfix">
          <li
            v-for="(value, index) in this.floorList"
            @click="pickFloor(value)"
            :key="index"
          >
            <a
              ><em :class="{ active: isFloor(value) }"></em
              >{{ value.floorName }}</a
            >
          </li>
        </ul>
        <span class="cf_btn" @click="roomSearch">{{ lang.search }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  created() {
    this.lang = this.GetBookL.menu;
    this.defaultSet();
  },
  props: ["calmenu"],
  computed: {
    ...mapGetters("mainjs", ["GetMyInfo"]),
    ...mapState("bookjs", [
      "classList",
      "floorList",
      "companyList",
      "roomList",
      "step",
    ]),
  },
  data() {
    return {
      myCal: false,
      companyL: "",
      classL: "",
      floorL: {},
      stepL: ["companyL", "classL", "floorL"],
    };
  },
  methods: {
    defaultSet() {
      if (this.companyList.length > 0) {
        this.companyL = this.companyList[0].unid;
      }
      if (this.classList.length > 0) {
        this.classL = this.classList[0].unid;
      }
      if (this.floorList.length > 0) {
        this.floorL[this.floorList[0].unid] = this.floorList[0];
      }
    },
    isFloor(value) {
      //   return (value) => {
      if (this.floorL[value.unid]) {
        return true;
      }
      return false;
      //   };
    },
    Close(e) {
      var LayerPopup = $(".cal_menu");
      if (LayerPopup.has(e.target).length === 0) {
        this.$emit("calMenuOff");
      }
    },
    toggle() {
      this.myCal = !this.myCal;
    },

    pickFloor(value) {
      console.log(value, "pickFloor");
      if (this.floorL[value.unid]) {
        this.floorL[value.unid] = undefined;
      } else {
        this.floorL[value.unid] = value;
      }
      this.$forceUpdate();
    },
    roomSearch() {
      var cnt = 0;
      var fstr = "";
      for (var f in this.floorL) {
        if (this.floorL[f]) {
          cnt++;
          fstr += this.floorL[f].code;
          fstr += ":";
        }
      }
      if (cnt > 0) {
        var data = {};
        data.type = "roomList";
        data.category = fstr;
        // data.category = "fres[0].floorId";
        this.$store.dispatch("bookjs/roomList", data).then((res) => {
          this.$emit("GetRoom", res);
          this.$emit("calMenuOff");
        });
      }
    },
    Pick(value, unid) {
      this.floorL = {};
      var result = this[value].filter((item, idx) => {
        return item.unid == unid;
      });
      var data = {};
      if (value == "companyList") {
        data.type = "classList";
      } else if (value == "classList") {
        this.$emit("GetClass", { data: result[0], type: "floorList" });
        data.type = "floorList";
      }
      data.category = result[0].code;
      //   var here = this;
      this.$store.dispatch("bookjs/stepList", data).then((res) => {
        if (res) {
          this.stepSet(data.type);
          if (value == "companyList") {
            this.$emit("GetClass", { data: {}, type: "classList" });
          }
        }
      });
    },
    stepSet(type) {
      var stepIdx = this.stepL.findIndex((item, idx) => {
        return `${item}ist` == type;
      });
      for (var i = stepIdx; i < this.stepL.length; i++) {
        if (this.stepL[i] == "floorL") {
          this.floorL[this.floorList[0].unid] = this.floorList[0];
          this.$forceUpdate();
        } else {
          this[this.stepL[i]] = this[`${this.stepL[i]}ist`][0].unid;
        }
      }
    },
  },
};
</script>

<style>
</style>