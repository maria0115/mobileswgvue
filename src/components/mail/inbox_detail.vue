<template>
  <div class="m_contents02">
      <form action="">
        <ul>
          <swipe-list
          v-if="this.mail.data[this.path].data.data"
        ref="list"
        class="card"
        :disabled="!enabled"
        :items="this.mail.data[this.path].data.data"
        item-key="id"
      >
        <template v-slot="{ item, index }">
          <li
            :key="index"
            :class="{ new: item.unread }"
          >
            <!-- <em class="tooltip" :class="{ active: tooltipActive(index) }"
              ><strong v-for="(v, name) in tooltipText" :key="name"
                ><div>{{ `${v}` }}</div></strong
              ></em
            > -->
            <span class="basic_img" v-if="item.sender" :class="[{ on: mail.checkBtn.photoon }]">
              <em class="no_img" :style="randomColor()"
                ><b>{{ item.sender.split("")[0] }}</b></em
              >
            </span>
            <!-- <span v-if="item.sender" class="basic_img" :class="[{ on: mail.checkBtn.photoon }]">
              <img
                :src="url(item.photo)"
                @error="photoError(index)"
                v-if="item.photoerror"
                alt=""
              />
              <em class="no_img" :style="randomColor()"
                ><b>{{ item.sender.split("")[0] }}</b></em
              >
            </span> -->
            <input
              type="checkbox"
              @click="boxClick"
              class="edit_check"
              :class="[
                { active: mail.checkBtn.allchecked },
                { active02: onecheck(index) },
                { on: mail.checkBtn.editclicked },
              ]"
              :value="{ unid: item.unid, key: index }"
              v-model="mail.checkBtn.checkedNames"
            />
            <dl>
              <dt>
                {{ item.sender
                }}<em class="rece" v-if="item.tostuff!==undefined" :class="{ on: item.tostuff.receive }"
                  >수신</em
                ><em class="refer" v-if="item.tostuff!==undefined" :class="{ on: item.tostuff.ref }">참조</em>
              </dt>
              <dd>{{ item.subject }}</dd>
            </dl>
            <div class="impor">
              <p>
                {{ transTime(item.created)
                }}<img  v-if="item.importance!==undefined"
                  :src="`../mobile/img/flag${important(item.importance)}.png`"
                  alt=""
                />
              </p>
              <span
                :class="[{ clip: haveClip(item.attach) }]"
              ></span>
            </div>
          </li>
        </template>
        <template v-slot:right="{ item,index }">
          <i class="trash_can" @click="mailDelete(item,index)"></i>
        </template>
      </swipe-list>
          <infinite-loading @infinite="infiniteHandler" :identifier="infiniteId" ref="infiniteLoading" spinner="waveDots">
            <div
              slot="no-more"
              style="
                color: rgb(102, 102, 102);
                font-size: 14px;
                padding: 10px 0px;
              "
            >
              목록의 끝입니다 :)
            </div>
          </infinite-loading>
        </ul>
      </form>
    </div>
</template>

