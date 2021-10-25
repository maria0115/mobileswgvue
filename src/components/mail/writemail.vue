<template>
  <div>
    <div class="wmail_header">
      <h2>
        <router-link :to="{ name: 'mail' }"
          ><img src="../../mobile/img/wmail_back.png" alt="" /></router-link
        >메일쓰기
      </h2>
      <div>
        <!--7월 6일 추가됨-->
        <span class="tem_save" @click="Send('save')">임시저장</span
        ><!--7월 6일 추가됨-->
        <span class="mail_send" @click="Send('send')">보내기</span>
      </div>
    </div>
    <div class="m_contents03">
      <form action="">
        <ul class="wm_top">
          <li class="clfix">
            <strong>받는사람 <em class="re_more"></em></strong>
            <div class="todiv div_list">
              <ul class="list_add clfix">
                <li
                  class="add_obj"
                  v-for="(value, index) in this.org.SendTo"
                  :key="index"
                >
                  {{ isShortName(value) }}
                  <div class="del_add">
                    <dl>
                      <dt v-if="value.department">
                        {{ value.name }} / {{ value.department }}
                      </dt>
                      <dt v-else>{{ value.name }}</dt>
                      <dd>{{ value.email }}</dd>
                    </dl>
                    <span @click="MailOrgDataDelete(value, 'SendTo')"
                      >삭제</span
                    >
                  </div>
                </li>
                <li class="new_addr">
                  <label for="toinput" class="blind">받는사람주소</label>
                  <textarea
                    @click="
                      [
                        SendToSearch(
                          'SendTo',
                          'sendtosearch',
                          $event.target.value
                        ),
                      ]
                    "
                    id="toinput"
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
              <div>
                <span class="tome" :class="{ active: this.tome }" @click="ToMe"
                  >내게쓰기</span
                >
                <span class="organ" @click="orgClick('SendTo')"></span>
              </div>
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
          <li class="refer_div">
            <div class="refer_div01 clfix">
              <strong>참조</strong>
              <div class="refer_list div_list">
                <ul class="list_add">
                  <li
                    class="add_obj"
                    v-for="(value, index) in this.org.CopyTo"
                    :key="index"
                  >
                    {{ isShortName(value) }}
                    <div class="del_add">
                      <dl>
                        <dt>{{ value.name }} / {{ value.department }}</dt>
                        <dd>{{ value.email }}</dd>
                      </dl>
                      <span @click="MailOrgDataDelete(value, 'CopyTo')"
                        >삭제</span
                      >
                    </div>
                  </li>
                  <li class="new_addr">
                    <label for="referinput" class="blind">참조</label>
                    <textarea
                      @click="
                        [
                          SendToSearch(
                            'CopyTo',
                            'copytosearch',
                            $event.target.value
                          ),
                        ]
                      "
                      id="referinput"
                      v-model="copytosearchkeyword"
                      @keyup="
                        [
                          SendToSearch(
                            'CopyTo',
                            'copytosearch',
                            $event.target.value
                          ),
                          showAddSearch('copytosearch'),
                        ]
                      "
                    ></textarea>
                  </li>
                </ul>
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
              <span class="organ" @click="orgClick('CopyTo')"></span>
            </div>
            <div class="refer_div02 clfix">
              <strong>숨은참조</strong>
              <div class="cry_refer div_list">
                <ul class="list_add">
                  <li
                    class="add_obj"
                    v-for="(value, index) in this.org.BlindCopyTo"
                    :key="index"
                  >
                    {{ isShortName(value) }}
                    <div class="del_add">
                      <dl>
                        <dt>{{ value.name }} / {{ value.department }}</dt>
                        <dd>{{ value.email }}</dd>
                      </dl>
                      <span @click="MailOrgDataDelete(value, 'BlindCopyTo')"
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
                        ]
                      "
                      id="cryinput"
                      v-model="blindcopytosearchkeyword"
                      @keyup="
                        [
                          SendToSearch(
                            'BlindCopyTo',
                            'blindcopytosearch',
                            $event.target.value
                          ),
                          showAddSearch('blindcopytosearch'),
                        ]
                      "
                    ></textarea>
                  </li>
                </ul>
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
              <span class="organ" @click="orgClick('BlindCopyTo')"></span>
            </div>
          </li>
          <li class="tit_line clfix">
            <strong>제목</strong>
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
          <li class="add_file clfix">
            <strong>파일첨부</strong>
            <ul>
              <li
                class="active"
                v-for="(value, index) in this.file"
                :key="index"
              >
                <span
                  ><img
                    :src="`../../mobile/img/icon_${fileImg(value.name)}.png`"
                    alt=""
                /></span>
                <div>
                  <p>{{ value.name }}</p>
                  <em v-if="from === ''"
                    >({{ value.size}})</em
                  >
                  <em v-else>({{ value.size }})</em>
                  <span class="file_del" @click="FileDel(value)"></span>
                </div>
              </li>
            </ul>
          </li>
          <li class="impor_send" @click="imporCheck">
            <p>
              <span
                class="impor_check"
                :class="{ active: this.Importance }"
              ></span
              >중요도 높음
            </p>
          </li>
          <li class="time_send" @click="timeToggle">
            <p>
              <span
                class="time_check"
                :class="{ active: this.dispreserve }"
              ></span
              >예약발송
            </p>
            <span v-if="this.ExpireDate && this.time && this.dispreserve"
              >2021-05-30<em>19:00</em></span
            >
          </li>
          <li class="mail_edit">
            <label for="mail_wri"></label>
            <!-- <editor-content id="mail_wri" :editor="editor" /> -->
            <Namo
              id="mail_wri"
              :read="false"
              :editor="Body_Text"
              ref="editor"
              did="mail"
            ></Namo>
            <!-- <textarea name="" id="mail_wri" v-model="Body_Text"></textarea> -->
          </li>
        </ul>
        <div class="time_modal" :class="{ active: this.timemodal }">
          <div class="modal_con">
            <strong>예약발송</strong>
            <ul>
              <li>
                <em>일자</em>
                <div><input type="date" v-model="ExpireDate" /></div>
              </li>
              <li>
                <em>시간</em>
                <div>
                  <select name="" id="" v-model="STime">
                    <option
                      :value="value"
                      v-for="(value, index) in this.TimeOption.mail.hour"
                      :key="index"
                    >
                      {{ value }}
                    </option>
                  </select>
                  <select name="" id="" v-model="SMin">
                    <option
                      :value="value"
                      v-for="(value, index) in this.TimeOption.mail.min"
                      :key="index"
                    >
                      {{ value }}
                    </option>
                  </select>
                </div>
              </li>
            </ul>
            <span class="time_mo_btn" @click="timeOk">확인</span>
            <span class="modal_close" @click="disReservation"></span>
          </div>
        </div>
        <Org :modalon="modalon" @ModalOff="ModalOff"></Org>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Org from "../../View/Org.vue";
