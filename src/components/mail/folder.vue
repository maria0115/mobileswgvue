<template>
  <div class="mail_sub" @click="Close">
    <div class="mail_inner">
      <div class="info_tit">
        <span class="mail_img01"
          ><em>
            <img
              v-if="GetMyInfo.photo !== undefined"
              :src="GetMyInfo.photo"
              alt=""
              @error="$event.target.src = '/mobile/img/img03.png'"
            /> </em
        ></span>
        <dl>
          <dt>
            {{ this.GetMyInfo.info.name }} {{ this.GetMyInfo.info.position }}
          </dt>
          <dd>{{ this.GetMyInfo.info.dept }}</dd>
        </dl>
        <div>
          <router-link :to="{ name: 'mailconfig' }"
            ><span class="mail_sub_set"><a></a></span
          ></router-link>
          <span class="mail_sub_close"><a></a></span>
        </div>
      </div>
      <div class="mail_box_list01">
        <div>
          <em>{{ lang.mailbox }}</em>
          <ul class="list_menu">
            <li>
              <h3>
                <a @click="folderGo({ name: 'mail_unread' })">{{
                  GetMailLanguage.title.mail_unread
                }}</a>
              </h3>
            </li>
            <li>
              <h3>
                <a @click="folderGo({ name: 'inbox_detail' })">{{
                  GetMailLanguage.title.inbox_detail
                }}</a>
                <em @click="depthDown($event, $parent)" class="down_m"></em>
              </h3>
              <ul class="depth02">
                <a @click="folderGo({ name: 'mail_inner' })"
                  ><li>
                    <a>{{ GetMailLanguage.title.mail_inner }}</a>
                  </li></a
                >
                <a @click="folderGo({ name: 'mail_outer' })"
                  ><li>
                    <a>{{ GetMailLanguage.title.mail_outer }}</a>
                  </li></a
                >
                <a @click="folderGo({ name: 'mail_attach' })"
                  ><li>
                    <a>{{ GetMailLanguage.title.mail_attach }}</a>
                  </li></a
                >
              </ul>
            </li>
            <li>
              <h3>
                <a @click="folderGo({ name: 'sent_detail' })">{{
                  GetMailLanguage.title.sent_detail
                }}</a>
              </h3>
              <ul class="depth02">
                <li><a></a></li>
              </ul>
            </li>
            <li>
              <h3>
                <a @click="folderGo({ name: 'mail_draft' })">{{
                  GetMailLanguage.title.mail_save
                }}</a>
                <em @click="depthDown($event, $parent)" class="down_m"></em>
              </h3>
              <ul class="depth02">
                <a @click="folderGo({ name: 'mail_draft' })"
                  ><li>
                    <a>{{ GetMailLanguage.title.mail_draft }}</a>
                  </li></a
                >
                <a @click="folderGo({ name: 'mail_autoSave' })"
                  ><li>
                    <a>{{ GetMailLanguage.title.mail_autoSave }}</a>
                  </li></a
                >
              </ul>
            </li>
            <li>
              <h3>
                <a @click="folderGo({ name: 'mail_reservation' })">{{
                  GetMailLanguage.title.mail_reservation
                }}</a>
                <em @click="depthDown($event, $parent)" class="down_m"></em>
              </h3>
              <ul class="depth02">
                <li>
                  <a @click="folderGo({ name: 'mail_reservation' })">{{
                    GetMailLanguage.title.mail_reservation
                  }}</a>
                </li>
              </ul>
            </li>
            <li>
              <a @click="folderGo({ name: 'mail_my' })"
                ><h3>
                  <a>{{ GetMailLanguage.title.mail_my }}</a>
                </h3></a
              >
              <em @click="depthDown($event, $parent)" class="down_m"></em>
              <ul class="depth02">
                <li><a></a></li>
              </ul>
            </li>
            <li>
              <a @click="folderGo({ name: 'mail_followup' })"
                ><h3>
                  <a>{{ GetMailLanguage.title.mail_importance }}</a>
                </h3></a
              >
              <em @click="depthDown($event, $parent)" class="down_m"></em>
            </li>
            <li>
              <a @click="folderGo({ name: 'mail_trash' })"
                ><h3>
                  <a>{{ GetMailLanguage.title.mail_trash }}</a>
                </h3></a
              ><em @click="depthDown($event, $parent)" class="down_m"></em>
              <ul class="depth02">
                <li><a></a></li>
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <em>{{ GetMailLanguage.title.mail_folder }}</em>
          <ul class="list_menu">
            <li>
              <h3>
                <a @click="depthDown($event, $parent)" class="down_more">{{
                  lang.basic
                }}</a>
              </h3>
              <ul class="depth02">
                <span
                  v-for="(value, name) in this.mail.data.folderList.data"
                  :key="name"
                >
                  <tree-item
                    :item="value"
                    @make-folder="makeFolder"
                    @add-item="addItem"
                  ></tree-item>
                </span>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import TreeItem from "../../View/TreeView.vue";
export default {
  created() {
    this.lang = this.GetMailLanguage.folder;
  },
  components: {
    TreeItem,
  },
  computed: {
    ...mapState("mailjs", ["mail"]),
    ...mapGetters("mailjs", ["GetMail"]),
    ...mapGetters("mainjs", ["GetMyInfo"]),
    ...mapGetters("configjs", ["GetSystemColor", "GetConfig"]),
    ...mapGetters(["GetMailLanguage"]),
    color() {
      if (this.GetSystemColor === "dark") {
        return true;
      }
    },
    path() {
      return this.$route.path.substring(this.$route.path.lastIndexOf("/") + 1);
    },
  },
  methods: {
    folderGo(value){
      this.$router.push(value);
      this.$store.commit("mailjs/MailSearchOptionInit");
    },
    Close(e) {
      var LayerPopup = $(".mail_sub");
      if (LayerPopup.has(e.target).length === 0) {
        $(".mail_sub").removeClass("active");
      }
    },
    makeFolder: function (item) {
      item.children = [];
      this.addItem(item);
    },
    addItem: function (item) {
      item.children.push({
        name: "new stuff",
      });
    },

    // 폴더 클릭시 하위폴더
    depthDown(e, t) {
      $(e.currentTarget.parentElement.nextElementSibling).slideToggle();
      $(e.currentTarget.parentElement).toggleClass("on");
    },
  },
};
</script>

<style>
</style>