<template>
  <date-picker
    class="inputtime"
    v-model="inputVal"
    type="time"
    format="HH:mm"
    value-type="format"
    :disabled-time="notBeforeStart"
  ></date-picker>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";

export default {
  components: { DatePicker },
  props: ["value", "startTime", "endTime"],
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
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