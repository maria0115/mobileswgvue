<template>
  <div class="opinion_modal" :class="{ active: isOpen }">
    <div class="opinion_con">
      <strong>{{ clang() }}</strong>
      <div class="text_con">
        <textarea
          name=""
          id=""
          v-on:input="comment = $event.target.value"
        ></textarea>
      </div>
      <div>
        <span class="impor_mo_btn" @click="AgreeNReject">{{ lang.ok }}</span>
        <span class="modal_cancel" @click="ModalOff">{{ lang.cancel }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.lang = this.GetAppL.comment;
  },
  props: {
    isOpen: Boolean,
nowBtn:String,
  },
  data() {
    return {
      comment: "",
    };
  },
  methods: {
    clang(){
      if(this.nowBtn){
        return this.nowBtn+" "+this.lang.comment;
      }else {
        return this.lang.comment;
      }
    },
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