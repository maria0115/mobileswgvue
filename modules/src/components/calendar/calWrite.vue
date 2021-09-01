<template>
  <div>
    <div class="cal_w_header">
      <h2>
        <a @click="RouterBack"
          ><img src="../../mobile/img/wmail_back.png" alt="" /></a
        >일정쓰기
      </h2>
      <div>
        <span class="cal_save"><a href="mob_cal_list.html">등록</a></span>
      </div>
    </div>
    <div class="m_contents08 srl">
      <form action="">
        <ul class="wc_top">
          <li class="cal_title">
            <strong>일정제목</strong>
            <div>
              <input type="text" v-model="Subject" />
              <span class="tit_clip" @click="submitFile()" />
              <input
                multiple
                style="display: none"
                type="file"
                id="file"
                ref="file"
                v-on:change="handleFileUpload()"
              />
            </div>
          </li>
          <li class="cal_category">
            <strong>카테고리</strong>
            <div class="">
              <select name="" v-model="onCategory" id="">
                <option
                  v-for="(value, index) in category"
                  :key="index"
                  :value="Object.keys(value)[0]"
                >
                  {{ value[Object.keys(value)[0]] }}
                </option>
              </select>
            </div>
          </li>
          <li class="cal_open">
            <strong>공개여부</strong>
            <div class="repeat_s">
              <span @click="isOpen(true)">
                <em :class="{ click: this.open }"></em>공개
              </span>
              <span @click="isOpen(false)">
                <em :class="{ click: !this.open }"></em>비공개
              </span>
            </div>
          </li>
          <li class="cal_date">
            <strong>일자</strong>
            <div>
              <input type="date" v-model="date" />
            </div>
          </li>
          <li class="repeat_s">
            <strong>반복</strong>
            <div>
              <span @click="rClick('regular')">
                <em :class="{ click: !rereclick }"></em>일반
              </span>
              <span class="rere_btn" @click="RBtn"
                ><!--클래스명 추가됨 8월 12일 -->
                <em :class="{ click: rereclick }"></em>반복예약
              </span>
            </div>
          </li>
          <li class="cal_time">
            <strong>시간</strong>
            <div>
              <input type="time" value="15:00" v-model="startTime" /><b>~</b
              ><input type="time" value="16:00" v-model="endTime" />
            </div>
          </li>
          <li class="cal_att">
            <strong>참석자</strong>
            <div>
              <ul class="list_add clfix">
                <li
                  class="add_obj"
                  v-for="(value, index) in scheduleorg.SendTo"
                  :key="index"
                >
                  {{ value.shortname }}
                  <div class="del_add">
                    <dl>
                      <dt>{{ value.name }} / {{ value.department }}</dt>
                      <dd>{{ value.email }}</dd>
                    </dl>
                    <span @click="ScheduleOrgDataDelete(value, 'SendTo')"
                      >삭제</span
                    >
                  </div>
                </li>

                <li class="new_addr">
                  <label for="toinput" class="blind">참석자</label>
                  <textarea
                    @click="
                      [
                        SendToSearch(
                          'SendTo',
                          'sendtosearch',
                          $event.target.value
                        ),
                        showAddSearch('sendtosearch'),
                      ]
                    "
                    id="sinput"
                    v-model="sendtosearchkeyword"
                    @keyup="
                      SendToSearch(
                        'SendTo',
                        'sendtosearch',
                        $event.target.value
                      )
                    "
                  ></textarea>
                </li>
              </ul>
              <span class="c_organ" @click="orgClick('SendTo')">조직도</span>
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
            <ul class="more_cal_att">
              <li>
                <strong>참조</strong>
                <div>
                  <ul class="list_add clfix">
                    <li
                      class="add_obj"
                      v-for="(value, index) in this.scheduleorg.CopyTo"
                      :key="index"
                    >
                      {{ value.shortname }}
                      <div class="del_add">
                        <dl>
                          <dt>{{ value.name }} / {{ value.department }}</dt>
                          <dd>{{ value.email }}</dd>
                        </dl>
                        <span @click="ScheduleOrgDataDelete(value, 'CopyTo')"
                          >삭제</span
                        >
                      </div>
                    </li>
                    <li class="new_addr">
                      <label for="toinput" class="blind">참조</label>
                      <textarea
                        @click="
                          [
                            SendToSearch(
                              'CopyTo',
                              'copytosearch',
                              $event.target.value
                            ),
                            showAddSearch('copytosearch'),
                          ]
                        "
                        id="cinput"
                        v-model="copytosearchkeyword"
                        @keyup="
                          SendToSearch(
                            'CopyTo',
                            'copytosearch',
                            $event.target.value
                          )
                        "
                      ></textarea>
                    </li>
                  </ul>
                  <span class="c_organ" @click="orgClick('CopyTo')"
                    >조직도</span
                  >
                </div>
                <div class="add_search" :class="{ active: this.copytosearch }">
                  <ul>
                    <li
                      v-for="(value, index) in this.autosearchorg.schedule
                        .CopyTo"
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
              <li>
                <strong>숨은참조</strong>
                <div>
                  <ul class="list_add clfix">
                    <li
                      class="add_obj"
                      v-for="(value, index) in this.scheduleorg.BlindCopyTo"
                      :key="index"
                    >
                      {{ value.shortname }}
                      <div class="del_add">
                        <dl>
                          <dt>{{ value.name }} / {{ value.department }}</dt>
                          <dd>{{ value.email }}</dd>
                        </dl>
                        <span
                          @click="ScheduleOrgDataDelete(value, 'BlindCopyTo')"
                          >삭제</span
                        >
                      </div>
                    </li>
                    <li class="new_addr">
                      <label for="cryinput" class="blind">숨은참조</label>
                      <textarea
                        @click="
                          [
                            SendToSearch(
                              'BlindCopyTo',
                              'blindcopytosearch',
                              $event.target.value
                            ),
                            showAddSearch('blindcopytosearch'),
                          ]
                        "
                        id="binput"
                        v-model="blindcopytosearchkeyword"
                        @keyup="
                          SendToSearch(
                            'BlindCopyTo',
                            'blindcopytosearch',
                            $event.target.value
                          )
                        "
                      ></textarea>
                    </li>
                  </ul>
                  <span class="c_organ" @click="orgClick('BlindCopyTo')"
                    >조직도</span
                  >
                </div>
                <div
                  class="add_search"
                  :class="{ active: this.blindcopytosearch }"
                >
                  <ul>
                    <li
                      v-for="(value, index) in this.autosearchorg.schedule
                        .BlindCopyTo"
                      @click="AddOrg('BlindCopyTo', value, 'blindcopytosearch')"
                      :key="index"
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
            </ul>
          </li>
          <li class="cal_place">
            <strong>장소</strong>
            <div>
              <input type="text" v-model="place" />
            </div>
          </li>
          <li class="att_file">
            <strong>첨부파일</strong>
            <div>
              <ul class="file_list">
                <li v-for="(value, index) in this.file" :key="index">
                  {{ value.name }}<span class="att_del"></span>
                </li>
              </ul>
            </div>
          </li>
          <li class="cal_memo">
            <strong>메모</strong>
            <div>
              <textarea id="memo_t" v-model="Body_Text"></textarea>
            </div>
          </li>
        </ul>
      </form>
    </div>
    <div class="rere_modal" :class="{ active: rmodalon }">
      <!--8월 12일 추가됨 반복예약-->
      <div class="rere_con">
        <strong>반복설정</strong>
        <p>행사가 반복될 때</p>
        <ul>
          <li>
            <select id="rere_box" v-model="RepeatUnit">
              <option value="D" selected>일 단위</option>
              <option value="W">주 단위</option>
              <option value="MD">월 단위(날짜)</option>
              <option value="MP">월 단위(요일)</option>
              <option value="Y">년 단위</option>
            </select>
          </li>
          <li class="ri_adjust clfix">
            <div class="se_box01">
              <select
                v-if="RepeatUnit == 'D'"
                v-model="RepeatInterval"
                name="sel01"
                id="sel01"
              >
                <option value="매일 반복" selected>매일 반복</option>
                <option :value="fill(2,num)" v-for="num in 31" :key="num">
                  {{ num }}일마다 반복
                </option>
              </select>
              <select
                v-if="RepeatUnit == 'W'"
                v-model="RepeatInterval"
                id="sel02_1"
              >
                <option value="매주 반복" selected>매주 반복</option>
                <option :value="fill(2,num)" v-for="num in 8" :key="num">
                  {{ num }}주마다 반복
                </option>
              </select>
              <select
                v-model="RepeatInterval"
                v-if="RepeatUnit == 'MD' || RepeatUnit == 'MP'"
                id="sel03_1"
              >
                <option value="매월 반복" selected>매월 반복</option>
                <option :value="fill(2,num)" v-for="num in 12" :key="num">
                  {{ num }}개월마다 반복
                </option>
              </select>
              <select
                v-model="RepeatInterval"
                v-if="RepeatUnit == 'Y'"
                id="sel05_1"
              >
                <option value="매년 반복" selected>매년 반복</option>
                <option :value="fill(2,num)" v-for="num in 10" :key="num">
                  {{ num }}년마다 반복
                </option>
              </select>
            </div>
            <div
              class="se_box02"
              v-if="
                RepeatUnit == 'W' || RepeatUnit == 'MD' || RepeatUnit == 'MP'
              "
            >
              <select id="se102_2" v-model="RepeatAdjust_W" v-if="RepeatUnit == 'W'">
                <option
                  :value="fill(2,index)"
                  v-for="(value, index) in daysSort"
                  :key="index"
                >
                  {{ value }}요일
                </option>
              </select>
              <select id="se103_2" v-model="RepeatAdjust_MD" v-if="RepeatUnit == 'MD'">
                <option :value="fill(2,num)" v-for="num in 31" :key="num">
                  {{ num }}일
                </option>
              </select>
              <select id="se104_2" v-model="RepeatAdjust_MP" v-if="RepeatUnit == 'MP'">
                <option
                  v-for="(v, i) in this.Closs()"
                  :value="v.index"
                  :key="i"
                >
                  {{ v.str }}요일
                </option>
              </select>
            </div>
          </li>
        </ul>
        <p>행사가 반복되는 기간</p>
        <ul class="inp_wrap">
          <li class="clfix term">
            <select id="selectbox" v-model="RepeatHow">
              <option value="U" selected>종료</option>
              <option value="F">기간</option>
            </select>
          </li>
          <li class="clfix date_inp">
            <input type="date" />
            <div class="clfix" :class="{ active: RepeatHow == 'F' }">
              <span><input type="text" v-model="RepeatFor" /></span>
              <select v-model="RepeatForUnit">
                <option value="D">일</option>
                <option value="W">주</option>
                <option value="M">개월</option>
                <option value="Y">년</option>
              </select>
            </div>
          </li>
        </ul>
        <span class="time_mo_btn" @click="rClick('rere')">확인</span>
        <span class="modal_close rereclose" @click="RBtnremove"></span>
      </div>
    </div>
    <div class="organ_modal" :class="{ on: modalon }">
      <div class="organ_con">
        <form>
          <div>
            <strong>조직도</strong>
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
          <ul class="organlist">
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
        </form>
        <span class="modal_close" @click="ModalOff"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import OrgItem from "./orgitemview.vue";
