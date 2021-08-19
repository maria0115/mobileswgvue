<template>
  <div class="m_posts">
        <strong desc="최근게시물">{{ portlet.board.board }}</strong>
        <ul>
          <li>
            <a href=""
              ><em>[{{ portlet.board.education }}]</em
              >임시테스트</a
            >
          </li>
          <li>
            <a href=""
              ><em>[{{ portlet.board.work }}]</em>새롬정보시스템
              임직원을 위한 프레딧</a
            >
          </li>
          <li>
            <a href=""
              ><em>[{{ portlet.board.work }}]</em>2021년
              탁상용달력 필요하신분 경영지원팀으로 신청하세요</a
            >
          </li>
          <li>
            <a href=""
              ><em>[{{ portlet.board.education }}]</em>경영기획팀]
              경영기획팀 5월 2주차 팀장회의 자료</a
            >
          </li>
        </ul>
        <span class="m_more"><a></a></span>
      </div>
</template>

<script>
export default {
    props: ['portlet'],

}
</script>

<style>

</style>