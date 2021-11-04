<template>
  <div class="opinion_modal" :class="{ active: isOpen }">
    <div class="opinion_con">
      <strong>결재의견</strong>
      <div class="text_con">
        <textarea
          name=""
          id=""
          v-on:input="comment = $event.target.value"
        ></textarea>
      </div>
      <div>
        <span class="impor_mo_btn" @click="AgreeNReject">확인</span>
        <span class="modal_cancel" @click="ModalOff">취소</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
  },
  data() {
    return {
      comment: "",
    };
  },
  methods: {
    ModalOff() {
      this.$emit("ModalOff");
    },
    AgreeNReject() {
      this.$emit("AgreeNReject", this.comment);
    },
  },
};
</script>

<style>
</style>