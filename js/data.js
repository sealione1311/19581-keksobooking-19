'use strict';

(function () {
  var KEYS = {
    ENTER: 'Enter',
    LEFT_MOUSE: 1,
    ESCAPE: 'Escape'
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomArray = function (array) {
    var randomArray = array.slice(0, getRandomNumber(1, array.length));
    return randomArray.sort(function () {
      return 0.5 - Math.random();
    });
  };
  var getSortedArray = function (array) {
    return array.sort(function () {
      return 0.5 - Math.random();
    });
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
    if(card) {
      card.remove();
    }
  };

  window.data = {
    enter: KEYS.ENTER,
    escape: KEYS.ESCAPE,
    leftKeyMouse: KEYS.LEFT_MOUSE,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    getRandomArray: getRandomArray,
    toggleDisabledElements: toggleDisabledElements,
    createElement: createElement,
    removePins: removePins,
    removeCard: removeCard,
    sortedArray: getSortedArray
  };
})();
