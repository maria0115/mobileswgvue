<template>
  <div>
    <CalHeader :title="Title()" @Send="Send"></CalHeader>
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
          <li v-if="!this.GetEdit" class="repeat_s">
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
          <li v-if="!(onCategory == 1 || onCategory == 2)" class="cal_time">
            <strong>시간</strong>
            <div>
              <input type="time" value="15:00" v-model="startTime" /><b>~</b
              ><input type="time" value="16:00" v-model="endTime" />
            </div>
          </li>
          <li v-if="onCategory == 3" class="cal_att">
            <strong>참석자</strong>
            <div>
              <ul class="list_add clfix">
                <li
                  class="add_obj"
                  v-for="(value, index) in org.SendTo"
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
                  v-for="(value, index) in this.autosearchorg.SendTo"
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
                      v-for="(value, index) in this.org.CopyTo"
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
                      v-for="(value, index) in this.autosearchorg.CopyTo"
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
                      v-for="(value, index) in this.org.BlindCopyTo"
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
                      v-for="(value, index) in this.autosearchorg.BlindCopyTo"
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
              {{ this.file }}
              <ul v-if="this.file.length > 0" class="file_list">
                <li v-for="(value, index) in this.file" :key="index">
                  {{ value.name
                  }}<span class="att_del" @click="FileDel(value)"></span>
                </li>
              </ul>
            </div>
          </li>
          <li class="cal_memo">
            <strong>메모</strong>
            <div>
              <Namo
                id="memo_t"
                :read="false"
                did="calendar"
                :editor="Body_Text"
                ref="editor"
              ></Namo>
              <!-- <EditorContent id="memo_t" :editor="editor" /> -->
              <!-- <textarea id="memo_t" v-model="Body_Text"></textarea> -->
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
                <option :value="fill(2, num)" v-for="num in 31" :key="num">
                  {{ num }}일마다 반복
                </option>
              </select>
              <select
                v-if="RepeatUnit == 'W'"
                v-model="RepeatInterval"
                id="sel02_1"
              >
                <option value="매주 반복" selected>매주 반복</option>
                <option :value="fill(2, num)" v-for="num in 8" :key="num">
                  {{ num }}주마다 반복
                </option>
              </select>
              <select
                v-model="RepeatInterval"
                v-if="RepeatUnit == 'MD' || RepeatUnit == 'MP'"
                id="sel03_1"
              >
                <option value="매월 반복" selected>매월 반복</option>
                <option :value="fill(2, num)" v-for="num in 12" :key="num">
                  {{ num }}개월마다 반복
                </option>
              </select>
              <select
                v-model="RepeatInterval"
                v-if="RepeatUnit == 'Y'"
                id="sel05_1"
              >
                <option value="매년 반복" selected>매년 반복</option>
                <option :value="fill(2, num)" v-for="num in 10" :key="num">
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
              <select
                id="se102_2"
                v-model="RepeatAdjust_W"
                v-if="RepeatUnit == 'W'"
              >
                <option
                  :value="fill(2, index)"
                  v-for="(value, index) in daysSort"
                  :key="index"
                >
                  {{ value }}요일
                </option>
              </select>
              <select
                id="se103_2"
                v-model="RepeatAdjust_MD"
                v-if="RepeatUnit == 'MD'"
              >
                <option :value="fill(2, num)" v-for="num in 31" :key="num">
                  {{ num }}일
                </option>
              </select>
              <select
                id="se104_2"
                v-model="RepeatAdjust_MP"
                v-if="RepeatUnit == 'MP'"
              >
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
            <input type="date" v-model="RepeatUntil" v-if="RepeatHow == 'U'" />
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
    <Org :modalon="modalon" @ModalOff="ModalOff"></Org>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Org from "../../View/Org.vue";
