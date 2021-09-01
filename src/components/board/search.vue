<template>
  <div class="search_con">
        <form action="">
            <div>
                <div class="sc_top">
                    <span class="back_btn"></span>
                    <div><!--8월 9일 태그 수정됨 -->
                        <input type="text" placeholder="검색어를 입력하세요">
                        <span class="search_btn"></span>
                    </div><!---->
                    <span class="sc_more"></span>
                </div>
                <div class="sc_btm">
                    <p>
                        <input type="checkbox" class="all_sc_check active">
                        <label for="">전체</label>
                    </p>
                    <p>
                        <span>
                            <input type="checkbox" class="sc_check">
                            <label for="">작성자</label>
                        </span>
                        <span>
                            <input type="checkbox" class="sc_check">
                            <label for="">작성일</label>
                        </span>
                        <span>
                            <input type="checkbox" class="sc_check">
                            <label for="">조회</label>
                        </span>
                        <span>
                            <input type="checkbox" class="sc_check">
                            <label for="">Like</label>
                        </span>
                    </p>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>