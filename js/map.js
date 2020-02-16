'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
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
    document.querySelector('.map').classList.remove('map--faded');
    window.adverts.renderPinsAndAppend();
    mainPin.removeEventListener('mousedown', activateMap);
    mainPin.removeEventListener('keydown', activateMap);
    window.form.matchRoomsAndGuests();
  };

  disableMap();
  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === window.data.leftKeyMouse) {
      activateMap();
      addressInput.value = mainPin.style.left + ' ' + mainPin.style.top;
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === window.data.enter) {
      activateMap();
    }
  });
})();
