<template >
  <!-- <date-picker
    class="inputtime"
    v-model="inputVal"
    type="time"
    format="HH:mm"
    :open.sync="open"
    @change="handleChange"
    value-type="format"
    :disabled-time="notBeforeStart"
  ></date-picker> -->
  <!-- :open.sync="open" -->
  <!-- <time-picker
    class="inputtime"
    @change="handleChange"
    minute-interval="5"
    v-model="inputVal"
    @input="inputHandler"
    manual-input hide-dropdown @focus="focusState = 'focused'" @blur="focusState = 'blurred'"
  ></time-picker> -->
  <!-- <date-time-picker v-model="inputVal" type="time" /> -->
  <div class="wheeltime" style="height:100%;float: left;">
    <div @click="clickMe" class="clickme" style="height: 2.43rem; line-height: 2.43rem">{{ inputVal }}</div>
    <wheel-picker
      
      v-model="pickerShow"
      :colLen="colLen"
      :listData="listData"
      :listValue="listValue"
      @change="pickerChange"
      :rowKeys="rowKeys"
    ></wheel-picker>
  </div>
</template>

<script>
import { WheelPicker, WheelDatepicker } from "vue2-wheel-picker/picker";
// import DateTimePicker, { DatePicker, TimePicker } from 'vue-drumroll-datetime-picker'
// import 'vue-drumroll-datetime-picker/vue-drumroll-datetime-picker.css'
import moment from "moment";

export default {
  components: { WheelPicker, WheelDatepicker },
  props: ["value", "startTime", "endTime"],
  created() {
    var hour = [];
    var time = [];
    for (var i = 0; i < 24; i++) {
      var data = {};
      data.hour = this.fill(2, i);
      hour.push(data);
    }
    for (var i = 0; i < 60; i += 5) {
      var data = {};
      data.min = this.fill(2, i);
      time.push(data);
    }
    this.listData[0] = hour;
    this.listData[1] = time;

    this.hour = this.value.split(":")[0];
    this.min = this.value.split(":")[1];
    this.listValue[0] = this.hour;
    this.listValue[1] = this.min;
  },
  data() {
    return {
      hour: "05",
      min: "00",
      open: false,
      focusState: "blurred",
      dropdownStatus: "closed",
      colLen: 2,
      listData: [
        [{ fruit: "orange" }, { fruit: "banana" }],
        [{ animal: "dog" }, { animal: "cat" }],
      ],
      listValue: ["05", "00"],
      rowKeys: ["hour", "min"],
      pickerShow: false,
    };
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.hour = val.split(":")[0];
        this.min = val.split(":")[1];
        this.listValue[0] = { hour: this.hour };
        this.listValue[1] = { min: this.min };

        this.$emit("input", val);
        this.$emit("change");

      },
    },
  },
  methods: {
    clickMe() {
      this.pickerShow = true;
    },
    pickerChange(val) {
      this.$emit("input", val[0] + ":" + val[1]);
    },
    inputHandler(value) {
      console.log(value, value);
    },
    handleChange(value, type) {
      console.log(value, type);
      if (type === "minute") {
        this.open = false;
      }
    },
    notBeforeStart(date) {
      if (this.endTime != undefined) {
        return (
          date.getHours() <
            moment(`2000-01-01T${this.endTime}:00`).format("HH") ||
          date.getMinutes() <
            moment(`2000-01-01T${this.endTime}:00`).format("mm")
        );
      }
    },
  },
};
</script>

<style scoped>
.wc_top .wheeltime {
  width: 45%;
  height: 100%;
  border: 0.06rem solid #e6e6e6;
  padding-left: 0.31rem;
  outline: none;
  background: url(/mobile/img/cal_icon02.png) right center no-repeat;
  background-size: 2.43rem 2.43rem;
  display: inline-block !important;
}
</style>