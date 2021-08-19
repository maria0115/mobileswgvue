<template>
  <div class="cal_menu" :class="{on:this.calmenu}">
        <div class="cal_inner">
            <div class="info_tit">
                <span class="cal_img01"></span>
                <dl>
                    <dt>안지원 대리</dt>
                    <dd>전략구매팀</dd>
                </dl>
                <div>
                    <span class="cal_sub_set"><a href="./mob_mail_set.html"></a></span>
                    <span class="cal_sub_close" @click="$emit('calMenuOff')"></span>
                </div>
            </div>
            <div class="cal_list">
                <li class="cal_type">
                    <ul>
                        <li class="month"><router-link to="month">월간</router-link></li>
                        <li class="week"><router-link to="week">주간</router-link></li>
                        <li class="day"><router-link to="day">일간</router-link></li>
                    </ul>
                </li>
                <li class="my_cal" :class="{on:this.myCal}">
                    <strong @click="toggle">개인일정<em></em></strong>
                    <ul>
                        <li ><a>나의 일정</a></li>
                    </ul>
                </li>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'calmenu',
    ],
    data(){
        return {
            myCal:false
        }
    },
    methods: {
        toggle(){
            this.myCal = !this.myCal;
        },
    },

}
</script>

<style>

</style>