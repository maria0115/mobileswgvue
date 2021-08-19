<template>
  <div>
    <h2 class="mail_st_header">
      <router-link to="greet">
        <img src="../../mobile/img/wmail_back.png" alt="" /> </router-link
      >인사말 등록
      <span class="save" @click="GreetAdd"><a>저장</a></span>
    </h2>
    <div class="m_contents06">
      <form action="">
        <ul>
          <li>
            <span>제목</span>
            <input type="text" v-model="subject" />
          </li>
          <li>
            <span>설정</span>
            <div @click="DefaultGreet">
              <em class="sig_check" :class="{ active: this.default }"></em>기본
              인사말로 지정
            </div>
          </li>
          <li>
            <textarea v-model="body">
안녕하세요 디자인팀 홍길동입니다.
                    </textarea
            >
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      // path:this.path,
      subject: "",
      default: false,
      body: "",
    };
  },
  methods: {
    DefaultGreet() {
      this.default = !this.default;
    },
    GreetAdd() {
      var data = {};
      data.subject = this.subject;
      data.default = this.default;
      data.body = this.body;
      this.$store.dispatch("GreetAdd", data);
    },
    Back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>