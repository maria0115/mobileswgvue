<template>
  <div class="noti_sub_menu01" @click="Close" :class="{ on: isOpen }">
    <div class="inner01">
      <div class="in_top">
        <div class="clfix">
          <span class="basic_img on">
            <!-- <em class="no_img" :style="randomColor()"
              ><b>{{ this.GetMyInfo.info.name.split("")[0] }}</b></em
            > -->
            <img
              v-if="GetMyInfo.photo !== undefined"
              :src="GetMyInfo.photo"
              alt=""
              @error="$event.target.src = '../../mobile/img/img03.png'" />
          </span>
          <dl>
            <dt>
              <em>{{ this.GetMyInfo.info.name }}</em>
              {{ this.GetMyInfo.info.position }}
            </dt>
            <dd>{{ this.GetMyInfo.info.dept }}</dd>
          </dl>
        </div>
        <div class="icons">
          <span class="sub_close" @click="CloseHam"></span>
        </div>
      </div>
      <!-- class="depth02" -->
      <ul class="nt_list_menu">
        <div v-for="(value, index) in menu" :key="index">
          <li>
            <h3 @click="OpenFolder(value, index, $event, $parent)" class="on">
              <a>{{ value.title }}</a>
              <em class="down_m"></em>
              <!-- <em @click="depthDown($event, $parent)" class="down_m"></em> -->
            </h3>
            <ul class="depth02" style="display: block">
              <li v-for="(v, i) in value.children" :key="i">
                <router-link
                  :to="{
                    name: `loglist`,
                    query: {
                      type: value.type,
                      data: JSON.stringify({
                        lnbid: v.lnbid,
                        type: value.type,
                        title: v.title,
                        top: params.top,
                      }),
                    },
                  }"
                  >{{ v.title }}</router-link
                >
              </li>
            </ul>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  async created() {
    var topidx = this.GetCategory["main"].findIndex((item, idx) => {
      return item.lnbid == this.params.top;
    });
    this.GetCategory["main"][topidx].children = await this.$store.dispatch(
      "CategoryList",
      this.params.top
    );
    this.menu.push(this.GetCategory["main"][topidx]);
  },
  data() {
    return {
      menu: [],
    };
  },
  props: {
    isOpen: Boolean,
    params: Object,
  },
  methods: {
    Close(e) {
      var LayerPopup = $(".noti_sub_menu01");
      if (LayerPopup.has(e.target).length === 0) {
        this.CloseHam();
      }
    },
    SetHeader(data) {
      this.$store.dispatch("SetHeader", data);
    },
    async OpenFolder(value, index, e, t) {
      $(e.currentTarget.nextElementSibling).slideToggle();
      $(e.currentTarget).toggleClass("on");
    },
    Path() {
      this.$store.commit("boardjs/BoardWritePath", this.path);
    },
    CloseHam() {
      this.$emit("CloseHam");
    },
    // 기본이미지 랜덤 색
    randomColor() {
      const color = ["#bcbbdd", "#bbcbdd", "#bbddd7", "#d0d0d0"];
      return `background: ${color[Math.floor(Math.random() * 4)]}`;
    },
    child(item) {
      item.children = item.children || [];

      return item.children;
    },
  },
  computed: {
    ...mapGetters("mainjs", ["GetMyInfo"]),
    ...mapGetters("boardjs", ["GetBoard"]),
    ...mapGetters(["GetCategory", "GetHeader"]),
  },
};
</script>

<style>
.nt_list_menu li h3 {
  padding: 0 3.75rem 0 1.56rem;
  position: relative;
}
.nt_list_menu li h3:after {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 1rem;
  height: 0.81rem;
  content: "";
  background: url(/mobile/img/mail_icon09.svg) center no-repeat;
  background-size: 1rem 0.81rem;
}
.nt_list_menu li h3 a {
  display: block;
  line-height: 2.5rem;
  font-size: 1rem;
  color: #444;
}
.nt_list_menu li h3 .down_m {
  position: absolute;
  top: 0;
  right: 0.31rem;
  width: 2.5rem;
  height: 2.5rem;
}
.nt_list_menu li h3 .down_m:after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.93rem;
  height: 0.56rem;
  transform: translate(-50%, -50%);
  content: "";
  background: url(/mobile/img/mail_open.png) center no-repeat;
  background-size: 0.93rem 0.56rem;
}
.nt_list_menu li h3.on .down_m:after {
  background: url(/mobile/img/mail_close.png) center no-repeat;
  background-size: 0.93rem 0.56rem;
}
</style>