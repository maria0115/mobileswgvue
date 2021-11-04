<template>
  <div class="cal_header">
    <h2 class="week_date">
      <em class="c_prev" @click="$emit('cPrev')"></em>
      <div>
        <input
          ref="datepicker"
          type="text"
          v-on:input="test = $event.target.value"
          :value="this.date"
          id="datepicker_input"
          class="datepicker-here"
          data-language="en"
        />
      </div>
      <em class="c_next" @click="$emit('cNext')"></em>
    </h2>
    <span class="sub_ham" @click="$emit('calMenu')"></span>
  </div>
</template>

<script>
import "../../mobile/dist/js/datepicker.js";
import "../../mobile/dist/js/datepicker.en.js";
// import "../../mobile/js/monthpicker.js";
var $j = jQuery;

export default {
  props: ["date"],
  data() {
    return {
      cdate: "",
      test: "",
      myDatepicker : null,
      selectdate:"",
    };
  },
  watch: {
    test: function (newValue) {
      this.cdate = newValue;
    },
    date: function (newValue) {
      var value = newValue.replaceAll(".","/")
      this.myDatepicker.selectDate(new Date(value));
    },
  },
  computed: {
    Cdate() {
      if (this.date == "") {
        const date = new Date();
        var currentYear = date.getFullYear();
        var currentMonth = date.getMonth() + 1;
        var year = currentYear;
        var month = currentMonth;

        var today = date.getDate();
        var fulldate = `${year}/${fill(2, month)}/${this.fill(2, today)}`;
        return fulldate;
      }
      return this.date;
    },
  },
  methods: {
    fill(width, str) {
      var n = String(str);
      return n.length >= width
        ? n
        : new Array(width - n.length + 1).join("0") + n;
    },
    CalMenu() {},
  },
  created() {
  },
  mounted() {
    $j.noConflict();
    const here = this;
    this.myDatepicker = $j("#datepicker_input")
      .datepicker({
        autoClose:true,
        onChangeView: function (date) {
        },
        onSelect: function(formattedDate, date, inst){
          if(!date&&date.length==0){
            formattedDate=here.date;
            var redate = formattedDate.replaceAll(".", "/");
            here.myDatepicker.selectDate(new Date(redate));
          }
          here.$emit("ChangeDate",formattedDate);
        }
      })
      .data("datepicker");
      var value = this.date.replaceAll(".","/")

    this.myDatepicker.selectDate(new Date(value));
  },
  updated() {},
};
</script>

<style>
@import "../../mobile/dist/css/datepicker.min.css";
@import "../../mobile/css/jquery-ui.css";
</style>