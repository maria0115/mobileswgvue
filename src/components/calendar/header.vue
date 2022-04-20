<template>
  <div class="cal_menu" :class="{ on: this.calmenu }" @click="Close">
    <div class="cal_inner">
      <div class="info_tit">
        <span class="cal_img01">
          <img
            v-if="GetMyInfo.photo !== undefined"
            :src="GetMyInfo.photo"
            alt=""
            @error="$event.target.src = '../../mobile/img/img03.png'"
          />
        </span>
        <dl>
          <dt>{{ GetMyInfo.info.name }} {{ GetMyInfo.info.position }}</dt>
          <dd>{{ GetMyInfo.info.dept }}</dd>
        </dl>
        <div>
          <!-- <span class="cal_sub_set"><a></a></span> -->
          <span class="cal_sub_close" @click="$emit('calMenuOff')"></span>
        </div>
      </div>
      <div class="cal_list">
        <li class="cal_type">
          <ul>
            <li class="month">
              <router-link :to="{ name: 'calmonth' }">{{
                lang.month
              }}</router-link>
            </li>
            <li class="week">
              <router-link :to="{ name: 'calweek' }">{{
                lang.week
              }}</router-link>
            </li>
            <li class="day">
              <router-link :to="{ name: 'calday' }">{{ lang.day }}</router-link>
            </li>
          </ul>
        </li>
        <!-- <li class="my_cal" :class="{on:this.myCal}">
                    <strong @click="toggle">개인일정<em></em></strong>
                    <ul>
                        <li ><a>나의 일정</a></li>
                    </ul>
                </li> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  created() {
    this.lang = this.GetScheduleL.header;
  },
  props: ["calmenu"],
  computed: {
    ...mapGetters("mainjs", ["GetMyInfo"]),
  },
  data() {
    return {
      myCal: false,
    };
  },
  methods: {
    Close(e) {
      var LayerPopup = $(".cal_menu");
      if (LayerPopup.has(e.target).length === 0) {
        this.$emit("calMenuOff");
      }
    },
    toggle() {
      this.myCal = !this.myCal;
    },
  },
};
</script>

<style>
</style>