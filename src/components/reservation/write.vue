<template>
  <div class="modal_wrap">
    <Header :btnArr="btnarr" @BtnClick="BtnClick"></Header>
    <div class="m_contents10 srl">
      <form @submit.prevent>
        <ul class="cf_w_top">
          <li class="cf_w_name">
            <strong>{{lang.top}}</strong>
            <div>
              <p>{{ GetNowRoom.floor }} - {{ GetNowRoom.title }}</p>
            </div>
          </li>
          <li class="cf_w_title">
            <strong>{{lang.title}}</strong>
            <div>
              <input type="text" v-model="Subject" />
            </div>
          </li>
          <li class="cf_w_day">
            <strong>{{lang.date}}</strong>
            <div>
              <div>
                <span @click="selectOption('D')">
                  <em :class="{ click: this.ScheduleType == 'D' }"></em>{{lang.daybook}}
                </span>
                <span @click="selectOption('R')">
                  <em :class="{ click: this.ScheduleType == 'R' }"></em
                  >{{lang.repbook}}
                </span>
              </div>
              <div>
                <input type="date" v-model="date" />
                <em v-if="this.ScheduleType == 'R'">~</em>
                <input
                  v-if="this.ScheduleType == 'R'"
                  v-model="enddate"
                  type="date"
                />
              </div>
            </div>
          </li>
          <li class="cf_w_time">
            <strong>{{lang.starttime}}</strong>
            <div>
              <div>
                <select v-model="SHour">
                  <option
                    v-for="(value, index) in range(0, 23)"
                    :key="index"
                    :value="fill(2, value)"
                  >
                    {{ fill(2, value) }}
                  </option>
                </select>
                <b>:</b>
                <select v-model="SMin">
                  <option
                    v-for="(value, index) in range(0, 5)"
                    :key="index"
                    :value="fill(2, value * 10)"
                  >
                    {{ fill(2, value * 10) }}
                  </option>
                </select>
              </div>
            </div>
          </li>
          <li class="cf_w_time">
            <strong>{{lang.endtime}}</strong>
            <div>
              <div>
                <select v-model="EHour">
                  <option
                    v-for="(value, index) in range(0, 23)"
                    :key="index"
                    :value="fill(2, value)"
                  >
                    {{ fill(2, value) }}
                  </option>
                </select>
                <b>:</b>
                <select v-model="EMin">
                  <option
                    v-for="(value, index) in range(0, 5)"
                    :key="index"
                    :value="fill(2, value * 10)"
                  >
                    {{ fill(2, value * 10) }}
                  </option>
                </select>
              </div>
            </div>
          </li>
          <li class="cf_w_date" v-if="this.ScheduleType == 'R'">
            <strong>{{lang.repeat}}</strong>
            <div>
              <div>
                <span @click="SetRepeatUnit('D')">
                  <em :class="{ click: RepeatUnit == 'D' }"></em>{{lang.dayoption}}
                </span>
                <span @click="SetRepeatUnit('W')">
                  <em :class="{ click: RepeatUnit == 'W' }"></em>{{lang.weekoption}}
                </span>
                <span @click="SetRepeatUnit('MP')">
                  <em :class="{ click: RepeatUnit == 'MP' }"></em>{{lang.week2option}}
                </span>
                <span @click="SetRepeatUnit('M')">
                  <em :class="{ click: RepeatUnit == 'M' }"></em>{{lang.monthoption}}
                </span>
              </div>
              <div v-if="RepeatUnit == 'D'" @click="setEveryWeekday()">
                <!--active가 붙으면 체크됨 -->
                <span
                  class="check_b"
                  :class="{ active: this.EveryWeekday == '' }"
                ></span>
                <p>{{lang.weekday}}</p>
              </div>
            </div>
          </li>
          <li class="cf_w_date" v-if="this.ScheduleType == 'R'">
            <strong>{{lang.weekday}}</strong>
            <div>
              <div v-if="RepeatUnit=='W'">
                <select v-model="WeekDay">
                  <option
                    :value="index+1"
                    v-for="(value, index) in daysSort"
                    :key="index"
                  >
                    {{ value }}{{lang.day}}
                  </option>
                </select>
              </div>
              <div v-if="RepeatUnit=='MP'">
                <select v-model="RepeatAdjust_W2">
                  <option :value="index+1"
                    v-for="(value, index) in mpSort"
                    :key="index">{{value}}</option>
                </select>
                <b>{{lang.week}}</b>
                <select v-model="WeekDay">
                  <option
                    :value="index+1"
                    v-for="(value, index) in daysSort"
                    :key="index"
                  >
                    {{ value }}{{lang.day}}
                  </option>
                </select>
              </div>
              <div v-if="RepeatUnit=='M'">
                <select v-model="RepeatAdjust_W1">
                  <option :value="index+1"
                    v-for="(value, index) in weekSort"
                    :key="index">{{value}}</option>
                </select>
                <b>{{lang.week}}</b>
                <select v-model="WeekDay">
                  <option
                    :value="index+1"
                    v-for="(value, index) in daysSort"
                    :key="index"
                  >
                    {{ value }}{{lang.day}}
                  </option>
                </select>
              </div>
            </div>
          </li>
          <li class="cf_w_att">
            <strong>{{lang.attendants}}</strong>
            <div>
              <ul class="list_add clfix">
                <li
                  class="add_obj"
                  v-for="(value, index) in this.org.SendTo"
                  :key="index"
                >
                  {{ value.shortname }}
                  <div class="del_add">
                    <dl>
                      <dt>{{ value.name }} / {{ value.department }}</dt>
                      <dd>{{ value.email }}</dd>
                    </dl>
                    <span @click="ScheduleOrgDataDelete(value, 'SendTo')"
                      >{{lang.delete}}</span
                    >
                  </div>
                </li>
                <li class="new_addr">
                  <label for="toinput" class="blind">{{lang.attendants}}</label>
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
                      [
                        SendToSearch(
                          'SendTo',
                          'sendtosearch',
                          $event.target.value
                        ),
                        showAddSearch('sendtosearch'),
                      ]
                    "
                  ></textarea>
                </li>
              </ul>
              <span class="organ" @click="orgClick('SendTo')"></span>
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
          </li>
          <input
            multiple
            style="display: none"
            type="file"
            ref="file"
            v-on:change="handleFileUpload()"
          />
          <!--추가됨-->
          <li class="att_file">
            <strong>{{lang.attach}}</strong>
            <span class="tit_clip" @click="submitFile()" />

            <div>
              <ul v-if="this.file.length > 0" class="file_list">
                <li v-for="(value, index) in this.file" :key="index">
                  {{ value.name
                  }}<span class="att_del" @click="FileDel(value)"></span>
                </li>
              </ul>
            </div>
          </li>
          <li class="cf_w_mailing">
            <div @click="Mailing()">
              <span :class="{ active: isMailling }"></span>
              <p>{{lang.comment}}</p>
            </div>
          </li>
          <li class="cf_w_memo">
            <!-- <textarea id="memo_t" v-model="Body_Text"></textarea> -->
            <Namo
              id="memo_t"
              :read="false"
              did="calendar"
              :editor="Body_Text"
              ref="editor"
            ></Namo>
          </li>
        </ul>
      </form>
    </div>
    <Org :modalon="modalon" @ModalOff="ModalOff"></Org>
  </div>
