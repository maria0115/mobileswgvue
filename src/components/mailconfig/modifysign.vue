<template>
  <div>
    <h2 class="mail_st_header">
      <router-link to="seesign"> <img src="../../mobile/img/wmail_back.png" alt="" /> </router-link
      >서명 편집
      <div>
        <span class="delet"><router-link to="sign">삭제</router-link></span>
        <span class="save"><router-link to="seesign">저장</router-link></span>
      </div>
    </h2>
    <div class="m_contents06">
      <form action="">
        <ul>
          <li>
            <span>제목</span>
            <input type="text" />
          </li>
          <li>
            <span>설정</span>
            <div><em class="sig_check"></em>기본 서명으로 지정</div>
          </li>
          <li>
            <textarea>
---------------------------------------------------------
이정인 책임연구원
(주)새롬정보시스템/디자인팀
153-704 서울시 금천구 가산디지털1로 219 벽산디지털 밸리 
6차 601호 
Tel : (02) 2105-2548  H.P: 010-6612-5764
E-mail : jeongin@saerom.co.kr
http://www.saerom.co.kr
---------------------------------------------------------
                    </textarea
            >
          </li>
        </ul>
      </form>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../mail/footer.vue";
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