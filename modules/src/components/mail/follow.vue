<template>
  <div class="impor_mail">
      <!--7월 29일 추가됨 -->
      <div class="impor_con">
        <strong>수행 설정</strong>
        <p>
          <span
            ><em
              class="edit_check"
              ref="edit_check"
              @click="followUse"
              :class="{ active: this.use }"
            ></em
            >수행필요로 설정{{ this.use }}</span
          >
        </p>
        <ul>
          <li>
            <em>일자</em>
            <div>
              <input type="date" :value="this.date" />
            </div>
          </li>
          <li>
            <em>시간</em>
            <div>
              <select name="" id="" v-model="STime">
                <option
                  :value="value"
                  v-for="(value, index) in this.TimeOption.mail.hour"
                  :key="index"
                >
                  {{ value }}
                </option>
              </select>
              :
              <select name="" id="" v-model="SMin">
                <option
                  :value="value"
                  v-for="(value, index) in this.TimeOption.mail.min"
                  :key="index"
                >
                  {{ value }}
                </option>
              </select>
            </div>
          </li>
          <li>
            <em>수행할 내용</em>
            <editor-content :editor="editor" />
          </li>
        </ul>
        <div>
          <span class="impor_mo_btn" @click="followSet">확인</span>
          <span class="modal_cancel" @click="followCancle">취소</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>