</template>

<script>
import Header from "./header.vue";
import Org from "../../View/Org.vue";
import Namo from "../editor/namo.vue";
// GetMyInfo
import { mapState, mapGetters } from "vuex";

export default {
  async created() {
    this.lang = this.GetBookL.write;
    this.btnarr = this.lang.btnarr;
    this.daysSort = this.lang.daysSort.split(",");
    this.weekSort = this.lang.weekSort.split(",");
    this.mpSort = this.lang.mpSort.split(";");


    if (this.isEdit) {
      if (!(Object.keys(this.detail).length > 0)) {
        await this.$store.dispatch("bookjs/BookDetail", {
          unid: this.SaveUnid,
        });
      }
      this.date = this.SetTime(this.detail.startDate);
      this.enddate = this.SetTime(this.detail.endDate);
      var start = this.detail.startTime.split(":");
      this.SHour = start[0];
      this.SMin = start[1];
      var end = this.detail.endTime.split(":");
      this.EHour = end[0];
      this.EMin = end[1];
      this.Body_Text = this.detail.body;
      this.Subject = this.detail.subject;
      this.org.SendTo = this.detail.peoples;
      this.file = this.detail.attachInfo;
    } else {
      this.params = JSON.parse(this.$route.query.data);
      var dates = new Date();
      var hour = dates.getHours();
      this.SHour = `${this.fill(2, hour+1)}`;
      this.SMin = `00`;

      this.EHour = `${this.fill(2, hour + 2)}`;
      this.EMin = `00`;

      if (this.params.date && this.params.date.length > 0) {
        this.date = this.params.date;
        this.enddate = this.params.date;
      }
      if (this.params.starttime && this.params.starttime !== "") {
        this.SHour = `${this.fill(2, parseInt(this.params.starttime))}`;
        this.EHour = `${this.fill(2, parseInt(this.params.starttime) + 1)}`;
      }
    }
  },
  mounted() {
    this.fileinit = this.$refs.file.files;
  },
  computed: {
    ...mapGetters("mainjs", ["GetMyInfo"]),
    ...mapState(["org", "autosearchorg"]),
    ...mapState("bookjs", ["detail"]),
    ...mapGetters("bookjs", ["GetNowRoom", "isEdit", "SaveUnid"]),
  },
  components: {
    Header,
    Org,
    Namo,
  },
  beforeDestroy() {
    // this.$store.commit("OrgDataInit");
  },
  data() {
    return {
      modalon: false,
      SHour: "",
      SMin: "",
      EHour: "",
      EMin: "",
      date: "",
      enddate: "",
      Subject: "",
      Body_Text: "",
      file: [],
      Detach: [],
      addAttach: [],
      isMailling: true,
      sendtosearch: false,
      sendtosearchkeyword: "",
      option: "day",
      ScheduleType: "D",
      RepeatUnit: "D",
      EveryWeekday: "",
      WeekDay: 2,
      RepeatAdjust_W2: 1,
      RepeatAdjust_W1: 1,
    };
  },
  methods: {
    SetTime(value) {
      var moment = require("moment");

      return moment.utc(value).local().format("YYYY-MM-DD");
    },
    Send(value) {
      var form = this.FormSet();
      var type = value;
      if (this.isEdit) {
        type = "editItem";
      }
      this.$store
        .dispatch("bookjs/BookWrite", { data: form, type })
        .then((res) => {
          if (res) {
            this.$router.push({ name: "reservationlist" });
          }
        });
    },
    FormSet() {
      var formData = new FormData();
      formData.append("Subject", this.Subject);
      formData.append("ScheduleDate", this.date + " 00:00:00");
      formData.append("ScheduleDate_End", this.enddate + " 00:00:00");
      formData.append("SHour", this.SHour);
      formData.append("SMin", this.SMin);
      formData.append("EHour", this.EHour);
      formData.append("EMin", this.EMin);
      // this.Body_Text = "test11";
      this.Body_Text =
        this.$refs.editor.$refs.namo.contentWindow.crosseditor.GetBodyValue();
      formData.append("Body", this.Body_Text);

      formData.append("ScheduleType", this.ScheduleType);
      formData.append("RepeatUnit", this.RepeatUnit);
      formData.append("EveryWeekday", this.EveryWeekday);
      formData.append("WeekDay", this.WeekDay);
      formData.append("RepeatAdjust_W2", this.RepeatAdjust_W2);
      formData.append("RepeatAdjust_W1", this.RepeatAdjust_W1);

      var AttendeeFull = this.StrJoin(this.org.SendTo, "approvalInfo");
      formData.append("AttendeeFull", AttendeeFull);
      var Attendee = this.StrJoin(this.org.SendTo, "id");
      formData.append("Attendee", Attendee);

      var master = this.GetMyInfo.master;
      formData.append("MeetMasterFull", master.approvalInfo);
      formData.append("MeetMaster", master.id);
      formData.append("MeetMasterName", master.shortname);
      formData.append("MeetMasterComTel", master.office);
      formData.append("MeetMasterOrgName", master.department);
      formData.append("MeetMasterComCode", master.companycode);
      formData.append("MeetMasterEmpNo", master.mycode);

      var mailing = "";
      if (this.isMailling) {
        mailing = "Y";
      }
      formData.append("isMailling", mailing);
      formData.append("roomCode", this.GetNowRoom.code);
      if (this.isEdit) {
        formData.append("unid", this.detail.unid);
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
        formData.append("Detach", Detachstr);

        // var RemoveSend = this.Difference(
        //           this.isEditData.sendToInfo,
        //           this.org.SendTo
        //         );
        //         tmpRemoveNames = tmpRemoveNames.concat(RemoveSend);

        //         tmpRemoveNamesstr = this.StrJoin(tmpRemoveNames);
        //         formData.append("tmpRemoveNames", tmpRemoveNamesstr);

        //         this.org.SendTo = this.Difference(
        //           this.org.SendTo,
        //           this.isEditData.sendToInfo
        //         );
      } else {
        for (var i = 0; i < this.file.length; i++) {
          formData.append("attach", this.file[i]);
        }
      }

      return formData;
    },
    Mailing() {
      this.isMailling = !this.isMailling;
    },
    range(min, max) {
      var array = [],
        j = 0;
      for (var i = min; i <= max; i++) {
        array[j] = i;
        j++;
      }
      return array;
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
    SendToSearch(who, keyword, value) {
      if (value.length >= 2) {
        var data = {};
        data.who = who;
        data.keyword = value;

        this.$store.dispatch("OrgAutoSearch", data);
      }
    },
    async AddOrg(who, value, what) {
      var data = {};
      data.item = value;
      data.point = who;
      this.$store.commit("OrgDataAdd",data);
      await this.$store.commit("AddOrg", {
        who,
        value,
      });
      this[what] = false;
      this[`${what}keyword`] = "";
      this.$store.commit("SearchOrgInit");
    },
    ScheduleOrgDataDelete(data, pointer) {
      this.$store.commit("OrgDataDelete", { data, pointer });
    },
    showAddSearch(value) {
      this[value] = true;
    },
    randomColor() {
      const color = ["#bcbbdd", "#bbcbdd", "#bbddd7", "#d0d0d0"];
      return `background: ${color[Math.floor(Math.random() * 4)]}`;
    },
    StrJoin(arr, key) {
      var str = "";
      for (var i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
          str += arr[i][key];
        } else {
          str += arr[i][key] + ";";
        }
      }
      return str;
    },
    ModalOff() {
      this.modalon = false;
    },
    BtnClick(value) {
      if (value == "write") {
        this.Send(value);
      } else if (value == "cancle") {
        this.$router.go(-1);
      }
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
        if (this.isEdit) {
          this.addAttach.push(this.$refs.file.files[0]);
        }
      }
      this.$refs.file.files = this.fileinit;
    },
    orgClick(to) {
      this.$store.commit("OrgPointer", to);
      this.modalon = true;
    },
    selectOption(option) {
      this.ScheduleType = option;
    },
    SetRepeatUnit(o) {
      this.RepeatUnit = o;
    },
    setEveryWeekday() {
      if (this.EveryWeekday == "") {
        this.EveryWeekday = "Y";
      } else {
        this.EveryWeekday = "";
      }
    },
  },
};
</script>

<style>
</style>