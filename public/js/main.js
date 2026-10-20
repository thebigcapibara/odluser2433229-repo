(function () {
  'use strict';

  var dots = document.querySelectorAll('.hero__dots span');
  var arrows = document.querySelectorAll('.hero__arrows button');
  var current = 0;

  function select(index) {
    if (!dots.length) {
      return;
    }
    current = (index + dots.length) % dots.length;
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('is-active', i === current);
    }
  }

  if (arrows.length === 2) {
    arrows[0].addEventListener('click', function () {
      select(current - 1);
    });
    arrows[1].addEventListener('click', function () {
      select(current + 1);
    });
  }

  for (var i = 0; i < dots.length; i++) {
    (function (index) {
      dots[index].addEventListener('click', function () {
        select(index);
      });
    })(i);
  }
})();
