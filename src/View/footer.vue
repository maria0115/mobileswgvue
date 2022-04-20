<template>
  <div>
    <ul class="btm_btn clfix">
      <li class="home"><router-link :to="{ name: 'main' }"></router-link></li>
      <li class="back" @click="RouterBack"><a></a></li>
      <li class="go" :class="{isgo:isNotGo()}" @click="RouterGo"><a></a></li>
      <li class="btm_menu" @click="BtmMenu"><a></a></li>
      <li class="btm_organ" @click="orgClick()"><a></a></li>
      <!-- <li class="btm_allim">
        <a><em class="allim_num">23</em></a>
      </li> -->
    </ul>
    <div class="btm_menu_list" @click="Close">
      <div class="list_inner">
        <ul class="clfix">
          <li v-for="(value, name) in GetCategory['main']" :key="name">
            <!-- v-if="value.key !== 'person'" -->
            <a @click="MenuGo(value)"
              ><span :class="`${value.category}_f_ic`"></span
              >{{ value.title }}</a
            >
          </li>
        </ul>
        <!-- <em class="close_btn"></em> -->
      </div>
    </div>
    <OrgFooter
      @CardOpen="CardOpen"
      :modalon="modalon"
      @ModalOff="ModalOff"
    ></OrgFooter>
    <PersonCard
      @ModalOff="CardOff"
      :item="cardItem"
      :modalon="cardon"
    ></PersonCard>
    <div class="list_modal" :class="{ active: calListOpen.status }">
      <div class="list_md_inner">
        <div class="list_header">
          <h2 class="today_date">{{ dateconvert() }}</h2>
          <em class="modal_close" @click="calListClose"></em>
        </div>
        <div class="con_body">
          <ul class="cal_view" v-if="this.GetSaveScheduleList.data.length > 0">
            <li
              @click="Detail(value)"
              v-for="(value, index) in this.GetSaveScheduleList.data"
              :key="index"
            >
              <a>
                <dl>
                  <dt v-if="value.data.allDay">{{ lang.allday }}</dt>
                  <dt v-else>
                    {{ value.data.starttime.split(":")[0] }}:{{
                      value.data.starttime.split(":")[1]
                    }}
                    ~ {{ value.data.endtime.split(":")[0] }}:{{
                      value.data.endtime.split(":")[1]
                    }}
                  </dt>

                  <dd>{{ value.data.subject }}</dd>
                </dl>
              </a>
            </li>
          </ul>
          <div class="no_schedule" v-else>
            <div>
              <span></span>
              <p>{{ lang.havenotschedule }}<br />{{ lang.beregister }}</p>
            </div>
          </div>
        </div>
        <div class="con_ft" @click="Write">
          <span>{{ header.schedule }}{{ header.write }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PersonCard from "./PersonCard.vue";
import OrgFooter from "./OrgFooter.vue";
import { CategoryList } from "../api/index.js";
export default {
  created() {
    this.lang = this.GetScheduleL.list;
    this.header = this.GetScheduleL.header;
    this.hkey = history.state.key;
    
  },
  beforeDestroy() {
    this.$store.commit("pushHistory",this.hkey);
    this.calListClose();
  },
  computed: {
    ...mapGetters("calendarjs", ["GetSaveScheduleList"]),

    ...mapState("mailjs", ["mail"]),
    ...mapState("calendarjs", ["calListOpen"]),
    ...mapState(["org","history"]),
    ...mapGetters("mailjs", ["GetMailDetail", "GetMail", "GetMailConfig"]),
    ...mapGetters(["GetMainLanguage", "GetCategory", "GetHeader"]),
    path() {
      return this.$route.path.substring(this.$route.path.lastIndexOf("/") + 1);
    },
  },
  components: {
    OrgFooter,
    PersonCard,
  },
  data: function () {
    return {
      modalAutoOrg: 0,
      modalon: false,
      cardItem: {},
      cardon: false,
      mainmenu: [],
      days: ["일", "월", "화", "수", "목", "금", "토"],
    };
  },

  methods: {
    isNotGo(){
      var index = this.history.indexOf(this.hkey);
      return index==-1||index==this.history.length-1;
    },
    Close(e) {
      var LayerPopup = $(".btm_menu_list");
      if (LayerPopup.has(e.target).length === 0) {
        $(".btm_menu_list").removeClass("active");
      }
    },
    Write() {
      this.$router.push({
        name: "calwrite",
        query: {
          data: JSON.stringify({ date: this.calListOpen.date, starttime: "" }),
        },
      });
    },
    async Detail(value) {
      this.$store.commit("calendarjs/SaveScheduleUnid", {
        unid: value.data.unid,
        where: "month",
      });
      // await this.$store.dispatch("CalDetail",{data:value.data,path:this.$route.path,which:"month"});
      this.$router.push({
        name: "calread",
        query: {
          data: JSON.stringify({
            date: value.data.enddate,
            time: `${value.data.starttime} ~ ${value.data.endtime}`,
          }),
        },
      });
    },
    dateconvert() {
      var params = this.calListOpen;
      return `${params.date} (${this.days[params.day]})`;
    },
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
    // SetHeader(data) {
    //   this.$store.commit("SetHeader", data);
    // },
    async MenuGo(value) {
      this.categorys = this.GetCategory[value.lnbid];
      if (!this.categorys) {
        this.categorys = await this.$store.dispatch(
          "CategoryList",
          value.lnbid
        );
      }
      var name = "";
      value.top = value.lnbid;
      name = `${value.category}first`;
      if (value.category == "board") {
        name = `${value.category}list`;
        if (value.type == "board") {
          this.$router.push({
            name: name,
            query: {
              type: value.type,
              data: JSON.stringify({
                lnbid: this.categorys[0].lnbid,
                type: value.type,
                top: value.top,
                title: this.categorys[0].title,
              }),
            },
          });
          return;
        }
      } else if (value.category === "approval") {
        var approve = this.ThisCategory("approve");
         if (approve) {
          this.$router.push({
            name: name,
            query: {
              data: JSON.stringify({
                title: approve.title,
                type: approve.category,
                top: value.top,
                lnbid: approve.lnbid,
              }),
            },
          });
        }
        return;
      }
      // this.SetHeader(value);
      this.$router.push({
        name: name,
        query: { data: JSON.stringify(value) },
      });
    },
    InitMenu(id) {
      CategoryList(id).then((res) => {
        for (var key in res.data) {
          this.mainmenu[key] = res.data[key];
        }
      });
    },
    CardOff() {
      this.cardon = false;
    },
    CardOpen(item) {
      this.cardon = true;
      this.cardItem = item;
    },
    ModalOff() {
      this.modalon = false;
    },
    SetHeader(data) {
      this.$store.commit("SetHeader", data);
    },
    // 전 url 이동
    RouterBack() {
      // this.SetHeader(this.GetHeader.prevmenu);
      this.$store.commit("mailjs/Back");
      this.$store.commit("SetBack", true);
      this.$router.go(-1);
    },
    // 후 url 이동
    RouterGo() {
      // this.SetHeader(this.GetHeader.prevmenu);
      this.$store.commit("mailjs/Back");
      this.$router.go(1);
    },
    // 새로고침
    RouterRefresh() {
      this.$router.push(this.$route.path);
    },
    RouterLink() {
      console.log("routerlink");
    },
    orgClick(to) {
      $(".btm_menu_list").removeClass("active");

      this.modalon = true;
    },
    calListClose() {
      this.$store.commit("calendarjs/calListOpen", false);
    },
    BtmMenu() {
      // alert("jquery 안됨")
    },
  },
};
</script>

<style>
</style>