$(function () {


    


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
    $('.re_more').on('click',function(){
        $(this).toggleClass('active');
        $('.refer_div').slideToggle();
        $('.re_refer_div').slideToggle();
    });
    
    $('.add_file li .file_del').on('click',function(){
        $(this).parent('div').parent('li').removeClass('active');
    });
    /* 수정끝*/
    $('.impor_send').on('click',function(){
        $('.impor_check').toggleClass('active');
    });
    $('.time_send').on('click',function(){
        $('.time_check').toggleClass('active');
        $('.time_modal').addClass('active');
    });
    $('.modal_close').on('click',function(){
        $('.time_modal').removeClass('active');
        $('.time_check').removeClass('active');
    });
    $('.time_mo_btn').on('click',function(){
        $('.time_modal').removeClass('active');
    });
    $('.wm_top textarea').on('click',function(){
        $(this).parent('li').parent('ul').parent('div').siblings('div.add_search').toggleClass('active');
    });
    $('.rd_more').on('click',function(){
        $('.rdmail_icons .more_box').toggleClass('on');
    });
    $('.btn_toggle').on('click',function(){
        $(this).parent('a').parent('li').parent('ul').toggleClass('on');
    });
    
    $('.t_btn').on('click',function(){
        $('.save_time').addClass('on');
    });
    $('.move_bg').on('click',function(){
        $(this).parent('div').removeClass('on');
    });
    $('.d_btn').on('click',function(){
        $('.save_day').addClass('on');
    });
    $('.move_bg').on('click',function(){
        $(this).parent('div').removeClass('on');
    });
    $('.sv_radio').on('click',function(){
        $(this).addClass('active');
        $(this).parent('li').siblings('li').find('span').removeClass('active');
    });
    $('.delay > li').on('click',function(){
        $(this).find('span').addClass('active');
        $(this).siblings('li').find('span').removeClass('active');
    });
    $('.sig_check').on('click',function(){
        $(this).toggleClass('active');
    });
    $('.editmenu ul > li span b').on('click', function() {
        $(this).toggleClass('on');
    });
    $('.organ').on('click', function() {
        $('.organ_modal').addClass('on');
    });
    $('.organ_modal .modal_close').on('click',function(){
        $('.organ_modal').removeClass('on');
    });
    $('.organlist > li > div').on('click',function(){
        $(this).parent('li').find('.o_depth02').slideToggle(); 
        $(this).toggleClass('on');
    });
    $('.o_depth02 > li > div').on('click',function(){
        $(this).parent('li').find('.o_depth03').slideToggle(); 
        $(this).toggleClass('on');
    }); 
    $('.o_depth03 > li > div').on('click',function(){
        $(this).parent('li').find('.o_depth04').slideToggle(); 
        $(this).toggleClass('on');
    }); 
});