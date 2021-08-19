<template>
  <div>
    <div class="wmail_header">
      <h2>
        <router-link to="/maillist"
          ><img src="../../mobile/img/wmail_back.png" alt="" /></router-link
        >메일쓰기
      </h2>
      <div>
        <!--7월 6일 추가됨-->
        <span class="tem_save">임시저장</span
        ><!--7월 6일 추가됨-->
        <span class="mail_send" @click="Send">보내기</span>
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
                  {{ value.shortname }}
                  <div class="del_add">
                    <dl>
                      <dt>{{ value.name }} / {{ value.department }}</dt>
                      <dd>{{ value.email }}</dd>
                    </dl>
                    <span @click="MailOrgDataDelete(value, 'SendTo')"
                      >삭제</span
                    >
                  </div>
                </li>
                <li class="new_addr">
                  <label for="toinput" class="blind">받는사람주소</label>
                  <textarea id="toinput"></textarea>
                </li>
              </ul>
              <div>
                <span class="tome" @click="ToMe">내게쓰기</span>
                <span class="organ" @click="orgClick('SendTo')"></span>
              </div>
            </div>
            <div class="add_search">
              <ul>
                <li>
                  <span class="per_img">
                    <img src="../../mobile/img/img01.png" alt="" />
                    <em class="no_img"><b>이</b></em>
                  </span>
                  <dl>
                    <dt>이정인 책임 / 디자인팀</dt>
                    <dd>jeongin@saerom.co.kr</dd>
                  </dl>
                  <em></em>
                </li>
                <li>
                  <span class="per_img">
                    <em class="no_img" style="background: #d0d0d0"
                      ><b>이</b></em
                    >
                  </span>
                  <dl>
                    <dt>이정민 대리 / 경영지원팀</dt>
                    <dd>jminlee@saerom.co.kr</dd>
                  </dl>
                </li>
                <li>
                  <span class="per_img">
                    <em class="no_img" style="background: #bbddd7"
                      ><b>이</b></em
                    >
                  </span>
                  <dl>
                    <dt>이정훈 선임 / 신사업TFT</dt>
                    <dd>hoon3125@saerom.co.kr</dd>
                  </dl>
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
                    {{ value.shortname }}
                    <div class="del_add">
                      <dl>
                        <dt>{{ value.name }} / 디자인팀</dt>
                        <dd>jeongin@saerom.co.kr</dd>
                      </dl>
                      <span @click="MailOrgDataDelete(value, 'CopyTo')"
                        >삭제</span
                      >
                    </div>
                  </li>
                  <li class="new_addr">
                    <label for="referinput" class="blind">참조</label>
                    <textarea id="referinput"></textarea>
                  </li>
                </ul>
              </div>
              <div class="add_search">
                <ul>
                  <li>
                    <span class="per_img">
                      <img src="../../mobile/img/img01.png" alt="" />
                      <em class="no_img"><b>이</b></em>
                    </span>
                    <dl>
                      <dt>이정인 책임 / 디자인팀</dt>
                      <dd>jeongin@saerom.co.kr</dd>
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
                    {{ value.shortname }}
                    <div class="del_add">
                      <dl>
                        <dt>{{ value.name }} / 디자인팀</dt>
                        <dd>jeongin@saerom.co.kr</dd>
                      </dl>
                      <span @click="MailOrgDataDelete(value, 'BlindCopyTo')"
                        >삭제</span
                      >
                    </div>
                  </li>
                  <li class="new_addr">
                    <label for="cryinput" class="blind">숨은참조</label>
                    <textarea id="cryinput"></textarea>
                  </li>
                </ul>
              </div>
              <div class="add_search">
                <ul>
                  <li>
                    <span class="per_img">
                      <img src="../../mobile/img/img01.png" alt="" />
                      <em class="no_img"><b>이</b></em>
                    </span>
                    <dl>
                      <dt>이정인 책임 / 디자인팀</dt>
                      <dd>jeongin@saerom.co.kr</dd>
                    </dl>
                    <em></em>
                  </li>
                  <li>
                    <span class="per_img">
                      <em class="no_img" style="background: #d0d0d0"
                        ><b>이</b></em
                      >
                    </span>
                    <dl>
                      <dt>이정민 대리 / 경영지원팀</dt>
                      <dd>jminlee@saerom.co.kr</dd>
                    </dl>
                  </li>
                  <li>
                    <span class="per_img">
                      <em class="no_img" style="background: #bbddd7"
                        ><b>이</b></em
                      >
                    </span>
                    <dl>
                      <dt>이정훈 선임 / 신사업TFT</dt>
                      <dd>hoon3125@saerom.co.kr</dd>
                    </dl>
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
              <!-- <upload-files ref="file" style="display:none"></upload-files> -->
              <!-- <a :href="file.url">{{ file.name }}</a> -->
              <input
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
                  ><img src="../../mobile/img/test_img02.png" alt=""
                /></span>
                <div>
                  <p>{{ value.name }}</p>
                  <em>({{ getReadableByte(value.size) }})</em>
                  <span class="file_del"></span>
                </div>
              </li>
            </ul>
          </li>
          <li class="impor_send">
            <p>
              <span
                class="impor_check"
                :class="{ active: this.Importance }"
              ></span
              >중요메일
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
            <textarea name="" id="mail_wri" v-model="Body_Text"></textarea>
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
                <div><input type="time" v-model="time" /></div>
              </li>
            </ul>
            <span class="time_mo_btn" @click="timeOk">확인</span>
            <span class="modal_close" @click="disReservation"></span>
          </div>
        </div>
        <div class="organ_modal">
          <div class="organ_con">
            <ul class="organlist">
              <span
                class=""
                v-for="(value, name) in this.mail.data.org.trans"
                :key="name"
              >
                <org-item
                  :item="value"
                  @make-folder="makeFolder"
                  @add-item="addItem"
                ></org-item>
              </span>
            </ul>
            <span class="modal_close"></span>
          </div>
        </div>
      </form>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./footer.vue";
