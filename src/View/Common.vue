<template>
  <div style="height: 100%">
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  created() {
    if (
      !this.GetMyInfo.master &&
      this.$route.name !== "login"
    ) {
      console.log("createtd")
      this.getMaster();
    }

    if (this.$route.name === "root") {
      for (var item of this.languages) {
        this.getLanguage(item);
      }
      this.$store.dispatch("GetLanguage", { app: "main" }).then((res) => {
        this.$router.push({ name: "main" });
      });
    }
  },
  computed: {
    ...mapGetters("mainjs", ["GetMyInfo"]),
  },
  data() {
    return {
      languages: [
        "search",
        "mail",
        "config",
        "approval",
        "board",
        "reservation",
        "mailconfig",
        "schedule",
        "common",
      ],
    };
  },
  methods: {
    async getMaster() {
      if (this.GetMyInfo.info.fullOrgCode) {
        var full = this.GetMyInfo.info.fullOrgCode;
        var children = await this.$store.dispatch("Org", {
          companycode: full[0],
          mycode: full[full.length - 1],
        });

        var meidx = children.findIndex((item) => {
          return item.notesId == this.GetMyInfo.info.notesid;
        });
        if (meidx !== -1) {
          this.$store.commit("mainjs/MyInfoMaster", children[meidx]);
        }
      }
    },
  },
};
</script>

<style>
</style>