<script>
import config from "../../config/config.json";
import InfiniteLoading from "vue-infinite-loading";
import { mapState, mapGetters } from "vuex";
import { Mail } from "../../api/index.js";
import "vue-swipe-actions/dist/vue-swipe-actions.css";
import { SwipeList, SwipeOut } from "vue-swipe-actions";
export default {
  components: {
    InfiniteLoading,
    SwipeOut,
    SwipeList,
  },
  data() {
    return {
      // path:this.path,
      active: false,
      tooltipActiveIndex: -1,
      tooltipText: [""],
      checkEvent: "touch",
      infiniteId:0,
      enabled: true,

    };
  },
  computed: {
    ...mapState(["mail","config","systemcolor"]),
    ...mapGetters(["GetMail"]),
    path(){ 
      return this.$route.path.substring(this.$route.path.lastIndexOf("/")+1);
    },
  },
  beforeRouteLeave (to, from, next) {
    // this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset'); 
    this.infiniteId+=1;
    next();
  },
  created() {

  },
  mounted() {
    if ("ontouchstart" in document.documentElement !== true) {
      this.checkEvent = "mouse";
    }
  },
 
  methods: {
    mailDelete(item,index) {
      var data = {};
      data.unid = item.unid;
      data.key = index;
      this.mail.checkBtn.checkedNames.push(data);
      this.$store.dispatch("MailDelete", {
        datas: this.mail.checkBtn.checkedNames,
        type: this.path,
      });
      this.$store.commit("mailDelete",{type: this.path});
    },
    remove(item) {
      this.mail.data[this.path].data.data = this.mail.data[this.path].data.data.filter((i) => i !== item);
      // console.log(e, 'remove');
    },
    // 스크롤 페이징
    infiniteHandler($state) {
      // console.log("스크롤시작");

      this.GetMail[this.path].page = String(
        parseInt(this.GetMail[this.path].page) + 1
      );
      // this.GetMail['inbox_detail'].size+= 1;
      console.log(this.GetMail[this.path].page,"page")

      Mail(this.GetMail[this.path])
        .then((response) => {
          // console.log("노드응답옴")
          return response.data.data;
        })
        .then((data) => {
          console.log(data)

          setTimeout(() => {
            if (data) {
              // console.log(this.mail.data[this.path])
              if(Object.keys(this.mail.data[this.path].data).length>0){
                this.mail.data[this.path].data.data =
                  this.mail.data[this.path].data.data.concat(data);
              }else{
                this.mail.data[this.path].data.data=data;
              }
              $state.loaded();

              // 끝 지정(No more data) - 데이터가 EACH_LEN개 미만이면
              // console.log(data.length / this.GetMail[this.path].size)
              if (data.length / this.GetMail[this.path].size < 1) {
                $state.complete();
                console.log("데이터가 EACH_LEN개 미만")
              }
            } else {
              // 끝 지정(No more data)
              console.log("끝 지정(No more data)")
              $state.complete();
            }
          }, 1000);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    haveClip(value) {
      // if (value.attachinfo.length > 0 && value.attachinfo[0] !== "") {
      //   return true;
      // }
      // return false;
      if (value !==undefined) {
        return value;
      }else{
        return false;
      }
    },
    important(boo) {
      if (boo) {
        return "02";
      }
      return "";
    },
    boxClick(){
      this.$store.commit("disAllCheck");

    },
    onecheck(value) {
      //   if(checkedNames.indexOf(value)!==-1){
      //       return true;
      //   }
      for (var i = 0; i < this.mail.checkBtn.checkedNames.length; i++) {
        if (this.mail.checkBtn.checkedNames[i].key == value) {
          return true;
        }
      }
      return false;
    },
    tooltipActive(index) {
      if (this.tooltipActiveIndex === index) {
        return true;
      }
      return false;
    },
    photoError(index) {
      this.mail.data[this.path].data.data[index].photoerror = false;
    },
    // utc 시간 to local 시간
    transTime(time) {
      var moment = require("moment");
      var localTime = moment.utc(time).toDate();
      localTime = moment(localTime).format("YYYY.MM.DD HH:mm");
      return localTime;
    },
    randomColor() {
      const color = ["#bcbbdd", "#bbcbdd", "#bbddd7", "#d0d0d0"];
      return `background: ${color[Math.floor(Math.random() * 4)]}`;
    },
    url(sabun) {
      if (sabun!==undefined&&sabun.length > 0) {
        return config.main.photo.replace(/@/g, sabun);
      }
    },
    onOpen(e, value, index) {
      // var attachInfoArr =
      this.tooltipText = value.attachinfo;
      this.tooltipActiveIndex = index;
    },
    onClose(e, value, index) {
      this.tooltipActiveIndex = -1;
    },
  },
};
</script>

<style>
.trash_can {
  /* position:absolute;
  top:0;
  right:0; */
  width:4.37rem;
  height:100%;
  background:#ff743c url(../../mobile/img/check.png)center no-repeat;
  background-size:1.12rem 1.12rem;
  }

.swipeout-action {
  display: flex;
  align-items: center;
  padding: 0 3rem;
  cursor: pointer;
  left: 0;
}
</style>