import { mapState, mapGetters } from "vuex";
import OrgItem from "./orgitemview.vue";
export default {
  computed: {
    ...mapState(["mail", "mailorg", "mailconfig"]),
    isBlock: function () {
      if (this.isOpen) {
        return "block";
      }
      return "none";
    },
  },
  components: {
    Footer,
    OrgItem,
  },
  data: function () {
    return {
      isOpen: false,
      file: [],
      Importance: false, //일반메일
      Subject: "",
      Body_Text: "",
      time: "",
      ExpireDate: "",
      STime: 5,
      SMin: 50,
      dispreserve: false,
      timemodal: false,
      tome: false,
    };
  },
  methods: {
    MailOrgDataDelete(data, pointer) {
      this.$store.commit("MailOrgDataDelete", { data, pointer });
    },
    ToMe() {
      this.tome = !this.tome;
      if (this.tome) {
        this.$store.dispatch("ToMe");
      } else {
        console.log("SendTo 싹다 없애기");
      }
    },
    Send() {
      console.log(this.mailorg);

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
      formData.append("Body_Text", this.Body_Text);

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

      if (this.mailconfig.delay.config.use) {
        delaysend_use = "Y";
      }
      var me = "";
      if (this.tome) {
        me = "Y";
      }

      formData.append("delaysend_use", delaysend_use);
      formData.append("ToMe", me);
      for (var key of formData.keys()) {
        console.log(key);
      }

      for (var value of formData.values()) {
        console.log(value);
      }
      if (this.time) {
        console.log(this.time);
      }

      formData.append("STime", this.STime);
      formData.append("SMin", this.SMin);
      formData.append("file", this.file);
      this.$store.dispatch("MailWrite", formData);
    },
    orgClick(to) {
      console.log(to);
      this.$store.commit("MailOrgPointer", to);
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
      console.log(this.$refs.file.files[0]);
      this.file.push(this.$refs.file.files[0]);
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
  },
};
</script>

<style>
</style>