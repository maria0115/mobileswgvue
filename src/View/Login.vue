<template>
  <div class="wrap btm_b">
    <div class="main_wrap">
      <h1 class="main_logo">
        <img src="../mobile/img/main_logo.png" alt="로고" />
      </h1>
      <div class="login_input">
        <input type="text" placeholder="아이디" v-model="id"/>
        <input type="password" placeholder="비밀번호" v-model="password"/>
      </div>
      <p class="login_check">
        <span class="check_lf">
          <b></b>
          <em>아이디저장</em>
        </span>
        <span class="check_ri">
          <b></b>
          <em>자동로그인</em>
        </span>
      </p>
      <button @click="login">로그인</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { id: "", password: "" ,language:"ko"};
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", { Username: this.id, Password: this.password,language:this.language })
        .then((res) => {
          console.log(res,"Login");
        });
    },
  },
};
</script>

<style>
</style>