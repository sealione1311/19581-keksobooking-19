'use strict';

(function () {
  var PIN_WIDTH = 66;
  var PIN_HEIGHT = 86;
  var MAP_LIMIT = {
    top: 130,
    right: 1200 - PIN_WIDTH / 2,
    bottom: 630 - PIN_HEIGHT,
    left: 0 - PIN_WIDTH / 2
  };
  var UNACTIVE_PIN_COORDS = '375px  575px';
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = adForm.querySelector('input[name=address]');
  var formElements = adForm.querySelectorAll('fieldset');
  var filtersElements = document.querySelectorAll('[name^=housing-]');

  var disableMap = function () {
    adForm.classList.add('ad-form--disabled');
    window.data.toggleDisabledElements(formElements, true);
    window.data.toggleDisabledElements(filtersElements, true);
  };

  var activateMap = function () {
    window.data.toggleDisabledElements(formElements, false);
    window.data.toggleDisabledElements(filtersElements, false);
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    window.backend.load(window.adverts.onLoad, window.adverts.onError);
    mainPin.removeEventListener('mousedown', activateMap);
    mainPin.removeEventListener('keydown', activateMap);
    window.form.matchRoomsAndGuests();
  };

  disableMap();
  addressInput.value = UNACTIVE_PIN_COORDS;
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (evt.which === window.data.leftKeyMouse) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        var getCurrentCoords = function (min, max, current) {
          switch (true) {
            case (current > max):
              current = max;
              return;
            case (current < min):
              current = min;
              return;
          }
          return current;
        };
        var currentLeftCoord = getCurrentCoords(MAP_LIMIT.left, MAP_LIMIT.right, (mainPin.offsetLeft - shift.x));
        var currentTopCoord = getCurrentCoords(MAP_LIMIT.top, MAP_LIMIT.bottom, (mainPin.offsetTop - shift.y));
        mainPin.style.top = currentTopCoord + 'px';
        mainPin.style.left = currentLeftCoord + 'px';
        addressInput.value = (currentLeftCoord + PIN_WIDTH / 2) + 'px' + ' ' + (currentTopCoord + PIN_HEIGHT) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        activateMap();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === window.data.enter) {
      activateMap();
    }
  });
})();
