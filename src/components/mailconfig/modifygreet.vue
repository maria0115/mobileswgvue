<template>
  <div>
    <h2 class="mail_st_header">
      <router-link to="seegreet"> <img src="../../mobile/img/wmail_back.png" alt="" /> </router-link
      >인사말 편집
      <div>
        <span class="delet"><router-link to="greet">삭제</router-link></span>
        <span class="save"><router-link to="seegreet">저장</router-link></span>
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
            <div><em class="sig_check"></em>기본 인사말로 지정</div>
          </li>
          <li>
            <textarea>
안녕하세요 디자인팀 홍길동입니다.
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