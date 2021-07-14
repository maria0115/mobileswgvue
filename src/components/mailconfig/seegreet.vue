<template>
  <div>
    <h2 class="mail_st_header">
      <router-link to="greet">
        <img src="../../mobile/img/wmail_back.png" alt="" /> </router-link
      >인사말 보기
      <span><router-link to="modifygreet">편집</router-link></span>
    </h2>
    <div class="m_contents07">
      <ul>
        <li>
          <span>제목</span>
          <div>
            <p>{{GetGreetView.subject}}</p>
          </div>
        </li>
        <li>
          <span>설정</span>
          <div v-if="GetGreetView.default">
            <p>기본 인사말</p>
          </div>
        </li>
        <li>
          <div v-html="GetGreetView.body">안녕하세요 디자인팀 홍길동입니다.</div>
        </li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../mail/footer.vue";
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["GetGreetView"]),
  },
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