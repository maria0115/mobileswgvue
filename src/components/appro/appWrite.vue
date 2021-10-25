<template>
  <div>
    <BackHeader desc="결재양식함에서 지정" :title="title"></BackHeader>
    <div class="a_contents05">
      <form action="">
        <ul>
          <li class="app_tit">
            <strong>제목</strong>
            <div>
              <input
                type="text"
                palceholder="1일 연차 신청"
                v-model="Subject"
              />
            </div>
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
              <!-- <input
                type="text"
                @keyup="
                  SendToSearch('SendTo', 'sendtosearch', $event.target.value)
                "
              />
              <span class="ps_add" @click="addApprover">추가</span> -->
              <span class="app_pointer" @click="orgClick('SendTo', 'sAppList1')"
                >결재선 지정</span
              >
              <span
                v-if="thisform == 'K-SIS_Form661m'"
                class="app_pointer"
                @click="orgClick('CopyTo', 'sAppList2')"
                >주관부서</span
              >
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
          <li class="approute">
            <strong>결재경로</strong>
            <div>
              <div>
                <p>
                  기안자_{{ GetMyInfo.info.dept }} {{ GetMyInfo.info.name }}
                  {{ GetMyInfo.info.position }}
                </p>
                <ul>
                  {{
                    appPath
                  }}
                  <li
                    v-for="(value, index) in appPath"
                    @click="Pointer(index)"
                    :key="index"
                  >
                    <em>{{ index + 1 }}</em
                    >{{ pathDivision[value.appDept][value.appadd] }}
                    {{ AppPath(value.approvalInfo) }}
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
          <!-- <li class="referrer">
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
          </li> -->
          <!-- <li class="division">
            <strong>구분</strong>
            <div>
              <select v-model="onCategory">
                <option
                  v-for="(value, index) in category"
                  :key="index"
                  :value="Object.keys(value)[0]"
                >
                  {{ value[Object.keys(value)[0]] }}
                </option>
              </select>
            </div>
          </li> -->
          <li class="division">
            <strong>공유범위</strong>
            <div>
              <select v-model="pDocPermission">
                <option
                  v-for="(value, index) in DocPermission"
                  :key="index"
                  :value="index"
                >
                  {{ value }}
                </option>
              </select>
            </div>
          </li>
          <li class="division">
            <strong>보존년한</strong>
            <div>
              <select v-model="pDocPeriod">
                <option
                  v-for="(value, index) in DocPeriod"
                  :key="index"
                  :value="index"
                >
                  {{ value }}
                </option>
              </select>
            </div>
          </li>
          <!-- <li class="date">
            <strong>일시</strong>
            <div><input type="date" /> ~ <input type="date" /></div>
          </li>
          <li class="num_day">
            <strong>일수</strong>
            <div><input type="text" v-model="daycount" />일</div>
          </li> -->
          <li class="reason">
            <strong>사유</strong>
            <div>
              <!-- <editor-content :editor="editor" /> -->
              <textarea v-model="TmpsComment"></textarea>
            </div>
          </li>
          <li class="reason">
            <strong>본문</strong>
            <div>
              <editor-content :editor="editor" />
              <!-- {{Body_Text}}
              <textarea v-html="Body_Text"></textarea> -->
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
              </div>
              <ul v-if="this.file.length > 0" class="file_list">
                <li v-for="(value, index) in this.file" :key="index">
                  {{ value.name
                  }}<span class="att_del" @click="FileDel(value)"></span>
                </li>
              </ul>
              <!-- multiple
                ref="file"
                v-on:change="handleFileUpload()"  -->
            </div>
          </li>
        </ul>
      </form>
    </div>
    <BtnPlus :menu="morePlus" @BtnClick="Send"></BtnPlus>
    <Org
      :modalon="modalon"
      :appDept="appDept"
      @AddItem="AddItem"
      @ModalOff="ModalOff"
    ></Org>
  </div>
</template>

