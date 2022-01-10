<template>
  <div class="m_contents08 srl">
    <form @submit.prevent>
      <ul class="wc_top">
        <li class="cal_title">
          <strong>{{ lang.title }}</strong>
          <div>
            <input type="text" v-model="Subject" />
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
          <strong>{{ lang.cate }}</strong>
          <div class="">
            <select name="" v-model="onCategory" id="">
              <option
                v-for="(value, index) in lang.category"
                :key="index"
                :value="index"
              >
                {{ value }}
              </option>
            </select>
          </div>
        </li>
        <!-- <li class="cal_open">
            <strong>공개여부</strong>
            <div class="repeat_s">
              <span @click="isOpen(true)">
                <em :class="{ click: this.open }"></em>공개
              </span>
              <span @click="isOpen(false)">
                <em :class="{ click: !this.open }"></em>비공개
              </span>
            </div>
          </li> -->
        <li class="cal_date">
          <strong>{{ lang.date }}</strong>
          <div>
            <input type="date" :disabled="this.GetEdit" v-model="date" />
          </div>
        </li>
        <li v-if="!this.GetEdit" class="repeat_s">
          <strong>{{ lang.rep }}</strong>
          <div>
            <span @click="rClick('regular')">
              <em :class="{ click: !rereclick }"></em>{{ lang.oneday }}
            </span>
            <span class="rere_btn" @click="RBtn"
              ><!--클래스명 추가됨 8월 12일 -->
              <em :class="{ click: rereclick }"></em>{{ lang.repbook }}
            </span>
          </div>
        </li>
        <li v-if="!(onCategory == 1 || onCategory == 2)" class="cal_time">
          <strong>{{ lang.time }}</strong>
          <div>
            <input type="time" value="15:00" v-model="startTime" /><b>~</b
            ><input type="time" value="16:00" v-model="endTime" />
          </div>
        </li>
        <li v-if="onCategory == 3" class="cal_att">
          <strong>{{ lang.send }}</strong>
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
                  <span @click="ScheduleOrgDataDelete(value, 'SendTo')">{{
                    lang.remove
                  }}</span>
                </div>
              </li>

              <li class="new_addr">
                <label for="toinput" class="blind">{{ lang.send }}</label>
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
                    SendToSearch('SendTo', 'sendtosearch', $event.target.value)
                  "
                ></textarea>
              </li>
            </ul>
            <span class="c_organ" @click="orgClick('SendTo')">{{
              lang.org
            }}</span>
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
              <strong>{{ lang.copy }}</strong>
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
                      <span @click="ScheduleOrgDataDelete(value, 'CopyTo')">{{
                        lang.remove
                      }}</span>
                    </div>
                  </li>
                  <li class="new_addr">
                    <label for="toinput" class="blind">{{ lang.copy }}</label>
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
                <span class="c_organ" @click="orgClick('CopyTo')">{{
                  lang.org
                }}</span>
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
              <strong>{{ lang.bcopy }}</strong>
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
                        >{{ lang.remove }}</span
                      >
                    </div>
                  </li>
                  <li class="new_addr">
                    <label for="cryinput" class="blind">{{ lang.bcopy }}</label>
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
                <span class="c_organ" @click="orgClick('BlindCopyTo')">{{
                  lang.org
                }}</span>
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
          <strong>{{ lang.place }}</strong>
          <div>
            <input type="text" v-model="place" />
          </div>
        </li>
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
        <li class="cal_memo">
          <div>
            <Body
              id="memo_t"
              :body="Body_Text"
              ref="Body"
              :read="false"
              did="calendar"
            />
          </div>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: {
    rereclick: Boolean,
    lang: Object,
  },
  created() {
    var language = this.lang;
    this.category = language.category;
    this.daysSort = language.daysSort.split(",");
    this.weekSort = language.weekSort.split(",");

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
      this.org.SendTo = JSON.parse(JSON.stringify(this.editData.sendToInfo));
      var senddata = this.org.SendTo.map((item) => {
        return { point: "SendTo", item };
      });
      this.$emit("SetSend", senddata);
      this.org.CopyTo = JSON.parse(JSON.stringify(this.editData.copyToInfo));
      this.org.BlindCopyTo = JSON.parse(
        JSON.stringify(this.editData.bcopyToInfo)
      );

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
  },
  data() {
    return {
      editData: {},
      date: "",
      modalAutoOrg: 0,
      blindcopytosearch: false,
      copytosearch: false,
      sendtosearch: false,
      blindcopytosearchkeyword: "",
      copytosearchkeyword: "",
      sendtosearchkeyword: "",
      ExpireDate: "",

      RepeatStartDate: "",

      RepeatWeekends: "D",
      onCategory: 3,
      place: "",
      file: [],
      Subject: "",
      Body_Text: "",
      startTime: "",
      endTime: "",
      open: true,
      field: {},
      Detach: [],
      addAttach: [],
    };
  },
  computed: {
    ...mapState(["org", "autosearchorg"]),
    ...mapGetters("mailjs", ["GetMail"]),
    ...mapGetters("calendarjs", ["GetEdit", "GetSchedule", "GetSaveSchedule"]),
  },
  methods: {
    ScheduleOrgDataDelete(data, pointer) {
      this.$store.commit("OrgDataDelete", { data, pointer });
    },
    orgClick(to) {
      if (!this.tome) {
        this.$store.commit("OrgPointer", to);
        this.$emit("ModalOn");
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
        this.$emit("remodal", true);
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

    Difference(value1, value2) {
      return value1.filter((x) => {
        var isidx = value2.findIndex((i) => {
          return i.scheduleId == x.scheduleId;
        });
        if (isidx == -1) {
          return true;
        }
        return false;
      });
    },
    StrJoin(arr) {
      var str = "";
      for (var i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
          str += arr[i].scheduleId;
        } else {
          str += arr[i].scheduleId + ";";
        }
      }
      return str;
    },
    Send() {
      var formData = new FormData();
      formData.append("subject", this.Subject);
      var SendTo = "";
      var CopyTo = "";
      var BlindCopyTo = "";
      var tmpRemoveNames = [];
      var tmpRemoveNamesstr = "";
      if (this.GetEdit) {
        // 편집시-------------------------
        for (var i = 0; i < this.addAttach.length; i++) {
          formData.append("attach", this.addAttach[i]);
        }
        var Detachstr = this.Detach.map((item) => item.name).join(";");
        formData.append("Detach", Detachstr);
        var RemoveSend = this.Difference(
          this.editData.sendToInfo,
          this.org.SendTo
        );
        tmpRemoveNames = tmpRemoveNames.concat(RemoveSend);
        var RemoveCopy = this.Difference(
          this.editData.copyToInfo,
          this.org.CopyTo
        );
        tmpRemoveNames = tmpRemoveNames.concat(RemoveCopy);

        var RemoveBCopy = this.Difference(
          this.editData.bcopyToInfo,
          this.org.BlindCopyTo
        );
        tmpRemoveNames = tmpRemoveNames.concat(RemoveBCopy);

        tmpRemoveNamesstr = this.StrJoin(tmpRemoveNames);
        formData.append("tmpRemoveNames", tmpRemoveNamesstr);

        this.org.SendTo = this.Difference(
          this.org.SendTo,
          this.editData.sendToInfo
        );
        this.org.CopyTo = this.Difference(
          this.org.CopyTo,
          this.editData.copyToInfo
        );
        this.org.BlindCopyTo = this.Difference(
          this.org.BlindCopyTo,
          this.editData.bcopyToInfo
        );
      } else {
        // 작성시-------------------------
        for (var i = 0; i < this.file.length; i++) {
          formData.append("attach", this.file[i]);
        }
      }

      SendTo = this.StrJoin(this.org.SendTo);
      CopyTo = this.StrJoin(this.org.CopyTo);
      BlindCopyTo = this.StrJoin(this.org.BlindCopyTo);

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
      formData.append("startDate", start);
      formData.append("endDate", end);
      formData.append("location", this.place);
      // namo 에디터 본문 내용 받아오기
      let editorData = this.$refs.Body.getBody();

      formData.append("body", editorData);
      // formData.append("body", this.editor.getHTML());
      formData.append("category", this.onCategory);
      formData.append("private", !this.open);

      formData.append("unid", this.editData.unid);

      return formData;
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
    rClick(value) {
      this.$emit("reData", {});
      this.$emit("rere", false);
    },
  },
};
</script>

<style>
</style>