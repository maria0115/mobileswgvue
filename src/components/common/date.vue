<template>
  <!-- <div class="inputdate"> -->
    <date-picker class="inputdate" v-model="inputVal" valueType="format" :disabled="disabled"></date-picker>
  <!-- </div> -->
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  components: { DatePicker },
  props: ['value','disabled'],
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
};
</script>