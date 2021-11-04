$(function () {


    // $('document').on('bind', 'mobileinit', function () {
    //     console.log("왔니?")
    //     $.mobile.loader.prototype.options.disabled = true;
    // });


    //  라디오버튼 클릭시 이벤트 발생 //
    $('body').on('click', 'input:radio[name=radio]', function () {
        if ($("input[name=radio]:checked").val() == "small") {
            $("html").addClass('small');
            $("html").removeClass('normal');
            $("html").removeClass('large');
        } else if ($("input[name=radio]:checked").val() == "normal") {
            $("html").addClass('normal');
            $("html").removeClass('small');
            $("html").removeClass('large');
        } else if ($("input[name=radio]:checked").val() == "large") {
            $("html").addClass('large');
            $("html").removeClass('small');
            $("html").removeClass('normal');
        }
    });
    $('body').on('click', 'input:radio[name=f_radio]', function () {
        $(".wrap").css("font-family", $("input[name=f_radio]:checked").val());
    });

    //  통합검색 화면   //
    $('.content07 > div').hide();
    $('body').on('click', '.tab_menu > li > a', function () {
        // $('.content07 > div').hide().filter(this.hash).show();
        $('.tab_menu > li > a').parent('li').removeClass('active');
        $(this).parent('li').addClass('active');
        return false;
    }).filter(':eq(0)').click();
    $('body').on('click', '.se_more', function () {
        $('.menu_bar').toggleClass('active');
        $('.lst_option').toggleClass('active');
    });
    $('body').on('click', '.lst_option li span', function () {
        $(this).addClass('active');
        $(this).siblings('span').removeClass('active');
    });
    $('.lst_option input').on('click', function () {
        $(this).addClass('on');
        $(this).siblings('input').removeClass('on');
    });

    // const inputBox = document.querySelector("input");
    // const recommendBox01 = document.querySelector(".auto_search");
    // const recommendBox02 = document.querySelector(".recent_search");
    // const texts = document.querySelectorAll(".text");

    // inputBox.addEventListener("keyup", function (e) {
    //     if (e.target.value.length > 0) {
    //         recommendBox01.classList.add('on');
    //         recommendBox02.classList.remove('on');
    //         texts.forEach(function (textEl) {
    //             textEl.textContent = e.target.value;
    //         })
    //     } else {
    //         recommendBox01.classList.remove('on');
    //         recommendBox02.classList.add('on');
    //     }
    // });
    // inputBox.addEventListener("click", function (e) {
    //     if (e.target.value === "") {
    //         recommendBox02.classList.add('on');
    //     }
    // });
    $('body').on('click', '.end', function () {
        $('.auto_search').removeClass('on');
        $('.recent_search').removeClass('on');
    });

    // $.mobile.loader.prototype.options.disabled = true;
    

    //메인화면
    $('.main_tab > div').hide();
    $('.main_menu > li > a').on('click', function () {
        $('.main_tab > div').hide().filter(this.hash).show();
        $('.main_menu > li > a').parent('li').removeClass('active');
        $(this).parent('li').addClass('active');
        return false;
    }).filter(':eq(0)').click();
    // $('.app_slide').slick({
    //     slidesToshow: 1,
    //     arrows: false,
    //     dots: true,
    // });
    $('body').on('click', '.top_btn', function () {
        $('html, body').animate({ scrollTop: 0 }, 400);
        return false;
    });
    $('body').on('click', '.auto_search > p > em:nth-child(1)', function () {
        $(this).toggleClass('active');
        if ($('.auto_search > p > em:nth-child(1)').hasClass('active')) {
            $(this).text('자동완성켜기');
            alert("자동완성기능을 사용 중지하시겠습니까?");
        } else {
            $(this).text('자동완성끄기');
        }
    });
    $('.editmenu').hide();
    $('body').on('click', '.btn_edit', function () {
        $('.mymenu').hide();
        $('.editmenu').show();
    });
    $('body').on('click', '.btn_save', function () {
        $('.mymenu').show();
        $('.editmenu').hide();
    });
    // $('body').on('click','.my_list li span', function() {
    //     $(this).toggleClass('on');
    // });
    $('body').on('click', '.ham', function () {
        $('.main_sub').addClass('active');
    });
    $('body').on('click', '.main_sub_close', function () {
        $('.main_sub').removeClass('active');
    });

    // $('body').on('mouseup', '.sub_menu01', function (e) {
    //     var LayerPopup = $(".sub_menu01");
    //     if(LayerPopup.has(e.target).length === 0){
    //         console.log("오긴하니")
    //       LayerPopup.removeClass("on");
    //     }
    // });

    // $('body').on('click','.e_edit',function(){
    //     $('.edit_header').addClass('on');
    //     $('.basic_header').removeClass('on');
    //     $('.edit_check').addClass('on');
    //     $('.basic_img').removeClass('on');
    // });
    // $('body').on('click','.mail_back',function(){
    //     $('.edit_header').removeClass('on');
    //     $('.basic_header').addClass('on');
    //     $('.edit_check').removeClass('on');
    //     $('.basic_img').addClass('on');
    // });
    $('body').on('click','.edit_more',function(){
        $('.more_box').toggleClass('on');
    });
    $('body').on('click','.move',function(){
        $('.move_file').addClass('on');
    });
    $('body').on('click','.move_bg',function(){
        $('.move_file').removeClass('on');
        $('.edit_check.on').removeClass('active02');
        $('.edit_check.on').removeClass('active');
        $('.edit_check').removeClass('on');
        $('.edit_header').removeClass('on');
        $('.basic_header').addClass('on');
        $('.basic_img').addClass('on');
        $('.more_box').removeClass('on');
    });
    // $('body').on('click','.all_btn',function(){
    //     $('.edit_check.on').toggleClass('active');
    //     $('.edit_check.on').removeClass('active02');
    // });
    // $('.m_contents02 > form > ul > li > input').on('click',function(){
    //     $(this).toggleClass('active02');
    // });
    $('.move_file ul li').on('click',function(){
        $(this).addClass('active');
        $(this).siblings('li').removeClass('active');
    });
    $('.move_file ul li').on('click',function(){
        $(this).addClass('active');
        $(this).siblings('li').removeClass('active');
    });
    // $('.list_menu > li > h3 > a').on('click',function(){
    //     console.log($(this));
    //     $(this).parent('h3').parent('li').find('.depth02').slideToggle(); 
    //     $(this).parent('h3').toggleClass('on');
    // });
    $('body').on('click','.sub_ham',function(){
        $('.mail_sub').addClass('active');
    });
    $('body').on('click','.mail_sub_close',function(){
        $('.mail_sub').removeClass('active');
    });
    // $('body').on('click','.mail_back',function(){
    //     $('.m_contents02 > form > ul > li > input').removeClass('active');
    //     $('.m_contents02 > form > ul > li > input').removeClass('active02');
    // });
    $('body').on('click','.add_obj',function(){
        $(this).toggleClass('active');
        $(this).siblings('li').removeClass('active');
        $(this).siblings('li').find('.del_add').removeClass('active');
        $(this).find('.del_add').toggleClass('active');
        $(this).parent('ul').parent('div').parent('li').siblings('li').find('div').find('.del_add').removeClass('active');
        $(this).parent('ul').parent('div').parent('div').parent('li').siblings('li').find('.del_add').removeClass('active');
        $(this).parent('ul').parent('div').parent('div').siblings('div').find('.del_add').removeClass('active');
        $(this).parent('ul').parent('div').parent('li').siblings('li').find('div').find('.add_obj').removeClass('active');
        $(this).parent('ul').parent('div').parent('div').parent('li').siblings('li').find('.add_obj').removeClass('active');
        $(this).parent('ul').parent('div').parent('div').siblings('div').find('.add_obj').removeClass('active');
    });

    /*6_29수정 */ 
    $('body').on('click','.re_more',function(){
        $(this).toggleClass('active');
        $('.refer_div').slideToggle();
        $('.re_refer_div').slideToggle();
    });
    
    $('.add_file li .file_del').on('click',function(){
        $(this).parent('div').parent('li').removeClass('active');
    });
    /* 수정끝*/
    // $('body').on('click','.impor_send',function(){
    //     $('.impor_check').toggleClass('active');
    // });
    // $('body').on('click',".time_send",function(){
    //     $('.time_check').toggleClass('active');
    //     $('.time_modal').addClass('active');
    // });
    // $('body').on('click','.modal_close',function(){
    //     $('.time_modal').removeClass('active');
    //     $('.time_check').removeClass('active');
    // });
    $('body').on('click','.time_mo_btn',function(){
        $('.time_modal').removeClass('active');
    });
    // $('body').on('click','.wm_top textarea',function(){
    //     $(this).parent('li').parent('ul').parent('div').siblings('div.add_search').toggleClass('active');
    // });
    $('body').on('click','.date_line',function(){
        $('.d_line').toggleClass('active');
    });/* 10월 13일 추가됨 */
    $('body').on('click','.rd_more',function(){
        $('.rdmail_icons .more_box').toggleClass('on');
    });
    $('body').on('click','.more_box',function(){
        $('.rdmail_icons .more_box').toggleClass('on');
    });
    // $('body').on('click','.btn_toggle',function(){
    //     $(this).parent('a').parent('li').parent('ul').toggleClass('on');
    // });
    
    $('body').on('click','.t_btn',function(){
        $('.save_time').addClass('on');
    });
    $('body').on('click','.move_bg',function(){
        $(this).parent('div').removeClass('on');
    });
    $('body').on('click','.d_btn',function(){
        $('.save_day').addClass('on');
    });
    $('body').on('click','.move_bg',function(){
        $(this).parent('div').removeClass('on');
    });
    $('body').on('click','.sv_radio',function(){
        $(this).addClass('active');
        $(this).parent('li').siblings('li').find('span').removeClass('active');
    });
    $('.delay > li').on('click',function(){
        $(this).find('span').addClass('active');
        $(this).siblings('li').find('span').removeClass('active');
    });
    // $('body').on('click','.sig_check',function(){
    //     $(this).toggleClass('active');
    // });
    // $('.editmenu ul > li span b').on('click', function() {
    //     $(this).toggleClass('on');
    // });
    // $('body').on('click','.organ', function() {
    //     $('.organ_modal').addClass('on');
    // });
    // $('body').on('click','.organ_modal .modal_close',function(){
    //     $('.organ_modal').removeClass('on');
    // });
    // $('.organlist > li > div').on('click',function(){
    //     $(this).parent('li').find('.o_depth02').slideToggle(); 
    //     $(this).toggleClass('on');
    // });
    // $('.o_depth02 > li > div').on('click',function(){
    //     $(this).parent('li').find('.o_depth03').slideToggle(); 
    //     $(this).toggleClass('on');
    // }); 
    // $('.o_depth03 > li > div').on('click',function(){
    //     $(this).parent('li').find('.o_depth04').slideToggle(); 
    //     $(this).toggleClass('on');
    // }); 
    // 7월 9일 추가됨
    // $('.or_bg').on('click',function(){
    //     $(this).addClass('active');
    //     $(this).siblings('li').removeClass('active'); 
    // }); 
    // $('.organlist > li > div').on('click',function(){
    //     $('.or_bg').removeClass('active');
    // });
    //
    // $('.sub_ham').on('click',function(){
    //     $('.cal_menu').addClass('on');
    // });
    // $('.cal_sub_close').on('click',function(){
    //     $('.cal_menu').removeClass('on');
    // });
    $('.cal_type > ul > li > a').on('click',function(){
        $(this).parent('li').addClass('on');
        $(this).parent('li').siblings('li').removeClass('on');
    });
    $('.my_cal strong').on('click',function(){
        $(this).parent('li').toggleClass('on');
    });
    // $('.repeat_s span em').on('click',function(){
    //     $(this).addClass('click');
    //     $(this).parents('span').siblings('span').find('em').removeClass('click')
    // });
    // $('body').on('click','.c_organ', function() {
    //     $('.organ_modal').addClass('on');
    // });
    $('body').on('click','.cal_att strong', function() {
        alert("아왜안와")
        $(this).toggleClass('active');
        $('.more_cal_att').slideToggle();
    });
    // $('body').on('click','.att_del', function() {
    //     $(this).parent('li').css('display','none');
    // });
    // $('.a_list > li > h3 > a').on('click',function(){
    //     $(this).parent('h3').toggleClass('active'); 
    //     $(this).parent('h3').siblings('ul').toggleClass('active'); 
    // });
    // action 버튼 
    $('body').on('click','.more_plus', function() {
        $('.ac_btns ul').toggleClass('active');
    });
    $('.line02 li h3 a').on('click', function() {
        $(this).parent('h3').toggleClass('active');
        $(this).parent('h3').siblings('div').toggleClass('active');
    });
    // 결제중 문서
    $('body').on('click','.st_more', function() {
        $(this).addClass('active'); 
        $(this).parent('li').find('.app_status').addClass('active');
    });
    $('body').on('click','.close_btn', function() {
        alert("아왜 여기안와")
        $('.btm_menu_list').removeClass('active');
        // $(this).parent('div').removeClass('active')
        // $(this).parent('div').siblings('.s_text').find('.st_more').removeClass('active');
        $(this).parent('div').siblings('.st_more').removeClass('active');
        // $(this).parent('div').parent('div').removeClass('active');
        // $(this).parent('div').parent('div').removeClass('active');
        // $(this).parent('div').parent('div').siblings('.st_more').removeClass('active');
    });
    // 
    $("body").on('change','#add_f',function(){
        var fileName = $("#add_f").val();
        $(".load_name").val(fileName);
    });
    $('body').on('click','.sv_radio1',function(){
        $(this).addClass('active');
        $(this).parent('span').siblings('span').find('.sv_radio1').removeClass('active');
    });
    $('body').on('click','.app_pointer', function() {
        $('.a_organ_modal').addClass('on');
    });
    $('body').on('click','.a_modal_close', function() {
        $('.a_organ_modal').removeClass('on');
    });
    // $('body').on('click','.impor_con .edit_check', function() {
    //     $(this).toggleClass('active');
    // });
    $('body').on('click','.star', function() {
        // $(this).parent('p').parent('div').siblings('.impor_mail').addClass('active');
        $('.impor_mail').addClass('active');
    });
    $('body').on('click','.modal_cancel' ,function() {
        $('.impor_mail').removeClass('active');
    });
    $('body').on('click','.impor_mo_btn', function() {
        $('.impor_mail').removeClass('active');
    });
    $('body').on('click','.sc_check', function() {
        $('.sc_btm').find('.sc_check').removeClass('active');
        $('.sc_btm').find('.all_sc_check').removeClass('active');
        
        $(this).toggleClass('active');
    });
    $('body').on('click','.all_sc_check', function() {
        $(this).toggleClass('active');
        console.log("sc_check")
        $('.sc_check').removeClass('active');
        // if($('.all_sc_check').hasClass('active')){
        //     $('.sc_check').on('click', function() {
        //         $('.all_sc_check').removeClass('active');
        //     });
        // };
    });
    $('body').on('click','.sc_more',function(){
        $('.sc_btm').toggleClass('on');
    });
    $('body').on('click','.sub_search',function(){
        $('.search_con').addClass('active');
        var inp = $('.search_con').find('.sc_top').find('input');
        inp[0].focus();
    });
    $('body').on('click','.search_btn',function(){
        $('.search_con').removeClass('active');
    });
    $('body').on('click','.back_btn',function(){
        alert("아왜여기안와")
        $('.search_con').removeClass('active');
        $('.ap_sub_search').removeClass('active');
    });
    $('body').on('click','.ap_sub_search',function(){
        $('.search_con').addClass('active');
        var inp = $('.search_con').find('.sc_top').find('input');
        inp[0].focus();
    });
    // 게시판 
    // $('.tit_clip').on('click',function(){
    //     $('.att_file').toggleClass('active');
    // });
    $('body').on('click','.re_more',function(){
        $('.posting').toggleClass('active');
    });
    // $('.like_btn span').on('click',function(){
    //     $(this).toggleClass('active');
    // });
    // $('body').on('click','.com_ic',function(){
    //     $(this).parent('div').siblings('.ccc_com').toggleClass('active');
    // });
    // $('body').on('click','.time_mo_btn',function(){
    //     $('.rere_modal').removeClass('active');
    // });/*8월 12일 추가됨 */
    // $('body').on('click','.rereclose',function(){
    //     $('.rere_modal').removeClass('active');
    // });
    // $('body').on('click','.rere_btn em',function(){
    //     $('.rere_modal').addClass('active');
    // });/*8월 12일 추가됨 */
     /* 일정 쓰기 반복예약*/
    // $('.m_contents08').on('click','#selectbox',function(){
    //     if ($('#selectbox option:selected').val() == "기간"){
    //         $('.date_inp > div').addClass('active');
    //     } else if ($('#selectbox option:selected').val() == "종료"){
    //         $('.date_inp > div').removeClass('active');
    //     }
    // });/*8월 12일 추가됨 */

    $('body').on('click','.btm_menu',function(){
        // alert("btm_menu toggle");
        $('.btm_menu_list').addClass('active');
    });
    // $('body').on('click','.btm_organ',function(){
    //     $('.all_organ_modal').addClass('on');
    //     $('.btm_menu_list').removeClass('active');
    // });
    $('body').on('click','.btm_btn li',function(){
        $(this).addClass('on');
        $(this).siblings('li').removeClass('on');
    });
    // $('body').on('click','.close_btn', function() {
    //     console.log("여기안오냐고 왜")
    //     $(this).parent('div').removeClass('active')
    //     // $(this).parent('div').siblings('.s_text').find('.st_more').removeClass('active');
    //     $(this).parent('div').siblings('.st_more').removeClass('active');
    //     // $(this).parent('div').parent('div').removeClass('active');
    // });
    changeIMG();
    function changeIMG(){
        if ($('.wrap.btm_b').hasClass('dark')){
            $('.up > img').attr('src','./img/up_btn_d.png');
            $('.down > img').attr('src','./img/down_btn_d.png'); 
        }else if ($('.wrap.btm_b').removeClass('dark')){
            $('.up > img').attr('src','./img/up_btn.png');
            $('.down > img').attr('src','./img/down_btn.png'); 
        }
    };/*27일 추가됨*/
    $('body').on('click','.new_addr textarea',function(){
        $(this).parent('li').parent('ul').parent('div').siblings('div.add_search').toggleClass('active');
    });/*27일 추가됨*/
});