import CalHeader from "./calHeader.vue";
import { Editor, EditorContent } from "tiptap";
import Namo from "../editor/namo.vue";
export default {
  created() {
    var params = JSON.parse(this.$route.query.data);

    if (this.GetEdit) {
      this.editData =
        this.GetSchedule.calDetail[this.GetSaveSchedule.detail.where];

      this.Body_Text = this.editData.body;
      this.date = this.editData.startdate;
      this.onCategory = this.editData.categoryVal;
      this.place = this.editData.place;
      this.open = this.editData.secretVal;
      this.Subject = this.editData.subject;
      this.endTime = `${this.editData.endtime.split(":")[0]}:${
        this.editData.endtime.split(":")[1]
      }`;
      this.startTime = `${this.editData.starttime.split(":")[0]}:${
        this.editData.starttime.split(":")[1]
      }`;
      this.org.SendTo=this.editData.sendTo;
      this.org.CopyTo=this.editData.copyTo;

      // console.log(this.editData)
      this.file = this.editData.attachInfo;
    } else {
      var moment = require("moment");
      var dates = new Date();
      var hour = dates.getHours();
      var minute = dates.getMinutes();
      this.startTime = `${this.fill(2, hour)}:${this.fill(2, minute)}`;

      this.endTime = `${this.fill(2, hour + 1)}:${this.fill(2, minute)}`;
      this.date = moment().format("YYYY-MM-DD");
      this.RepeatStartDate = moment().utc().format("YYYYMMDDTHHmmss");
      this.RepeatUntil = moment().format("YYYYMMDD");
    }

    if (params.date && params.date.length > 0) {
      this.date = params.date;
    }
    if (params.starttime && params.starttime !== "") {
      this.startTime = `${this.fill(2, parseInt(params.starttime))}:00`;
      this.endTime = `${this.fill(2, parseInt(params.starttime) + 1)}:00`;
    }
    // RepeatStartDate: "20210817T150000",
    //   RepeatHow: "U",
    //   RepeatUntil: "20210831",
  },
  mounted() {
    this.fileinit = this.$refs.file.files;
    this.editor = new Editor({
      content: this.Body_Text,
    });
  },
  beforeDestroy() {
    this.editor.destroy();
    this.$store.commit("calendarjs/isEdit", false);
    this.$store.commit("OrgDataInit");
  },
  data() {
    return {
      editData: {},
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
        { 0: "약속" },
        { 1: "기념일" },
        { 2: "행사" },
        { 3: "회의" },
        { 4: "리마인더" },
      ],
      daysSort: ["일", "월", "화", "수", "목", "금", "토"],
      weekSort: ["첫번째", "두번째", "세번째", "네번째", "마지막"],
      RepeatUnit: "D",
      RepeatInterval: "01",
      RepeatAdjust_W: "00",
      RepeatAdjust_MD: "01",
      RepeatAdjust_MP: "1.0",
      RepeatStartDate: "",
      RepeatHow: "U",
      RepeatUntil: "",
      RepeatFor: "0",
      RepeatForUnit: "D",
      RepeatWeekends: "D",
      rmodalon: false,
      onCategory: 0,
      place: "",
      file: [],
      Subject: "",
      Body_Text: "",
      startTime: "",
      endTime: "",
      rereclick: false,
      open: true,
      field: {},
      editor: null,
      ReData: {},
      Detach: [],
      addAttach: [],
    };
  },
  computed: {
    ...mapState(["org", "autosearchorg"]),
    ...mapGetters("mailjs", ["GetMail"]),
    ...mapGetters("calendarjs", [
      "GetEdit",
      "GetSchedule",
      "GetSaveSchedule",
      "GetSaveScheduleList",
    ]),
  },
  methods: {
    ModalOff() {
      this.modalon = false;
    },
    fill(width, number) {
      number = number + ""; //number를 문자열로 변환하는 작업
      var str = "";
      for (var i = 0; i < width - number.length; i++) {
        str = str + "0";
      }
      str = str + number;
      return str;
    },
    ScheduleOrgDataDelete(data, pointer) {
      this.$store.commit("OrgDataDelete", { data, pointer });
    },
    orgClick(to) {
      if (!this.tome) {
        this.$store.commit("OrgPointer", to);
        this.modalon = true;
      }
    },
    SendToSearch(who, keyword, value) {
      if (value.length >= 2) {
        var data = {};
        data.who = who;
        data.keyword = value;

        this.$store.dispatch("OrgAutoSearch", data);
      }
    },
    async AddOrg(who, value, what) {
      await this.$store.commit("AddOrg", {
        who,
        value,
      });
      this[what] = false;
      this[`${what}keyword`] = "";
      this.$store.commit("SearchOrgInit");
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
      if (this.$refs.file.files[0]) {
        var result = this.file.findIndex((element) => {
          return (
            element.size === this.$refs.file.files[0].size &&
            element.name === this.$refs.file.files[0].name
          );
        });
        if (result == -1) {
          this.file.push(this.$refs.file.files[0]);
        }
        if (this.GetEdit) {
          this.addAttach.push(this.$refs.file.files[0]);
        }
      }
      this.$refs.file.files = this.fileinit;
    },
    RBtn() {
      if (!this.GetEdit) {
        this.rmodalon = true;
      }
    },
    RBtnremove() {
      this.rmodalon = false;
    },
    rClick(value) {
      this.rmodalon = false;
      if (value == "rere") {
        var data = {};
        data.RepeatUnit = this.RepeatUnit;
        data.RepeatWeekends = "";
        if (this.RepeatUnit == "D") {
          data.RepeatWeekends = "D";
        }
        data.RepeatInterval = this.RepeatInterval;
        if (this.RepeatUnit !== "D" || this.RepeatUnit !== "Y") {
          data.RepeatAdjust = this[`RepeatAdjust_${this.RepeatUnit}`];
        } else {
          data.RepeatAdjust = "";
        }
        data.RepeatUntil = "";
        data.RepeatFor = "";
        data.RepeatForUnit = "";
        if (this.RepeatHow == "U") {
          var moment = require("moment");
          var start = moment(`${this.RepeatUntil}`).format("YYYYMMDD");
          data.RepeatUntil = start;
        } else {
          data.RepeatFor = this.RepeatFor;
          data.RepeatForUnit = this.RepeatForUnit;
        }
        data.RepeatStartDate = this.RepeatStartDate;
        data.RepeatHow = this.RepeatHow;

        this.ReData = data;
        this.rereclick = true;
      } else {
        this.ReData = {};
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
    Send() {
      let formData = new FormData();
      formData.append("subject", this.Subject);
      var SendTo = "";
      for (var i = 0; i < this.org.SendTo.length; i++) {
        if (i == this.org.SendTo.length - 1) {
          SendTo += this.org.SendTo[i].id;
        } else {
          SendTo += this.org.SendTo[i].id + ";";
        }
      }
      var CopyTo = "";
      for (var i = 0; i < this.org.CopyTo.length; i++) {
        if (i == this.org.CopyTo.length - 1) {
          CopyTo += this.org.CopyTo[i].id;
        } else {
          CopyTo += this.org.CopyTo[i].id + ";";
        }
      }
      var BlindCopyTo = "";
      for (var i = 0; i < this.org.BlindCopyTo.length; i++) {
        if (i == this.org.BlindCopyTo.length - 1) {
          BlindCopyTo += this.org.BlindCopyTo[i].id;
        } else {
          BlindCopyTo += this.org.BlindCopyTo[i].id + ";";
        }
      }
      console.log(SendTo,CopyTo,BlindCopyTo,"BlindCopyTo")
      formData.append("sendTo", SendTo);
      formData.append("copyTo", CopyTo);
      formData.append("blindCopyTo", BlindCopyTo);

      var moment = require("moment");
      var start = moment(`${this.date} ${this.startTime}`).format(
        "YYYYMMDDTHHmmss"
      );
      var end = moment(`${this.date} ${this.endTime}`).format(
        "YYYYMMDDTHHmmss"
      );
      console.log(start,"start")
      formData.append("startDate", start);
      formData.append("endDate", end);
      formData.append("location", this.place);
      // namo 에디터 본문 내용 받아오기
      // let editorData = "회의";
      let editorData =
        this.$refs.editor.$refs.namo.contentWindow.crosseditor.GetBodyValue();
      formData.append("body", editorData);
      // formData.append("body", this.editor.getHTML());
      if (this.GetEdit) {
        for (var i = 0; i < this.addAttach.length; i++) {
          formData.append("attach", this.addAttach[i]);
        }
        var Detachstr = "";
        for (var i = 0; i < this.Detach.length; i++) {
          if (i == this.Detach.length - 1) {
            Detachstr += this.Detach[i].name;
          } else {
            Detachstr += this.Detach[i].name + ";";
          }
        }
        console.log(Detachstr,"Detachstr")
        formData.append("Detach", Detachstr);
      } else {
        for (var i = 0; i < this.file.length; i++) {
          formData.append("attach", this.file[i]);
        }
      }
      formData.append("category", this.onCategory);
      formData.append("private", !this.open);

      if (this.rereclick) {
        // 반복예약
        formData.append("Repeats", "1");
      } else {
        // 일반
        formData.append("Repeats", "");
      }
      for (var i in this.ReData) {
        formData.append(i, this.ReData[i]);
      }
      var type = "write";
      if (this.GetEdit) {
        type = "edit";
        formData.append("unid", this.editData.unid);
      }
      this.$store.dispatch("calendarjs/CalWrite", {
        data: formData,
        type,
      });
    },
    FileDel(value) {
      var result = this.file.filter((element) => {
        return element !== value;
      });
      if (result[0]) {
        this.file = result;
      }
      if (result.length == 0) {
        this.file = [];
      }

      this.Detach.push(value);
    },
    Title() {
      if (this.GetEdit) {
        return "edit";
      }
      return "write";
    },
  },
  components: {
    Org,
    EditorContent,
    CalHeader,
    Namo,
  },
};
</script>

<style>
</style>