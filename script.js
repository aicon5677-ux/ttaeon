'use strict';

// 메뉴만 제어합니다. 네트워크 요청이나 저장소 사용은 없습니다.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('primary-nav');
const mobileQuery = window.matchMedia('(max-width: 720px)');

if (menuButton && navigation) {
  function setMenu(open) {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? '메뉴 닫기' : '메뉴 열기';
    navigation.hidden = mobileQuery.matches && !open;
  }

  function syncViewport() {
    // 리사이즈로 현재 포커스가 숨겨지는 상황을 방지합니다.
    if (mobileQuery.matches && navigation.contains(document.activeElement)) {
      menuButton.hidden = false;
      menuButton.focus();
    } else if (!mobileQuery.matches && document.activeElement === menuButton) {
      navigation.querySelector('a').focus();
    }
    menuButton.hidden = !mobileQuery.matches;
    setMenu(false);
  }

  menuButton.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  navigation.addEventListener('click', event => {
    if (mobileQuery.matches && event.target.closest('a')) {
      setMenu(false);
      menuButton.focus();
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileQuery.matches && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuButton.focus();
    }
  });
  mobileQuery.addEventListener('change', syncViewport);
  syncViewport();
}
