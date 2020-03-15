'use strict';

(function () {
  var PIN_WIDTH = 66;
  var PIN_HEIGHT = 86;
  var UNACTIVE_PIN_COORDS = '608  408';
  var MAIN_PIN_LEFT = '575px';
  var MAIN_PIN_TOP = '375px';
  var HALF_PIN_WIDTH = PIN_WIDTH / 2;
  var MapLimit = {
    TOP: 130,
    RIGHT: 1200 - HALF_PIN_WIDTH,
    BOTTOM: 630 - PIN_HEIGHT,
    LEFT: 0 - HALF_PIN_WIDTH
  };
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = adForm.querySelector('input[name=address]');
  var formElements = adForm.querySelectorAll('fieldset');
  var filtersElements = document.querySelectorAll('[name^=housing-]');
  var filterSelects = document.querySelectorAll('select[name^=housing-]');
  var filterCheckboxes = document.querySelectorAll('.map__checkbox');
  var resetButton = adForm.querySelector('.ad-form__reset');

  var disableMap = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.data.toggleDisabledElements(formElements, true);
    window.data.toggleDisabledElements(filtersElements, true);
    mainPin.style.left = MAIN_PIN_LEFT;
    mainPin.style.top = MAIN_PIN_TOP;
    addressInput.value = UNACTIVE_PIN_COORDS;
    mainPin.addEventListener('mousedown', activateMap);
    mainPin.addEventListener('keydown', onMainPinKeydown);
  };

  var activateMap = function () {
    addressInput.setAttribute('readonly', true);
    window.data.toggleDisabledElements(formElements, false);
    window.data.toggleDisabledElements(filtersElements, false);
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    window.backend.load(window.advertsFilter.onLoad, window.advertsFilter.onError);
    mainPin.removeEventListener('mousedown', activateMap);
    mainPin.removeEventListener('keydown', onMainPinKeydown);
  };

  var resetForm = function () {
    window.data.removePins();
    filterSelects.forEach(function (select) {
      select.value = window.data.defaultValue;
    });
    filterCheckboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });
    adForm.reset();
    disableMap();
    window.data.removeCard();
    window.upload.remove();
    window.form.setSelectDefault();
  };

  var onLoadData = function () {
    resetForm();
    window.messages.success();
  };

  var onMainPinKeydown = function (evt) {
    if (evt.key === window.data.enter) {
      activateMap();
    }
  };

  resetButton.addEventListener('click', resetForm);
  disableMap();
  mainPin.addEventListener('keydown', onMainPinKeydown);
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
              break;
            case (current < min):
              current = min;
              break;
          }
          return current;
        };
        var currentLeftCoord = getCurrentCoords(MapLimit.LEFT, MapLimit.RIGHT, (mainPin.offsetLeft - shift.x));
        var currentTopCoord = getCurrentCoords(MapLimit.TOP, MapLimit.BOTTOM, (mainPin.offsetTop - shift.y));
        mainPin.style.top = currentTopCoord + 'px';
        mainPin.style.left = currentLeftCoord + 'px';
        addressInput.value = (currentLeftCoord + HALF_PIN_WIDTH) + ' ' + (currentTopCoord + PIN_HEIGHT);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

  window.map = {
    onLoadData: onLoadData
  };
})();
