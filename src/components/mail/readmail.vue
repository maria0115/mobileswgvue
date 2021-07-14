<template>
  <div>
      <div class="rdmail_header">
        <em><a @click="Back"><img src="../../mobile/img/wmail_back.png" alt=""></a></em>
        <div class="rdmail_icons">
            <span class="rd_reply">답장</span>
            <span class="rd_relay">전달</span>
            <span class="rd_del">삭제</span>
            <span class="rd_more"></span>
            <ul class="more_box">
                <li class="move">이동</li>
                <li>스팸차단</li>
                <li>전체답장</li>
            </ul>
        </div>
    </div>
    <div class="m_contents04">
        <form action="">
            <div class="rd_top">
                <h2 class="mail_tit">사내업무 및 유지 보수 내역 전달</h2>
                <div class="clfix">
                    <span class="per_img">
                        <em class="no_img" style="background:#aea9db;"><b>안</b></em>
                    </span>
                    <dl>
                        <dt>안지원 대리  / 전략구매팀</dt>
                        <dd>2021-05-21 13:21</dd>
                    </dl>
                    <em class="re_more"></em>
                </div>
                <ul class="re_refer_div"> 
                    <li class="clfix refer01">
                        <strong>받는사람</strong>
                        <div>
                            <span>이정인 책임</span>
                        </div>
                    </li>
                    <li class="clfix refer02">
                        <strong>참조</strong>
                        <div>
                            <span>황선영 팀장</span>
                            <span>이주성 부장</span>
                        </div>
                    </li>
                </ul>
                <span class=""><img src="../../mobile/img/star.png" alt="즐겨찾기"></span>
            </div>
            <div class="add_file clfix">
                <strong>첨부파일</strong>
                <ul>
                    <li class="active">
                        <span><img src="../../mobile/img/test_img01.png" alt=""></span>
                        <div>
                            <p>IMG2580.png</p>
                            <em>(32.52KB)</em>
                        </div>
                    </li>
                    <li class="active">
                        <span><img src="../../mobile/img/test_img02.png" alt=""></span>
                        <div>
                            <p>2021년사내업무 및 유지 보수.pptx</p>
                            <em>(16.03KB)</em>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="rdm_edit">
                안녕하세요.
                디자인 팀 안지영 입니다.
                2021년 사내업무 및 유지 보수 내역 보내드립니다.
                감사합니다. 
            </div>
            <div class="move_file">
                <div class="move_bg"></div>
                <ul class="f_list">
                    <li class="drop_menu">
                        <a href="#">보낸메일함</a>
                        <ul class="f_depth02">
                            <li><a href="#">내부메일</a></li>
                            <li><a href="#">외부메일</a></li>
                            <li><a href="#">알림메일</a></li>
                            <li><a href="#">첨부메일</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">내게쓴메일함</a>
                    </li>
                    <li>
                        <a href="#">중요메일</a>
                    </li>
                    <li>
                        <a href="#">스팸함</a>
                    </li>
                    <li class="drop_menu">
                        <a href="#">기본 폴더</a>
                        <ul class="f_depth02">
                            <li class="drop_menu">
                                <a href="#">폴더01</a>
                                <ul class="f_depth03">
                                    <li class="drop_menu">
                                        <a href="#">폴더01-1</a>
                                        <ul class="f_depth04">
                                            <li><a href="#">폴더01-2</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li class="drop_menu">
                                <a href="#">폴더02</a>
                                <ul class="f_depth03">
                                    <li class="drop_menu">
                                        <a href="#">폴더02-1</a>
                                        <ul class="f_depth04">
                                            <li>
                                                <a href="#">폴더02-2폴더02-2폴더02-2폴더02-2폴더02-2폴더02-2폴더02-2폴더02-2폴더02-2폴더02-2폴더02-2폴더02-2폴더02-2폴더02-2폴더02-2폴더02-2폴더02-2폴더02-2폴더02-2폴더02-2</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">휴지통</a>
                    </li>
                </ul>
            </div>
        </form>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./footer.vue";
export default {
  components: {
    Footer,
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>

</style>