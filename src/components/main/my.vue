<template>
  <div class="m_contents01">
    <div class="main_tab" @touchend="mmouseup($event)">
      <div id="my_tab">
        <div class="my_info">
          <div class="info_in">
            <span
              ><em
                ><img
                  v-if="GetMyInfo.photo !== undefined"
                  :src="GetMyInfo.photo"
                  alt=""
                  @error="
                    $event.target.src = '../../mobile/img/img03.png'
                  " /></em
            ></span>
            <dl>
              <dt>
                <span>{{ GetMyInfo.info.name }}</span>
                {{ GetMyInfo.info.position }} /
                {{ GetMyInfo.info.dept }}
              </dt>
              <dd class="mar30">
                <span
                  >{{ GetMainLanguage.myinfo.mail }}
                  <router-link :to="{ name: 'mailfirst' }"
                    ><b>{{ GetMyInfo.mailCount }}</b></router-link
                  ></span
                >
                <span
                  >{{ GetMainLanguage.myinfo.approval }}
                  <a @click="MeneGo"
                    ><b>{{ GetMyInfo.approvalCount }}</b></a
                  ></span
                >
                <span
                  >{{ GetMainLanguage.myinfo.schedule }}
                  <router-link :to="{ name: 'schedulefirst' }"
                    ><b>{{ GetMyInfo.scheduleCount }}</b></router-link
                  ></span
                >
              </dd>
            </dl>
          </div>
        </div>
        <!-- <div
        class="circle"
        @touchstart="[mmousedown($event)]"
        @touchmove="mmousemove($event)"
        :style="style"
      >
        <ul>
          <li
            class="minicircle"
            :style="ministyle"
            v-for="(value, name) in cirarr"
            :key="name"
          >
            {{ value.value }}
          </li>
        </ul>
      </div> -->

        <div v-for="(value, name) in GetConfig.main.portlet" :key="name">
          <div v-if="value.category === 'mail' && value.service">
            <Mail :portlet="value"></Mail>
          </div>
          <div v-else-if="value.type === 'notice' && value.service">
            <Notice :portlet="value"></Notice>
          </div>
          <div v-else-if="value.category === 'approval' && value.service">
            <Approving :portlet="value"></Approving>
          </div>
          <div v-else-if="value.category === 'schedule' && value.service">
            <Schedule :portlet="value"></Schedule>
          </div>
          <div v-else-if="value.category === 'reservation' && value.service">
            <Book :portlet="value"></Book>
          </div>
          <div v-else-if="value.category === 'board' && value.service">
            <Recent :portlet="value"></Recent>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Mail from "./my/mail.vue";
import Notice from "./my/notice.vue";
import Approving from "./my/approving.vue";
import Schedule from "./my/schedule.vue";
import Book from "./my/reservation.vue";
import Recent from "./my/recent.vue";
import $ from "jquery";

