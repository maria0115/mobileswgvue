<template>
  <div class="sub_header">
        <h2>{{this.title}}<em v-if="cnt">({{cnt}})</em></h2>
        <span class="sub_ham" @click="OpenHam"></span>
        <span class="ap_sub_search" v-if="params.type!=='formList_all'"></span>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  
  computed: {
    ...mapGetters( ["GetHeader"]),
  },
  created(){
        this.params = JSON.parse(this.$route.query.data);
        // this.params = this.GetHeader.menu;

  },
  methods:{
    OpenHam(){
      this.$emit('OpenHam');
    }
  },
  props: {
    title: String,
    cnt: Number,
  },

}
</script>

<style>

</style>