<template>
  <div class="opinion_modal" :class="{ active: isOpen }">
    <div class="opinion_con">
      <strong>{{lang.comment}}</strong>
      <div class="text_con">
        <textarea
          name=""
          id=""
          v-on:input="comment = $event.target.value"
        ></textarea>
      </div>
      <div>
        <span class="impor_mo_btn" @click="CommentM">{{lang.ok}}</span>
        <span class="modal_cancel" @click="ModalOff">{{lang.cancle}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    this.lang = this.GetBookL.comment;
  },
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
    CommentM() {
      this.$emit("CommentM", this.comment);
    },
  },
};
</script>

<style>
</style>