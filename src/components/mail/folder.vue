<template>
  <div class="mail_sub">
      <div class="mail_inner">
        <div class="info_tit">
          <span class="mail_img01"></span>
          <dl>
            <dt>
              {{ this.GetMyInfo.info.name }} {{ this.GetMyInfo.info.position }}
            </dt>
            <dd>{{ this.GetMyInfo.info.dept }}</dd>
          </dl>
          <div>
            <router-link to="/mailconfig"><span class="mail_sub_set"><a></a></span></router-link>
            <span class="mail_sub_close"><a></a></span>
          </div>
        </div>
        <div class="mail_box_list01">
          <div>
            <em>기본 메일함</em>
            <ul class="list_menu">
              <li>
                <h3>
                  <router-link to="/maillist/mail_unread">{{
                    GetMailLanguage.title.mail_unread
                  }}</router-link>
                </h3>
              </li>
              <li>
                <h3>
                  <a @click="depthDown($event, $parent)" class="down_more">{{
                    GetMailLanguage.title.inbox_detail
                  }}</a>
                </h3>
                <ul class="depth02">
                  <router-link to="/maillist/mail_inner"
                    ><li>
                      <a>{{ GetMailLanguage.title.mail_inner }}</a>
                    </li></router-link
                  >
                  <router-link to="/maillist/mail_outer"
                    ><li>
                      <a>{{ GetMailLanguage.title.mail_outer }}</a>
                    </li></router-link
                  >
                  <router-link to="/maillist/mail_attach"
                    ><li>
                      <a>{{ GetMailLanguage.title.mail_attach }}</a>
                    </li></router-link
                  >
                </ul>
              </li>
              <li>
                <h3>
                  <router-link
                    to="/maillist/sent_detail"
                    @click="depthDown($event, $parent)"
                    >{{ GetMailLanguage.title.sent_detail }}</router-link
                  >
                </h3>
                <ul class="depth02">
                  <li><a></a></li>
                </ul>
              </li>
              <li>
                <h3>
                  <a @click="depthDown($event, $parent)" class="down_more">{{
                    GetMailLanguage.title.mail_save
                  }}</a>
                </h3>
                <ul class="depth02">
                  <router-link to="/maillist/mail_draft"
                    ><li>
                      <a>{{ GetMailLanguage.title.mail_draft }}</a>
                    </li></router-link
                  >
                  <router-link to="/maillist/mail_autoSave"
                    ><li>
                      <a>{{ GetMailLanguage.title.mail_autoSave }}</a>
                    </li></router-link
                  >
                </ul>
              </li>
              <li>
                <h3>
                  <router-link
                    to="/maillist/mail_reservation"
                    @click="depthDown($event, $parent)"
                    >{{ GetMailLanguage.title.mail_reservation }}</router-link
                  >
                </h3>
                <ul class="depth02">
                  <li><a href="">발송대기</a></li>
                  <li><a href="">예약메일</a></li>
                </ul>
              </li>
              <li>
                <router-link to="/maillist/mail_my"
                  ><h3>
                    <a @click="depthDown($event, $parent)">{{
                      GetMailLanguage.title.mail_my
                    }}</a>
                  </h3></router-link
                >
                <ul class="depth02">
                  <li><a></a></li>
                </ul>
              </li>
              <li>
                <router-link to="/maillist/mail_followup"
                  ><h3>
                    <a @click="depthDown($event, $parent)">{{
                      GetMailLanguage.title.mail_importance
                    }}</a>
                  </h3></router-link
                >
              </li>
              <li>
                <router-link to="/maillist/mail_trash"
                  ><h3>
                    <a @click="depthDown($event, $parent)">{{
                      GetMailLanguage.title.mail_trash
                    }}</a>
                  </h3></router-link
                >
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
                  <a @click="depthDown($event, $parent)" class="down_more"
                    >기본 폴더</a
                  >
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
  components: {
    TreeItem,
  },
    computed: {
    ...mapState(["mail"]),
    ...mapGetters([
      "GetMail",
      "GetMyInfo",
      "GetSystemColor",
      "GetConfig",
      "GetMailLanguage",
    ]),
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

}
</script>

<style>

</style>