(function(window) {
  'use strict';

  window.cssCircleMenu = function(el) {
    console.log("와이라는교")
    var $menu = document.querySelector(el);
    console.log($menu)
    var $menuToggle = $menu ? $menu.querySelector('.js-menu-toggle') : undefined;
    var $menuMask = $menu ? $menu.querySelector('.js-menu-mask') : undefined;

    if (!$menu || !$menuToggle || !$menuMask) {
      throw new Error('Invalid elements, check the structure.');
    } else {
      init();
    }

    return {
      openMenu: openMenu,
      closeMenu: closeMenu
    };

    function init() {
      $menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
      });
    }

    function toggleMenu() {
      $menuToggle.classList.contains('is-active')
        ? closeMenu()
        : openMenu();
    }

    function openMenu() {
      $menu.classList.add('is-active');
      $menuToggle.classList.add('is-active');
      $menuMask.classList.add('is-active');
    }

    function closeMenu() {
      $menu.classList.remove('is-active');
      $menuToggle.classList.remove('is-active');
      $menuMask.classList.remove('is-active');
    }
  };
})(window);