export default {
  async created() {
    this.menu = this.GetConfig.main.menuportlet;
    const result = this.menu.findIndex((item) => {
      return item.category == "approval";
    });
    this.top = this.menu[result];
    if (result !== -1) {
      this.categorys = await this.$store.dispatch(
        "CategoryList",
        this.menu[result].lnbid
      );
    }
  },
  components: {
    Mail,
    Notice,
    Approving,
    Schedule,
    Recent,
    Book,
  },
  computed: {
    ...mapState("mainjs", ["main"]),
    ...mapGetters("mainjs", ["GetMain", "GetMyInfo"]),
    ...mapGetters(["GetMainLanguage"]),
    ...mapGetters("configjs", ["GetConfig"]),
    style() {
      return { transform: "rotate(" + this.degree + "deg)" };
    },
    ministyle() {
      return { transform: "rotate(" + this.degree * -1 + "deg)" };
    },
  },
  data() {
    return {
      min: 0,
      didyouclick: false,
      preclientX: 0,
      preclientY: 0,
      clientHeight: 0,
      clientWidth: 0,
      degree: 0,
      centerdotx: 0,
      centerdoty: 0,
      moveboo: false,
      premove: 0,
      cw: "",
      gag: 0,
      cirarr: [
        { key: 0, value: "hi1" },
        { key: 1, value: "hi2" },
        { key: 2, value: "hi3" },
        { key: 3, value: "hi4" },
        { key: 4, value: "hi5" },
        { key: 5, value: "hi6" },
        { key: 6, value: "hi7" },
        { key: 7, value: "hi8" },
        { key: 8, value: "hi9" },
      ],
      copycirarr: [],
      positionxy: [],
    };
  },
  mounted() {
    var elems = $(".minicircle");
    var increase = (Math.PI * 2) / elems.length;
    //
    var x = 0,
      y = 0,
      angle = -90;

    for (var i = 0; i < elems.length; i++) {
      var elem = elems[i];
      // modify to change the radius and position of a circle
      x = 100 * Math.cos(angle) + 125;
      y = 100 * Math.sin(angle) + 125;
      elem.style.position = "absolute";
      elem.style.left = x + "px";
      elem.style.top = y + "px";
      angle += increase;
      this.clientHeight = 300; //.circle 걸로 수정
      this.clientWidth = 300;
      this.centerdotx = this.clientWidth / 2;
      this.centerdoty = this.clientHeight / 2;

      // var nowx = x - this.centerdotx;
      // var nowy = this.centerdoty - y;

      this.positionxy.push(increase * (180.0 / Math.PI) * -i);
    }
  },
  methods: {
    menuOfCategoryIdx(menu) {
      if (this.categorys) {
        return this.categorys.findIndex(function (item, idx) {
          return item.category == menu;
        });
      }
      return -1;
    },
    ThisCategory(menu) {
      if (this.categorys) {
        return this.categorys[this.menuOfCategoryIdx(menu)];
      }
      return [];
    },
    SetHeader(data) {
      this.$store.dispatch("SetHeader", data);
    },
    MeneGo() {
      var value = this.ThisCategory("approve");
      // .then(value=>{
      // this.SetHeader({
      //   type: value.category,
      //   lnbid: value.lnbid,
      //   top: this.top.lnbid,
      //   title: value.title,
      // });
      this.$router.push({
        name: `${this.top.category}first`,
        query: {
          data: JSON.stringify({
            type: value.category,
            lnbid: value.lnbid,
            top: this.top.lnbid,
            title: value.title,
          }),
        },
      });

      // });
    },
    remove(item) {
      this.mockSwipeList = this.mockSwipeList.filter((i) => i !== item);
      //
    },
    itemClick(e) {},
    onDragged({
      el,
      deltaX,
      deltaY,
      offsetX,
      offsetY,
      clientX,
      clientY,
      first,
      last,
    }) {
      if (first) {
        this.isDragging = true;
        return;
      }
      if (last) {
        this.isDragging = false;
        return;
      }
      var l = +window.getComputedStyle(el)["left"].slice(0, -2) || 0;
      var t = +window.getComputedStyle(el)["top"].slice(0, -2) || 0;
      el.style.left = l + deltaX + "px";
      el.style.top = t + deltaY + "px";
    },

    mmousedown(e) {
      e.preventDefault();

      // this.preclientX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
      // this.preclientY = e.touches[0].pageY - e.touches[0].target.offsetTop;
      const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
      this.preclientX =
        ((e.touches[0].clientX - x) / width) * e.currentTarget.offsetWidth;
      this.preclientY =
        ((e.touches[0].clientY - y) / height) * e.currentTarget.offsetHeight;
      // this.top = e.touches[0].clientX - e.touches[0].pageX;

      this.didyouclick = true;
      this.premove = 0;
      $(".t").html("누름");
    },
    mmousemove(e) {
      if (this.didyouclick) {
        this.moveboo = true;

        // var nowclientX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
        // var nowclientY = e.touches[0].pageY - e.touches[0].target.offsetTop;
        // this.top = e.touches[0].target.offsetTop;
        const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
        var nowclientX =
          ((e.touches[0].clientX - x) / width) * e.currentTarget.offsetWidth;
        var nowclientY =
          ((e.touches[0].clientY - y) / height) * e.currentTarget.offsetHeight;

        var nowx = nowclientX - this.centerdotx;
        var nowy = this.centerdoty - nowclientY;
        var prex = this.preclientX - this.centerdotx;
        var prey = this.centerdoty - this.preclientY;

        var nowmove =
          this.getValueBetween0And360(
            Math.atan2(nowx, nowy) * (180.0 / Math.PI)
          ) -
          this.getValueBetween0And360(
            Math.atan2(prex, prey) * (180.0 / Math.PI)
          );
        // this.degree = Math.atan2(nowx, nowy) * (180.0 / Math.PI);
        // this.premove = nowmove;
        var gagchai = nowmove - this.premove;
        if (-300.0 > gagchai) {
          gagchai = gagchai + 360.0;
        } else if (300.0 < gagchai) {
          gagchai = gagchai - 360.0;
        }
        this.degree = this.degree + gagchai;
        // this.degree = this.degree+nowmove-this.premove;
        this.gag = gagchai;

        // this.preclientX = nowclientX;
        // this.preclientY = nowclientY;
        this.premove = nowmove;
        e.preventDefault();
      }
    },
    mmouseup(e) {
      if (this.moveboo) {
        this.cw = "지금떼기시작";

        var a = [];
        for (var i = 0; i < this.positionxy.length; i++) {
          a.push(this.getValueBetween0And360(this.positionxy[i]));
        }

        var q = parseInt(this.degree / 360.0); //몫
        const gag = this.getValueBetween0And360(this.degree);
        // this.gag = gag;
        const resultcw = this.getIndexOfNearestAngle(a, gag, +1); //시계
        const resultccw = this.getIndexOfNearestAngle(a, gag, -1); //반시계
        // $('.circle')[0].style.transition ="ease-in-out 2s";
        // degree가 플러스다 하면

        if (resultcw.dif < resultccw.dif) {
          // this.degree = this.positionxy[resultcw.index] + (q*360.0);
          if (this.degree > 0) {
            this.degree =
              this.getValueBetween0And360(this.positionxy[resultcw.index]) +
              q * 360.0;
          } else {
            this.degree = this.positionxy[resultcw.index] + q * 360.0;
          }

          // this.gag = this.positionxy[resultcw.index];
          // this.gag = (q*360.0)
        } else {
          // this.degree = this.positionxy[resultccw.index] + (q*360.0);
          if (this.degree > 0) {
            this.degree =
              this.getValueBetween0And360(this.positionxy[resultccw.index]) +
              q * 360.0;
          } else {
            this.degree = this.positionxy[resultccw.index] + q * 360.0;
          }
          // this.gag = this.positionxy[resultccw.index];
          // this.gag = (q*360.0)
        }

        // var r = this.degree % 360.0 //나머지
        const correctindex = this.positionxy.indexOf(r);
        this.min = correctindex;
        this.copycirarr = this.cirarr
          .splice(correctindex)
          .concat(this.cirarr.splice(0, correctindex));
        this.moveboo = false;
        this.cw = "지금떼기떨어짐";
        // $('.circle')[0].style.transition ="";
        // this.degree = -90;
      }
      this.didyouclick = false;
    },
    url(sabun) {
      return this.main.photo.replace(/@/g, sabun);
    },
    getAngle(x1, y1, x2, y2) {
      return Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    },
    getValueBetween0And360(input) {
      if (input < 0) {
        return (input + (Math.trunc(-input / 360) + 1.0) * 360.0) % 360.0;
      }
      return input % 360.0;
    },
    getValueBetweenPlusMinus180(input) {
      in360 = this.getValueBetween0And360(input);
      return 180 < in360 ? in360 - 360 : in360;
    },
    getDiffClockWise(a, θ) {
      return a - θ;
    },
    getIndexOfNearestAngle(a, θ, sign) {
      // var iF = -1;
      var diffF = 1000;
      var result = {};
      for (var i = 0; i < a.length; i++) {
        var diff = sign * this.getDiffClockWise(a[i], θ);
        var diffPos = this.getValueBetween0And360(diff);
        //

        if (diffPos < diffF) {
          diffF = diffPos;
          // iF = i;
          result.index = i;
          result.dif = diffPos;
        }
        //
      }

      return result;
    },
  },
};
</script>

<style>
/*MAIN CIRCLE*/
.circle {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: #093b62;
  /* background-image: url(/mobile/img/logo.png); */

  box-shadow: inset 0px 0px 30px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0px 0px 30px rgba(0, 0, 0, 0.3);

  /* -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease; */
  transition: ease-out 0.2s;
}

/*LITTLE CIRCLES*/
.minicircle {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  list-style-type: none;
  text-align: center;
  font: 20px/50px Helvetica, Arial, sans-serif;
  top: 0;
  left: 0;
  -webkit-transition: width 0s;
  -moz-transition: width 0s;
  -o-transition: width 0s;
  transition: width 0s;
}
</style>