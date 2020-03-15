'use strict';

(function () {
  var DEFAULT_VALUE = 'any';
  var Key = {
    ENTER: 'Enter',
    LEFT_MOUSE: 1,
    ESCAPE: 'Escape'
  };

  var toggleDisabledElements = function (elements, value) {
    elements.forEach(function (element) {
      element.disabled = value;
    });
  };

  var createElement = function (tag, parentClass, elementClass) {
    var elementNew = document.createElement(tag);
    var parent = document.querySelector(parentClass);
    elementNew.classList.add(elementClass);
    parent.append(elementNew);
    return elementNew;
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var removeCard = function () {
    var card = document.querySelector('.popup');
    if (card) {
      card.remove();
    }
  };

  window.data = {
    defaultValue: DEFAULT_VALUE,
    enter: Key.ENTER,
    escape: Key.ESCAPE,
    leftKeyMouse: Key.LEFT_MOUSE,
    toggleDisabledElements: toggleDisabledElements,
    createElement: createElement,
    removePins: removePins,
    removeCard: removeCard
  };
})();
