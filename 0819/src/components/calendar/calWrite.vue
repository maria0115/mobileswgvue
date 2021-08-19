<template>
  <div>
    <div class="cal_w_header">
      <h2>
        <a href="./mob_calendar.html"
          ><img src="../../mobile/img/wmail_back.png" alt="" /></a
        >일정쓰기
      </h2>
      <div>
        <span class="cal_save"><a href="mob_cal_list.html">등록</a></span>
      </div>
    </div>
    <div class="m_contents08">
      <form action="">
        <ul class="wc_top">
          <li class="cal_title">
            <strong>일정제목</strong>
            <div>
              <input type="text" />
              <span class="tit_clip"></span>
            </div>
          </li>
          <li class="cal_category">
            <strong>카테고리</strong>
            <div class="">
              <select name="" id="">
                <option value="">회의</option>
                <option value="">약속</option>
                <option value="">행사</option>
                <option value="">기념일</option>
                <option value="">리마인더</option>
              </select>
            </div>
          </li>
          <li class="cal_open">
            <strong>공개여부</strong>
            <div class="repeat_s">
              <span> <em></em>공개 </span>
              <span> <em></em>비공개 </span>
            </div>
          </li>
          <li class="cal_date">
            <strong>일자</strong>
            <div>
              <input type="date" :value="date"/>
            </div>
          </li>
          <li class="repeat_s">
            <strong>반복</strong>
            <div>
              <span> <em class="click"></em>일반 </span>
              <span class="rere_btn"
                ><!--클래스명 추가됨 8월 12일 -->
                <em></em>반복예약
              </span>
            </div>
          </li>
          <li class="cal_time">
            <strong>시간</strong>
            <div>
              <input type="time" value="15:00" /><b>~</b
              ><input type="time" value="16:00" />
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
                <span class="c_organ" @click="orgClick('CopyTo')">조직도</span>

                </div>
                <div class="add_search" :class="{ active: this.copytosearch }">
                  <ul>
                    <li
                      v-for="(value, index) in this.autosearchorg.schedule.CopyTo"
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
                        <span @click="ScheduleOrgDataDelete(value, 'BlindCopyTo')"
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
                <span class="c_organ" @click="orgClick('BlindCopyTo')">조직도</span>

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
              <input type="text" />
            </div>
          </li>
          <li class="att_file">
            <strong>첨부파일</strong>
            <div>
              <ul class="file_list">
                <li>IMG0534.JPG<span class="att_del"></span></li>
                <li>IMG0534.JPG<span class="att_del"></span></li>
              </ul>
            </div>
          </li>
          <li class="cal_memo">
            <strong>메모</strong>
            <div>
              <textarea id="memo_t"></textarea>
            </div>
          </li>
        </ul>
      </form>
    </div>
    <div class="rere_modal">
      <!--8월 12일 추가됨 반복예약-->
      <div class="rere_con">
        <strong>반복설정</strong>
        <p>행사가 반복될 때</p>
        <ul>
          <li>
            <select id="rere_box">
              <option value="d" selected>일 단위</option>
              <option value="w">주 단위</option>
              <option value="md">월 단위(날짜)</option>
              <option value="mp">월 단위(요일)</option>
              <option value="y">년 단위</option>
            </select>
          </li>
          <li class="ri_adjust clfix">
            <div class="se_box01">
              <select name="sel01" id="sel01">
                <option value="매일 반복" selected>매일 반복</option>
                <option value="1일마다 반복">1일마다 반복</option>
                <option value="2일마다 반복">2일마다 반복</option>
                <option value="3일마다 반복">3일마다 반복</option>
                <option value="4일마다 반복">4일마다 반복</option>
                <option value="5일마다 반복">5일마다 반복</option>
                <option value="6일마다 반복">6일마다 반복</option>
                <option value="7일마다 반복">7일마다 반복</option>
                <option value="8일마다 반복">8일마다 반복</option>
                <option value="9일마다 반복">9일마다 반복</option>
                <option value="10일마다 반복">10일마다 반복</option>
                <option value="11일마다 반복">11일마다 반복</option>
                <option value="12일마다 반복">12일마다 반복</option>
                <option value="13일마다 반복">13일마다 반복</option>
                <option value="14일마다 반복">14일마다 반복</option>
                <option value="15일마다 반복">15일마다 반복</option>
                <option value="16일마다 반복">16일마다 반복</option>
                <option value="17일마다 반복">17일마다 반복</option>
                <option value="18일마다 반복">18일마다 반복</option>
                <option value="19일마다 반복">19일마다 반복</option>
                <option value="20일마다 반복">20일마다 반복</option>
                <option value="21일마다 반복">21일마다 반복</option>
                <option value="22일마다 반복">22일마다 반복</option>
                <option value="23일마다 반복">23일마다 반복</option>
                <option value="24일마다 반복">24일마다 반복</option>
                <option value="25일마다 반복">25일마다 반복</option>
                <option value="26일마다 반복">26일마다 반복</option>
                <option value="27일마다 반복">27일마다 반복</option>
                <option value="28일마다 반복">28일마다 반복</option>
                <option value="29일마다 반복">29일마다 반복</option>
                <option value="30일마다 반복">30일마다 반복</option>
                <option value="31일마다 반복">31일마다 반복</option>
              </select>
              <select id="sel02_1">
                <option value="매주 반복" selected>매주 반복</option>
                <option value="2주마다 반복">2주마다 반복</option>
                <option value="3주마다 반복">3주마다 반복</option>
                <option value="4주마다 반복">4주마다 반복</option>
                <option value="5주마다 반복">5주마다 반복</option>
                <option value="6주마다 반복">6주마다 반복</option>
                <option value="7주마다 반복">7주마다 반복</option>
                <option value="8주마다 반복">8주마다 반복</option>
              </select>
              <select id="sel03_1">
                <option value="매월 반복" selected>매월 반복</option>
                <option value="2개월마다 반복">2개월마다 반복</option>
                <option value="3개월마다 반복">3개월마다 반복</option>
                <option value="4개월마다 반복">4개월마다 반복</option>
                <option value="5개월마다 반복">5개월마다 반복</option>
                <option value="6개월마다 반복">6개월마다 반복</option>
                <option value="7개월마다 반복">7개월마다 반복</option>
                <option value="8개월마다 반복">8개월마다 반복</option>
                <option value="9개월마다 반복">9개월마다 반복</option>
                <option value="10개월마다 반복">10개월마다 반복</option>
                <option value="11개월마다 반복">11개월마다 반복</option>
                <option value="12개월마다 반복">12개월마다 반복</option>
              </select>
              <select id="sel05_1">
                <option value="매년 반복" selected>매년 반복</option>
                <option value="2년마다 반복">2년마다 반복</option>
                <option value="3년마다 반복">3년마다 반복</option>
                <option value="4년마다 반복">4년마다 반복</option>
                <option value="5년마다 반복">5년마다 반복</option>
                <option value="6년마다 반복">6년마다 반복</option>
                <option value="7년마다 반복">7년마다 반복</option>
                <option value="8년마다 반복">8년마다 반복</option>
                <option value="9년마다 반복">9년마다 반복</option>
                <option value="10년마다 반복">10년마다 반복</option>
              </select>
            </div>
            <div class="se_box02">
              <select id="se102_2">
                <option value="일요일">일요일</option>
                <option value="월요일">월요일</option>
                <option value="화요일">화요일</option>
                <option value="수요일">수요일</option>
                <option value="목요일">목요일</option>
                <option value="금요일">금요일</option>
                <option value="토요일">토요일</option>
              </select>
              <select id="se103_2">
                <option value="1일">1일</option>
                <option value="2일">2일</option>
                <option value="3일">3일</option>
                <option value="4일">4일</option>
                <option value="5일">5일</option>
                <option value="6일">6일</option>
                <option value="7일">7일</option>
                <option value="8일">8일</option>
                <option value="9일">9일</option>
                <option value="10일">10일</option>
                <option value="11일">11일</option>
                <option value="12일">12일</option>
                <option value="13일">13일</option>
                <option value="14일">14일</option>
                <option value="15일">15일</option>
                <option value="16일">16일</option>
                <option value="17일">17일</option>
                <option value="18일">18일</option>
                <option value="19일">19일</option>
                <option value="20일">20일</option>
                <option value="21일">21일</option>
                <option value="22일">22일</option>
                <option value="23일">23일</option>
                <option value="24일">24일</option>
                <option value="25일">25일</option>
                <option value="26일">26일</option>
                <option value="27일">27일</option>
                <option value="28일">28일</option>
                <option value="29일">29일</option>
                <option value="30일">30일</option>
                <option value="31일">31일</option>
              </select>
              <select id="se104_2">
                <option value="첫번째 일요일">첫번째 일요일</option>
                <option value="첫번째 월요일">첫번째 월요일</option>
                <option value="첫번째 화요일">첫번째 화요일</option>
                <option value="첫번째 수요일">첫번째 수요일</option>
                <option value="첫번째 목요일">첫번째 목요일</option>
                <option value="첫번째 금요일">첫번째 금요일</option>
                <option value="첫번째 토요일">첫번째 토요일</option>
                <option value="두번째 일요일">두번째 일요일</option>
                <option value="두번째 월요일">두번째 월요일</option>
                <option value="두번째 화요일">두번째 화요일</option>
                <option value="두번째 수요일">두번째 수요일</option>
                <option value="두번째 목요일">두번째 목요일</option>
                <option value="두번째 금요일">두번째 금요일</option>
                <option value="두번째 토요일">두번째 토요일</option>
                <option value="세번째 일요일">세번째 일요일</option>
                <option value="세번째 월요일">세번째 월요일</option>
                <option value="세번째 화요일">세번째 화요일</option>
                <option value="세번째 수요일">세번째 수요일</option>
                <option value="세번째 목요일">세번째 목요일</option>
                <option value="세번째 금요일">세번째 금요일</option>
                <option value="세번째 토요일">세번째 토요일</option>
                <option value="네번째 일요일">네번째 일요일</option>
                <option value="네번째 월요일">네번째 월요일</option>
                <option value="네번째 화요일">네번째 화요일</option>
                <option value="네번째 수요일">네번째 수요일</option>
                <option value="네번째 목요일">네번째 목요일</option>
                <option value="네번째 금요일">네번째 금요일</option>
                <option value="네번째 토요일">네번째 토요일</option>
                <option value="마지막 일요일">마지막 일요일</option>
                <option value="마지막 월요일">마지막 월요일</option>
                <option value="마지막 화요일">마지막 화요일</option>
                <option value="마지막 수요일">마지막 수요일</option>
                <option value="마지막 목요일">마지막 목요일</option>
                <option value="마지막 금요일">마지막 금요일</option>
                <option value="마지막 토요일">마지막 토요일</option>
              </select>
            </div>
          </li>
        </ul>
        <p>행사가 반복되는 기간</p>
        <ul class="inp_wrap">
          <li class="clfix term">
            <select id="selectbox">
              <option value="종료" selected>종료</option>
              <option value="기간">기간</option>
            </select>
          </li>
          <li class="clfix date_inp">
            <input type="date" />
            <div class="clfix">
              <span><input type="text" /></span>
              <select>
                <option value="일">일</option>
                <option value="주">주</option>
                <option value="개월">개월</option>
                <option value="년">년</option>
              </select>
            </div>
          </li>
        </ul>
        <span class="time_mo_btn" >확인</span>
        <span class="modal_close rereclose" ></span>
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
    created(){
        this.date = new Date();

    },
  data() {
    return {
        date:"",
      modalon: false,
      modalAutoOrg: 0,
      blindcopytosearch: false,
      copytosearch: false,
      sendtosearch: false,
      blindcopytosearchkeyword: "",
      copytosearchkeyword: "",
      sendtosearchkeyword: "",
      time: "",
      ExpireDate: "",
      STime: "05",
      SMin: "50",
      dispreserve: false,
      timemodal: false,
    };
  },
  computed: {
    ...mapState(["scheduleorg", "autosearchorg"]),
    ...mapGetters(["GetMail"]),
  },
  methods: {
    OrgSearch(value) {
      if (value.length > 0) {
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
      console.log(this.modalon)
    },
    OpenFolder() {
      console.log("열었다");
    },
    ScheduleOrgDataDelete(data, pointer) {
      this.$store.commit("ScheduleOrgDataDelete", { data, pointer });
    },
    orgClick(to) {
      if (!this.tome) {
        this.$store.commit("ScheduleOrgPointer", to);
        this.modalon = true;
      }
    },
    SendToSearch(who, keyword, value) {
      if (value.length > 0) {
        var data = {};
        data.menu = "schedule";
        data.who = who;
        data.keyword = value;

        this.$store.dispatch("OrgAutoSearch", data);
      }
    },
    async AddOrg(who, value, what) {
      await this.$store.commit("ScheduleAddOrg", { who, value, menu: "schedule" });
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
      this.$store.commit("ScheduleOrgDataInit");
    },
  },
  components: {
    OrgItem,
  },
};
</script>

<style>
</style>