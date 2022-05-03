<template>
  <date-picker
    class="inputtime"
    v-model="inputVal"
    type="time"
    format="HH:mm"
    :open.sync="open"
    @change="handleChange"
    value-type="format"
    :disabled-time="notBeforeStart"
    aria-readonly="readonly"
    :minute-step="5"
  ></date-picker>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";

export default {
  components: { DatePicker },
  props: ["value", "startTime", "endTime"],
  data() {
    return {
      open: false,
    };
  },
  created() {
    // var hour = [];
    // var time = [];
    // for (var i = 0; i < 24; i++) {
    //   var data = {};
    //   data.hour = this.fill(2, i);
    //   hour.push(data);
    // }
    // for (var i = 0; i < 60; i += 5) {
    //   var data = {};
    //   data.min = this.fill(2, i);
    //   time.push(data);
    // }
    // this.listData[0] = hour;
    // this.listData[1] = time;
    // this.hour = this.value.split(":")[0];
    // this.min = this.value.split(":")[1];
    // this.listValue[0] = this.hour;
    // this.listValue[1] = this.min;
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        this.$emit("change");
      },
    },
  },
  methods: {
    handleChange(value, type) {
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
.wc_top > li div .inputtime.mx-datepicker{float:left;}
</style>