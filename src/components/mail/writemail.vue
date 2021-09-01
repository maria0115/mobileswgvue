<template>
  <div>
    <div class="wmail_header">
      <h2>
        <router-link to="/mail_more"
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
                  v-for="(value, index) in this.mailorg.SendTo"
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
                    :disabled="tome"
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
                    @keyup="[
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
                <span class="tome" @click="ToMe">내게쓰기</span>
                <span class="organ" @click="orgClick('SendTo')"></span>
              </div>
            </div>
            <div class="add_search" :class="{ active: this.sendtosearch }">
              <ul>
                <li
                  v-for="(value, index) in this.autosearchorg.mail.SendTo"
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
                    v-for="(value, index) in this.mailorg.CopyTo"
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
                      :disabled="tome"
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
                        [SendToSearch(
                          'CopyTo',
                          'copytosearch',
                          $event.target.value
                        ),showAddSearch('copytosearch'),]
                      "
                    ></textarea>
                  </li>
                </ul>
              </div>
              <div class="add_search" :class="{ active: this.copytosearch }">
                <ul>
                  <li
                    v-for="(value, index) in this.autosearchorg.mail.CopyTo"
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
                    v-for="(value, index) in this.mailorg.BlindCopyTo"
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
                      :disabled="tome"
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
                       [ SendToSearch(
                          'BlindCopyTo',
                          'blindcopytosearch',
                          $event.target.value
                        ),showAddSearch('blindcopytosearch'),]
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
                    v-for="(value, index) in this.autosearchorg.mail
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
                    >({{ getReadableByte(value.size) }})</em
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
            <editor-content id="mail_wri" :editor="editor" />
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
        <div class="organ_modal" :class="{ on: this.modalon }">
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
                      ><img
                        src="../../mobile/img/search_icon.png"
                        alt="검색하기"
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
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import OrgItem from "./orgitemview.vue";
import { Editor, EditorContent } from "tiptap";
import configjson from "../../config/config.json";
// import EditorContent from "../mailconfig/EditorContent.vue";
export default {
  created() {
    // this.$store.commit("mailjs/MailOrgDataInit");
    this.Body_Text = `${this.GetMail.writeForm.greetings}<p></p><p></p>${this.GetMail.writeForm.signature}<p></p><p></p>`;
    if (this.from == "Relay") {
      this.file = this.GetMailDetail.attach;
      this.Subject = this.GetMailDetail.subject;
      this.Body_Text += `----------------- 원본메일 ----------------- <p></p>${this.GetMailDetail.body}`;
    } else if (this.from == "Reply" || this.from == "AllReply") {
      this.Subject = this.GetMailDetail.subject;
      this.Body_Text += `----------------- 원본메일 ----------------- <p></p>${this.GetMailDetail.body}`;
    }
  },
  beforeDestroy() {
    clearInterval(this.delay);
    this.editor.destroy();
    this.$store.commit("mailjs/From", "");
    this.$store.commit("mailjs/MailOrgDataInit");
  },
  mounted() {
    this.editor = new Editor({
      content: this.Body_Text,
    });
    var here = this;

    if (this.GetMailConfig.autosave.config.use) {
      this.delay = setInterval(function () {
        var formData = here.FormSet();
        here.$store.dispatch("mailjs/MailSave", {
          data: formData,
          menu: "autoSave",
        });
      }, this.GetMailConfig.autosave.config.time * 60 * 1000);
    }
  },
  computed: {
    ...mapState("mailjs", ["mailorg", "from", "TimeOption"]),
    ...mapState(["autosearchorg"]),
    ...mapGetters("mailjs", ["GetMailDetail", "GetMail", "GetMailConfig"]),
    isBlock: function () {
      if (this.isOpen) {
        return "block";
      }
      return "none";
    },
  },
  components: {
    OrgItem,
    EditorContent,
  },
  data: function () {
    return {
      modalAutoOrg: 0,
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
    };
  },
  methods: {
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
      this.$store.commit("mailjs/MailOrgDataDelete", { data, pointer });
    },
    ToMe() {
      this.tome = !this.tome;
      if (this.tome) {
        this.$store.dispatch("mailjs/ToMe");
      } else {
        this.$store.commit("mailjs/MailOrgDataInit");
      }
    },
    FormSet() {
      var SendTo = "";
      for (var i = 0; i < this.mailorg.SendTo.length; i++) {
        if (i == this.mailorg.SendTo.length - 1) {
          SendTo += this.mailorg.SendTo[i].id;
        } else {
          SendTo += this.mailorg.SendTo[i].id + ";";
        }
      }

      var inSendTo = "";
      for (var i = 0; i < this.mailorg.SendTo.length; i++) {
        if (i == this.mailorg.SendTo.length - 1) {
          inSendTo += this.mailorg.SendTo[i].name;
        } else {
          inSendTo += this.mailorg.SendTo[i].name + ";";
        }
      }

      var ocxSendTo = "";
      for (var i = 0; i < this.mailorg.SendTo.length; i++) {
        if (i == this.mailorg.SendTo.length - 1) {
          ocxSendTo += this.mailorg.SendTo[i].shortname;
        } else {
          ocxSendTo += this.mailorg.SendTo[i].shortname + ";";
        }
      }

      var CopyTo = "";
      for (var i = 0; i < this.mailorg.CopyTo.length; i++) {
        if (i == this.mailorg.CopyTo.length - 1) {
          CopyTo += this.mailorg.CopyTo[i].id;
        } else {
          CopyTo += this.mailorg.CopyTo[i].id + ";";
        }
      }

      var ocxCopyTo = "";
      for (var i = 0; i < this.mailorg.CopyTo.length; i++) {
        if (i == this.mailorg.CopyTo.length - 1) {
          ocxCopyTo += this.mailorg.CopyTo[i].shortname;
        } else {
          ocxCopyTo += this.mailorg.CopyTo[i].shortname + ";";
        }
      }

      var BlindCopyTo = "";
      for (var i = 0; i < this.mailorg.BlindCopyTo.length; i++) {
        if (i == this.mailorg.BlindCopyTo.length - 1) {
          BlindCopyTo += this.mailorg.BlindCopyTo[i].id;
        } else {
          BlindCopyTo += this.mailorg.BlindCopyTo[i].id + ";";
        }
      }
      var ocxBCopyTo = "";
      for (var i = 0; i < this.mailorg.BlindCopyTo.length; i++) {
        if (i == this.mailorg.BlindCopyTo.length - 1) {
          ocxBCopyTo += this.mailorg.BlindCopyTo[i].shortname;
        } else {
          ocxBCopyTo += this.mailorg.BlindCopyTo[i].shortname + ";";
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
      formData.append("Body_Text", this.editor.getHTML());

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

      for (var i = 0; i < this.file.length; i++) {
        formData.append("attach", this.file[i]);
      }

      formData.append("delaysend_use", delaysend_use);
      formData.append("ToMe", me);

      formData.append("STime", this.STime);
      formData.append("SMin", this.SMin);

      for (var fo of formData.values()) {
      }
      return formData;
    },
    async Send(menu) {
      // if (this.mailorg.SendTo[0].id) {
      // 보낼수 있는 메일인지 확인하고

      // data에 담고

      if (this.mailorg.SendTo.length > 0 && this.mailorg.SendTo[0].id) {
        var formData = this.FormSet();
        // 사람이 한사람이라도 있으면
        // 전송가능
        if (menu === "send") {
          this.$store.dispatch("mailjs/MailWrite", formData);
        } else if (menu === "save") {
          // 저장가능
          this.$store.dispatch("mailjs/MailSave", {
            data: formData,
            menu: "draftSave",
          });
        }
      } else {
        var formData = this.FormSet();
        // 사람이 한사람이라도 없으면
        if (menu === "save") {
          // 저장가능
          this.$store.dispatch("mailjs/MailSave", {
            data: formData,
            menu: "draftSave",
          });
        }
      }
      // }
    },
    orgClick(to) {
      if (!this.tome) {
        this.$store.commit("mailjs/MailOrgPointer", to);
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
    getReadableByte(count, decimal = 2, level = 0) {
      let unitList = ["Bytes", "KB", "MB", "GB", "TB", "PT"];

      if (count >= 1024.0 && level + 1 < unitList.length) {
        return this.getReadableByte(count / 1024, decimal, ++level);
      }
      return `${decimal ? count.toFixed(decimal) : Math.round(count)}${
        unitList[level]
      }`;
    },
    submitFile() {
      this.$refs.file.click();
    },
    handleFileUpload() {
      this.file.push(this.$refs.file.files[0]);
      // }
    },
    toggle(value) {
      if (value.kinds == "Department") {
        // this.click = !this.click;
        this.isOpen = !this.isOpen;
      }
    },
    makeFolder: function (item) {
      item.children = [];
      this.addItem(item);
    },
    addItem: function (item) {
      item.children.push({
        name: "new stuff",
      });
    },
    Back() {
      this.$router.go(-1);
    },
    SendToSearch(who, keyword, value) {
      console.log(value)
      if (value.length >= 2) {
        var data = {};
        data.menu = "mail";
        data.who = who;
        data.keyword = value;

        this.$store.dispatch("OrgAutoSearch", data);
        console.log(who)
        this.showAddSearch(who);
      }else{
        this.removeAddSearch(who);
      }
    },
    randomColor() {
      const color = ["#bcbbdd", "#bbcbdd", "#bbddd7", "#d0d0d0"];
      return `background: ${color[Math.floor(Math.random() * 4)]}`;
    },
    async AddOrg(who, value, what) {
      await this.$store.commit("mailjs/AddOrg", { who, value, menu: "mail" });
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
      this.file = this.file.filter((element) => element !== value);
    },
    imporCheck() {
      this.Importance = !this.Importance;
    },
    OrgSearch(value) {
      if (value.length >= 2) {
        var data = {};
        data.menu = "mail";
        data.keyword = value;
        data.who = this.mailorg.pointer;
        this.$store.dispatch("OrgAutoSearch", data);
      }
    },
    SetAutoOrg() {
      this.modalAutoOrg += 1;
    },
    OpenFolder() {},
    isShortName(value) {
      if(value.shortname){
        return value.shortname;
      }
      return value.name;
    },
  },
};
</script>

<style>
</style>