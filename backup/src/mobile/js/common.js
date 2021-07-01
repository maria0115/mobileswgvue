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
});