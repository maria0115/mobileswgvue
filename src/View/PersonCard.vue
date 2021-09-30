<template>
  <div class="con09_inner" v-if="Object.keys(item).length>0" :class="{ active: this.modalon }">
    <strong
      ><em>{{ item.shortname }}</em
      >{{ item.name.split(" ")[1] }}/ {{ item.department }}</strong
    >
    <div>
      <span class="basic_img on">
        <img
          :src="item.photo"
          @error="$event.target.src = '../../mobile/img/img03.png'"
          alt=""
        />
        <!-- <em class="no_img" style="background: #bbddd7"
          ><b>{{ item.shortname.split("")[0] }}</b></em
        > -->
      </span>
      <ul>
        <li><span>회사전화:</span>{{ item.office }}</li>
        <li><span>휴대폰:</span>{{ item.mobile }}</li>
        <li><span>email:</span>{{ item.email }}</li>
      </ul>
    </div>
    <ul>
      <li>
        <a :href="`tel:${item.office}`">
          <span></span>
          <em>회사전화</em>
        </a>
      </li>
      <li>
        <a :href="`tel:${item.mobile}`">
          <span></span>
          <em>휴대폰</em>
        </a>
      </li>
      <li>
        <a :href="`sms:${item.mobile}`">
          <span></span>
          <em>SMS</em>
        </a>
      </li>
      <li>
        <a @click="GoEmail">
          <span></span>
          <em>email</em>
        </a>
      </li>
    </ul>
    <em class="modal_close" @click="ModalOff"></em>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    modalon: Boolean,
  },
  methods: {
    ModalOff() {
      this.$emit("ModalOff");
    },
    GoEmail() {
      this.$store.commit("OrgPointer","SendTo");
      this.$store.commit("OrgData",this.item);
      this.$router.replace("/mail_more/write_mail").catch(error => {
        if(error.name != "NavigationDuplicated" ){
          throw error;
        }
      });
    },
  },
};
</script>

<style>
</style>