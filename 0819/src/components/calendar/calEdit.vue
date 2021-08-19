<template>
  <div>
      <div class="cal_w_header">
            <h2><a href="./mob_cal_read.html"><img src="../../mobile/img/wmail_back.png" alt=""></a>일정 편집</h2>
            <div>
                <span class="cal_save"><a href="./mob_cal_read.html">취소</a></span>
                <span class="cal_save"><a href="./mob_cal_list.html">저장</a></span>
            </div>
        </div>
        <div class="m_contents08">
            <form action="">
                <ul class="wc_top">
                    <li class="cal_title">
                        <strong>일정제목</strong>
                        <div>
                            <input type="text">
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
                            <span>
                                <em></em>공개
                            </span>
                            <span>
                                <em></em>비공개
                            </span>
                        </div>
                    </li>
                    <li class="cal_date">
                        <strong>일자</strong>
                        <div>
                            <input type="date">
                        </div>
                    </li>
                    <li class="repeat_s">
                        <strong>반복</strong>
                        <div>
                            <span>
                                <em></em>일반
                            </span>
                            <span>
                                <em></em>반복예약
                            </span>
                        </div>
                    </li>
                    <li class="cal_time">
                        <strong>시간</strong>
                        <div>
                            <input type="time" value="15:00"><b>~</b><input type="time" value="16:00">
                        </div>
                    </li>
                    <li class="cal_att">
                        <strong>참석자</strong>
                        <div>
                            <ul class="list_add clfix">
                                <li class="add_obj">
                                    이정인
                                    <div class="del_add">
                                        <dl>
                                            <dt>이정인 책임 / 디자인팀</dt>
                                            <dd>jeongin@saerom.co.kr</dd>
                                        </dl>
                                        <span>삭제</span>
                                    </div>
                                </li>
                                <li class="add_obj">
                                    이정인
                                    <div class="del_add">
                                        <dl>
                                            <dt>이정인 책임 / 디자인팀</dt>
                                            <dd>jeongin@saerom.co.kr</dd>
                                        </dl>
                                        <span>삭제</span>
                                    </div>
                                </li>
                                <li class="add_obj">
                                    이정인
                                    <div class="del_add">
                                        <dl>
                                            <dt>이정인 책임 / 디자인팀</dt>
                                            <dd>jeongin@saerom.co.kr</dd>
                                        </dl>
                                        <span>삭제</span>
                                    </div>
                                </li>
                                <li class="new_addr">
                                    <label for="toinput" class="blind">참석자</label>
                                    <textarea id="toinput"></textarea>
                                </li>
                            </ul>
                            <span class="c_organ">조직도</span>
                        </div>
                        <ul class="more_cal_att">
                            <li>
                                <strong>참조</strong>
                                <div>
                                    <ul class="list_add clfix">
                                        <li class="add_obj">
                                            이정인
                                            <div class="del_add">
                                                <dl>
                                                    <dt>이정인 책임 / 디자인팀</dt>
                                                    <dd>jeongin@saerom.co.kr</dd>
                                                </dl>
                                                <span>삭제</span>
                                            </div>
                                        </li>
                                        <li class="new_addr">
                                            <label for="toinput" class="blind">참조</label>
                                            <textarea id="toinput"></textarea>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <strong>숨은참조</strong>
                                <div>
                                    <ul class="list_add clfix">
                                        <li class="add_obj">
                                            이정인
                                            <div class="del_add">
                                                <dl>
                                                    <dt>이정인 책임 / 디자인팀</dt>
                                                    <dd>jeongin@saerom.co.kr</dd>
                                                </dl>
                                                <span>삭제</span>
                                            </div>
                                        </li>
                                        <li class="new_addr">
                                            <label for="toinput" class="blind">숨은참조</label>
                                            <textarea id="toinput"></textarea>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li class="cal_place">
                        <strong>장소</strong>
                        <div>
                            <input type="text">
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
                            <textarea id="memo_t">금일 협업사업부 신규서비스 리뷰 회의가 영업팀 앞 회의실에서 있을 에정이니다. </textarea>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
        <div class="organ_modal">
            <div class="organ_con">
                <ul class="organlist">
                    <li>
                        <div>협업사업부</div>
                        <ul class="o_depth02">
                            <li>
                                <div>SI팀</div>
                                <ul class="o_depth03">
                                    <li>
                                        <div>이복현팀장</div>
                                        <ul class="o_depth04">
                                            <li class="or_bg">
                                                <div>진성원 수석 <em class="tel">02-2105-1234</em></div>
                                            </li>
                                            <li class="or_bg">
                                                <div>홍건 수석 <em class="tel">02-2105-1234</em></div>
                                            </li>
                                            <li class="or_bg">
                                                <div>현상헌 수석 <em class="tel"></em></div>
                                            </li>
                                            <li class="or_bg">
                                                <div>배선일 수석 <em class="tel"></em></div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div>협업사업부</div>
                        <ul class="o_depth02">
                            <li>
                                <div>SI팀</div>
                                <ul class="o_depth03">
                                    <li>
                                        <div>이복현팀장</div>
                                        <ul class="o_depth04">
                                            <li class="or_bg">
                                                <div>진성원 수석 <em class="tel">02-2105-1234</em></div>
                                            </li>
                                            <li class="or_bg">
                                                <div>홍건 수석 <em class="tel">02-2105-1234</em></div>
                                            </li>
                                            <li class="or_bg">
                                                <div>현상헌 수석 <em class="tel"></em></div>
                                            </li>
                                            <li class="or_bg">
                                                <div>배선일 수석 <em class="tel"></em></div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div>협업사업부</div>
                        <ul class="o_depth02">
                            <li>
                                <div>SI팀</div>
                                <ul class="o_depth03">
                                    <li>
                                        <div>이복현팀장</div>
                                        <ul class="o_depth04">
                                            <li class="or_bg">
                                                <div>진성원 수석 <em class="tel">02-2105-1234</em></div>
                                            </li>
                                            <li class="or_bg">
                                                <div>홍건 수석 <em class="tel">02-2105-1234</em></div>
                                            </li>
                                            <li class="or_bg">
                                                <div>현상헌 수석 <em class="tel"></em></div>
                                            </li>
                                            <li class="or_bg">
                                                <div>배선일 수석 <em class="tel"></em></div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
                <span class="modal_close"></span>
            </div>
        </div>
        <ul class="btm_btn clfix">
            <li class="home"><a href="./mob_main.html"></a></li>
            <li class="back"><a href=""></a></li>
            <li class="go"><a href=""></a></li>
            <li class="refresh"><a href=""></a></li>
            <li class="link"><a href=""></a></li>
            <li class="btm_more"><a href=""></a></li>
        </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>