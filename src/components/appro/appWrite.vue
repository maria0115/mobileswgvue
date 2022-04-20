<template>
  <div @click="Close">
    <BackHeader desc="결재양식함에서 지정" :title="title"></BackHeader>
    <div class="a_contents05">
      <form @submit.prevent>
        <ul>
          
          <li class="proposer">
            <strong>{{ lang.author }}</strong>
            <div>
              {{ GetMyInfo.info.name }} {{ GetMyInfo.info.position }} /
              {{ GetMyInfo.info.dept }}
            </div>
          </li>
          <!-- <li class="proposer">
            <strong> 주관부서 </strong>
            <div>{{ formSetting.sReceiveOrgName_NM }}</div>
          </li> -->
          <li class="cf_w_att cf_w_att2">
            <strong
              ><span>{{lang.receiver}}</span></strong
            >
            <div>
              <ul class="list_add clfix">
                <li
                  class="add_obj"
                  v-for="(value, index) in org.CopyTo"
                  :key="index"
                >
                  {{ value.shortname }}
                  <div class="del_add">
                    <dl>
                      <dt>{{ value.name }} / {{ value.department }}</dt>
                      <dd>{{ value.email }}</dd>
                    </dl>
                    <span @click="MailOrgDataDelete(value, 'CopyTo')"
                      >{{lang.remove}}</span
                    >
                  </div>
                </li>
              </ul>
              <span class="organ" @click="workOn('CopyTo')"></span>
            </div>
          </li>
          <li class="division">
            <strong>{{lang.companyselection}}</strong>
            <div>
              <select v-model="pselCompany">
                <option
                  v-for="(value, index) in selCompany"
                  :key="index"
                  :value="index"
                >
                  {{ value }}
                </option>
              </select>
            </div>
          </li>
          <li class="approver">
            <strong>{{ lang.approver }}</strong>
            <div>
              <!-- <input
                type="text"
                @keyup="
                  SendToSearch('SendTo', 'sendtosearch', $event.target.value)
                "
              />
              <span class="ps_add" @click="addApprover">추가</span> -->
              <span
                class="app_pointer"
                @click="orgClick('SendTo', 'sAppList1')"
                >{{ lang.line }}</span
              >
              <!-- v-if="thisform == 'K-SIS_Form661m'" -->
              <!-- <span
                class="app_pointer"
                @click="orgClick('CopyTo', 'sAppList2')"
                >{{ lang.dept1 }}</span
              > -->
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
            <strong>{{ lang.dept2 }}</strong>
            <div>
              <div>
                <p>
                  {{ lang.path }}_{{ GetMyInfo.info.dept }}
                  {{ GetMyInfo.info.name }}
                  {{ GetMyInfo.info.position }}
                </p>
                <ul>
                  <li
                    v-for="(value, index) in appPath"
                    @click="Pointer(index)"
                    :class="{active:pointer==index}"
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
                  ><img src="../../mobile/img/up_btn.png" alt="위" />{{
                    lang.up
                  }}</span
                >
                <span class="down" @click="Down"
                  ><img src="../../mobile/img/down_btn.png" alt="아래" />{{
                    lang.down
                  }}</span
                >
                <span class="delet" @click="Delete()">{{ lang.remove }}</span>
                <span class="all_delet" @click="AllDel">{{
                  lang.allremove
                }}</span>
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
            <strong>{{ lang.sharerange }}</strong>
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
            <strong>{{ lang.period }}</strong>
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
          <li class="app_tit">
            <strong>{{ lang.title }}</strong>
            <div>
              <input
                type="text"
                palceholder="1일 연차 신청"
                v-model="Subject"
              />
            </div>
          </li>
          <li class="app_tit">
            <strong>{{lang.addoption}}</strong>
            <div>
              <input type="text" v-model="AddOpinion" />
            </div>
          </li>
          <li class="division">
            <strong>{{lang.attendanceC}}</strong>
            <div>
              <select v-model="pdivision">
                <option
                  v-for="(value, index) in division"
                  :key="index"
                  :value="index"
                >
                  {{ languageConverter(value, nowLang(), ",", ":") }}
                </option>
              </select>
            </div>
          </li>
          <li class="reason">
            <strong>{{ lang.comment }}</strong>
            <div>
              <textarea v-model="reason"></textarea>
            </div>
          </li>
          <li class="date date2">
            <strong>{{lang.term}}</strong>
            <div>
              <div>
                <!-- <input type="date" v-model="ReqFrom" /> -->
                <Date v-model="ReqFrom"></Date>
                <select v-model="StartTime" id="start-date">
                  <option
                    v-for="(value, index) in range(1, 24)"
                    :key="index"
                    :value="fill(2, value)"
                  >
                    {{ fill(2, value) }}
                  </option>
                </select>
                <select name="date-start2" id="start-date2" v-model="EndTime">
                  <option
                    v-for="(value, index) in range(0, 5)"
                    :key="index"
                    :value="endfill(2, value)"
                  >
                    {{ endfill(2, value) }}
                  </option>
                </select>
              </div>
              <div>
                <!-- <input type="date" v-model="to" /> -->
                <Date v-model="to"></Date>
                <select v-model="StartTime_1" id="end-date">
                  <option
                    v-for="(value, index) in range(1, 24)"
                    :key="index"
                    :value="fill(2, value)"
                  >
                    {{ fill(2, value) }}
                  </option>
                </select>
                <select name="date-end2" id="end-date2" v-model="EndTime_1">
                  <option
                    v-for="(value, index) in range(0, 5)"
                    :key="index"
                    :value="endfill(2, value)"
                  >
                    {{ endfill(2, value) }}
                  </option>
                </select>
              </div>
            </div>
          </li>
          <li class="cf_w_att cf_w_att2">
            <strong
              ><span>{{lang.attendance}}<br />{{lang.target}}</span></strong
            >
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
                    <span @click="MailOrgDataDelete(value, 'SendTo')"
                      >{{lang.remove}}</span
                    >
                  </div>
                </li>
              </ul>
              <span class="organ" @click="workOn('SendTo')"></span>
            </div>
          </li>
          <li class="reason reason2">
            <strong><span>{{lang.overwork}}</span></strong>
            <div>
              <textarea v-model="plan"></textarea>
              <div>※{{lang.description}}</div>
            </div>
          </li>
          <li class="app_tit">
            <strong>{{lang.localreason}}</strong>
            <div>
              <input type="text" v-model="cause" />
            </div>
          </li>
          <li class="reason">
            <strong>{{lang.opinion}}</strong>
            <div>
              <textarea v-model="TmpsComment"></textarea>
            </div>
          </li>
          <li class="file_add">
            <strong>{{ lang.attach }}</strong>
            <div>
              <input class="load_name" />
              <div class="filebox">
                <!-- @click="submitFile()" -->
                <label for="add_f">{{ lang.search }}</label>
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
      :appPath="appPath"
      @AddItem="AddItem"
      @ModalOff="ModalOff"
      @DelPickItem="DelItem"
      ref="orgapp"
    ></Org>
    <WorkOrg :modalon="workmodalon" :isapp="true" @ModalOff="WorkModalOff"></WorkOrg>
  </div>
