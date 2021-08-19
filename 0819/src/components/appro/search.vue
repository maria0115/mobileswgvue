<template>
  <div class="search_con search_con02">
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
                        <span>
                            <input type="checkbox" class="all_sc_check active">
                        <label for="">전체</label>
                        </span>
                    </p>
                    <p>
                        <span>
                            <input type="checkbox" class="sc_check">
                            <label for="">제목</label>
                        </span>
                        <span>
                            <input type="checkbox" class="sc_check">
                            <label for="">서식명</label>
                        </span>
                        <span>
                            <input type="checkbox" class="sc_check">
                            <label for="">기안자</label>
                        </span>
                        <span>
                            <input type="checkbox" class="sc_check">
                            <label for="">기안부서</label>
                        </span>
                        <span>
                            <input type="checkbox" class="sc_check">
                            <label for="">기안일자</label>
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