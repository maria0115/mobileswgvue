<template>
  <div class="cf_header">
    <h2 class="cf_date">
      <strong>{{lang.status}}</strong>
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
      <select id="cf_select" v-model="roomL">
        <option
          :value="value.unid"
          v-for="(value, index) in this.roomList"
          :key="index"
        >
          {{ value.title }}
        </option>
      </select>
      <span class="sub_ham" @click="$emit('calMenu')"></span>
      <div class="cf_day">
        <div
          v-for="(value, index) in this.thisWeek"
          :key="index"
          :class="{
            to_day: fill(value.day, 2) === fill(today, 2),
          }"
          @click="changeDate(value)"
        >
          <span>{{ value.sort }}</span>
          <em>{{ value.day }}</em>
        </div>
      </div>
    </h2>
  </div>
</template>

<script>
import "../../mobile/dist/js/datepicker.js";
import "../../mobile/dist/js/datepicker.en.js";
// import "../../mobile/js/monthpicker.js";
var $j = jQuery;
import { mapState, mapGetters } from "vuex";

export default {
  created() {
    this.lang = this.GetBookL.datepicker;
    if (this.roomList.length > 0) {
      this.roomL = this.roomList[0].unid;
    }
  },
  // props: {date:String,thisWeek:Array,},
  props: ["date", "thisWeek", "today"],
  data() {
    return {
      roomL: "",
      cdate: "",
      test: "",
      myDatepicker: null,
      selectdate: "",
    };
  },
  watch: {
    test: function (newValue) {
      this.cdate = newValue;
    },
    date: function (newValue) {
      var value = this.replaceAll(newValue, ".", "/");
      this.myDatepicker.selectDate(new Date(value));
    },
    roomList: function (newValue) {
      this.roomL = newValue[0].unid;
    },
    roomL: function (newVal) {
      this.SetRoom(newVal);
    },
  },
  computed: {
    ...mapState("bookjs", ["roomList"]),

    Cdate() {
      if (this.date == "") {
        const date = new Date();
        var currentYear = date.getFullYear();
        var currentMonth = date.getMonth() + 1;
        var year = currentYear;
        var month = currentMonth;

        var today1 = date.getDate();
        var fulldate = `${year}/${fill(2, month)}/${this.fill(2, today1)}`;
        return fulldate;
      }
      return this.date;
    },
  },
  methods: {
    changeDate(value){
      var formattedDate = `${value.year}.${value.month}.${value.day}`;
      this.$emit("ChangeDate", formattedDate);
    },
    fill(width, str) {
      var n = String(str);
      return n.length >= width
        ? n
        : new Array(width - n.length + 1).join("0") + n;
    },
    CalMenu() {},
    SetRoom(rooml) {
      var result = this.roomList.filter((item, idx) => {
        return rooml == item.unid;
      });
      this.$store.commit("bookjs/NowRoom",result[0]);
      this.$emit("GetRoom", result);

      // for (var i = stepIdx; i < this.stepL.length; i++) {
    },
  },
  mounted() {
    $j.noConflict();
    const here = this;
    this.myDatepicker = $j("#datepicker_input")
      .datepicker({
        autoClose: true,
        onChangeView: function (date) {},
        onSelect: function (formattedDate, date, inst) {
          if (!date && date.length == 0) {
            formattedDate = here.date;
            var redate = here.replaceAll(formattedDate, ".", "/");
            here.myDatepicker.selectDate(new Date(redate));
          }
          here.$emit("ChangeDate", formattedDate);
        },
      })
      .data("datepicker");
    var value = this.replaceAll(this.date, ".", "/");

    this.myDatepicker.selectDate(new Date(value));
  },
  updated() {},
};
</script>

<style>
@import "../../mobile/dist/css/datepicker.min.css";
@import "../../mobile/css/jquery-ui.css";
</style>