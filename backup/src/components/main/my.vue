<template>
  <div class="main_tab" @touchend="mmouseup($event)">
    <div id="my_tab">
      <div class="my_info">
        <div class="info_in">
          <span
            ><em
              ><img
                v-if="main.my.myinfo.photo !== undefined"
                :src="url(main.my.myinfo.photo)"
                alt=""
                @error="$event.target.src = '../../mobile/img/img03.png'" /></em
          ></span>
          <dl>
            <dt>
              <span>{{ main.my.myinfo.info.name }}</span>
              {{ main.my.myinfo.info.position }} /
              {{ main.my.myinfo.info.dept }}
            </dt>
            <dd class="mar30">
              <span
                >{{ language.main.myinfo.mail }}
                <router-link to="/mail"
                  ><b>{{ main.my.myinfo.mailCount }}</b></router-link
                ></span
              >
              <span
                >{{ language.main.myinfo.approval }}
                <router-link to="/approval"
                  ><b>{{ main.my.myinfo.approvalCount }}</b></router-link
                ></span
              >
              <span
                >{{ language.main.myinfo.schedule }}
                <router-link to="/schedule"
                  ><b>{{ main.my.myinfo.scheduleCount }}</b></router-link
                ></span
              >
            </dd>
          </dl>
        </div>
      </div>
      <div
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
      </div>
      {{ this.cw }} {{ this.degree }}/{{ this.cirarr }} /{{ this.gag }}/{{
        this.positionxy
      }}/{{ this.premove }}
      <swipe-list
        ref="list"
        class="card"
        :disabled="!enabled"
        :items="mockSwipeList"
        item-key="id"
      >
        <template
          v-slot="{
            item,
            index,
            revealLeft,
            revealRight,
            close,
            revealed,
            disabled,
          }"
        >
          <!-- item is the corresponding object from the array -->
          <!-- index is clearly the index -->
          <!-- revealLeft is method which toggles the left side -->
          <!-- revealRight is method which toggles the right side -->
          <!-- close is method which closes an opened side -->
          <div ref="content" class="card-content" @click="itemClick(item)">
            <!-- style content how ever you like -->
            <h2>{{ item.title }}</h2>
            <p><b>id:</b> {{ item.id }}</p>
            <b>index:</b><span> {{ index }}</span>
          </div>
        </template>
        <!-- left swipe side template and v-slot:left="{ item }" is the item clearly -->
        <!-- remove if you dont wanna have left swipe side  -->
        <template v-slot:left="{ item, close, index }">
          <div class="swipeout-action red" title="remove" @click="remove(item)">
            <!-- place icon here or what ever you want -->
            <i class="fa fa-trash"></i>
          </div>
          <div class="swipeout-action purple" @click="close">
            <!-- place icon here or what ever you want -->
            <i class="fa fa-close"></i>
          </div>
        </template>
        <!-- right swipe side template and v-slot:right"{ item }" is the item clearly -->
        <!-- remove if you dont wanna have right swipe side  -->
        <template v-slot:right="{ item }">
          <div class="swipeout-action blue">
            <!-- place icon here or what ever you want -->
            <i class="fa fa-heart"></i>
          </div>
          <div class="swipeout-action green">
            <!-- place icon here or what ever you want -->
            <i class="fa fa-heart"></i>
          </div>
        </template>
        <template v-slot:empty>
          <div>
            <!-- change mockSwipeList to an empty array to see this slot in action  -->
            list is empty ( filtered or just empty )
          </div>
        </template>
      </swipe-list>

      <!-- <div class="circle default">하이야</div> -->
      <div v-for="(value, name) in config.main.portlet" :key="name">
        <div v-if="value.key === 'mail' && value.service">
          <Mail :portlet="language.main.portlet"></Mail>
        </div>
        <div v-else-if="value.key === 'notice' && value.service">
          <Notice :portlet="language.main.portlet"></Notice>
        </div>
        <div v-else-if="value.key === 'approving' && value.service">
          <Approving :portlet="language.main.portlet"></Approving>
        </div>
        <div v-else-if="value.key === 'schedule' && value.service">
          <Schedule :portlet="language.main.portlet"></Schedule>
        </div>
        <div v-else-if="value.key === 'recentboard' && value.service">
          <Recent :portlet="language.main.portlet"></Recent>
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
import Recent from "./my/recent.vue";
import config from "../../config/config.json";
import $ from "jquery";
// import { now } from "moment";
// import "./swipeButton.css";
import "vue-swipe-actions/dist/vue-swipe-actions.css";
import { SwipeList, SwipeOut } from "vue-swipe-actions";
export default {
  components: {
    Mail,
    Notice,
    Approving,
    Schedule,
    Recent,
    SwipeOut,
    SwipeList,
  },
  computed: {
    ...mapState(["language", "main", "config"]),
    ...mapGetters(["GetMain"]),
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
      ],
      copycirarr: [],
      positionxy: [],
      enabled: true,
      mockSwipeList: [
        {
          id: "a",
          title: "Some title",
        },
        {
          id: "b",
          title: "Some title",
        },
      ],
    };
  },
  mounted() {
    var elems = $(".minicircle");
    var increase = (Math.PI * 2) / elems.length;
    // console.log(increase * (180.0 / Math.PI));
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
      // var xy = {};
      // xy["x"] = x - this.centerdotx;
      // xy["y"] = this.centerdotx - y;
      var nowx = x - this.centerdotx;
      var nowy = this.centerdoty - y;
      // if (y > this.centerdoty) {
      //   nowy = this.centerdoty-y;
      // }else{
      //   nowy = y-this.centerdoty;
      // }
      console.log(x, y);

      console.log(nowx, nowy, "nowx, nowy");
      // console.log(this.getValueBetween0And360(Math.atan2(nowx, nowy) * (180.0 / Math.PI)) , i);

      // this.positionxy.push({value:(increase * (180.0 / Math.PI)*i)-90,key:i});
      this.positionxy.push(increase * (180.0 / Math.PI) * -i);
      // this.positionxy.push(this.getValueBetween0And360(Math.atan2(nowx, nowy) * (180.0 / Math.PI)));
      // this.positionxy.push({value:((increase * (180.0 / Math.PI)*i)-90)*-1,key:i});
    }
  },
  methods: {
    remove(item) {
      this.mockSwipeList = this.mockSwipeList.filter((i) => i !== item);
      // console.log(e, 'remove');
    },
    itemClick(e) {
      console.log(e, "item click");
    },
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
      console.log(
        "hey",
        el,
        deltaX,
        deltaY,
        offsetX,
        offsetY,
        clientX,
        clientY,
        first,
        last
      );
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
      console.log(e, "아딱!!!!!!!!!!!!!!!!!!!!!방금눌렀다");
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
        console.log("지금 딱 돌아가야함");
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
      console.log(e, "아딱!!!!!!!!!!!!!!!!!!!!!방금뗏다");
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
      return config.main.photo.replace(/@/g, sabun);
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
        //console.log(`start a[${i}] = ${a[i]}, diffPos = ${diffPos}, iF = ${iF}, diffF = ${diffF}, sign = ${sign}`);
        console.log(diffPos, ":diffPos");

        if (diffPos < diffF) {
          diffF = diffPos;
          // iF = i;
          result.index = i;
          result.dif = diffPos;
        }
        //console.log(`end   a[${i}] = ${a[i]}, diffPos = ${diffPos}, iF = ${iF}, diffF = ${diffF}`);
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
.circle li {
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

@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
/* app specific styles */
.swipeout-action {
  display: flex;
  align-items: center;
  padding: 0 3rem;
  cursor: pointer;
  left: 0;
}
</style>