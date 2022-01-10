<template>
  <div class="rere_modal" :class="{ active: rmodalon }">
    <!--8월 12일 추가됨 반복예약-->
    <div class="rere_con">
      <strong>{{ lang.repsetting }}</strong>
      <p>{{ lang.whenrep }}</p>
      <ul>
        <li>
          <select id="rere_box" v-model="RepeatUnit">
            <option
              v-for="(value, name) in lang.unit"
              :key="name"
              :value="name"
            >
              {{ value }}
            </option>
          </select>
        </li>
        <li class="ri_adjust clfix">
          <div class="se_box01">
            <select
              v-if="RepeatUnit == 'D'"
              v-model="RepeatInterval"
              name="sel01"
              id="sel01"
            >
              <option value="매일 반복" selected>{{ lang.repp.day }}</option>
              <option :value="fill(2, num)" v-for="num in 31" :key="num">
                {{ num }}{{ lang.repp.eachday }}
              </option>
            </select>
            <select
              v-if="RepeatUnit == 'W'"
              v-model="RepeatInterval"
              id="sel02_1"
            >
              <option value="매주 반복" selected>{{ lang.repp.week }}</option>
              <option :value="fill(2, num)" v-for="num in 8" :key="num">
                {{ num }}{{ lang.repp.eachweek }}
              </option>
            </select>
            <select
              v-model="RepeatInterval"
              v-if="RepeatUnit == 'MD' || RepeatUnit == 'MP'"
              id="sel03_1"
            >
              <option value="매월 반복" selected>
                {{ lang.repp.month }}
              </option>
              <option :value="fill(2, num)" v-for="num in 12" :key="num">
                {{ num }}{{ lang.repp.eachmonth }}
              </option>
            </select>
            <select
              v-model="RepeatInterval"
              v-if="RepeatUnit == 'Y'"
              id="sel05_1"
            >
              <option value="매년 반복" selected>{{ lang.repp.year }}</option>
              <option :value="fill(2, num)" v-for="num in 10" :key="num">
                {{ num }}{{ lang.repp.eachyear }}
              </option>
            </select>
          </div>
          <div
            class="se_box02"
            v-if="RepeatUnit == 'W' || RepeatUnit == 'MD' || RepeatUnit == 'MP'"
          >
            <select
              id="se102_2"
              v-model="RepeatAdjust_W"
              v-if="RepeatUnit == 'W'"
            >
              <option
                :value="fill(2, index)"
                v-for="(value, index) in daysSort"
                :key="index"
              >
                {{ value }}{{ lang.yuil }}
              </option>
            </select>
            <select
              id="se103_2"
              v-model="RepeatAdjust_MD"
              v-if="RepeatUnit == 'MD'"
            >
              <option :value="fill(2, num)" v-for="num in 31" :key="num">
                {{ num }}{{ lang.day }}
              </option>
            </select>
            <select
              id="se104_2"
              v-model="RepeatAdjust_MP"
              v-if="RepeatUnit == 'MP'"
            >
              <option v-for="(v, i) in this.Closs()" :value="v.index" :key="i">
                {{ v.str }}{{ lang.yuil }}
              </option>
            </select>
          </div>
        </li>
      </ul>
      <p>{{ lang.reppeiod }}</p>
      <ul class="inp_wrap">
        <li class="clfix term">
          <select id="selectbox" v-model="RepeatHow">
            <option value="U" selected>{{ lang.end }}</option>
            <option value="F">{{ lang.period }}</option>
          </select>
        </li>
        <li class="clfix date_inp">
          <input type="date" v-model="RepeatUntil" v-if="RepeatHow == 'U'" />
          <div class="clfix" :class="{ active: RepeatHow == 'F' }">
            <span><input type="text" v-model="RepeatFor" /></span>
            <select v-model="RepeatForUnit">
              <option value="D">{{ lang.day }}</option>
              <option value="W">{{ lang.week }}</option>
              <option value="M">{{ lang.month }}</option>
              <option value="Y">{{ lang.year }}</option>
            </select>
          </div>
        </li>
      </ul>
      <span class="time_mo_btn" @click="rClick('rere')">{{ lang.check }}</span>
      <span class="modal_close rereclose" @click="RBtnremove"></span>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    var moment = require("moment");

    this.lang = this.GetScheduleL.write;
    this.RepeatStartDate = moment().utc().format("YYYYMMDDTHHmmss");
    this.RepeatUntil = moment().format("YYYY-MM-DD");
  },
  data() {
    return {
      RepeatUnit: "D",
      RepeatInterval: "01",
      RepeatAdjust_W: "00",
      RepeatAdjust_MD: "01",
      RepeatAdjust_MP: "1.0",
      RepeatHow: "U",
      RepeatUntil: "",
      RepeatFor: "0",
      RepeatForUnit: "D",
    };
  },
  props: {
    rmodalon: Boolean,
  },
  methods: {
    RBtnremove() {
      this.$emit("remodal", false);
    },
    rClick(value) {
      this.$emit("remodal", false);
      var data = {};
      data.RepeatUnit = this.RepeatUnit;
      data.RepeatWeekends = "";
      if (this.RepeatUnit == "D") {
        data.RepeatWeekends = "D";
      }
      data.RepeatInterval = this.RepeatInterval;
      if (this.RepeatUnit == "D" || this.RepeatUnit == "Y") {
        data.RepeatAdjust = "";
      } else {
        data.RepeatAdjust = this[`RepeatAdjust_${this.RepeatUnit}`];
      }
      data.RepeatUntil = "";
      data.RepeatFor = "";
      data.RepeatForUnit = "";
      if (this.RepeatHow == "U") {
        var moment = require("moment");
        var start = moment(`${this.RepeatUntil}`).format("YYYYMMDD");
        data.RepeatUntil = start;
      } else {
        data.RepeatFor = this.RepeatFor;
        data.RepeatForUnit = this.RepeatForUnit;
      }
      data.RepeatStartDate = this.RepeatStartDate;
      data.RepeatHow = this.RepeatHow;

      //   this.ReData = data;
      this.$emit("reData", data);
      this.$emit("rere", true);
    },
  },
};
</script>

<style>
</style>