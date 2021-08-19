<template>
  <div>
      <BackHeader desc="결재양식함에서 지정" :title="title"></BackHeader>
      <SubMenu></SubMenu>
    <div class="a_contents05">
        <form action="">
            <ul>
                <li class="app_tit">
                    <strong>제목</strong>
                    <div><input type="text" palceholder="1일 연차 신청"></div>   
                </li>
                <li class="proposer">
                    <strong>신청자</strong>
                    <div>안지원 대리 / 전략구매팀</div>  
                </li>
                <li class="approver">
                    <strong>결재자</strong>
                    <div>
                        <input type="text">
                        <span class="ps_add">추가</span>
                        <span class="app_pointer">결재선 지정</span>
                    </div>   
                </li>
                <li class="approute">
                    <strong>결재경로</strong>
                    <div>
                        <div>
                            <p>기안자_디자인팀 이정인 책임</p>
                            <ul>
                                <li><em>1</em>담당 경영지원팀 김인경 주임</li>
                                <li><em>2</em>결재 디자인팀 황선영 팀장</li>
                            </ul>
                        </div>
                        <p>
                            <span class="up"><img src="../../mobile/img/up_btn.png" alt="위">위</span>
                            <span class="down"><img src="../../mobile/img/down_btn.png" alt="아래">아래</span>
                            <span class="delet">삭제</span>
                            <span class="all_delet">모두삭제</span>
                        </p>
                    </div>
                </li>
                <li class="referrer">
                    <strong>참조자</strong>
                    <div>
                        <p><input type="text"><em></em></p>
                        <span class="ps_add">추가</span>
                    </div>
                </li>
                <li class="division">
                    <strong>구분</strong>
                    <div>
                        <select>
                            <option value="연차휴가">연차휴가</option>
                            <option value="경조/포상">경조/포상</option>
                            <option value="보건">보건</option>
                            <option value="무급휴가">무급휴가</option>
                            <option value="월차">월차</option>
                            <option value="병가">병가</option>
                            <option value="Refresh">Refresh</option>
                            <option value="병역동원훈련">병역동원훈련</option>
                            <option value="산전산후">산전산후</option>
                            <option value="조퇴">조퇴</option>
                        </select>
                    </div>    
                </li>
                <li class="date">
                    <strong>일시</strong>
                    <div><input type="date"> ~ <input type="date"></div>    
                </li>
                <li class="num_day">
                    <strong>일수</strong>
                    <div><input type="text">일</div>    
                </li>
                <li class="reason">
                    <strong>사유</strong>
                    <div>
                        <textarea></textarea>
                    </div>    
                </li>
                <li class="file_add">
                    <strong>첨부</strong>
                    <div>
                        <input class="load_name">
                        <div class="filebox">
                            <label for="add_f">찾아보기</label>
                            <input type="file" id="add_f">
                        </div>
                    </div>    
                </li>
            </ul>
        </form>
    </div>
    <BtnPlus></BtnPlus>
    <div class="a_organ_modal">
        <div class="a_organ_con">
            <form>
                <div>
                    <strong>결재선 지정</strong>
                    <div>
                        <input type="text" class="search" placeholder="검색어를 입력하세요" autocomplete='on'>
                        <div class="btns">
                            <span class="del_btn"><em></em></span>
                            <span class="search_icon" type="submit"><img src="../../mobile/img/search_icon.png" alt="검색하기"></span>
                        </div>
                    </div>
                </div>
                <ul class="a_organlist">
                    <li>
                        <div>협업사업부</div>
                        <ul class="a_o_depth02">
                            <li>
                                <div>SI팀</div>
                                <ul>
                                    <li>
                                        <div>이복현팀장</div>
                                        <ul class="last-deps">
                                            <li class="or_bg"><div>진성원 수석 <em class="tel">02-2105-1234</em></div></li>
                                            <li class="or_bg"><div>홍건 수석 <em class="tel">02-2105-1234</em></div></li>
                                            <li class="or_bg"><div>현상헌 수석 <em class="tel"></em></div></li>
                                            <li class="or_bg"><div>배선일 수석 <em class="tel"></em></div></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div>협업사업부</div>
                        <ul class="a_o_depth02">
                            <li>
                                <div>SI팀</div>
                                <ul >
                                    <li>
                                        <div>이복현팀장</div>
                                        <ul class="a_last-deps">
                                            <li class="or_bg"><div>진성원 수석 <em class="tel">02-2105-1234</em></div></li>
                                            <li class="or_bg"><div>홍건 수석 <em class="tel">02-2105-1234</em></div></li>
                                            <li class="or_bg"><div>현상헌 수석 <em class="tel"></em></div></li>
                                            <li class="or_bg"><div>배선일 수석 <em class="tel"></em></div></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div>협업사업부</div>
                        <ul class="a_o_depth02">
                            <li>
                                <div>SI팀</div>
                                <ul class="a_o_depth02">
                                    <li>
                                        <div>이복현팀장</div>
                                        <ul class="a_o_depth02">
                                            <li class="or_bg a_last-deps"><div>진성원 수석 <em class="tel">02-2105-1234</em></div></li>
                                            <li class="or_bg a_last-deps"><div>홍건 수석 <em class="tel">02-2105-1234</em></div></li>
                                            <li class="or_bg a_last-deps"><div>현상헌 수석 <em class="tel"></em></div></li>
                                            <li class="or_bg a_last-deps"><div>배선일 수석 <em class="tel"></em></div></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="a_organ_ft">
                    <div>
                        <span><em class="sv_radio"></em>결재</span>
                        <span><em class="sv_radio"></em>합의</span>
                    </div>
                    <span class="ps_add">추가</span>
                </div>
            </form>
            <span class="a_modal_close"></span>
        </div>
    </div>
  </div>
</template>

<script>
import BackHeader from "./backheader.vue";
import BtnPlus from "./btnPlus.vue";
import SubMenu from "./menu.vue";
export default {
components: {
    BackHeader,
    SubMenu,
    BtnPlus,
  },
  data(){
      return {
          
          morePlus:[{refer:"기결문서 참조"},{approval:"결재"},{upper:"상신"},{save:"저장"}],
          title:"결재양식함에서 지정",
      }
  },
}
</script>

<style>

</style>