export default {
  created() {
    this.date = new Date();
    var hour = this.date.getHours();
    var minute = this.date.getMinutes();
    this.startTime = `${hour}:${minute}`;
    this.endTime = `${hour + 1}:${minute}`;
  },
  beforeDestroy() {
    this.$store.commit("calendar/ScheduleOrgDataInit");
  },
  data() {
    return {
      date: "",
      modalon: false,
      modalAutoOrg: 0,
      blindcopytosearch: false,
      copytosearch: false,
      sendtosearch: false,
      blindcopytosearchkeyword: "",
      copytosearchkeyword: "",
      sendtosearchkeyword: "",
      ExpireDate: "",
      category: [
        { meeting: "회의" },
        { promise: "약속" },
        { event: "행사" },
        { anniversary: "기념일" },
        { reminder: "리마인더" },
      ],
      daysSort: ["일", "월", "화", "수", "목", "금", "토"],
      weekSort: ["첫번째", "두번째", "세번째", "네번째", "마지막"],
      RepeatUnit: "D",
      RepeatInterval: "01",
      RepeatAdjust_W: "00",
      RepeatAdjust_MD: "01",
      RepeatAdjust_MP: "1.0",
      RepeatStartDate: "20210817T150000$Z=-9$DO=0$ZX=59$ZN=Korea",
      RepeatHow: "U",
      RepeatUntil: "20210831",
      RepeatFor: "0",
      RepeatForUnit: "D",
      RepeatWeekends: "D",
      rmodalon: false,
      onCategory: "meeting",
      place: "",
      file: [],
      Subject: "",
      Body_Text: "",
      startTime: "",
      endTime: "",
      rereclick: false,
      open: true,
      field: {},
    };
  },
  computed: {
    ...mapState("calendar",["scheduleorg"]),
    ...mapState("mailjs",["autosearchorg"]),
    ...mapGetters("mailjs",["GetMail"]),
  },
  methods: {
    fill(width, number) {
      number = number + ""; //number를 문자열로 변환하는 작업
      var str = "";
      for (var i = 0; i < width - number.length; i++) {
        str = str + "0";
      }
      str = str + number;
      return str;
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
    submitFile() {
      this.$refs.file.click();
    },
    handleFileUpload() {
      this.file = [];
      this.file.push(this.$refs.file.files[0]);
      // }
    },
    RBtn() {
      console.log("여기안오냐")
      this.rmodalon = true;
    },
    RBtnremove() {
      this.rmodalon = false;
    },
    rClick(value) {
      var data = {};
      data.RepeatUnit = this.RepeatUnit;
      data.RepeatWeekends = "";
      if(this.RepeatUnit =="D"){
        data.RepeatWeekends = "D";
      }
      data.RepeatInterval = this.RepeatInterval;
      if (this.RepeatUnit !== "D" || this.RepeatUnit !== "Y") {
        data.RepeatAdjust = this[`RepeatAdjust_${this.RepeatUnit}`];
      }else{
        data.RepeatAdjust = "";
      }
      data.RepeatUntil="";
        data.RepeatFor = "";
        data.RepeatForUnit = "";
      if(this.RepeatHow=="U"){
        data.RepeatUntil = this.RepeatUntil;

      }else{
        data.RepeatFor = this.RepeatFor;
        data.RepeatForUnit = this.RepeatForUnit;

      }
      data.RepeatStartDate =this.RepeatStartDate;
      data.RepeatHow = this.RepeatHow;
      console.log(data)

        this.rmodalon = false;
      if (value == "rere") {
        this.rereclick = true;
      } else {
        this.rereclick = false;
      }
    },
    isOpen(value) {
      this.open = value;
    },
    Closs() {
      // daysSort: ["일", "월", "화", "수", "목", "금", "토"],
      // weekSort
      var result = [];
      for (var i = 0; i < this.weekSort.length; i++) {
        for (var j = 0; j < this.daysSort.length; j++) {
          var str = `${this.weekSort[i]} ${this.daysSort[j]}`;
          var index = `${i + 1}.${j}`;
          var data = {};
          data.str = str;
          data.index = index;
          result.push(data);
        }
      }
      return result;
    },
    RouterBack() {
      this.$router.go(-1);
    },
  },
  components: {
    OrgItem,
  },
};
</script>

<style>
</style>