<script>
import BackHeader from "./backheader.vue";
import BtnPlus from "./btnPlus.vue";
import SubMenu from "./menu.vue";
import { mapState, mapGetters } from "vuex";
import Org from "../../View/OrgAppro.vue";
import { Editor, EditorContent } from "tiptap";
export default {
  created() {
    this.params = JSON.parse(this.$route.query.data);
    // this.params = this.GetHeader.menu;
    this.params.isedit =
      this.params.isedit && Object.keys(this.detail).length > 0;

    if (this.params.isedit) {
      const info = this.detail.approvalInfo;
      this.currentidx = info.findIndex((item) => item.approval);
      this.appPath = this.detail.appList.slice(1);
      this.file = this.detail.attachInfo;
      this.Subject = this.detail.subject;
      this.Body_Text = this.detail.body;
      this.morePlus= { raise: "결재보내기" };
    }

    const date = new Date();
    this.startdate = date;
    this.enddate = date;
    this.title = this.params.formtitle;

    this.thisform = this.params.form;
  },
  mounted() {
    this.fileinit = this.$refs.file.files;

    this.editor = new Editor({
      content: this.Body_Text,
    });
  },
  components: {
    BackHeader,
    SubMenu,
    BtnPlus,
    Org,
    EditorContent,
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  data() {
    return {
      currentidx: -1,
      thisform: "",
      appPath: [],
      appDept: "sAppList1",
      editor: null,
      file: [],
      morePlus: { raise: "결재보내기", draft: "임시저장" },
      title: "결재양식함에서 지정",
      modalon: false,
      modalAutoOrg: 0,
      copytosearch: false,
      sendtosearch: false,
      copytosearchkeyword: "",
      sendtosearchkeyword: "",
      ExpireDate: "",
      pointer: -1,
      Detach: [],
      addAttach: [],
      category: {
        year: "연차휴가",
        prize: "경조/포상",
        health: "보건",
        free: "무급휴가",
        month: "월차",
        sick: "병가",
        Refresh: "Refresh",
        military: "병역동원훈련",
        baby: "산전산후",
        early: "조퇴",
      },
      onCategory: "year",
      file: [],
      Subject: "",
      Body_Text: "",
      TmpsComment: "",
      rereclick: false,
      open: true,
      daycount: 0,
      startdate: null,
      enddate: null,
      pDocPeriod: 1,
      DocPeriod: {
        1: "1년",
        3: "3년",
        5: "5년",
        10: "10년",
        15: "15년",
        99: "영구",
      },
      pathDivision: {
        sAppList1: { AP: "결재", "AG_S!@AG_M": "협조" },
        sAppList2: { AP: "담당" },
      },
      DocPermission: { H0: "권한자만 공유", H1: "부서공유", H2: "사내공유" },
      pDocPermission: "H0",
    };
  },
  computed: {
    ...mapState(["autosearchorg", "org"]),
    ...mapGetters(["GetHeader"]),
    ...mapGetters("mainjs", ["GetMyInfo"]),
    ...mapGetters("mailjs", ["GetMail"]),
    ...mapState("approjs", ["detail"]),
  },
  methods: {
    Send(e) {
      if (!(this.Subject.length > 0)) {
        alert("제목을 입력하세요");
        return;
      }
      let formData = new FormData();
      var sAppList1 = "";
      var sAppList2 = "";
      var AprTcount1 = 0;
      var AprTcount2 = 0;
      var type = "write";
      if (this.params.isedit) {
        type = "edit";
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
        formData.append("openurl", this.detail.openurl);
      } else {
        for (var i = 0; i < this.file.length; i++) {
          formData.append("attach", this.file[i]);
        }
        AprTcount1++;
        sAppList1 += this.GetMyInfo.approvalInfo + ";";
      }
      for (var i = 0; i < this.appPath.length; i++) {
        if (this.appPath[i].appDept == "sAppList1") {
          sAppList1 += `${this.appPath[i].appadd}^${AprTcount1}^${this.appPath[i].approvalInfo.approvalInfo};`;
          AprTcount1++;
        } else if (this.appPath[i].appDept == "sAppList2") {
          sAppList2 += `${this.appPath[i].appadd}^${AprTcount2}^${this.appPath[i].approvalInfo.approvalInfo};`;
          AprTcount2++;
        }
      }
      if (AprTcount1 <= 1) {
        alert("결재선 지정하세요");
        return;
      }

      if (this.thisform == "K-SIS_Form661m" && AprTcount2 < 1) {
        alert("주관부서 지정하세요");
        return;
      }

      formData.append("approvalType", e);
      formData.append("formCode", this.thisform);
      formData.append("From", this.GetMyInfo.info.notesid);
      formData.append("myinfo", this.GetMyInfo.approvalInfo);
      console.log(sAppList1, sAppList2, AprTcount1, AprTcount2);
      formData.append("sAppList1", sAppList1);
      formData.append("sAppList2", sAppList2);
      formData.append("AprTcount1", AprTcount1);
      formData.append("AprTcount2", AprTcount2);
      formData.append("subject", this.Subject);
      formData.append("body", this.editor.getHTML());
      formData.append("TmpsComment", this.TmpsComment);

      formData.append("DocPeriod", this.pDocPeriod);
      formData.append("DocPermission", this.pDocPermission);
      this.$store
        .dispatch("approjs/AppWrite", { data: formData, type })
        .then((res) => {
          if (res) {
            // if(e=="raise"){
            this.params.type = "";
            // this.SetHeader(this.params);
            this.$router.push({
              name: "appapproving",
              query: { data: JSON.stringify(this.params) },
            });

            // }else if(e=="draft"){
            // this.$router.push({name:'appdraft',query:{data:JSON.stringify(this.params)}})

            // }
          }
        });
    },
    SetHeader(data) {
      this.$store.dispatch("SetHeader", data);
    },
    AddItem(item) {
      if (Object.keys(item.approvalInfo).length > 0) {
        if (item.appDept == "sAppList2") {
          item.appadd = "AP";
        }
        this.appPath.push(item);
        var result = this.appPath;

        var result = result.filter(function (item1, idx1) {
          return (
            result.findIndex(function (item2, idx) {
              return (
                item1.approvalInfo.email == item2.approvalInfo.email &&
                item1.appadd == item2.appadd &&
                item1.appDept == item2.appDept
              );
            }) == idx1
          );
        });

        this.appPath = result;
      }
    },
    ModalOff() {
      this.modalon = false;
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
        if (this.params.isedit) {
          this.addAttach.push(this.$refs.file.files[0]);
        }
      }
      this.$refs.file.files = this.fileinit;
    },
    ScheduleOrgDataDelete(data, pointer) {
      this.$store.commit("OrgDataDelete", { data, pointer });
    },
    orgClick(to, dept) {
      this.$store.commit("OrgPointer", to);
      this.modalon = true;
      this.appDept = dept;
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
    SendToArr() {
      // for="(value, index) in scheduleorg.SendTo"
      var str = "";
      for (var data of this.appPath) {
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
      if (
        this.pointer !== -1 &&
        this.pointer !== 0 &&
        this.currentidx < this.pointer
      ) {
        var list = this.appPath;
        this.appPath = this.changeArrayOrder(list, this.pointer, -1);
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
        this.pointer !== this.appPath.length - 1 &&
        this.currentidx <= this.pointer
      ) {
        var list = this.appPath;
        this.appPath = this.changeArrayOrder(list, this.pointer, 1);
        if (this.pointer === list.length - 1) {
          this.pointer = 0;
        } else {
          this.pointer += 1;
        }
      }
    },
    Delete() {
      if (this.pointer !== -1) {
        this.appPath = this.appPath.filter(
          (element) => element !== this.appPath[this.pointer]
        );
        this.pointer = -1;
      }
    },
    AllDel() {
      // if (!this.params.isedit) {
        console.log(this.appPath)
        this.appPath = this.appPath.slice(this.currentidx-1,this.appPath.length);

      // }
    },
    addApprover() {
      // console.log(autosearchorg.)
    },
  },
};
</script>

<style>
.ProseMirror {
  width: 100%;
  height: 8.75rem;
  appearance: none;
  outline: none;
  border: 0.06rem solid #e6e6e6;
  padding: 0.62rem;
}
.a_contents05 ul li.approver div span.app_pointer {
  margin: 0;
}
.a_contents05 ul li.approver div span.app_pointer + .app_pointer {
  margin-left: 0.25rem !important;
}
</style>