</template>

<script>
import BackHeader from "./backheader.vue";
import BtnPlus from "./btnPlus.vue";
import SubMenu from "./menu.vue";
import { mapState, mapGetters } from "vuex";
import Org from "../../View/OrgAppro.vue";
import WorkOrg from "../../View/Org.vue";
export default {
  created() {
    const language = this.GetAppL.appwrite;
    // this.commonl = this.GetCommonL;

    this.morePlus = language.morePlus;
    this.category = language.category;
    this.DocPeriod = language.DocPeriod;
    this.DocPermission = language.DocPermission;
    this.pathDivision = language.pathDivision;
    this.lang = language;
    this.params = JSON.parse(this.$route.query.data);
    // this.params = this.GetHeader.menu;
    this.params.isedit =
      this.params.isedit && Object.keys(this.detail).length > 0;

    const moment = require("moment");
    var today = moment().format("YYYY-MM-DD");
    this.startdate = today;
    this.enddate = today;
    this.ReqFrom = today;
    this.to = today;
    this.title = this.params.formtitle;

    this.thisform = this.params.form;
  },
  async mounted() {
    this.fileinit = this.$refs.file.files;
    // if (!this.params.isedit) {
    var result = await this.$store.dispatch("approjs/formSetting", {
      type: "formOption",
    });
    this.formSetting = result;
    // }
    this.Init();
  },
  components: {
    BackHeader,
    SubMenu,
    BtnPlus,
    Org,
    WorkOrg,
  },
  data() {
    return {
      workmodalon: false,
      StartTime: "07",
      StartTime_1: "07",
      EndTime: "00",
      EndTime_1: "00",
      ReqFrom: "",
      to: "",
      reason: "",
      plan: "",
      cause: "",
      AddOpinion: "",
      pselCompany: "",
      selCompany: { 2000: "ACE Technologies" },
      division: { C6: "ko:교육; en:Very High; zh:Customer Response" },
      pdivision: "",
      currentidx: -1,
      thisform: "",
      appPath: [],
      appDept: "sAppList1",
      file: [],
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
      onCategory: "year",
      Subject: "",
      Body_Text: "",
      TmpsComment: "",
      rereclick: false,
      open: true,
      daycount: 0,
      startdate: null,
      enddate: null,
      pDocPeriod: 1,
      pDocPermission: "H1",
      formSetting: {
        sReceiveArr: [],
        sReceiveOrgName: "",
        sReceiveOrgName_NM: "",
        selCompany: {},
        division: {},
        default: {
          selCompany: "",
          division: "",
        },
      },
    };
  },
  computed: {
    ...mapState(["autosearchorg", "org"]),
    ...mapGetters(["GetHeader", "GetCategory"]),
    ...mapGetters("mainjs", ["GetMyInfo"]),
    ...mapGetters("mailjs", ["GetMail"]),
    ...mapState("approjs", ["detail"]),
  },
  methods: {
    Close(e) {
      var LayerPopup = $(".approute");
      if (LayerPopup.has(e.target).length === 0) {
        this.pointer=-1;
      }
    },
    ThisCategory(menu) {
      if (this.categorys) {
        return this.categorys[this.menuOfCategoryIdx(menu)];
      }
      return [];
    },
    menuOfCategoryIdx(menu) {
      if (this.categorys) {
        return this.categorys.findIndex(function (item, idx) {
          return item.category == menu;
        });
      }
      return -1;
    },
    Init() {
      this.selCompany = this.formSetting.selCompany || {};
      this.pselCompany = this.formSetting.default.selCompany || "";
      this.division = this.formSetting.division || {};
      this.pdivision = this.formSetting.default.division || "";
      if (this.params.isedit) {
        // const info = this.detail.approvalInfo;
        // this.currentidx = info.findIndex((item) => item.approval);
        this.appPath = this.detail.appList;
        this.file = this.detail.attachInfo;
        this.Subject = this.detail.subject;
        this.Body_Text = this.detail.body;
        this.pselCompany = this.detail.selCompany;
        this.pDocPermission = this.detail.DocPermission;
        this.pdivision = this.detail.division;
        this.cause = this.detail.cause;
        this.plan = this.detail.plan;
        this.reason = this.detail.reason;
        this.AddOpinion = this.detail.AddOpinion;
        const moment = require("moment");
        this.ReqFrom = moment(this.detail.ReqFrom).format("YYYY-MM-DD");
        this.to = moment(this.detail.to).format("YYYY-MM-DD");
        this.StartTime = this.detail.StartTime;
        this.EndTime = this.detail.EndTime;
        this.StartTime_1 = this.detail.StartTime_1;
        this.EndTime_1 = this.detail.EndTime_1;
        // for (var i = 0; i < this.detail.Org_id.length; i++) {
        //   this.$store.commit("OrgData", this.detail.Org_id[i]);
        // }
      }
      this.$store.commit("OrgPointer", "CopyTo");
      this.appDept = "sAppList2";

      // var arr = this.formSetting.Org_id || [];
      // for (var i = 0; i < arr.length; i++) {
      //   this.appPath.push({
      //     appadd: "AP",
      //     appDept: "sAppList2",
      //     approvalInfo: arr[i],
      //   });
      // }
      // this.appPath = this.duplicateRemove(this.appPath);
    },
    duplicateRemove(data) {
      var here = this;
      return data.filter(function (item1, idx1) {
        return (
          data.findIndex(function (item2, idx) {
            return (
              (item1.approvalInfo.notesId == item2.approvalInfo.notesId ||
                item1.approvalInfo.id == item2.approvalInfo.id ||
                item1.approvalInfo.scheduleId ==
                  item2.approvalInfo.scheduleId) &&
              item1.appDept == item2.appDept
            );
          }) == idx1 && item1.approvalInfo.id !== here.GetMyInfo.master.id
        );
      });
    },
    MailOrgDataDelete(data, pointer) {
      this.$store.commit("OrgDataDelete", { data, pointer });
    },
    workOn(pointor) {
      this.workmodalon = true;
      this.$store.commit("OrgPointer", pointor);
    },
    WorkModalOff() {
      this.workmodalon = false;
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
    endfill(width, number) {
      number = number + ""; //number를 문자열로 변환하는 작업
      var str = "";
      for (var i = 0; i < width - number.length; i++) {
        str = "0" + str;
      }
      str = number + str;
      return str;
    },
    test(){
      return this.org.CopyTo.map((item) => item.name).join(";");
    },
    Send(e) {
      if (!(this.Subject.length > 0)) {
        alert(this.lang.alert.subject);
        return;
      }

      if (!(this.reason.length > 0)) {
        alert(this.lang.alert.reason);
        return;
      }
      
      if (this.org.SendTo.length==0){
        alert(this.lang.alert.target);
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
        var Detachstr = this.Detach.map((item) => item.name).join(";");

        formData.append("Detach", Detachstr);
        formData.append("openurl", this.detail.openurl);
      } else {
        for (var i = 0; i < this.file.length; i++) {
          formData.append("attach", this.file[i]);
        }
      }
      AprTcount1++;
      sAppList1 += this.GetMyInfo.approvalInfo + ";";
      for (var i = 0; i < this.appPath.length; i++) {
        if (this.appPath[i].appDept == "sAppList1") {
          AprTcount1++;
          sAppList1 += `${this.appPath[i].appadd}^${AprTcount1}^${this.appPath[i].approvalInfo.approvalInfo};`;
        } else if (this.appPath[i].appDept == "sAppList2") {
          AprTcount2++;
          sAppList2 += `${this.appPath[i].appadd}^${AprTcount2}^${this.appPath[i].approvalInfo.approvalInfo};`;
        }
      }
      if (AprTcount1 <= 1 && e !== "draft") {
        alert(this.lang.alert.appr);
        return;
      }

      // this.thisform == "K-SIS_Form661m" &&
      // if (AprTcount2 < 1 && e !== "draft") {
      //   alert(this.lang.alert.dept);
      //   return;
      // }

      formData.append("approvalType", e);
      formData.append("formCode", this.thisform);
      formData.append("From", this.GetMyInfo.info.notesid);
      formData.append("myinfo", this.GetMyInfo.approvalInfo);
      console.log(
        sAppList1,
        "------",
        sAppList2,
        "---------",
        AprTcount1,
        AprTcount2,
        "----------",
        this.appPath
      );
      formData.append("sAppList1", sAppList1);
      formData.append("sAppList2", sAppList2);
      formData.append("AprTcount1", AprTcount1);
      formData.append("AprTcount2", AprTcount2);
      formData.append("subject", this.Subject);
      formData.append("body", this.Body_Text);
      formData.append("TmpsComment", this.TmpsComment);

      formData.append("DocPeriod", this.pDocPeriod);
      formData.append("DocPeriod_Nm", this.DocPeriod[this.pDocPeriod]);
      formData.append(
        "DocPermission_Nm",
        this.DocPermission[this.pDocPermission]
      );
      formData.append("DocPermission", this.pDocPermission);

      // 근태승인신청서
      formData.append("selCompany", this.pselCompany);
      formData.append("selCompany_Nm", this.selCompany[this.pselCompany]);
      formData.append("AddOpinion", this.AddOpinion);
      formData.append("division", this.pdivision);
      formData.append("division_Nm", this.division[this.pdivision]);
      formData.append("reason", this.reason);
      formData.append("plan", this.plan);
      formData.append("cause", this.cause);
      formData.append("ReqFrom", this.ReqFrom);
      formData.append("StartTime", this.StartTime);
      formData.append("EndTime", this.EndTime);
      formData.append("to", this.to);
      formData.append("StartTime_1", this.StartTime_1);
      formData.append("EndTime_1", this.EndTime_1);
      formData.append("sReceiveOrgName", this.formSetting.sReceiveOrgName);
      formData.append(
        "sReceiveOrgName_NM",
        this.formSetting.sReceiveOrgName_NM
      );

      var joint_owner = this.org.CopyTo.map((item) => item.id).join(";");
      var joint_ownerFull = this.org.CopyTo.map((item) => item.approvalInfo).join(";");
      formData.append("joint_owner", joint_owner);
      formData.append("joint_ownerFull", joint_ownerFull);

      var person = "";
      for (var o = 0; o < this.org.SendTo.length; o++) {
        var or = this.org.SendTo[o];
        person = person + `${or.mycode}/${or.name}/${or.department}\r\n`;
      }
      formData.append("person", person);
      // return;

      this.$store
        .dispatch("approjs/AppWrite", { data: formData, type })
        .then((res) => {
          if (res) {
            // if(e=="raise"){
            this.params.type = "";
            // this.SetHeader(this.params);
            this.categorys = this.GetCategory[this.params.top];
            var ingidx = this.menuOfCategoryIdx("approving");
            if (ingidx == -1) {
              this.$router.go(-2);
            } else {
              var apping = this.categorys[ingidx];
              this.$router.push({
                name: "appapproving",
                query: {
                  data: JSON.stringify({
                    type: apping.type || apping.category,
                    lnbid: apping.lnbid,
                    top: this.params.top,
                    title: apping.title,
                  }),
                },
              });
            }
            // this.$router.go(-1);
            this.$store.commit("OrgDataInit");

            // }else if(e=="draft"){
            // this.$router.push({name:'appdraft',query:{data:JSON.stringify(this.params)}})

            // }
          }
        });
    },
    SetHeader(data) {
      this.$store.dispatch("SetHeader", data);
    },
    DelItem(item) {
      if (item.length > 0) {
        this.appPath = this.appPath.filter(function (itemone, idx1) {
          return (
            item.findIndex(function (itemtwo, idx) {
              // return itemtwo==itemone;
              return (
                itemtwo.approvalInfo.email == itemone.approvalInfo.email &&
                itemtwo.appadd == itemone.appadd &&
                itemtwo.appDept == itemone.appDept
              );
            }) == -1
          );
        });
        // x => !item.includes(x)
      }
    },
    AddItem(item) {
      if (item.length > 0) {
        for (var i = 0; i < item.length; i++) {
          if (Object.keys(item[i].approvalInfo).length > 0) {
            if (item[i].appDept == "sAppList2") {
              item[i].appadd = "AP";
            }
          }
        }
        this.appPath = this.appPath.concat(item);
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
      // this.appPath = this.appPath.slice(
      //   this.currentidx - 1,
      //   this.appPath.length
      // );
      this.appPath = [];
      this.$store.commit("OrgDataInit");

      // }
    },
  },
};
</script>

<style>
.ProseMirror {
  width: 100% !important;
  height: 8.75rem !important;
  appearance: none !important;
  outline: none !important;
  border: 0.06rem solid #e6e6e6 !important;
  padding: 0.62rem !important;
}
.a_contents05 ul li.approver div span.app_pointer {
  margin: 0;
}
.a_contents05 ul li.approver div span.app_pointer + .app_pointer {
  margin-left: 0.25rem !important;
}
</style>