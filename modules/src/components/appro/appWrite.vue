<template>
  <div>
    <BackHeader desc="결재양식함에서 지정" :title="title"></BackHeader>
    <div class="a_contents05">
      <form action="">
        <ul>
          <li class="app_tit">
            <strong>제목</strong>
            <div><input type="text" palceholder="1일 연차 신청" v-model="Subject" /></div>
          </li>
          <li class="proposer">
            <strong>신청자</strong>
            <div>
              {{ GetMyInfo.info.name }} {{ GetMyInfo.info.position }} /
              {{ GetMyInfo.info.dept }}
            </div>
          </li>
          <li class="approver">
            <strong>결재자</strong>
            <div>
              <input
                @click="orgClick('SendTo')"
                type="text"
                :value="this.SendToArr()"
                @keyup="
                  SendToSearch('SendTo', 'sendtosearch', $event.target.value)
                "
              />
              <span class="ps_add">추가</span>
              <span class="app_pointer" @click="orgClick('SendTo')"
                >결재선 지정</span
              >
            </div>
            <div class="add_search" :class="{ active: this.sendtosearch }">
              <ul>
                <li
                  v-for="(value, index) in this.autosearchorg.schedule.SendTo"
                  :key="index"
                  @click="AddOrg('SendTo', value, 'sendtosearch')"
                >
                  <span class="per_img">
                    <em class="no_img" :style="randomColor()"
                      ><b>{{ value.name.split("")[0] }}</b></em
                    >
                  </span>
                  <dl>
                    <dt>{{ value.name }} / {{ value.department }}</dt>
                    <dd>{{ value.email }}</dd>
                  </dl>
                  <em></em>
                </li>
              </ul>
            </div>
          </li>
          <li class="approute">
            <strong>결재경로</strong>
            <div>
              <div>
                <p>
                  기안자_{{ GetMyInfo.info.dept }} {{ GetMyInfo.info.name }}
                  {{ GetMyInfo.info.position }}
                </p>
                <ul>
                  <li
                    v-for="(value, index) in scheduleorg.SendTo"
                    @click="Pointer(index)"
                    :key="index"
                  >
                    <em>{{ index + 1 }}</em
                    >담당 {{ AppPath(value) }}
                  </li>
                </ul>
              </div>
              <p>
                <span class="up" @click="Up"
                  ><img src="../../mobile/img/up_btn.png" alt="위" />위</span
                >
                <span class="down" @click="Down"
                  ><img
                    src="../../mobile/img/down_btn.png"
                    alt="아래"
                  />아래</span
                >
                <span class="delet" @click="Delete()">삭제</span>
                <span class="all_delet" @click="AllDel">모두삭제</span>
              </p>
            </div>
          </li>
          <li class="referrer">
            <strong>참조자</strong>
            <div>
              <p>
                <input
                  @click="orgClick('CopyTo')"
                  type="text"
                  @keyup="
                    SendToSearch('CopyTo', 'copytosearch', $event.target.value)
                  "
                /><em></em>
              </p>
              <span class="ps_add">추가</span>
            </div>
            <div class="add_search" :class="{ active: this.copytosearch }">
              <ul>
                <li
                  v-for="(value, index) in this.autosearchorg.schedule.CopyTo"
                  :key="index"
                  @click="AddOrg('CopyTo', value, 'copytosearch')"
                >
                  <span class="per_img">
                    <em class="no_img" :style="randomColor()"
                      ><b>{{ value.name.split("")[0] }}</b></em
                    >
                  </span>
                  <dl>
                    <dt>{{ value.name }} / {{ value.department }}</dt>
                    <dd>{{ value.email }}</dd>
                  </dl>
                  <em></em>
                </li>
              </ul>
            </div>
          </li>
          <li class="division">
            <strong>구분</strong>
            <div>
              <select v-model="onCategory">
                <option v-for="(value, index) in category"
                  :key="index"
                  :value="Object.keys(value)[0]">{{ value[Object.keys(value)[0]] }}</option>
              </select>
            </div>
          </li>
          <li class="date">
            <strong>일시</strong>
            <div><input type="date" /> ~ <input type="date" /></div>
          </li>
          <li class="num_day">
            <strong>일수</strong>
            <div><input type="text" v-model="daycount" />일</div>
          </li>
          <li class="reason">
            <strong>사유</strong>
            <div>
              <textarea v-model="Body_Text"></textarea>
            </div>
          </li>
          <li class="file_add">
            <strong>첨부</strong>
            <div>
              <input class="load_name" />
              <div class="filebox">
                <!-- @click="submitFile()" -->
                <label for="add_f">찾아보기</label>
                <input
                  type="file"
                  id="add_f"
                  v-on:change="handleFileUpload()"
                  ref="file"
                />
                <!-- multiple
                ref="file"
                v-on:change="handleFileUpload()"  -->
              </div>
            </div>
          </li>
        </ul>
      </form>
    </div>
    <BtnPlus></BtnPlus>
    <div class="a_organ_modal">
      <div class="a_organ_con">
        <form>
          <div>
            <strong>결재선 지정</strong>
            <div>
              <input
                type="text"
                class="search"
                placeholder="검색어를 입력하세요"
                autocomplete="on"
                @keyup="OrgSearch($event.target.value)"
              />
              <div class="btns">
                <span class="del_btn"><em></em></span>
                <span class="search_icon" @click="SetAutoOrg"
                  ><img src="../../mobile/img/search_icon.png" alt="검색하기"
                /></span>
              </div>
            </div>
          </div>
          <ul class="a_organlist">
            <span
              class=""
              v-for="(value, name) in this.GetMail.org.trans"
              :key="name"
            >
              <org-item
                :item="value"
                :modalAutoOrg="modalAutoOrg"
                @OpenFolder="OpenFolder"
              ></org-item>
            </span>
          </ul>
          <div class="a_organ_ft">
            <div>
              <span><em class="sv_radio"></em>결재</span>
              <span><em class="sv_radio"></em>합의</span>
            </div>
            <span class="ps_add">추가</span>
          </div>
        </form>
        <span class="a_modal_close" @click="ModalOff"></span>
      </div>
    </div>
  </div>
