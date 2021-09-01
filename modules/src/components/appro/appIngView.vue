<template>
  <div>
      <BackHeader desc="결재중 문서" :title="title"></BackHeader>
    <div class="a_contents02">
        <div>
            <div class="line01">
                <em>휴가원</em>
                <strong>1일 연차신청</strong>
                <div class="clfix">
                    <span>기안</span>
                    <dl>
                        <dt>안지원 대리 / 전략구매팀</dt>
                        <dd>2021.04.03 15:32</dd>
                    </dl>
                </div>
            </div>
            <ul class="line02">
                <li>
                    <h3><a href="#">결재정보 <em>(3)</em></a></h3>
                    <div>
                        <ul>
                            <li>
                                <span>기안</span>
                                <div>
                                    <strong>홍길동 매니저 / IT팀</strong>
                                    <em>2021.04.02 15:00</em>
                                </div>
                            </li>
                            <li>
                                <span>합의</span>
                                <div>
                                    <strong>안영희 매니저 / IT팀</strong>
                                    <em>2021.04.03 16:24</em>
                                    <P>승인후 연차 1일 차감하겠습니다.<br>참고하시기 바랍니다.</P>
                                </div>
                            </li>
                            <li>
                                <span>결재</span>
                                <div>
                                    <strong>정미영 차장 / IT팀</strong>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="app_file">
                    <h3><a href="#">첨부파일 <em>(3)</em></a></h3>
                    <div>
                        <ul>
                            <li>
                                <a href="#">첨부파일.xls(55.12kb)</a>
                                <div class="file_btn">
                                    <span class="open_btn">열기</span>
                                    <span class="save_btn">저장</span>
                                </div>
                            </li>
                            <li>
                                <a href="#">첨부파일.xls(55.12kb)</a>
                                <div class="file_btn">
                                    <span class="open_btn">열기</span>
                                    <span class="save_btn">저장</span>
                                </div>
                            </li>
                            <li>
                                <a href="#">첨부파일.xls(55.12kb)</a>
                                <div class="file_btn">
                                    <span class="open_btn">열기</span>
                                    <span class="save_btn">저장</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <div class="line03"><a>2021.04.16(금) 개인사유로 연차신청합니다.<br>재가 바랍니다.</a></div>
        </div>
        <BtnPlus :menu="morePlus"></BtnPlus>
    </div>
  </div>
</template>

<script>
import BackHeader from "./backheader.vue";
import SubMenu from "./menu.vue";
import BtnPlus from "./btnPlus.vue";
export default {
components: {
    BackHeader,
    SubMenu,
    BtnPlus,
  },
  data(){
      return {
          morePlus:[{circulate:"회람"},{modify:"편집"},{remove:"삭제"},{uppercancle:"상신취소"}],
          isOpen:false,
          title:"결재중 문서 보기",
          body:""
      }
  },
  methods: {
      OpenHam(){
          this.isOpen = true;
      },
  },
  created(){
  },
}
</script>

<style>

</style>