import { Editor, EditorContent } from "tiptap";
import configjson from "../../config/config.json";
import Namo from "../editor/namo.vue";
// import EditorContent from "../mailconfig/EditorContent.vue";
export default {
  async created() {
    // this.$store.commit("mailjs/MailOrgDataInit");
    this.Body_Text = `${this.GetMail.writeForm.greetings}<p></p><p></p>${this.GetMail.writeForm.signature}<p></p><p></p>`;
    if (this.from === "Relay") {
      this.file = this.GetMailDetail.attach;
      this.Subject = this.GetMailDetail.subject;
      this.Body_Text += `----------------- 원본메일 ----------------- <p></p>${this.GetMailDetail.body}`;
    } else if (this.from === "Reply" || this.from === "AllReply") {
      this.Subject = this.GetMailDetail.subject;
      this.Body_Text += `----------------- 원본메일 ----------------- <p></p>${this.GetMailDetail.body}`;
    }

    this.randomkey = await this.generateRandomCode(32);
  },
  beforeDestroy() {
    clearInterval(this.delay);
    this.editor.destroy();
  },
  mounted() {
    this.fileinit = this.$refs.file.files;
    this.editor = new Editor({
      content: this.Body_Text,
    });
    var here = this;

    if (this.GetMailConfig.autosave.config.use) {
      this.delay = setInterval(function () {
        var formData = here.FormSet();
        formData.append("dockey", here.randomkey);
        here.$store.dispatch("mailjs/MailSave", {
          data: formData,
          menu: "autoSave",
        });
      }, this.GetMailConfig.autosave.config.time * 60 * 1000);
    }
  },
  computed: {
    ...mapState("mailjs", ["from", "TimeOption"]),
    ...mapState(["autosearchorg", "org"]),
    ...mapGetters("mailjs", ["GetMailDetail", "GetMail", "GetMailConfig"]),
    isBlock: function () {
      if (this.isOpen) {
        return "block";
      }
      return "none";
    },
  },
  components: {
    Org,
    EditorContent,
    Namo,
  },
  data: function () {
    return {
      delay: null,
      editor: null,
      isOpen: false,
      file: [],
      Importance: false, //일반메일
      Subject: "",
      Body_Text: "",
      time: "",
      ExpireDate: "",
      STime: "05",
      SMin: "50",
      dispreserve: false,
      timemodal: false,
      tome: false,
      blindcopytosearch: false,
      copytosearch: false,
      sendtosearch: false,
      blindcopytosearchkeyword: "",
      copytosearchkeyword: "",
      sendtosearchkeyword: "",
      modalon: false,
      modalAutoOrg: 0,
      Detach: [],
      addAttach: [],
    };
  },
  methods: {
    generateRandomCode(n) {
      let str = "";
      for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10);
      }
      return str;
    },
    getExtensionOfFilename(filename) {
      var _fileLen = filename.length;
      var _lastDot = filename.lastIndexOf(".");
      var _fileExt = filename.substring(_lastDot + 1, _fileLen).toLowerCase();

      return _fileExt;
    },
    fileImg(name) {
      var dot = this.getExtensionOfFilename(name);

      if (configjson.extension.indexOf(dot) !== -1) {
        return dot;
      }
      return "etc";
    },
    MailOrgDataDelete(data, pointer) {
      this.$store.commit("OrgDataDelete", { data, pointer });
    },
    ToMe() {
      this.tome = !this.tome;
      if (this.tome) {
        this.$store.commit("OrgDataInit");

        this.$store.dispatch("mailjs/ToMe").then((res) => {
          this.$store.commit("OrgPointer", "SendTo");
          this.$store.commit("OrgData", res);
        });
      } else {
        this.$store.commit("OrgDataInit");
      }
    },
    FormSet() {
      var SendTo = "";
      for (var i = 0; i < this.org.SendTo.length; i++) {
        if (i === this.org.SendTo.length - 1) {
          SendTo += this.org.SendTo[i].id;
        } else {
          SendTo += this.org.SendTo[i].id + ";";
        }
      }

      var inSendTo = "";
      for (var i = 0; i < this.org.SendTo.length; i++) {
        if (i === this.org.SendTo.length - 1) {
          inSendTo += this.org.SendTo[i].name;
        } else {
          inSendTo += this.org.SendTo[i].name + ";";
        }
      }

      var ocxSendTo = "";
      for (var i = 0; i < this.org.SendTo.length; i++) {
        if (i === this.org.SendTo.length - 1) {
          ocxSendTo += this.org.SendTo[i].shortname;
        } else {
          ocxSendTo += this.org.SendTo[i].shortname + ";";
        }
      }

      var CopyTo = "";
      for (var i = 0; i < this.org.CopyTo.length; i++) {
        if (i === this.org.CopyTo.length - 1) {
          CopyTo += this.org.CopyTo[i].id;
        } else {
          CopyTo += this.org.CopyTo[i].id + ";";
        }
      }

      var ocxCopyTo = "";
      for (var i = 0; i < this.org.CopyTo.length; i++) {
        if (i === this.org.CopyTo.length - 1) {
          ocxCopyTo += this.org.CopyTo[i].shortname;
        } else {
          ocxCopyTo += this.org.CopyTo[i].shortname + ";";
        }
      }

      var BlindCopyTo = "";
      for (var i = 0; i < this.org.BlindCopyTo.length; i++) {
        if (i === this.org.BlindCopyTo.length - 1) {
          BlindCopyTo += this.org.BlindCopyTo[i].id;
        } else {
          BlindCopyTo += this.org.BlindCopyTo[i].id + ";";
        }
      }
      var ocxBCopyTo = "";
      for (var i = 0; i < this.org.BlindCopyTo.length; i++) {
        if (i === this.org.BlindCopyTo.length - 1) {
          ocxBCopyTo += this.org.BlindCopyTo[i].shortname;
        } else {
          ocxBCopyTo += this.org.BlindCopyTo[i].shortname + ";";
        }
      }
      let formData = new FormData();
      formData.append("SendTo", SendTo);
      formData.append("inSendTo", inSendTo);
      formData.append("ocxSendTo", ocxSendTo);
      formData.append("CopyTo", CopyTo);
      formData.append("ocxCopyTo", ocxCopyTo);
      formData.append("BlindCopyTo", BlindCopyTo);
      formData.append("ocxBCopyTo", ocxBCopyTo);
      formData.append("Subject", this.Subject);
      // namo editor 본문 내용 받아오기
      // let editorData ="본문";
      let editorData =
        this.$refs.editor.$refs.namo.contentWindow.crosseditor.GetBodyValue();
      formData.append("Body_Text", editorData);

      var impor = 2;

      if (this.Importance) {
        impor = 1;
      }
      formData.append("Importance", impor);
      formData.append("ExpireDate", this.ExpireDate);

      var disp = "";
      if (this.dispreserve) {
        disp = 1;
      }

      formData.append("dispreserve", disp);

      var delaysend_use = "N";

      if (this.GetMailConfig.delay.config.use) {
        delaysend_use = "Y";
      }
      var me = "";
      if (this.tome) {
        me = "Y";
      }
      var docType = "";
      if (
        this.from === "Reply" ||
        this.from === "AllReply" ||
        this.from === "Relay"
      ) {
        docType = "Forward";
        for (var i = 0; i < this.addAttach.length; i++) {
          formData.append("attach", this.addAttach[i]);
        }
        var Detachstr = "";
        for (var i = 0; i < this.Detach.length; i++) {
          if (i === this.Detach.length - 1) {
            Detachstr += this.Detach[i].name;
          } else {
            Detachstr += this.Detach[i].name + ";";
          }
        }
        formData.append("Detach", Detachstr);
        formData.append("unid",this.GetMailDetail.unid);
      } else {
        for (var i = 0; i < this.file.length; i++) {
          formData.append("attach", this.file[i]);
        }
      }
      formData.append("docType", docType);
      var MailTypeOptionstr = "";
      if (this.from === "Relay") {
        MailTypeOptionstr = "Forward";
      } else if (this.from === "Reply") {
        MailTypeOptionstr = "Reply";
      }
      formData.append("MailTypeOption", MailTypeOptionstr);

      formData.append("delaysend_use", delaysend_use);
      formData.append("ToMe", me);

      formData.append("STime", this.STime);
      formData.append("SMin", this.SMin);

      return formData;
    },
    async Send(menu) {
      // if (this.mailorg.SendTo[0].id) {
      // 보낼수 있는 메일인지 확인하고

      // data에 담고

      if (this.org.SendTo.length > 0 && this.org.SendTo[0].id) {
        var formData = this.FormSet();
        // 사람이 한사람이라도 있으면
        // 전송가능
        if (menu === "send") {
          this.$store.dispatch("mailjs/MailWrite", formData).then((res) => {
            if (res) {
              this.$store.commit("OrgDataInit");
              this.$router.push({ name: "sent_detail" });
            }
          });
        } else if (menu === "save") {
          // 저장가능
          this.$store
            .dispatch("mailjs/MailSave", {
              data: formData,
              menu: "draftSave",
            })
            .then((res) => {
              if (res) {
                this.$store.commit("OrgDataInit");
                this.$router.push({ name: "mail_draft" });
              }
            });
        }
      } else {
        var formData = this.FormSet();
        // 사람이 한사람이라도 없으면
        if (menu === "save") {
          // 저장가능
          this.$store
            .dispatch("mailjs/MailSave", {
              data: formData,
              menu: "draftSave",
            })
            .then((res) => {
              if (res) {
                this.$store.commit("OrgDataInit");
                this.$router.push({ name: "mail_draft" });
              }
            });
        }
      }
      // }
    },
    orgClick(to) {
      if (!this.tome) {
      this.$store.commit("OrgPointer", to);
      this.modalon = true;
      }
    },
    timeOk() {
      this.timemodal = false;
      this.dispreserve = false;
      if (this.ExpireDate !== null && this.time !== null) {
        this.dispreserve = true;
      }
    },
    disReservation() {
      this.timemodal = false;
      this.dispreserve = false;
    },
    timeToggle() {
      this.dispreserve = true;
      this.timemodal = true;
    },
    // getReadableByte(count, decimal = 2, level = 0) {
    //   let unitList = ["Bytes", "KB", "MB", "GB", "TB", "PT"];

    //   if (count >= 1024.0 && level + 1 < unitList.length) {
    //     return this.getReadableByte(count / 1024, decimal, ++level);
    //   }
    //   return `${decimal ? count.toFixed(decimal) : Math.round(count)}${
    //     unitList[level]
    //   }`;
    // },
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
        if (result === -1) {
          this.file.push(this.$refs.file.files[0]);
        }
        if (this.from === "Reply" ||
        this.from === "AllReply" ||
        this.from === "Relay") {
          this.addAttach.push(this.$refs.file.files[0]);
        }
      }
      this.$refs.file.files = this.fileinit;
    },
    toggle(value) {
      if (value.kinds === "Department") {
        // this.click = !this.click;
        this.isOpen = !this.isOpen;
      }
    },
    Back() {
      this.$router.go(-1);
    },
    SendToSearch(who, keyword, value) {
      if (!this.tome) {
        if (value.length >= 2) {
          var data = {};
          data.who = who;
          data.keyword = value;

          this.$store.dispatch("OrgAutoSearch", data);

          this.showAddSearch(who);
        } else {
          this.removeAddSearch(who);
        }
      }
    },
    randomColor() {
      const color = ["#bcbbdd", "#bbcbdd", "#bbddd7", "#d0d0d0"];
      return `background: ${color[Math.floor(Math.random() * 4)]}`;
    },
    async AddOrg(who, value, what) {
      await this.$store.commit("AddOrg", { who, value });
      this[what] = false;
      this[`${what}keyword`] = "";
      this.$store.commit("SearchOrgInit");
    },
    removeAddSearch(value) {
      this[value] = false;
      this.$store.commit("SearchOrgInit");
    },
    showAddSearch(value) {
      this[value] = true;
    },
    ModalOff() {
      this.modalon = false;
    },
    FileDel(value) {
      var result = this.file.filter((element) => {
        return element !== value;
      });
      if (result[0]) {
        this.file = result;
      }
      if (result.length === 0) {
        this.file = [];
      }
      this.Detach.push(value);
    },
    imporCheck() {
      this.Importance = !this.Importance;
    },
    OrgSearch(value) {
      if (value.length >= 2) {
        var data = {};
        data.keyword = value;
        data.who = this.org.pointer;
        this.$store.dispatch("OrgAutoSearch", data);
      }
    },
    isShortName(value) {
      if (value.shortname) {
        return value.shortname;
      }
      return value.name;
    },
  },
};
</script>

<style>
.tome.active {
  font-size: 0.75rem;
  color: #fff;
  background: #655da7;
  border-color: #655da7;
}
</style>