</template>

<script>
import BackHeader from "./backheader.vue";
import BtnPlus from "./btnPlus.vue";
import SubMenu from "./menu.vue";
import { mapState, mapGetters } from "vuex";
import OrgItem from "../calendar/orgitemview.vue";
export default {
  created() {
    const date = new Date();
    this.startdate = date;
    this.enddate = date;
    console.log(this.GetMail.org.trans)
  },
  components: {
    BackHeader,
    SubMenu,
    BtnPlus,
    OrgItem,
  },
  beforeDestroy() {
    this.$store.commit("calendar/ScheduleOrgDataInit");
  },
  data() {
    return {
      file: [],
      morePlus: [
        { refer: "기결문서 참조" },
        { approval: "결재" },
        { upper: "상신" },
        { save: "저장" },
      ],
      title: "결재양식함에서 지정",
      modalon: false,
      modalAutoOrg: 0,
      copytosearch: false,
      sendtosearch: false,
      copytosearchkeyword: "",
      sendtosearchkeyword: "",
      ExpireDate: "",
      pointer: -1,
      category: [
        { year: "연차휴가" },
        { prize: "경조/포상" },
        { health: "보건" },
        { free: "무급휴가" },
        { month: "월차" },
        { sick: "병가" },
        { Refresh: "Refresh" },
        { military: "병역동원훈련" },
        { baby: "산전산후" },
        { early: "조퇴" },
      ],
      onCategory: "year",
      file: [],
      Subject: "",
      Body_Text: "",
      rereclick: false,
      open: true,
      daycount: 0,
      startdate: null,
      enddate: null,
    };
  },
  computed: {
    ...mapState("calendar",["scheduleorg"]),
    ...mapState("mailjs",["autosearchorg"]),
    ...mapGetters("mailjs",["GetMail",]),
    ...mapGetters("mainjs",[ "GetMyInfo"]),
  },
  methods: {
    submitFile() {
      this.$refs.file.click();
    },
    handleFileUpload() {
      this.file = [];
      this.file.push(this.$refs.file.files[0]);
      //   this.file.push(this.$refs.file.files[0]);
      console.log(this.file);
      // }
    },
    OrgSearch(value) {
      console.log(value.length);
      if (value.length >= 2) {
        var data = {};
        data.menu = "schedule";
        data.keyword = value;
        data.who = this.scheduleorg.pointer;
        this.$store.dispatch("OrgAutoSearch", data);
      }
    },
    SetAutoOrg() {
      this.modalAutoOrg += 1;
    },
    ModalOff() {
      this.modalon = false;
      this.$store.commit("calendar/SearchOrgInit");
    },
    OpenFolder() {
      console.log("열었다");
    },
    ScheduleOrgDataDelete(data, pointer) {
      this.$store.commit("calendar/ScheduleOrgDataDelete", { data, pointer });
    },
    orgClick(to) {
      if (!this.tome) {
        this.$store.commit("calendar/ScheduleOrgPointer", to);
        this.modalon = true;
      }
    },
    SendToSearch(who, keyword, value) {
      if (value.length >= 2) {
        var data = {};
        data.menu = "schedule";
        data.who = who;
        data.keyword = value;

        this.$store.dispatch("OrgAutoSearch", data);
      }
    },
    async AddOrg(who, value, what) {
      await this.$store.commit("calendar/ScheduleAddOrg", {
        who,
        value,
        menu: "schedule",
      });
      this[what] = false;
      this[`${what}keyword`] = "";
      this.$store.commit("calendar/SearchOrgInit");
    },
    showAddSearch(value) {
      this[value] = true;
    },
    randomColor() {
      const color = ["#bcbbdd", "#bbcbdd", "#bbddd7", "#d0d0d0"];
      return `background: ${color[Math.floor(Math.random() * 4)]}`;
    },
    SendToArr() {
      // for="(value, index) in scheduleorg.SendTo"
      var str = "";
      for (var data of this.scheduleorg.SendTo) {
        str += data.shortname;
        str += ",";
      }

      return str.slice(0, -1);
    },
    AppPath(value) {
      // <i v-if="value.department">{{value.department}}</i> {{value.name}}
      if (value.department) {
        return `${value.department} ${value.name}`;
      } else {
        return value.name;
      }
    },
    changeArrayOrder(list, targetIdx, moveValue) {
      console.log(list);
      if (list.length < 0) return;
      const newPosition = targetIdx + moveValue;
      if (newPosition < 0 || newPosition >= list.length) return;
      const tempList = JSON.parse(JSON.stringify(list));
      const target = tempList.splice(targetIdx, 1)[0];
      tempList.splice(newPosition, 0, target);
      return tempList;
    },
    Pointer(index) {
      this.pointer = index;
    },
    Up() {
      if (this.pointer !== -1 && this.pointer !== 0) {
        var list = this.scheduleorg.SendTo;
        this.scheduleorg.SendTo = this.changeArrayOrder(list, this.pointer, -1);
        if (this.pointer === 0) {
          this.pointer = list.length - 1;
        } else {
          this.pointer -= 1;
        }
      }
    },
    Down() {
      if (
        this.pointer !== -1 &&
        this.pointer !== this.scheduleorg.SendTo.length - 1
      ) {
        var list = this.scheduleorg.SendTo;
        this.scheduleorg.SendTo = this.changeArrayOrder(list, this.pointer, 1);
        if (this.pointer === list.length - 1) {
          this.pointer = 0;
        } else {
          this.pointer += 1;
        }
      }
    },
    Delete() {
      if (this.pointer !== -1) {
        this.scheduleorg.SendTo = this.scheduleorg.SendTo.filter(
          (element) => element !== this.scheduleorg.SendTo[this.pointer]
        );
        this.pointer = -1;
      }
    },
    AllDel() {
      this.scheduleorg.SendTo = [];
    },
  },
};
</script>

<style>
</style>