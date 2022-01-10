<template>
  <div class="m_contents10 srl">
    <form @submit.prevent>
      <ul class="cf_w_top">
        <li class="cf_w_title">
          <strong>{{ lang.title }}</strong>
          <div>
            <input type="text" v-model="Subject" />
          </div>
        </li>
        <li class="cal_category">
          <strong>{{ callang.cate }}</strong>
          <div class="">
            <select name="" v-model="onCategory" id="">
              <option
                v-for="(value, index) in callang.category_kiturami"
                :key="index"
                :value="index"
              >
                {{ value }}
              </option>
            </select>
          </div>
        </li>
        <li class="cal_color">
          <strong>테스트</strong>
          <div class="color_chart">
            <div>
              <h3>
                <span :style="`background: ${color}`"></span
                ><em>color {{ colorposition }}</em>
              </h3>
              <ul>
                <li
                  v-for="(value, name) in this.colors"
                  :key="name"
                  @click="setColor(value, name)"
                >
                  <span :style="`background: ${value}`"></span
                  ><em>color {{ name }}</em>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li class="cf_w_day">
          <strong>{{ lang.date }}</strong>
          <div>
            <div>
              <span @click="selectOption('N')">
                <em :class="{ click: this.ScheduleType == 'N' }"></em
                >{{ lang.daybook }}
              </span>
              <span @click="selectOption('R')">
                <em :class="{ click: this.ScheduleType == 'R' }"></em
                >{{ lang.repbook }}
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
          <strong>{{ lang.starttime }}</strong>
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
          <strong>{{ lang.endtime }}</strong>
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
          <strong>{{ lang.repeat }}</strong>
          <div>
            <div>
              <span @click="SetRepeatUnit('D')">
                <em :class="{ click: RepeatUnit == 'D' }"></em
                >{{ lang.dayoption }}
              </span>
              <span @click="SetRepeatUnit('W')">
                <em :class="{ click: RepeatUnit == 'W' }"></em
                >{{ lang.weekoption }}
              </span>
              <span @click="SetRepeatUnit('MP')">
                <em :class="{ click: RepeatUnit == 'MP' }"></em
                >{{ lang.week2option }}
              </span>
              <span @click="SetRepeatUnit('M')">
                <em :class="{ click: RepeatUnit == 'M' }"></em
                >{{ lang.monthoption }}
              </span>
            </div>
          </div>
        </li>
        <li
          class="cf_w_date"
          v-if="this.ScheduleType == 'R' && RepeatUnit !== 'D'"
        >
          <strong>{{ lang.condition }}</strong>
          <div>
            <div v-if="RepeatUnit == 'W'">
              <select v-model="WeekDay">
                <option
                  :value="index + 1"
                  v-for="(value, index) in daysSort"
                  :key="index"
                >
                  {{ value }}{{ lang.day }}
                </option>
              </select>
            </div>
            <div v-if="RepeatUnit == 'MP'">
              <select v-model="RepeatAdjust_W2">
                <option
                  :value="index + 1"
                  v-for="(value, index) in mpSort"
                  :key="index"
                >
                  {{ value }}
                </option>
              </select>
              <b>{{ lang.week }}</b>
              <select v-model="WeekDay">
                <option
                  :value="index + 1"
                  v-for="(value, index) in daysSort"
                  :key="index"
                >
                  {{ value }}{{ lang.day }}
                </option>
              </select>
            </div>
            <div v-if="RepeatUnit == 'M'">
              <select v-model="RepeatAdjust_W1">
                <option
                  :value="index + 1"
                  v-for="(value, index) in weekSort"
                  :key="index"
                >
                  {{ value }}
                </option>
              </select>
              <b>{{ lang.week }}</b>
              <select v-model="WeekDay">
                <option
                  :value="index + 1"
                  v-for="(value, index) in daysSort"
                  :key="index"
                >
                  {{ value }}{{ lang.day }}
                </option>
              </select>
            </div>
          </div>
        </li>
        <li class="cf_w_att">
          <strong>{{ lang.attendants }}</strong>
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
                  <span @click="ScheduleOrgDataDelete(value, 'SendTo')">{{
                    lang.delete
                  }}</span>
                </div>
              </li>
              <li class="new_addr">
                <label for="toinput" class="blind">{{ lang.attendants }}</label>
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
          <strong>{{ lang.attach }}</strong>
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
            <p>{{ lang.comment }}</p>
          </div>
        </li>
        <li class="cf_w_memo">
          <Body
            id="memo_t"
            :body="Body_Text"
            ref="Body"
            :read="false"
            did="calendar"
          />
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: {
    lang: Object,
  },
  async created() {
    this.colorposition = Object.keys(this.colors)[0];
    this.color = this.colors[Object.keys(this.colors)[0]];
    // this.lang = this.GetBookL.write;
    this.callang = this.GetScheduleL.write;
    this.daysSort = this.lang.daysSort.split(",");
    this.weekSort = this.lang.weekSort.split(",");
    this.mpSort = this.lang.mpSort.split(";");

    if (this.GetEdit) {
      this.detail =
        this.GetSchedule.calDetail[this.GetSaveSchedule.detail.where];
      this.date = this.SetTime(this.detail.startdate);
      this.enddate = this.SetTime(this.detail.enddate);
      var start = this.detail.starttime.split(":");
      this.SHour = start[0];
      this.SMin = start[1];
      var end = this.detail.endtime.split(":");
      this.EHour = end[0];
      this.EMin = end[1];
      this.Body_Text = this.detail.body;
      this.Subject = this.detail.subject;
      this.org.SendTo = JSON.parse(JSON.stringify(this.detail.sendToInfo));
      var senddata = this.org.SendTo.map((item) => {
        return { point: "SendTo", item };
      });
      console.log(senddata);
      this.$emit("SetSend", senddata);

      this.file = this.detail.attachInfo;
    } else {
      this.params = JSON.parse(this.$route.query.data);
      var dates = new Date();
      var hour = dates.getHours();
      this.SHour = `${this.fill(2, hour + 1)}`;
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
    ...mapState(["org", "autosearchorg"]),
    ...mapGetters("calendarjs", ["GetEdit", "GetSchedule", "GetSaveSchedule"]),
  },
  data() {
    return {
      colorposition: "#e7a1a2",
      color: 1,
      onCategory: 1,
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
      ScheduleType: "N",
      RepeatUnit: "D",
      WeekDay: 1,
      RepeatAdjust_W2: 1,
      RepeatAdjust_W1: 1,
      colors: {
        1: "#e7a1a2",
        2: "#f9ba89",
        3: "#f7dd8f",
        4: "#fcfa90",
        5: "#78d168",
        6: "#9fdcc9",
        7: "#c6d2b0",
        8: "#9db7e8",
        9: "#b5a1e2",
        10: "#daaec2",
        11: "#dad9dc",
        12: "#6b7994",
        13: "#bfbfbf",
        14: "#6f6f6f",
        15: "#4f4f4f",
        16: "#c11a25",
        17: "#e2620d",
        18: "#c79930",
        19: "#b9b300",
        20: "#368f2b",
        21: "#329b7a",
        22: "#778b45",
        23: "#2858a5",
        24: "#5c3fa3",
        25: "#93446b",
      },
    };
  },
  methods: {
    SetTime(value) {
      var moment = require("moment");

      return moment.utc(value).local().format("YYYY-MM-DD");
    },
    Send() {
      var formData = new FormData();
      formData.append("Subject", this.Subject);
      formData.append("ScheduleDate", this.date);
      formData.append("ScheduleDate_End", this.enddate);
      formData.append("SHour", this.SHour);
      formData.append("SMin", this.SMin);
      formData.append("EHour", this.EHour);
      formData.append("EMin", this.EMin);

      let editorData = this.$refs.Body.getBody();

      formData.append("Body", editorData);

      formData.append("ScheduleType", this.ScheduleType);
      formData.append("RepeatUnit", this.RepeatUnit);
      formData.append("WeekDay", this.WeekDay);
      formData.append("RepeatAdjust_W2", this.RepeatAdjust_W2);
      formData.append("RepeatAdjust_W1", this.RepeatAdjust_W1);

      formData.append("Category", this.onCategory);
      var sendTo = "*";
      console.log(this.org.SendTo);
      if (this.org.SendTo.length > 0) {
        sendTo = this.org.SendTo.map((item) => item.notesId).join(";");
      }
      console.log(sendTo);
      formData.append("sendTo", sendTo);
      formData.append("color", this.color);
      formData.append("colorposition", this.colorposition);

      var mailing = 0;
      if (this.isMailling) {
        mailing = 1;
      }
      formData.append("DoSend1", mailing);
      if (this.GetEdit) {
        formData.append("unid", this.detail.unid);
        for (var i = 0; i < this.addAttach.length; i++) {
          formData.append("attach", this.addAttach[i]);
        }

        var Detachstr = this.Detach.map((item) => item.name).join(";");
        formData.append("Detach", Detachstr);
      }
      for (var i = 0; i < this.file.length; i++) {
        formData.append("attach", this.file[i]);
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
      this.$store.commit("OrgDataAdd", data);
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
      this.$emit("ModalOn");
    },
    selectOption(option) {
      this.ScheduleType = option;
    },
    SetRepeatUnit(o) {
      this.RepeatUnit = o;
    },
    setColor(value, name) {
      this.colorposition = name;
      this.color = value;
    },
  },
};
</script>

<style>
.color_chart > div {
  position: relative;
  display: inline-block;
}
.color_chart h3 {
  height: 2.43rem;
  width: 9.06rem;
  appearance: none;
  border: 0.06rem solid #e6e6e6;
  padding: 0 2.37rem 0 0.75rem;
  outline: none;
  background: url(/mobile/img/cal_icon02.png) right center no-repeat;
  background-size: 2.43rem 2.43rem;
  line-height: 2.312rem;
  cursor: pointer;
}
.color_chart h3 span {
  display: inline-block !important;
  width: 0.937rem !important;
  height: 0.937rem !important;
  vertical-align: middle !important;
  margin-right: 5px !important;
  padding-left: 0 !important;
}
.color_chart h3 em {
  display: inline-block !important;
  font-size: 0.87rem !important;
  color: #494949 !important;
  vertical-align: middle !important;
  line-height: 2.312rem !important;
  width: auto !important;
}
.color_chart ul {
  display: none;
  position: absolute;
  top: 2.625rem;
  left: 0;
  background: #fff;
  width: 100%;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border: 0.06rem solid #e6e6e6;
  max-height: 250px;
  overflow-y: scroll;
}
.color_chart li {
  height: 1.875rem;
  padding: 0 10px;
  line-height: 1.875rem;
  cursor: pointer;
}
.color_chart li:hover {
  background: #767676;
}
.color_chart li:hover em {
  color: #fff;
}
.color_chart li span {
  display: inline-block !important;
  width: 0.937rem !important;
  height: 0.937rem !important;
  vertical-align: middle !important;
  margin-right: 5px !important;
  padding-left: 0 !important;
}
.color_chart li em {
  display: inline-block !important;
  font-size: 0.87rem !important;
  color: #494949 !important;
  vertical-align: middle !important;
  line-height: 1 !important;
  width: auto !important;
}

.dark .color_chart h3 {
  border-color: #232323 !important;
  background: #000 url(/mobile/img/more_refer.png) right 0.87rem center
    no-repeat;
  background-size: 0.56rem 0.37rem;
}
.dark .color_chart h3 em {
  color: #f2f2f2 !important;
}
.dark .color_chart ul {
  background: #232323 !important;
  border-color: #666 !important;
}
.dark .color_chart li em {
  color: #f2f2f2 !important;
}
</style>